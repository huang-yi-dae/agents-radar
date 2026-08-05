# AI CLI 工具社区动态日报 2026-08-05

> 生成时间: 2026-08-05 05:02 UTC | 覆盖工具: 7 个

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
**日期：2026-08-05**

---

## 1. 生态全景

AI CLI 工具赛道正处于**功能深化与稳定性阵痛并存的阶段**。各工具均已形成以 Agent 为核心、插件/MCP/ACP 协议为扩展的完整架构，但社区反馈高度集中于**长会话可靠性、MCP 进程生命周期管理、跨平台兼容性**三座大山。安全加固（SSRF、钩子绕过、变量注入）成为全行业共识性投入方向。功能层面，跨设备远程控制、持久化记忆、会话分叉等"下一代体验"需求在各社区同步升温，表明用户已从"能用"转向"好用"的期望阶段。

---

## 2. 各工具活跃度对比

| 工具 | Issues（热点数） | PR 进展 | Release 情况 | 社区热度信号 |
|------|-----------------|---------|--------------|-------------|
| **Claude Code** | 10 个热点（最高 61 评论 / 24 👍） | 10 个重要 PR | v2.1.222（安全修复） | 模型降级争议（21 👍）最激烈 |
| **OpenAI Codex** | 10 个热点（最高 81 评论 / 58 👍） | 10 个 PR 全部合入 | 4 个 alpha 版本（24h 内） | 回复错乱问题 81 评论居首 |
| **Gemini CLI** | 10 个热点（最高 12 评论 / 8 👍） | 10 个 PR（含 2 个安全修复） | 无新版本 | P1 级 Bug 密集，子代理可靠性受质疑 |
| **GitHub Copilot CLI** | 10 个热点（最高 👍 25） | 2 个 PR（含安全修复） | v1.0.79-1、v1.0.79-2 | MCP 问题 24h 内集中爆发（3 个新 issue） |
| **Kimi Code CLI** | 6 个热点（最高 👍 24） | 3 个 PR | 无新版本 | 功能需求热度高于 Bug 反馈 |
| **OpenCode** | 10 个热点（最高 👍 126） | 10 个 PR 密集推进 | v1.18.13 | 用量 API 需求 126 👍 全场最高 |
| **Qwen Code** | 12 个热点（最高 17 评论） | 10 个 PR | v0.21.6-preview.0 | 安全与架构讨论密度高 |

---

## 3. 共同关注的功能方向

| 功能方向 | 涉及工具 | 具体诉求 |
|---------|---------|----------|
| **跨设备/远程控制** | Claude Code（#48949，28 👍）、Kimi Code（#1282，24 👍）、OpenCode（#17322） | 从手机/浏览器/其他设备继续本地会话，桌面端与 CLI 设置需统一持久化 |
| **持久化记忆系统** | Kimi Code（#1283，17 评论）、Claude Code（#60356） | 跨会话记住项目模式、用户偏好，支持自动+手动记忆 |
| **上下文压缩正确性** | Codex（#33493、#29811）、Gemini（#28672）、Qwen Code（#8463/#8452） | 压缩后不丢媒体、不复活已完成指令、不击穿 prompt 缓存 |
| **MCP 生态稳定性** | Codex（#30408，9+ GB 泄漏）、Copilot CLI（#4370/#4371/#4364）、Qwen Code（#8550）、Claude Code（#84019） | 进程生命周期管理、OAuth 认证、TLS 私有 CA、SSE 超时 |
| **会话分叉/分支** | Copilot CLI（#1697，25 👍）、Qwen Code（#8274） | 从历史任意节点创建分支，并行会话共享上下文 |
| **子代理可控性** | OpenCode（#32425）、Gemini（#22093）、Kimi Code（#14039） | 运行中可中断/取消，独立模型配置，权限边界清晰 |
| **用量/成本可观测性** | OpenCode（#16017，126 👍）、Codex（#13222，25 👍）、Qwen Code（#8513） | TUI/CLI 内查询 token 明细与余额，IDE 显示 context 用量 |

---

## 4. 差异化定位分析

| 工具 | 核心定位 | 目标用户 | 技术路线/特色 |
|------|---------|---------|--------------|
| **Claude Code** | 企业级安全与协作 | 企业团队、重度 CLI 用户 | worktree 隔离、钩子系统、插件生态；强调安全边界与可审计性 |
| **OpenAI Codex** | 深度 Agent 能力 + 多提供商 | Pro 订阅者、高级开发者 | Rust 实现、ACP 协议、Agent Plugin 运行时边界、多模型路由；alpha 迭代激进 |
| **Gemini CLI** | Google 生态集成 | GCP/Cloud Workstations 用户 | 深度绑定 Google Cloud、ACP 支持、技能（skills）体系；开源社区治理 |
| **GitHub Copilot CLI** | GitHub 生态一体化 | GitHub 重度用户、企业 | 组织级 Agent 分发、企业策略管理、与 VS Code 联动；保守迭代 |
| **Kimi Code** | 长上下文 + 中文体验 | 中文开发者、移动办公者 | Moonshot 模型（K3）、长上下文优化；跨设备+记忆为差异化方向 |
| **OpenCode** | 开源 + 多模型聚合 | 独立开发者、头部用户 | Go 实现、V2 协议重构、桌面端 + TUI 双端；社区驱动决策 |
| **Qwen Code** | 多模态 + 开放生态 | 研究/实验用户、JetBrains 用户 | omni 多模态输入、DAEMON 架构、动态工作流；QLM 模型 + 第三方供应商 |

---

## 5. 社区热度与成熟度

- **最活跃社区**：**OpenAI Codex**（81 评论最高热 issue，24h 内 4 个版本 + 10 PR 合入），但 alpha 节奏引发稳定性忧虑；**Claude Code** 以模型降级争议获得最高情绪投入。
- **最高呼声需求**：**OpenCode** 的用量 API（126 👍）为全场最高，反映用户对成本透明化的强烈诉求。
- **快速迭代阶段**：**Codex**（alpha 密集发布）、**OpenCode**（V2 协议 6-PR 堆栈重构）、**Qwen Code**（preview/nightly 双通道）。
- **稳健成熟阶段**：**Copilot CLI**（补丁级发布，破坏性变更谨慎但仍有争议）、**Gemini CLI**（P1 修复为主，无新功能发布）。
- **功能需求驱动**：**Kimi Code** 社区以功能请求为主（远程控制、记忆系统），Bug 反馈相对较少。
- **安全投入信号**：**Gemini CLI** 与 **Qwen Code** 今日均有明确安全修复 PR（SSRF、变量注入、钩子漏洞），安全加固已成标配。

---

## 6. 值得关注的趋势信号

1. **"确定性 Agent 运行时"成为下一波架构讨论**：Qwen Code #8102 提议将 LLM 置于信任边界之外、由运行时确定性约束模型动作——这预示行业正从"提示词约束"转向"架构约束"来保证 Agent 行为可信。

2. **MCP 生命周期管理是系统性短板**：Codex 的 9+ GB 进程泄漏、Copilot CLI 的 OAuth/TLS 失败、Qwen Code 的 SSE 挂起——三个工具在同一天暴露 MCP 不同层面的缺陷，说明协议生态已从"能否连接"进入"能否可靠运行"阶段。

3. **模型路由透明度成为信任基石**：Claude Code 的 Fable 5 静默降级引发 61 条评论，Codex 的回复错乱 81 条评论——用户对"模型实际在跑什么"的知情权诉求显著上升，定价与路由策略需要更透明的沟通机制。

4. **Windows/WSL2 体验是共同短板**：Claude Code（GPU 崩溃、MSIX 失败）、Codex（沙箱兼容、更新失败）、Copilot CLI（Ctrl+H 误识别）、Kimi Code（IME 重复）——四个工具同日出现 Windows 系问题，该平台用户基数大但体验普遍落后。

5. **会话分叉与协作模式正在成为刚需**：Copilot CLI（25 👍）、Qwen Code（任意节点分叉 PR）、OpenCode（/handoff 命令）——多个工具同日推进同一方向，暗示"线性会话"模式即将被"分支-合并"模式取代。

6. **用量可编程查询是下一个高价值功能**：OpenCode 的 126 👍 与 Codex 的 token 明细（25 👍）指向同一需求——开发者希望将成本数据接入自动化流水线，这意味着 CLI 正从"开发工具"演变为"可编程基础设施"的一部分。

---

*本报告基于 2026-08-05 各工具 GitHub 仓库公开数据生成，覆盖过去 24 小时动态。*

---

## 各工具详细报告

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills 社区热点报告（数据截止 2026-08-05）

---

## 1. 热门 Skills 排行

按社区关注度（评论/关联 Issue/修复讨论密度）排序：

**① skill-creator 系列修复（PR #1298 / #1099 / #1050 / #1323 / #1261）**
- **功能**：skill-creator 是官方技能生成/优化工具链，包含 `run_eval.py`（触发率评估）、`run_loop.py`（描述优化循环）等脚本。这批 PR 集体修复 Windows 兼容性（subprocess PATHEXT、cp1252 编码、管道 select）、触发检测逻辑缺陷、并行 worker 写污染用户项目目录等问题。
- **社区讨论热点**：根本问题是 `run_eval.py` 对所有 skill 描述一律报告 `recall=0%`（Issue #556，10+ 独立复现），导致描述优化循环在纯噪声上迭代。Windows 用户完全无法使用该工具链。多个作者独立提交修复但均未合并，存在方案重叠。
- **状态**：全部 OPEN，未合并。
- **关联 Issue**：#556（0% 触发率）、#1061（Windows 三连兼容性问题）、#1169（优化循环恒定 recall=0%）
- 🔗 [PR #1298](https://github.com/anthropics/skills/pull/1298) | [PR #1099](https://github.com/anthropics/skills/pull/1099) | [PR #1323](https://github.com/anthropics/skills/pull/1323) | [Issue #556](https://github.com/anthropics/skills/issues/556)

**② document-typography（PR #514）**
- **功能**：生成文档的排版质量控制——孤行（1-6 词溢到下一行）、寡段（章节标题滞留页底）、编号错位。
- **社区讨论热点**：属于"用户不主动要求但影响所有生成文档质量"的高频痛点，讨论焦点在于规则边界（哪些排版问题应自动修正、哪些需人工确认）。
- **状态**：OPEN。
- 🔗 [PR #514](https://github.com/anthropics/skills/pull/514)

**③ ODT / OpenDocument（PR #486）**
- **功能**：OpenDocument 格式（.odt/.ods）的创建、模板填充、读取及转 HTML，触发词覆盖 "ODT/ODS/ODF/OpenDocument/LibreOffice"。
- **社区讨论热点**：补充官方 skill 集合中文档格式覆盖的空白（已有 docx/pdf/pptx），讨论集中在模板填充的字段映射规范。
- **状态**：OPEN。
- 🔗 [PR #486](https://github.com/anthropics/skills/pull/486)

**④ frontend-design 改进（PR #210）**
- **功能**：重写前端设计 skill，提升指令的可执行性与内部一致性——确保每条指令 Claude 能在单次对话内实际遵循。
- **社区讨论热点**：skill 描述是"给人类看的文档"还是"给模型看的可执行规范"，社区明确倾向后者。
- **状态**：OPEN。
- 🔗 [PR #210](https://github.com/anthropics/skills/pull/210)

**⑤ self-audit（PR #1367）**
- **功能**：交付前审计 skill——先机械验证所有声明输出文件是否存在，再按损害严重度优先级执行四维推理审计。
- **社区讨论热点**：与 #1385 的"推理质量门流水线"提案联动（pre-task calibration → adversarial review → delivery verification），强调覆盖会话全生命周期而不是单点。
- **状态**：OPEN。
- 🔗 [PR #1367](https://github.com/anthropics/skills/pull/1367) | [Issue #1385](https://github.com/anthropics/skills/issues/1385)

**⑥ testing-patterns（PR #723）**
- **功能**：全栈测试模式 skill——测试奖杯模型、单元测试 AAA 模式、React Testing Library、边界用例覆盖。
- **社区讨论热点**：community 期待度高（补官方 skill 集合测试方向空白），讨论集中于测试哲学（什么该测 vs. 什么不该测）的表述方式。
- **状态**：OPEN。
- 🔗 [PR #723](https://github.com/anthropics/skills/pull/723)

**⑦ DOCX 书签冲突修复（PR #541）**
- **功能**：修复 DOCX skill 添加修订时 `w:id` 与既有书签冲突导致的文档损坏——OOXML 中 `w:id` 是跨书签/修订/批注共享的 ID 空间，硬编码低 ID 会冲突。
- **社区讨论热点**：深度 OOXML 规范问题，属于"不做无法正常工作、做了用户无感知"的基础修复。
- **状态**：OPEN。
- 🔗 [PR #541](https://github.com/anthropics/skills/pull/541)

---

## 2. 社区需求趋势

| 方向 | 代表 Issue/PR | 热度信号 |
|---|---|---|
| **安全与信任边界** | #492（43 评论）— 社区 skill 借 `anthropic/` 命名空间伪装官方 | 评论数全场最高 |
| **组织级 skill 共享** | #228（16 评论，👍8）— 企业内部 skill 直接共享 | 高频功能需求 |
| **工具链可靠性（Windows）** | #1061 / #556 — skill-creator 在 Windows 上完全不可用 | 多 PR 独立修复 |
| **推理质量保障** | #1385 / PR #1367 — 交付前质量门流水线 | 新方向，上升快 |
| **文档格式补齐** | PR #486（ODT）、PR #514（排版质量） | 官方集合覆盖盲区 |
| **上下文窗口管理** | #1487 — claude-api skill 单次注入 ~156k tokens | 性能/资源效率诉求 |

值得注意：**#492（安全/信任边界）是当前社区最激烈讨论**（43 评论），直指仓库治理层面——社区 skill 与官方 skill 在同一命名空间分发，用户可能向非官方 skill 授予过高权限。这比任何单个 skill 功能都更受关注。

---

## 3. 高潜力待合并 Skills（评论活跃、技术上可行、近期可能落地）

| PR | Skill | 潜力分析 |
|---|---|---|
| [PR #538](https://github.com/anthropics/skills/pull/538) | pdf 文件引用大小写修复 | 8 处大小写不敏感 mismatch，明确 bug fix，改动小、无争议，合入门槛最低 |
| [PR #541](https://github.com/anthropics/skills/pull/541) | docx 修订 ID 冲突修复 | 明确 corruption bug，有清晰 root cause 分析，维护者验收成本低 |
| [PR #539](https://github.com/anthropics/skills/pull/539) | skill-creator YAML 特殊字符校验 | 修复静默解析失败，改动集中在 `quick_validate.py` 一处，独立可用 |
| [PR #514](https://github.com/anthropics/skills/pull/514) | document-typography | 独立 skill，不触碰现有工具链，讨论度高且功能完整，只需维护者确认规则边界 |
| [PR #723](https://github.com/anthropics/skills/pull/723) | testing-patterns | 内容全面，官方集合无竞品，如维护者认可测试哲学表述即可推进 |

**风险提示**：skill-creator 六个修复 PR（#1298 / #1099 / #1050 / #1323 / #1261）内容高度重叠，虽单个均合理，但合并策略需协调——若维护者逐 PR 合并且不做冲突消解，会造成代码反复冲突。

---

## 4. Skills 生态洞察

**社区最集中的诉求：skill 工具链本身的可靠性——`skill-creator` 在 Windows 上完全不可用、`run_eval.py` 对所有描述恒定报 0% 触发率，导致整个"用 AI 优化 skill"的闭环自发布起就在噪声上运行。**

这意味着：社区不是在等待更多 skill，而是在等待**制造 skill 的流水线先能跑通**。当 skill-creator 的评估信号（recall/precision）本身是噪声时，所有依赖它的描述优化都失去意义。与此同时，安全命名空间治理（#492）与组织级共享（#228）构成生态成熟度的另外两块拼图——前者决定社区能否放心贡献，后者决定企业能否规模化采用。

---

# Claude Code 社区动态日报 — 2026-08-05

## 今日速览
- 发布 v2.1.222，重点修复 worktree 隔离会话中破坏性 git 命令逃逸及 PreToolUse 钩子绕过工具限制的两个安全问题。
- Fable 5 在 Max 计划上被静默降级为 Opus 4.8 的问题持续发酵，已积累 61 条评论、21 个 👍，成为社区最关注的事件。
- 桌面应用 GPU 进程崩溃、MSIX 更新失败、macOS Cowork 桥接每日断连等平台问题集中爆发，Windows 与 macOS 用户受影响明显。

## 版本发布
**[v2.1.222](https://github.com/anthropics/claude-code/releases)**
- 修复 worktree 隔离会话及其子代理能够对主 checkout 执行破坏性 git 命令的问题——现在隔离机制适用于所有会话类型的文件编辑与 Bash 操作
- 修复后台代理任务中 PreToolUse 自动放行钩子绕过工具限制的问题

## 社区热点 Issues（Top 10）
1. **[#79337 Fable 5 在 Max 计划上提示"需要 usage credits"并被静默降级至 Opus 4.8（61 评论 / 21 👍）](https://github.com/anthropics/claude-code/issues/79337)**
   自 7 月 20 日 Fable 5 成为 Max 计划标配以来，用户始终无法使用该模型。系统不仅拒绝运行，还静默切换至 Opus 4.8 且未给出明确解释。这是当前社区情绪最激烈的 issue。

2. **[#33949 SSE 流式响应无限挂起 + ESC 无法完全取消（38 评论 / 24 👍）](https://github.com/anthropics/claude-code/issues/33949)**
   困扰用户数月的核心稳定性问题：SSE 流无超时机制、队列自动重启导致无法彻底取消。社区已自行完成根因分析并给出修复提案。

3. **[#77966 Claude 账号 OAuth 登录循环——state 参数在重定向后丢失（23 评论 / 15 👍）](https://github.com/anthropics/claude-code/issues/77966)**
   Linux 与 IntelliJ 平台用户反复陷入"sign in again"无限循环，登录流程的 state 参数在重定向环节被丢弃。

4. **[#54394 ugrep 包装器将 grep 进程 OOM 放大为 V8 堆 OOM（22 评论）](https://github.com/anthropics/claude-code/issues/54394)**
   WSL2 下嵌入式 ugrep 包装器导致正则回溯从 8GB 堆上限直至宿主机冻结，性能影响严重。

5. **[#80444 桌面应用 GPU 进程致命崩溃致 MSIX 包不可启动（20 评论）](https://github.com/anthropics/claude-code/issues/80444)**
   通过应用内 Browser 标签触发 GPU 崩溃（0x060C201E）后，整个应用进入不可启动状态，只能通过 Repair 恢复。

6. **[#57853 Bun JSC GC 段错误致 Linux 平台二进制崩溃（18 评论）](https://github.com/anthropics/claude-code/issues/57853)**
   在特定 AMD CPU 上所有平台二进制均崩溃，与 Bun 1.3.14 的 GC 实现相关。

7. **[#48949 桌面应用缺少持久化的"始终开启远程控制"选项（13 评论 / 28 👍）](https://github.com/anthropics/claude-code/issues/48949)**
   CLI 可通过配置自动启用远程控制，但桌面应用忽略该设置。28 个 👍 显示需求强烈。

8. **[#74113 后台代理经常空闲且不投递最终 SendMessage 报告（8 评论 / 7 👍）](https://github.com/anthropics/claude-code/issues/74113)**
   后台代理完成任务后不发送最终报告，需要重新 ping 才能恢复。影响自动化工作流可靠性。

9. **[#56060 桌面端"按最近排序"在"按项目分组"下无效（8 评论 / 12 👍）](https://github.com/anthropics/claude-code/issues/56060)**
   项目分组的会话列表排序功能失效，属于桌面端 UI 一致性问题。

10. **[#72299 KDE Konsole 中 Shift+Enter 无法触发多行输入（1 评论 / 4 👍）](https://github.com/anthropics/claude-code/issues/72299)**
   终端兼容性问题——Shift+Enter 被当作 Enter 提交，且 `/terminal-setup` 拒绝在 Konsole 中运行。

## 重要 PR 进展
1. **[#84004 fix(plugin-dev): 限制 frontmatter 解析范围](https://github.com/anthropics/claude-code/pull/84004)**
   修复基于 `sed` 的范围解析在 Markdown 正文含分隔线时错误解析后续内容的问题。

2. **[#84003 fix(scripts): 传播顶层失败状态](https://github.com/anthropics/claude-code/pull/84003)**
   修复重复维护脚本顶层 reject 时进程仍以成功状态退出的问题。

3. **[#83999 fix(scripts): 校验 gh 标志值](https://github.com/anthropics/claude-code/pull/83999)**
   修复受限 `gh` 包装器在标志缺值时转发不完整命令、绕过参数校验的问题。

4. **[#83995 fix(scripts): 校验标签选项值](https://github.com/anthropics/claude-code/pull/83995)**
   修复 `--add-label`/`--remove-label` 缺值时触发内部 `unbound variable` 错误。

5. **[#83993 fix(scripts): 拒绝自引用重复项](https://github.com/anthropics/claude-code/pull/83993)**
   防止重复评论脚本将触发 issue 自身标记为重复项并发布自引用评论。

6. **[#83992 fix(plugin-dev): 断言预期钩子决策](https://github.com/anthropics/claude-code/pull/83992)**
   为 `test-hook.sh` 增加 `--expect allow|deny|ask` 参数，修复 #83800——原先无法捕获"应拒绝却放行"的钩子错误。

7. **[#83990 fix(plugin-dev): 报告缺失的 jq 依赖](https://github.com/anthropics/claude-code/pull/83990)**
   修复 #83802——`jq` 未安装时错误地将有效输入报告为格式错误 JSON。

8. **[#83374 docs(plugin-dev): 文档化 MessageDisplay 流式语义](https://github.com/anthropics/claude-code/pull/83374)**
   补充 Hook 开发技能中缺失的 `MessageDisplay` 事件文档。

9. **[#83738 Fix/83484 symlink 路径扩展](https://github.com/anthropics/claude-code/pull/83738)**
   修复 Linux 安装中 `claude install` 创建指向字面量 `%h` 占位符的破损符号链接。

10. **[#83890 Create pylint.yml](https://github.com/anthropics/claude-code/pull/83890)**
    新增 Pylint CI 工作流配置。

## 功能需求趋势
- **远程控制/协作能力**（#48949、#60356）：桌面端与 CLI 设置不一致，用户期望统一的持久化远程控制开关。
- **模型选择透明性**（#79337、#67937、#84043）：Fable 5 降级、安全分类器误报导致强制切换模型、宣传中不存在的 "Opus 5"——社区对模型路由逻辑的可见性和可控性诉求强烈。
- **桌面应用稳定性**（#80444、#83478、#84005）：GPU 崩溃、更新失败、文件查看器缓存等桌面端问题密集出现，稳定性成为高频关键词。
- **连接器与 MCP 生态**（#84019、#84025、#84039）：Notion 连接器 OAuth 失败（多人报告）、GitHub 连接器跨设备行为不一致，第三方集成可靠性受关注。
- **后台代理可靠性**（#74113、#75036）：代理空闲不报告、看门狗无恢复路径——自动化工作流的可靠性需求持续升温。

## 开发者关注点
- **安全隔离有效性问题**（#79337 关联 v2.1.222）：worktree 隔离与钩子限制曾被绕过，社区对沙箱信任度下降——本次版本修复直接回应此担忧，但信任重建仍需时间。
- **核心稳定性痛点**（#33949、#54394、#57853）：SSE 挂起、内存溢出、GC 段错误——基础稳定性问题长期未决，社区已出现自行根因分析的趋势。
- **账号/认证流程缺陷**（#77966、#84019、#84025）：OAuth 循环、连接器授权失败——认证链路的可靠性成为多平台共性痛点。
- **Windows 平台集中爆发**（#80444、#84005、#54394）：GPU 崩溃、MSIX 更新失败、WSL2 内存问题——Windows 用户体验明显落后于 macOS/Linux。
- **多模型管理的混乱**（#79337、#84043）：模型降级静默发生、UI 引用不存在的模型——定价与模型路由策略需要更透明的沟通。

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

## 2026-08-05 OpenAI Codex 社区动态日报

---

## 今日速览

今日 Codex 仓库迎来 4 个 alpha 版本密集发布（0.147.0-alpha.7 及系列补丁），同时有约 20 个 PR 合入，重点围绕 Agent Plugin 运行时边界、工具注册表规范化、模型目录缓存注入等基础设施改进。社区侧，多线程对话回复错乱（#8648）以 81 条评论成为最热讨论，而 MCP 服务器进程泄漏问题（#30408）持续发酵，已成为影响长期稳定性的头号公敌。

---

## 版本发布

过去 24 小时密集发布了 4 个 Rust 版本，均为 alpha 通道迭代：

- **rust-v0.147.0-alpha.7**：当前最新 alpha 版本
- **rust-v0.147.0-alpha.6.4**：补丁版本
- **rust-v0.147.0-alpha.6.3**：补丁版本
- **rust-v0.147.0-alpha.6.1**：补丁版本

发布说明仅有 "Release" 占位描述，未附带详细变更日志。结合同日合入的 PR 分析，这些版本大概率包含今日合入的 Plugin 运行时边界、工具命名空间规范化、MCP 相关修复等改动。

---

## 社区热点 Issues （Top 10）

### 1. #8648 — 对话回复错乱：Codex 回复早期消息而非最新消息
**评论 81 | 👍 58 | 状态：OPEN**

> **链接**: https://github.com/openai/codex/issues/8648

多消息对话中，Codex 偶尔回应的是更早的消息而非用户最新的输入。该问题自 1 月创建至今仍为 OPEN 状态，评论数高达 81 条，是目前社区反馈最激烈的问题。在多轮复杂任务场景下，该 Bug 严重干扰工作流，影响面覆盖 Pro 订阅用户与 gpt-5.2-xhigh 模型。

### 2. #37002 — Codex 应用点击更新后无法安装（今日新增）
**评论 16 | 👍 0 | 状态：OPEN**

> **链接**: https://github.com/openai/codex/issues/37002

今日新提交的 Bug，macOS 12 用户点击应用内更新后安装失败。属新引入的回归问题，尚待官方响应。

### 3. #30408 — MCP 服务器进程泄漏：每线程进程永不清理（9+ GB RSS）
**评论 23 | 👍 6 | 状态：OPEN**

> **链接**: https://github.com/openai/codex/issues/30408

Codex app-server 为每个新线程/对话生成全局 MCP 服务器进程，但当线程归档或关闭后进程不被杀死，孤儿进程无限累积。在 macOS 上已观察到 9+ GB RSS，长期使用后必然导致内存耗尽。该问题与 #35485（Windows 版 node_repl 同款泄漏）形成交叉印证，指向 MCP 生命周期管理的系统性缺陷。

### 4. #35864 — Windows 非提权沙箱拒绝可拆分可写根目录，破坏 apply_patch
**评论 10 | 👍 0 | 状态：OPEN**

> **链接**: https://github.com/openai/codex/issues/35864

原生 Windows CLI 在非提权受限令牌沙箱下，apply_patch 更新和删除操作失败。提交者已附带修复方案，关联 #34088、#31229 两个先例。Windows 沙箱兼容性问题持续困扰原生 CLI 用户。

### 5. #33493 — 本地压缩 v2 保留无界 input_image 负载，导致反复自动压缩
**评论 7 | 👍 2 | 状态：OPEN**

> **链接**: https://github.com/openai/codex/issues/33493

长时间运行的图像密集型线程陷入自动压缩死循环：压缩后 input_image 负载不释放，触发下次压缩，如此往复。对涉及大量截图/视觉输入的工作流影响显著。

### 6. #25233 — /side 临时会话过期过快，过期行为不透明
**评论 8 | 👍 18 | 状态：OPEN**

> **链接**: https://github.com/openai/codex/issues/25233

侧边临时会话（/side）在 App 中过期速度超出预期，且用户无法感知过期规则。18 个 👍 表明该问题在依赖临时会话的 Pro 用户中关注度较高。

### 7. #29811 — Goal 压缩在目标续跑前复活已完成的手动转向指令
**评论 6 | 👍 3 | 状态：OPEN**

> **链接**: https://github.com/openai/codex/issues/29811

长时间运行的 /goal 会话中，已完成的手动转向指令在压缩后复活，干扰目标续跑的方向。上下文压缩的正确性问题在长会话场景下不断显现。

### 8. #36971 — macOS Codex Desktop 失控任务进程吞噬 12+ GB 内存
**评论 2 | 👍 0 | 状态：OPEN**（昨日新增）

> **链接**: https://github.com/openai/codex/issues/36971

普通本地任务工作中，task worker 达 5.5 GB RSS，app-server 随后保持 7.0–7.3 GB 且 CPU 160–200%，应用卡顿不稳定。与 #30408 的进程泄漏问题疑似同源。

### 9. #35485 — Windows Desktop：node_repl MCP 进程每线程泄漏
**评论 2 | 👍 0 | 状态：OPEN**

> **链接**: https://github.com/openai/codex/issues/35485

Windows 原生版 Codex Desktop 26.721.4979.0 中，node_repl.exe MCP 进程按线程累积，直到 app-server 退出才回收。与 #30408 形成跨平台印证。

### 10. #32574 — MCP 服务器启动成功但工具缓存始终为空（has_cached_tools=false）
**评论 2 | 👍 0 | 状态：OPEN**

> **链接**: https://github.com/openai/codex/issues/32574

自定义模型提供商（wire_api="responses"）下，12 个 MCP 服务器正常启动（94 个工具），但 has_cached_tools 始终为 false，模型请求仅携带 0 个工具。自定义提供商 + MCP 的组合路径存在兼容性缺口。

---

## 重要 PR 进展（Top 10）

### 1. #37027 — 强制 Agent Plugin 运行时边界【已合入】
> **链接**: https://github.com/openai/codex/pull/37027

跟踪 Agent Plugin 清单在插件、技能、MCP 加载中的能力边界，使各格式使用特定行为而不影响传统插件。仅发现直接子技能、排除应用和钩子能力、隔离 MCP 数据。

**影响**：插件系统的权限隔离与安全加固。

### 2. #37022 — 在 `functions` 命名空间下规范化默认工具【已合入】
> **链接**: https://github.com/openai/codex/pull/37022

将顶级函数和自定义工具定义分组到统一的 `functions` 命名空间，面向支持命名空间工具的 Responses Lite 提供商，同时规范化缺失/空/显式命名空间。

**影响**：多提供商兼容性提升，工具定义更统一。

### 3. #37020 — 强制严格工具名冲突报错【已合入】
> **链接**: https://github.com/openai/codex/pull/37020

跟踪工具注册表组装过程中的首个重复有效工具名（含外部工具、代码模式和工具搜索引入的冲突），在启用 `error_on_tool_collisions` 时直接失败而非静默覆盖。

**影响**：消除工具名歧义导致的意外行为。

### 4. #37000 — 跨插件加载保持共享技能缓存新鲜度【已合入】
> **链接**: https://github.com/openai/codex/pull/37000

按文件系统和插件快照身份键控缓存，兼容配置和工作目录加载可共享结果但不复用过期插件数据，同时合并同一缓存键的并发加载。

**影响**：修复长驻服务中的技能缓存失效问题。

### 5. #36998 — 在工具搜索中支持延迟自定义工具【已合入】
> **链接**: https://github.com/openai/codex/pull/36998

将顶级自由形式工具纳入工具搜索索引并标记延迟加载；搜索到的工具序列化为 Responses API custom 工具，发现后再转回可执行工具规格。

**影响**：大规模工具场景下搜索能力增强。

### 6. #36993 — 分页线程支持 includeTurns 读取【已合入】
> **链接**: https://github.com/openai/codex/pull/36993

使用 `thread/read` 和 `includeTurns: true` 的客户端在分页存储历史时仍可获得完整历史投影视图。

**影响**：分页迁移后的向后兼容修复。

### 7. #36992 — 允许注入模型目录缓存【已合入】
> **链接**: https://github.com/openai/codex/pull/36992

新增公开异步 `ModelsCache` 契约及缓存条目/错误类型，模型提供商和 `OpenAiModelsManager` 可接受调用方提供的缓存实现，默认仍保留文件缓存。

**影响**：自定义提供商接入更灵活。

### 8. #36990 — 移除遗留协作模式变体【已合入】
> **链接**: https://github.com/openai/codex/pull/36990

删除隐藏的 `PairProgramming` 和 `Execute` 模式变体及其未使用的提示模板，模式处理仅保留 `Default` 和 `Plan`。

**影响**：代码库简化，减少维护负担。

### 9. #36981 — 为 Amazon Bedrock 启用远程压缩【已合入】
> **链接**: https://github.com/openai/codex/pull/36981

为不支持 v2 协议的提供商添加拥有方远程压缩能力，将 Bedrock 标记为 v1-only，手动/自动压缩走 `/v1/responses/compact`。

**影响**：Bedrock 用户可正常使用上下文压缩。

### 10. #36970 — 令牌预算上下文身份可配置【已合入】
> **链接**: https://github.com/openai/codex/pull/36970

新增 `features.token_budget.mode` 设置（`thread` / `name`），默认上下文窗口元数据使用线程 ID，允许配置保留代理名称。

**影响**：长会话令牌管理更精准。

---

## 功能需求趋势

从近 24 小时更新的 Issues 中提炼出以下社区核心诉求：

| 方向 | 代表 Issue | 热度 |
|------|-----------|------|
| **完整 Computer Use** | #19305：Windows 桌面完整原生 Computer Use 支持 | 👍 41 |
| **Copy as Markdown 回归** | #25201：更新后该功能从 Copy 菜单消失 | 👍 47 |
| **全局搜索** | #16672：跨线程标题和对话内容的全局搜索 | 👍 11 |
| **Token 用量明细** | #13222：/status 中按来源展示上下文 Token 组成 | 👍 25 |
| **子代理独立模型配置** | #14039：每个子代理可选不同模型/提供商/配置 | 👍 17 |
| **/side 会话过期策略** | #25233：过期时间不透明且过快 | 👍 18 |
| **模型可选白名单** | #28469：托管式强制模型可选用白名单 | 👍 4 |
| **Claude Code 风格子代理类型** | #32418：MultiAgentV2 spawn_agent 支持可复用 subagent_type | 👍 4 |
| **MCP App 内联 UI 渲染** | #21019：工具结果中的 mcp_app_resource_uri 不触发内联渲染 | 👍 15 |
| **隐藏文件夹显示开关** | #24309：文件树中显示/隐藏点文件夹 | 👍 0 |

总体趋势：**稳定性与可观测性**（内存泄漏、Token 明细、全局搜索）和**扩展能力**（子代理模型独立、MCP App 端到端）是两大主线。

---

## 开发者关注点

1. **MCP 进程泄漏成为系统性痛点**：跨平台（macOS #30408、Windows #35485）、跨版本反复出现，内存耗尽到 GB 级别。开发者普遍希望 Codex 官方在架构层面解决 MCP 服务器生命周期管理，而非逐个打补丁。

2. **Windows 原生支持仍是短板**：沙箱兼容性（#35864）、更新安装失败（#37002）、Computer Use 缺失（#19305）等问题叠加，Windows 用户体验明显落后于 macOS。

3. **上下文压缩正确性是长会话硬伤**：图像负载不释放（#33493）、已完成指令被复活（#29811）、回复错乱（#8648）——长会话场景下压缩后的状态一致性已成为高优先级问题。

4. **功能消失引发信任危机**：#25201（Copy as Markdown 消失，👍 47）、#13277（超链接不可点击）等"已有功能被改坏"的回归报告频发，社区对更新质量的敏感度显著上升。

5. **自定义化诉求集中爆发**：自定义模型提供商 + MCP 工具缓存问题（#32574）、子代理独立模型/提供商选择（#14039）、模型白名单（#28469）——开发者希望 Codex 在企业和高级用户场景下提供更细粒度的控制能力。

6. **alpha 版本节奏过快引发稳定性担忧**：24 小时内 4 个 alpha 版本，社区虽有理解，但对 alpha 通道引入的回归（如 #37002 更新失败）表达了不安，期望官方在发布前增加回归测试覆盖。

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI 社区动态日报 — 2026-08-05

## 今日速览

今日社区高度聚焦于 **子代理（Subagent）可靠性** 与 **会话恢复（Session Restore）缺陷** 两大主题。多个 P1 级 Bug 持续发酵，包括子代理在达到 MAX_TURNS 后误报成功、通用代理卡死，以及 ACP 模式下载入会话无法恢复记忆等问题。核心管线修复依旧是社区主要诉求。

## 社区热点 Issues

1. **[#22323] Subagent recovery after MAX_TURNS is reported as GOAL success** — `codebase_investigator` 子代理达到最大轮次限制后，仍将状态报告为 "success" 且终止原因为 "GOAL"，导致中断被掩盖。该问题影响任务结果的可信度，已获 12 条评论。
   https://github.com/google-gemini/gemini-cli/issues/22323

2. **[#21409] Generalist agent hangs** — 通用代理在委派任务（如创建文件夹）时经常无限期挂起。用户需等待长达一小时并手动取消，且仅能通过指示模型禁用子代理来规避。8 条评论，8 个 👍，属于高影响 P1 问题。
   https://github.com/google-gemini/gemini-cli/issues/21409

3. **[#25166] Shell command execution gets stuck with "Waiting input"** — 简单 CLI 命令执行完成后，终端仍显示命令活动并挂起，提示等待用户输入，但命令实际已结束。P1 级核心问题，影响日常自动化流。
   https://github.com/google-gemini/gemini-cli/issues/25166

4. **[#21968] Gemini does not use skills and sub-agents enough** — 用户反馈 Gemini CLI 不会主动使用自定义 skills 和子代理，即便在高度相关的场景下也需显式指令。开发者社区对 Agent 自主性的期待正在提升。
   https://github.com/google-gemini/gemini-cli/issues/21968

5. **[#22093] (Sub)agents running without permission since v0.33.0** — 更新至 v0.33.0 后，用户在配置中显式禁用子代理的情况下，通用代理等子代理仍被自动调用。权限控制的回归问题引发了用户对可靠性的担忧。
   https://github.com/google-gemini/gemini-cli/issues/22093

6. **[#26522] Stop Auto Memory from retrying low-signal sessions indefinitely** — 自动记忆系统会无限重试低信号会话，因低质量会话未被标记为已处理导致反复被提取。用户 SandytTao520 提交的系列记忆系统问题之一。
   https://github.com/google-gemini/gemini-cli/issues/26522

7. **[#28693] ACP: session killed mid-turn is never persisted** — ACP 模式下，进程在中断（SIGKILL、OOM、崩溃）时未干净关闭，会话不会持久化，`session/load` 返回 "No previous sessions found"，与广告的 `loadSession: true` 能力相矛盾。昨日新提交的 Issue，值得关注。
   https://github.com/google-gemini/gemini-cli/issues/28693

8. **[#27913] ACP session/load resolves but does not restore conversation memory** — 同样为 ACP 模式下 `session/load` 的缺陷：接口能解析，但模型无法恢复上下文记忆，仅剩单一消息。连续两个 ACP 会话恢复问题表明该功能尚未成熟。
   https://github.com/google-gemini/gemini-cli/issues/27913

9. **[#21983] browser subagent fails in wayland** — Browser 子代理在 Wayland 环境下失败并显示 "Termination Reason: GOAL"，但实际未达成目标。Linux 用户的图形界面自动化体验受挫。
   https://github.com/google-gemini/gemini-cli/issues/21983

10. **[#23571] Model frequently creates tmp scripts in random spots** — 模型在受限于 shell 执行后，倾向于在各类目录中生成多个编辑脚本，导致工作区清理成本高。用户希望模型能更规范地管理临时文件。
    https://github.com/google-gemini/gemini-cli/issues/23571

## 重要 PR 进展

1. **[#28691] fix(core): block $VAR and ${VAR} variable expansion bypass (GHSA-wpqr-6v78-jr5g)** — 修复 `detectBashSubstitution()` 和 `detectPowerShellSubstitution()` 中允许变量展开绕过安全检查的缺陷，并加强对 GitHub Actions 工作流的安全加固。P1 安全修复，值得关注。
   https://github.com/google-gemini/gemini-cli/pull/28691

2. **[#28557] fix: resolve SSRF vulnerability in web-fetch.ts by using async DNS resolution** — 将 `isPrivateIp` 同步检查替换为异步解析，防止域名指向内网地址（如 169.254.169.254）时绕过 SSRF 防护。安全问题修复，解决了 #28555。
   https://github.com/google-gemini/gemini-cli/pull/28557

3. **[#28689] fix(core): unwrap and parse nested gaxios streaming errors** — 为流式请求中嵌套的 Google API 错误提供回退解析机制，确保 rate limit 和容量耗尽等结构化错误能正确识别。
   https://github.com/google-gemini/gemini-cli/pull/28689

4. **[#28672] fix(core,cli): repair /compress session reload and quota-fallback tool response loss** — 两个独立修复：`/compress` 命令的会话加载失败问题，以及配额限制触发后工具响应丢失导致的历史记录损坏。P1 级修复，直接影响用户体验。
   https://github.com/google-gemini/gemini-cli/pull/28672

5. **[#28694] fix(release): handle npm dist-tag deletion failures** — 修复在禁止删除 dist-tag 的 npm registry（如 Wombat Dressing Room 的 403 Forbidden）上 nightly 发布流程中可能失败的问题。
   https://github.com/google-gemini/gemini-cli/pull/28694

6. **[#28688] fix(core): dynamically resolve Cloud Workstations proxy redirect URI** — 修复 Google Cloud Workstations 中因静态配置 `localhost` 回调地址而导致的 OAuth 认证失败，动态解析代理重定向地址。
   https://github.com/google-gemini/gemini-cli/pull/28688

7. **[#28641] fix(cli): prevent ghost text wrapping infinite loop at narrow widths** — 修复窗口宽度小于单个宽字符（CJK/emoji）时 `getGhostTextLines` 的无限循环问题，新增回归测试。修复 #19985。
   https://github.com/google-gemini/gemini-cli/pull/28641

8. **[#28639] fix(core): guard formatTruncatedToolOutput against non-positive maxChars** — 修复 `maxChars <= 0` 时因 `slice` 负索引导致输出膨胀约 2 倍的问题，增加回归测试。修复 #28620。
   https://github.com/google-gemini/gemini-cli/pull/28639

9. **[#28530] feat(caretaker-evals): add triage evaluation framework and judge runner** — 为 Caretaker Agent 的 issue 分诊流程新增 LLM-as-a-Judge 评估框架与并行 Git Worktree 基准运行器。
   https://github.com/google-gemini/gemini-cli/pull/28530

10. **[#28474] feat(core): add skill name dimension to tool call telemetry** — 为工具调用遥测增加 `skill_name` 维度，可追溯 `activate_skill` 工具调用参数，改进可观测性。
    https://github.com/google-gemini/gemini-cli/pull/28474

## 功能需求趋势

- **Agent 自主性与正确性**：社区大量反馈集中在子代理的稳定性（挂起、误报成功、权限绕过）以及模型对 skills/子代理的主动使用不足。用户期望 CLI 能够在正确场景下自主、合理委派任务。
- **会话持久化与恢复**：ACP 模式下会话无法持久化或恢复上下文成为新的热点，且与 CLI 自己声明的 `loadSession` 能力相矛盾，预计将成为近期修复重点。
- **安全加固**：SSRF 漏洞修复与变量展开绕过拦截表明安全审查正在推进，社区对凭证、内网地址等敏感信息的防护需求上升。
- **终端交互体验**：窄宽字符处理死循环、外部编辑器退出后终端错乱、resize 闪烁等终端层面的体验问题持续被提交。
- **记忆系统优化**：Auto Memory 的低效重试、无效 patch 处理及日志过度输出等问题，显示出该功能仍在打磨阶段。

## 开发者关注点

- **可靠性回归**：v0.33.0 后子代理在禁用状态下仍被启用的权限问题，动摇了部分用户对版本升级的信心。
- **交互僵局**：Shell 命令挂起 "Waiting input"、通用 Agent 长时间无响应等卡死问题，严重阻碍实际开发流程，已成为最高频的痛点。
- **上下文透明性**：`/bug` 报告不包含子代理上下文、子代理轨迹无法通过 `/chat share` 分享，开发者希望更具可观测性以定位问题。
- **破坏性操作防范**：模型在复杂 git 操作或数据库操作时，可能使用 `git reset`、`--force` 等危险命令，社区呼吁增加更智能的安全护栏。

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

## 今日速览

今日发布两个补丁版本（v1.0.79-1、v1.0.79-2），主要涉及界面布局优化与一项破坏性配置变更。社区方面，MCP 相关故障集中爆发——OAuth 3LO 认证失败、FastMCP 初始化不兼容、企业 MCP 注册表 TLS 校验失败等均被报告；与此同时，自定义主题支持（👍23）与跨设备会话同步（👍25 最高赞）仍是社区最强烈呼吁的功能方向。

## 版本发布

**v1.0.79-2** (Improved)
- 固定提示（pinned prompt）上移一行至 Tab 栏预留区域，保持提示形态不变且减少时间线占用一行
- 终端行数低于 30 时默认关闭固定提示，避免拥挤；可通过 `pinnedPrompts` 配置

**v1.0.79-1** (Improved)
- 🔴 **破坏性变更**：sandbox 设置 `allowDevToolCaches` 重命名为 `allowDevToolAccess`（现在同时授予 dev-tool 配置与注册表权限，不再局限于缓存）
- 旧配置键将被静默忽略；若此前显式设置为 `false`，更新后将回退为默认值（开启），需在设置中重新重命名

## 社区热点 Issues

1. **[#1504] 自定义主题支持**（评论 8 | 👍 23）
   https://github.com/github/copilot-cli/issues/1504
   社区对现有基础主题支持认可，但强烈希望能创建自定义主题并以 JSON 形式分享（如 `/theme` 提供创建选项）。高赞表明视觉定制是当前最渴求的功能之一。

2. **[#4370] v1.0.79-1 与 FastMCP 初始化不兼容**（新开，评论 2 | 👍 1）
   https://github.com/github/copilot-cli/issues/4370
   CLI 在 MCP 初始化完成前发送 `server/discover` 请求，而 FastMCP 未实现该接口并返回 `-32602`，被 CLI 当作致命错误处理。影响所有使用 FastMCP 构建 MCP 服务器的用户。

3. **[#4371] MCP OAuth 3LO 认证失败**（新开，评论 0）
   https://github.com/github/copilot-cli/issues/4371
   连接配置了 OAuth 3LO（Authorization Code）的 MCP Gateway 时，工具调用报错 `-32042`，CLI 不支持 OAuth 流程所需的 URL 引导。企业级 MCP 网关用户受影响。

4. **[#4349] 企业策略配置校验误伤所有本地/自定义 MCP 服务器**（评论 1）
   https://github.com/github/copilot-cli/issues/4349
   托管策略中合法的枚举值 `"enable"` 被校验器拒绝（仅接受 `"disable"`），导致策略拉取失败并阻断全部本地/自定义 MCP 服务器的加载。企业环境大规模故障风险。

5. **[#4364] macOS 上企业 MCP 注册表 TLS 校验失败**（新开，评论 0）
   https://github.com/github/copilot-cli/issues/4364
   rustls 拒绝私有 CA 证书（Apple 错误 -67901），CLI 将注册表错误视为致命错误并阻止所有 MCP 连接。macOS 上使用企业私有 CA 的环境无法使用任何 MCP 服务器。

6. **[#4328] WSL2 下 Ctrl+H 被误识别为 Ctrl+Backspace**（评论 5）
   https://github.com/github/copilot-cli/issues/4328
   因 `WT_SESSION` 环境变量从 Windows Terminal 泄漏，WSL2 中 `ctrl+h` 实际表现如同 `ctrl+w`（删除整个单词）。影响 WSL2 用户的日常编辑效率。

7. **[#1285] 组织级 Agent 不显示**（评论 7 | 👍 9）
   https://github.com/github/copilot-cli/issues/1285
   在 `{org}/.github-private` 仓库中创建的 Agents 无法在 CLI 或 VS Code 中显示，用户已确认模板和命名空间正确。企业级 Agent 分发渠道疑似存在缺陷。

8. **[#1697] 会话分叉——并行会话共享上下文**（评论 3 | 👍 25）
   https://github.com/github/copilot-cli/issues/1697
   多步骤任务中遇到自然分支时，用户被迫二选一：先完成一个再处理另一个，或切换会话丢失当前上下文。支持并行分支会话并共享上下文，是当前最高赞的功能请求之一。

9. **[#4202] 内置 view 工具对存在的文件误报 "Path does not exist"**（评论 4 | 👍 1）
   https://github.com/github/copilot-cli/issues/4202
   从 v1.0.72 起，`view` 工具对已存在的文本文件报错，v1.0.71 正常。同一探针在 SDK 层可复现成功，疑似 CLI 层回归。

10. **[#4361] 插件技能斜杠命令回归——客户端改写为 RPC 调用失败**（新开，评论 1）
    https://github.com/github/copilot-cli/issues/4361
    `/skill-name` 斜杠命令从自然语言改写回退为 `session.commands.invoke` RPC，该调用以失败告终。插件技能的命令入口可能整体受影响。

## 重要 PR 进展

1. **[#4366] 安全漏洞修复 PR（vault-chatops 自动提交）**
   https://github.com/github/copilot-cli/pull/4366
   自动化安全扫描发现 copilot-cli 在 `ci, production` 环境中的 Vault 应用存在 Fundamentals 级安全问题，需人工审核替换 `<UPDATE_ME>` 占位值后合并。

2. **[#4355] 合并请求（内容为空）**
   https://github.com/github/copilot-cli/pull/4355
   无摘要描述，推测为内部合并操作或占位 PR。

## 功能需求趋势

| 趋势方向 | 代表 Issue | 社区热度 |
|---------|-----------|---------|
| **自定义主题/视觉定制** | #1504 自定义主题、#2532 持久上下文栏、#3898 背景色对比度 | 👍 23 高 |
| **会话管理增强** | #1697 会话分叉（👍25）、#1947 云同步会话（👍6）、#2019 删除会话命令（👍13）、#4334 暂存提示丢失 | 高 |
| **MCP 生态稳定性** | #4370 FastMCP 兼容、#4371 OAuth 3LO、#4349 策略误伤、#4364 TLS 失败、#2692 搜索工具 MCP 报错 | 集中爆发 |
| **模型/BYOK 支持** | #4139 自定义 LLM 端点（👍6）、#4196 BYOK reasoning_content 流式报错 | 中 |
| **企业级能力** | #1285 组织级 Agents、#4005 企业计费实体选择、#4349 托管策略 | 中 |

## 开发者关注点

1. **MCP 集成是当前最大痛点**：24 小时内新增 3 个 MCP 相关 issue（FastMCP 初始化、OAuth 3LO、TLS 校验），加上已有的搜索工具报错，MCP 生态的接入稳定性亟待提升——尤其是企业级场景。

2. **破坏性变更需更谨慎**：v1.0.79-1 中 `allowDevToolCaches` → `allowDevToolAccess` 的静默忽略旧键行为，会让原本显式关闭的用户在不知情下恢复默认开启，存在安全隐患。

3. **Windows/WSL2 体验长期未改善**：Ctrl+H 误识别、原生运行时崩溃（#4026，自 5 月起跨 4 个版本未解决），Windows 平台的稳定性与键位兼容性亟待专门修复。

4. **会话与上下文管理是高频诉求**：会话分叉（👍25）、云同步（👍6）、删除会话命令（👍13）均有明确需求，当前本地存储 + 单一会话链的模式已无法满足复杂工作流。

5. **企业策略与私有 CA 环境适配不足**：合法枚举值被拒、私有 CA 不受信等 fail-closed 行为，暴露了 CLI 在企业合规网络中的适配缺口。

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

### 今日速览

今日社区焦点集中在两大方向：一是对**长期会话稳定性**的深度讨论，有用户报告在约500K token高上下文填充下出现代理可靠性骤降的问题（#2586）；二是对**跨设备远程控制**（#1282）与**持久化记忆系统**（#1283）两大重磅功能需求的持续高热度关注。此外，Windows平台输入法字符重复的Bug（#2584）也引发了用户共鸣，修复此类平台细节对提升国内用户体验至关重要。

---

### 版本发布

过去 24 小时内无新的版本发布。

---

### 社区热点 Issues

#### 1. 高上下文填充下代理可靠性骤降（#2586）— **今日热议**
- **链接**: [Issue #2586](https://github.com/MoonshotAI/kimi-cli/issues/2586)
- **详情**: 用户报告在长会话（多步骤代码变更）中，当上下文填充超过约500K tokens时（运营商测得的阈值，非文档限制），代理会出现可靠性骤降。表现为重复动作循环、无升级机制、指令漂移。
- **重要性**: **高**。这直接关系到核心的Agentic Coding体验。在长任务中失去可靠性会严重破坏用户信任。该问题可能涉及上下文窗口管理、注意力机制或指令遵循的底层优化。

#### 2. 功能请求：远程控制，从任何设备继续本地会话（#1282）— **持续高热**
- **链接**: [Issue #1282](https://github.com/MoonshotAI/kimi-cli/issues/1282)
- **详情**: 请求允许用户从手机、平板或浏览器继续本地 Kimi Code CLI 会话，实现工作流无缝衔接。
- **重要性**: **高**。获 👍 24 个，评论 12 条，是社区呼声最高的功能之一。这代表了开发者对灵活性和移动办公的强烈需求，也暗示了一个庞大的潜在云端/移动端产品形态。

#### 3. 功能请求：记忆系统——跨会话的持久化上下文（#1283）— **持续高热**
- **链接**: [Issue #1283](https://github.com/MoonshotAI/kimi-cli/issues/1283)
- **详情**: 请求实现记忆系统，让 CLI 能跨会话记住项目模式、用户偏好和有用上下文，包括自动记忆（AI管理笔记）和手动记忆（用户定义指令）。
- **重要性**: **高**。评论 17 条，是讨论最活跃的 Issue 之一。这是智能代理从“无状态会话”走向“有状态工作伙伴”的关键一步，对于提升项目级开发效率意义重大。

#### 4. Bug：Windows 上泰语（及其他 IME）字符输入重复（#2584）
- **链接**: [Issue #2584](https://github.com/MoonshotAI/kimi-cli/issues/2584)
- **详情**: v0.31.1 在 Windows 11 上，使用 IME 输入泰文等字符时会出现重复。
- **重要性**: **中**。虽然影响面特定，但这是典型的平台兼容性问题。对于非英语用户（尤其是东南亚及东亚用户），输入法的正确性严重影响使用体验。该问题也暗示了 prompt 输入组件的实现可能存在与操作系统 IME 交互的缺陷。

#### 5. 功能请求（ACP）：广告可用模型并支持会话中切换（#2583）
- **链接**: [Issue #2583](https://github.com/MoonshotAI/kimi-cli/issues/2583)
- **详情**: 当通过 ACP 客户端（如 Happy Coder 移动应用、Zed）驱动 `kimi acp` 时，客户端无法发现可用模型，也无法在会话中切换模型。
- **重要性**: **中**。这是对 Agent Client Protocol (ACP) 生态的重要补充。该功能对集成到第三方 IDE 或移动端的体验至关重要，是开放生态建设的一环。

#### 6. Bug：正常推进会话时异常退出（#2587）— **今日新增**
- **链接**: [Issue #2587](https://github.com/MoonshotAI/kimi-cli/issues/2587)
- **详情**: v0.29.2 在 Windows 上正常推进会话时，CLI 会异常退出。使用 K3 high 模型。
- **重要性**: **中**。崩溃类问题优先级通常较高，直接影响用户使用。建议开发团队优先复现并处理，并关注其是否与 #2586 中的高上下文问题有关联。

---

### 重要 PR 进展

#### 1. 修复(shell)：为长命令适配超时（#2200）
- **链接**: [PR #2200](https://github.com/MoonshotAI/kimi-cli/pull/2200)
- **要点**: 为常见耗时命令（如 `git submodule cleanup`, `git clone/fetch`, 包安装和构建）自动延长 shell 超时时间。普通命令保持 60 秒默认值，若调用方已提供显式超时则保留较大值。
- **意义**: 实战向修复。解决了 CI 或复杂任务中超时中断的痛点，提升了健壮性。

#### 2. 特性(cli)：为子进程设置 AI_AGENT 环境变量（#2585）
- **链接**: [PR #2585](https://github.com/MoonshotAI/kimi-cli/pull/2585)
- **要点**: 向 pip/uv 和独立二进制入口点启动的子进程暴露 `AI_AGENT=kimi` 环境变量。保留包装器或编排器显式设置的非空值。
- **意义**: 生态集成向改进。这是一个通用的“身份标识”，让子进程或钩子脚本能感知当前由谁驱动，对于工具链自动化和多代理协作场景有重要价值。

#### 3. 特性(acp)：支持权限模式切换（#2364）
- **链接**: [PR #2364](https://github.com/MoonshotAI/kimi-cli/pull/2364)
- **要点**: 在协议层面支持 ACP 权限模式切换，并会通告 `default` 等权限模式。该 PR 依赖于 #2363。
- **意义**: 完善了 ACP 协议实现。权限模式切换是安全控制的关键一环，能让客户端根据用户实时授权调整代理的操作权限，是接入更广泛编辑器和移动端的基础能力。

---

### 功能需求趋势

1. **跨设备无缝体验**: 远程控制（#1282）的高热度表明用户希望打破物理设备的限制，期待“在任何地方继续工作”的能力。
2. **持久化记忆系统**: 记忆系统（#1283）是仅次于远程控制的高频需求。社区期望 CLI 能成为真正了解项目上下文（patterns, preferences）的“长期伙伴”，而非一次性会话。
3. **模型交互与选择灵活性**: 会话中切换模型（#2583）反映了用户对模型多样性和成本控制的需求，希望根据任务难度灵活调整。
4. **生态与协议完善**: 权限模式切换（#2364）和 AI_AGENT 标记（#2585）表明社区在围绕 ACP 等标准协议和“常识性”配置（如环境变量）去构建更开放的集成生态，为第三方工具（如移动端 App、Zed 等）的顺利接入铺路。

---

### 开发者关注点

1. **长会话稳定性是核心痛点**: Issue #2586 反映的“高上下文下行为退化”是深度用户面临的最严峻问题。这说明开发者不仅关注单步能力，更关注在复杂、长期任务中的“可靠性”与“一致性”。
2. **平台细节决定体验**: Windows 平台上的输入法字符重复（#2584）和异常退出（#2587）问题，显示了跨平台兼容性的重要性。Windows 用户基数大，输入法体验是本地化友好度的关键一环，需要及时修复。
3. **进程环境感知需求凸显**: 对 `AI_AGENT` 环境变量的需求体现出开发者希望在自动化流水线或自定义工具链中，能精确辨识出任务是由 Kimi 代理发起的，以便进行精细化的逻辑控制。

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode 社区动态日报 — 2026-08-05

## 今日速览

v1.18.13 发布，重点修复 TUI 中 GitHub PR 评审上下文缺失以及桌面端 RTL 布局问题。社区讨论热度集中在 Go 套餐用量 API 需求（#16017）以及多起 "余额不足" 误报问题；同时 PR 侧呈现 V2 协议迁移和会话恢复类修复的密集推进。

## 版本发布

**v1.18.13**
- **TUI 修复**：GitHub PR 评审上下文现包含 PR 编号与 URL。
- **桌面端修复**：修复多个 RTL（从右到左）布局问题，涉及标签页、抽屉、窗口缩放和标题栏交互；修复共享 RTL UI 行为（如方向性图标）。

## 社区热点 Issues

1. **🔥 请求 Go 套餐用量/余额 API 端点**（#16017，👍126，评论 30）— 用户希望将仪表盘中的用量数据（滚动/每周/每月窗口）通过公开 API 暴露，以便在 TUI/CLI 中自助查询。评论非常活跃，已持续 5 个月仍未关闭，是当前社区呼声最高的功能请求。  
   https://github.com/anomalyco/opencode/issues/16017

2. **402 余额不足误报**（#27593，👍13，评论 17）— 用户报告会话用量仅 98% 时，调用 ds4-flash 模型仍被 402 拒绝，切换其他模型正常。已是关闭状态，但同类型问题反复出现，指向用量统计与计费系统之间的不一致。  
   https://github.com/anomalyco/opencode/issues/27593

3. **TUI 无响应卡死**（#30862，评论 12）— 用户升级最新版后 TUI 无输出但后台"看似在运行"（会话标题仍在更新）。重装 CLI/GUI 均无效，UI 与后端状态不同步问题亟待排查。  
   https://github.com/anomalyco/opencode/issues/30862

4. **WSL 下思考过程逐词换行输出**（#20234，评论 10）— 在 WSL 环境下 opencode 思考过程每行仅输出一个单词，严重影响阅读体验。属环境适配类回归问题。  
   https://github.com/anomalyco/opencode/issues/20234

5. **GitHub OAuth 登录失败**（#39207，评论 5）— 通过 GitHub 登录 opencode.ai 时，OAuth 回调中 email 参数为空导致服务端 SQL 更新失败。阻断新用户注册/登录流程。  
   https://github.com/anomalyco/opencode/issues/39207

6. **Zen 模型目录与后端不一致**（#30951，评论 5）— `nemotron-3-ultra-free` 在模型列表中可见但实际调用被拒，说明模型目录同步机制存在缺陷。  
   https://github.com/anomalyco/opencode/issues/30951

7. **"Nothing works" — 新用户上手即失败**（#40579，评论 4）— 新用户在 Windows 11 安装 skills 后一切功能失效，移除 skills 后依然。属于新用户路径中的严重体验问题。  
   https://github.com/anomalyco/opencode/issues/40579

8. **桌面端高级设置开关无效**（#29951，评论 6）— 新布局下 File tree、Command palette、Terminal 等开关开启后无任何效果，设置项形同虚设。  
   https://github.com/anomalyco/opencode/issues/29951

9. **迁移 `20260604172448` 清空全量事件日志**（#30963，评论 4）— 某次迁移无条件执行 `DELETE FROM event`，升级后所有用户事件日志被清空，属高危数据丢失 bug。  
   https://github.com/anomalyco/opencode/issues/30963

10. **订阅 Go 后付费模型仍报余额不足**（#30950，评论 3）— 用户已订阅且有余量，但 GLM 5.1、Kimi v2.6 仍被拒。与 #27593 同源，计费侧需统一排查。  
    https://github.com/anomalyco/opencode/issues/30950

## 重要 PR 进展

1. **`run --format json` 事件增加模型归属信息**（#40545 与 #40581 重叠推进）— 两个 PR 均解决同一问题：JSON 流式输出中无法区分事件来自哪个模型，导致 headless 场景下成本归因失效。  
   https://github.com/anomalyco/opencode/pull/40545 · https://github.com/anomalyco/opencode/pull/40581

2. **中断响应恢复机制**（#40576）— 当 provider 响应意外中断时，保留已有输出内容，追加隐藏的合成用户消息引导模型继续完成，而非丢档重来。  
   https://github.com/anomalyco/opencode/pull/40576

3. **xAI OAuth 改为纯设备码认证**（#40538）— 用 RFC 8628 设备认证替代 loopback 回调，兼容远程环境，并自动迁移已有 browser 凭据。  
   https://github.com/anomalyco/opencode/pull/40538

4. **压缩时保留尾部多模态媒体**（#40566）— 将默认保留的压缩上下文从 8K 提升至 15K tokens，并保留图片/音频/视频/PDF 等媒体文件。  
   https://github.com/anomalyco/opencode/pull/40566

5. **新增 `/handoff` 命令**（#40578）— 允许显式将会话交接给其他 agent，回应 #26757 需求，替代已关闭的同类提案。  
   https://github.com/anomalyco/opencode/pull/40578

6. **App 端 V2 协议迁移（6-PR 堆栈）**（#40374/#40375/#40376/#40378/#40381/#40382）— E2E fixtures、渲染契约、会话投影、API 调用、能力开关、V1 兼容移除以 6 个 PR 分阶段落地，是桌面端最大规模的重构推进。  
   https://github.com/anomalyco/opencode/pull/40374 · https://github.com/anomalyco/opencode/pull/40375 · https://github.com/anomalyco/opencode/pull/40376 · https://github.com/anomalyco/opencode/pull/40378 · https://github.com/anomalyco/opencode/pull/40381 · https://github.com/anomalyco/opencode/pull/40382

7. **模型流中断自动恢复**（#40010）— 后端返回响应头后停止输出 body 时，当前会无限等待；此 PR 增加超时/重试恢复机制。  
   https://github.com/anomalyco/opencode/pull/40010

8. **子代理运行中可中断**（#32425）— 支持对运行中的子代理进行 steer / cancel / abort，解决子代理卡死无法干预的长期痛点。  
   https://github.com/anomalyco/opencode/pull/32425

9. **废弃旧 provider 别名**（#40487）— 移除 Azure Cognitive Services 与 Google Vertex Anthropic 独立注册，将存量配置迁移至新 provider ID，防止 V2 配置重建出已废弃条目。  
   https://github.com/anomalyco/opencode/pull/40487

10. **桌面端内联对话可视化**（#40582）— 模型可通过 `visualization` 片段写入版本化 HTML，在对话流中直接渲染内联图表/可视化。  
    https://github.com/anomalyco/opencode/pull/40582

## 功能需求趋势

- **用量/余额可编程查询**：多个 issue（#16017、#40584、#31084）集中要求 TUI/CLI 内查询 Go 套餐用量，当前仅 Web 控制台可用，属最高频诉求。
- **语音/听写输入**：#17425、#18226 连续提出插件化语音输入能力，受限于当前插件扩展点不足。
- **Agent 预设与可见性**：#29626（presets）、#22233（子代理运行时状态可见）、#32425（子代理可中断）指向 agent 编排体验的整体升级。
- **远程/无头环境适配**：#17322（自动 attach 远程）、#31014（MCP OAuth 远程回调）、#31006（无 TTY 静默退出）显示容器/CI 场景支持正在成为硬需求。
- **模型目录同步**：#30951（Zen 列表与后端不一致）、#40577（DeepSeek 退役模型仍展示）要求加强模型目录与实态的一致性管理。

## 开发者关注点

- **计费与用量一致性**："已订阅仍报 402"（#27593、#30950）与"新用户 0% 用量无法使用"（#40579）并存，说明免费/付费配额判定逻辑仍有明显缺陷，直接影响用户信任。
- **UI 状态不同步**：#30862（TUI 假死）、#40572（Electron 渲染器冻结）、#29951（桌面开关无效）共同指向客户端状态管理与渲染性能问题集中爆发。
- **数据安全**：#30963 迁移误删全量事件日志是最严重的一类事故，开发者希望 migrations 引入更严格的安全校验机制。
- **WSL/远程环境兼容性**：#20234（逐词输出）、#29799（跨系统迁移丢历史）、#31006（无 TTY 退出）凸显非纯本地场景下的大量边界问题。

---
*日报自动生成，数据来自 github.com/anomalyco/opencode，覆盖过去 24 小时。*

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code 社区动态日报

**日期：2026-08-05** | 数据来源：github.com/QwenLM/qwen-code

---

## 今日速览

昨日发布 v0.21.6-preview.0，主要包含浏览器扩展 alpha 就绪状态诊断及 Headless Goal 工作流文档。社区最热点议题集中在「确定性工具执行边界」（#8102）和 tmux 闪屏 bug（#8519）；此外，围绕 daemon 内存限制、ACP/IDE 集成体验（任务列表、context 用量显示、reasoning effort 暴露）的需求持续升温，PR 侧则有一批针对钩子系统安全边界收紧和 review 管线性能优化的密集提交。

---

## 版本发布

### v0.21.6-preview.0
- **feat(browser-ext):** 新增 alpha 就绪状态诊断功能（PR #6739）
- **docs:** 补充 headless Goal 工作流文档

### v0.21.5-nightly.20260805.32e274157
- 包含与 preview.0 相同的变更内容（浏览器扩展诊断 + Headless 文档）

---

## 社区热点 Issues

### #8102 — 确定性工具执行边界：可信 Agent 运行时提案
**[OPEN] [P3/feature-request/core-security]**
作者提议将 LLM 置于信任边界之外，使运行时能够对模型产生的动作进行确定性约束、授权、观察与评估——这是朝着可信 Agent 运行时方向的重要架构讨论，目前已有 17 条评论。
→ [GitHub](https://github.com/QwenLM/qwen-code/issues/8102)

### #8519 — tmux 中闪屏严重
**[CLOSED] [P2/bug/ui-Linux]**
用户在 tmux 中使用 qwen code 时几乎每秒闪屏一到两次，引发 11 条讨论，是当前 UI 领域反馈最集中的问题。
→ [GitHub](https://github.com/QwenLM/qwen-code/issues/8519)

### #8051 — 限制多工作区 daemon 资源使用
**[OPEN] [P2/feature-request/core-performance]**
跟踪并约束生产环境 `qwen serve` 多工作区 daemon 的资源占用。目前仅有基于数量的限制，无法约束请求体、WebSocket 组装等字节级内存占用，属于 daemon 稳定性关键议题。
→ [GitHub](https://github.com/QwenLM/qwen-code/issues/8051)

### #8136 — Provider 警告清理器泄漏含 `@` 的密码
**[OPEN] [P2/bug/security-CLI]**
`sanitizeProviderWarning` 存在两个 bug：截断包含端口的消息、并在 URL 中密码含 `@` 时发生泄漏。直接影响 `/status` 载荷的安全性。
→ [GitHub](https://github.com/QwenLM/qwen-code/issues/8136)

### #8356 — APIUserAbortError 后后续轮次不写入会话记录
**[OPEN] [P2/bug/core-session]**
用户中断（abort）后，后续对话轮次不再写入本地会话记录。影响 ACP/Web bridge 会话的完整性与可恢复性。
→ [GitHub](https://github.com/QwenLM/qwen-code/issues/8356)

### #8550 — `qwen mcp list` 在无响应的 SSE 服务器上无限挂起
**[OPEN] [P2/bug/cli-MCP]**
当 MCP 服务器使用 SSE 传输且不发送 `endpoint` 事件时，`qwen mcp list` 永久阻塞而非超时。已标记为 ready-for-agent。
→ [GitHub](https://github.com/QwenLM/qwen-code/issues/8550)

### #8463/#8452 — 尺寸触发的微压缩反复击穿 prompt 缓存
**[CLOSED] [P2/bug/performance-caching]**
PR #5111 引入的 50 万字符阈值触发机制，在长时间会话中导致每轮都重写历史记录，使 provider 端 prompt 缓存完全失效。两个相关 issue 均引发对缓存策略的重新审视。
→ [#8463](https://github.com/QwenLM/qwen-code/issues/8463) | [#8452](https://github.com/QwenLM/qwen-code/issues/8452)

### #8533 — Content[]/Part[] 无法安全编码按 provider 区分的推理回放契约
**[OPEN] [P2/core]**
讨论核心数据结构在表示多 provider 推理回放（reasoning replay）时的根本性局限，属架构层面的深度议题。
→ [GitHub](https://github.com/QwenLM/qwen-code/issues/8533)

### #8544 — ACP 任务列表在 JetBrains 中不渲染
**[OPEN] [P2/bug/IDE 集成]**
通过 ACP 使用 Qwen Code 时，JetBrains AI Assistant 中不显示任务列表，而 Claude Code / Codex 均正常。IDE 集成体验的关键差距。
→ [GitHub](https://github.com/QwenLM/qwen-code/issues/8544)

### #8513 — ACP 发送 usage_update 以支持 JetBrains context 用量显示
**[OPEN] [P2/feature-request/IDE 集成]**
请求在 ACP 会话中发出 `usage_update` 事件，使 JetBrains 客户端能展示 context 用量指示器（其他 agent 已支持）。
→ [GitHub](https://github.com/QwenLM/qwen-code/issues/8513)

---

## 重要 PR 进展

### #8498 — perf(review): 反向审计中移除 dry chunks 并流水线化验证
**[OPEN]**
针对大型 PR review 耗时的性能优化：测量显示 +1699 行 CI review 跑满 5 轮上限，该 PR 大幅削减 review 循环开销。
→ [GitHub](https://github.com/QwenLM/qwen-code/pull/8498)

### #8368 — feat(auth): 新增 Kimi 与小米 MiMo 供应商
**[OPEN]**
为 `/auth` 第三方供应商列表新增 Kimi（Coding Plan/API Key 多入口）与小米 MiMo（按量付费+区域选项）。
→ [GitHub](https://github.com/QwenLM/qwen-code/pull/8368)

### #8396 — fix(hooks): 封堵钩子执行中四个信任边界漏洞
**[OPEN]**
修复与代码执行和网络出口相关的四个安全问题：HTTP hooks 不再跟随重定向（防止 SSRF 绕过）、其余三项涉及 URL 白名单与 DNS 校验。
→ [GitHub](https://github.com/QwenLM/qwen-code/pull/8396)

### #8274 — feat: 从任意对话节点分叉
**[OPEN]**
允许从历史任意 Assistant 回复处创建分支，替代此前只能基于最新活跃会话分叉的限制。
→ [GitHub](https://github.com/QwenLM/qwen-code/pull/8274)

### #8443 — fix(cli): 流式输出期间支持点击展开/折叠思考块
**[OPEN]**
此前思考块只能在模型完成思考后通过点击切换，此 PR 移除了 pending 状态下点击处理器的禁用逻辑。
→ [GitHub](https://github.com/QwenLM/qwen-code/pull/8443)

### #8548 — perf(autofix): review CLI bundle 每次扫描仅构建一次
**[OPEN]**
此前每个 PR 的 review leg 都重复执行 `npm ci` + `build` + `bundle`，现改为独立 build 任务构建一次后分发。
→ [GitHub](https://github.com/QwenLM/qwen-code/pull/8548)

### #8320 — feat(workflows): 动态工作流支持协作式暂停与恢复
**[OPEN]**
为 Dynamic Workflows 添加全运行周期协作式暂停/恢复机制：暂停时停止新任务分发，等待在途任务收敛。
→ [GitHub](https://github.com/QwenLM/qwen-code/pull/8320)

### #8482 — fix(core): 从未送达的 MCP 调用应视为首次投递而非重放
**[OPEN]**
修复自 replay-safety gate（#8387）合并后一直失败的红测：断线重连场景下 MCP 调用的投递语义。
→ [GitHub](https://github.com/QwenLM/qwen-code/pull/8482)

### #8490 — feat(review): 测试 diff 的反向依赖闭包，失败时回退完整测试套件
**[OPEN]**
将 Agent 7 build-test 的关键路径从全量测试缩减至受影响 workspace 的测试闭包，大幅压缩 review 壁钟时间。
→ [GitHub](https://github.com/QwenLM/qwen-code/pull/8490)

### #8512 — feat(omni): S2 输入扩展 — 图片/音频/URL 源与 token 维度传输守卫
**[OPEN]**
omni 实验 S2 阶段：输入面从纯视频扩展至图片、音频、URL 媒体源及 tool-result 媒体，含 token 预估与传输守卫。
→ [GitHub](https://github.com/QwenLM/qwen-code/pull/8512)

---

## 功能需求趋势

1. **IDE 集成（ACP 协议）持续爆发**
   多个 issue 集中在 JetBrains ACP 体验补齐：任务列表渲染（#8544）、usage_update 事件（#8513）、reasoning effort 五档暴露（#8514）、设置入口支持（#8558）。

2. **daemon 稳定性与资源治理**
   #8051（内存上限）、#8182（ACP 子进程内存分配未按子进程数均分）两个 issue 构成对 serve 模式资源管理的第一轮系统性质疑。

3. **信任边界与安全纵深**
   从 #8102 的「确定性工具执行边界」提案、#8396 的钩子漏洞修复，到 #8136 的凭据泄漏——安全相关讨论密度明显提升。

4. **Prompt 缓存效率**
   #8463/#8452 连续两个 issue 指向同一根因：微压缩逻辑在超过阈值后每轮重写历史，使 provider 缓存完全失效。这直接推高长会话成本。

5. **输入模态扩展（omni 方向）**
   #8512 将 omni 实验扩展至多模态输入（图片/音频/URL），配合 #8529 的模型模态元数据解析，多模态支持正在从实验走向基础设施。

6. **区域化与多语言**
   新增 Kimi / 小米 MiMo 供应商预设（#8368）、韩语文档请求（#8551）——非英语市场覆盖正在加速。

---

## 开发者关注点

1. **终端体验问题集中爆发**
   tmux 闪屏（#8519）、终端缩窄时滚动回退区重复输出（#8557）——终端兼容性与重绘逻辑成为 CLI 体验的最大短板。

2. **长会话稳定性**
   `--resume` 可重建「未签名悬空 thought + tool_use」风险（#8535）、abort 后会话记录中断（#8356）——会话持久化链路仍需加固。

3. **超时错误吞掉原始错误码**
   #8527：包装后的超时错误丢失原始错误码，导致重试逻辑无法触发，直接降低弱网/高延迟场景的可用性。

4. **编辑器集成敏感度高**
   多个 issue 均指向「Claude Code / Codex 可以但 Qwen 不行」的对比——JetBrains 用户对 ACP 生态的基础体验（任务列表、用量显示）有明确预期。

5. **CI 日志噪音与误导**
   #8532：mock 的「磁盘已满」错误在 CI 日志中与真实 ENOSPC 难以区分，增加诊断成本。

</details>

---
*本日报由 [agents-radar](https://github.com/huang-yi-dae/agents-radar) 自动生成。*