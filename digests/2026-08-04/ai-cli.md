# AI CLI 工具社区动态日报 2026-08-04

> 生成时间: 2026-08-04 14:02 UTC | 覆盖工具: 7 个

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

> LLM generation failed: StepFun request failed: Connection error.


---

## 各工具详细报告

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills 社区热点报告
**数据截止：2026-08-04**

---

## 1. 热门 Skills 排行

| 排名 | PR | Skill 名称 | 功能说明 | 社区讨论热点 | 状态 |
|:---:|:---|:---|:---|:---|:---:|
| 1 | [PR #1298](https://github.com/anthropics/skills/pull/1298) | skill-creator 修复 | 解决 `run_eval.py` 报告 0% recall 的核心缺陷，修复 Windows 流读取、触发检测及并行 Workers | 关联 Issue #556（12 评论），描述优化循环可靠性 | OPEN |
| 2 | [PR #514](https://github.com/anthropics/skills/pull/514) | document-typography | AI 生成文档的排版质量控制，修复孤行、段首孤句、编号错位 | 文档生成质量刚需 | OPEN |
| 3 | [PR #486](https://github.com/anthropics/skills/pull/486) | ODT | OpenDocument 格式创建、模板填充及 ODT→HTML 解析 | 开源文档格式生态补全 | OPEN |
| 4 | [PR #1367](https://github.com/anthropics/skills/pull/1367) | self-audit | 交付前机械验证 + 四维推理质量门禁 | AI 输出质量保障 | OPEN |
| 5 | [PR #1479](https://github.com/anthropics/skills/pull/1479) | plan-file-hygiene | 规划文件生命周期管理，解决规划产物累积问题 | 长会话上下文卫生 | OPEN |
| 6 | [PR #1302](https://github.com/anthropics/skills/pull/1302) | color-expert | 色彩知识库（ISCC-NBS、Munsell、OKLCH 等），提供配色与色彩空间决策 | 设计工作流支持 | OPEN |
| 7 | [PR #723](https://github.com/anthropics/skills/pull/723) | testing-patterns | 全栈测试指南（Testing Trophy、AAA、React Testing Library） | 测试覆盖与最佳实践 | OPEN |
| 8 | [PR #525](https://github.com/anthropics/skills/pull/525) | pyxel | 复古像素游戏开发工作流（write→run→inspect→iterate） | 游戏开发与创意编程 | OPEN |

---

## 2. 社区需求趋势

**技能基础设施可靠性**  
- `run_eval.py` 的 Windows 兼容性、触发检测准确率、YAML 解析容错是当前最高频的修复诉求（Issue #556、#1061、#1169）。
- 社区要求技能创建工具链具备跨平台稳定性与可观测性。

**文档处理全格式覆盖**  
- 继 PDF、DOCX 之后，ODT 格式支持与排版质量控制（typography）成为新热点。
- 文档类 Skills 正向“生成+排版+转换”全链路扩展。

**组织级协作与安全**  
- 技能在组织内共享（Issue #228，16 评论）与命名空间信任边界（Issue #492，43 评论）是安全与效率的双重诉求。
- 社区需要官方化的组织分发机制与权限管控。

**开发工作流深度集成**  
- 测试生成（testing-patterns）、色彩管理（color-expert）、游戏开发（pyxel）表明社区期望 Skills 覆盖垂直开发场景。
- 元 Skills（skill-quality-analyzer、self-audit）用于评估和改进其他 Skills 本身。

**长期上下文管理**  
- 提出 compact-memory（Issue #1329）与 plan-file-hygiene（PR #1479），关注 Agent 记忆与规划文件的上下文窗口优化。

---

## 3. 高潜力待合并 Skills

以下 PR 因关联高热度 Issue 或近期活跃更新，具备近期落地可能：

- **[PR #1298](https://github.com/anthropics/skills/pull/1298)**：skill-creator recall=0% 修复。关联 Issue #556（12 评论），阻塞描述优化循环，属于 P0 级工具缺陷。
- **[PR #1099](https://github.com/anthropics/skills/pull/1099)**：Windows 下 `run_eval.py` 崩溃修复。与 #1298 共同构成 skill-creator 的 Windows 兼容性补丁集。
- **[PR #1323](https://github.com/anthropics/skills/pull/1323)**：trigger detection 修正。解决 skill-creator 误判触发问题，直接提升 recall 指标。
- **[PR #1367](https://github.com/anthropics/skills/pull/1367)**：self-audit v1.3.0。提供通用输出质量门禁，与现有 Skills 形成互补。
- **[PR #1479](https://github.com/anthropics/skills/pull/1479)**：plan-file-hygiene。响应 Issue #1417，解决规划文件生命周期管理痛点。

---

## 4. Skills 生态洞察

当前社区在 Skills 层面最集中的诉求是：**改善技能创建与评估工具链的可靠性（尤其是 run_eval/trigger detection 的跨平台稳定性），同时向文档处理全格式覆盖与组织级安全共享扩展生态边界。**

---

⚠️ 摘要生成失败。

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

⚠️ 摘要生成失败。

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI 社区动态日报 2026-08-04

## 今日速览
2026-08-04 Gemini CLI 社区无新版本发布，当日核心动态围绕 Agent 稳定性修复、安全认证加固、多模型适配展开：共 50 条 Issue 更新中 P1/P2 级问题占比较高，32 条 PR 更新中多个核心缺陷修复与新功能支持已提交待合入，社区反馈的子代理异常、认证错误、交互卡顿等问题均有对应跟进。

## 版本发布
过去 24 小时无新版本发布。

## 社区热点 Issues（Top 10）
1. **#22323 [P1] 子代理在达到最大轮次后错误上报为任务成功，隐藏中断**  
   核心问题：`codebase_investigator` 子代理达到 `MAX_TURNS` 限制后仍返回 `status: success` 和 `Termination Reason: GOAL`，掩盖实际执行中断。直接影响子代理执行结果的可信度，会导致后续任务基于错误状态流转。共 12 条评论，2 个👍，已有维护者标注需重测。  
   链接: google-gemini/gemini-cli Issue #22323
2. **#21409 [P1] 通用代理永久 hang 住**  
   核心问题：调用通用代理时任务会无限卡住，简单操作（如创建文件夹）也会hang住，最长可达1小时。是社区反馈最广泛的高频问题。共 8 条评论，8 个👍，用户反馈极其强烈。  
   链接: google-gemini/gemini-cli Issue #21409
3. **#24353 [P1] 组件级评估体系 EPIC**  
   核心问题：跟进行为评估测试的迭代，目前已生成 76 项行为评估测试，覆盖 6 款受支持的 Gemini 模型，是后续 Agent 能力迭代的核心基建。共 7 条评论。  
   链接: google-gemini/gemini-cli Issue #24353
4. **#22745 [P2] 评估 AST 感知文件读写的价值**  
   核心问题：调研 AST 感知工具对代码读取、搜索、代码库映射的效率提升作用，可减少 token 消耗、降低任务轮次，是代码分析类任务优化的核心方向。共 7 条评论，1 个👍。  
   链接: google-gemini/gemini-cli Issue #22745
5. **#21968 [P2] 模型不主动调用自定义 skills 和子代理**  
   核心问题：Gemini 不会自主识别并使用用户配置的自定义 skills、子代理，必须用户显式指令才会触发，严重限制自动化能力。共 6 条评论。  
   链接: google-gemini/gemini-cli Issue #21968
6. **#25166 [P2] Shell 命令执行完成后卡在“等待输入”状态**  
   核心问题：简单 Shell 命令执行完成后，CLI 仍显示命令处于激活状态、等待用户输入，是高频交互问题。共 4 条评论，3 个👍。  
   链接: google-gemini/gemini-cli Issue #25166
7. **#26522 [P2] 自动记忆无限重试低信号会话**  
   核心问题：自动记忆系统不会标记低信号会话为已处理，导致其被反复提取，浪费计算资源。共 5 条评论。  
   链接: google-gemini/gemini-cli Issue #26522
8. **#26525 [P2] 自动记忆缺乏确定性脱敏、日志过量**  
   核心问题：自动记忆提取会话内容时未提前脱敏，且会记录现有 skills 日志，存在数据泄露风险。共 4 条评论。  
   链接: google-gemini/gemini-cli Issue #26525
9. **#21983 [P1] 浏览器子代理在 Wayland 环境下失败**  
   核心问题：Linux Wayland 桌面环境下浏览器子代理无法正常运行，是 Linux 桌面用户的常见痛点。共 4 条评论，1 个👍。  
   链接: google-gemini/gemini-cli Issue #21983
10. **#22093 [P2] v0.33.0 升级后子代理绕过权限配置运行**  
    核心问题：升级到 v0.33.0 后，即使配置关闭子代理，通用代理等仍会自动运行，存在权限安全问题。共 3 条评论。  
    链接: google-gemini/gemini-cli Issue #22093

## 重要 PR 进展（Top 10）
1. **#28681 [P1] 新增 SGLang 及 OpenAI 兼容端点支持**  
   内容：扩展模型后端支持范围，允许用户对接本地或第三方 OpenAI 兼容服务、SGLang 部署的模型，大幅提升模型适配灵活性。  
   链接: google-gemini/gemini-cli PR #28681
2. **#28672 [P1] 修复 `/compress` 会话重载失败、配额错误导致工具响应丢失问题**  
   内容：解决两个核心缺陷：一是执行 `/compress` 或自动压缩时失败、无法重载会话；二是触发配额限制时工具响应丢失。  
   链接: google-gemini/gemini-cli PR #28672
3. **#28677 [P1] 给 `IdeClient` 实例遍历增加超时机制**  
   内容：为 `getIdeProcessInfo()` 增加 3 秒超时，避免 TUI 启动时卡在“Initializing...”状态，提升启动体验。  
   链接: google-gemini/gemini-cli PR #28677
4. **#28671 [P1] 修复上下文损坏和配额错误回退问题**  
   内容：解决工具执行中断、配额回退时的上下文损坏、模型前缀连续输出错误，提升会话稳定性。  
   链接: google-gemini/gemini-cli PR #28671
5. **#28673 [P1] 新增 Gemini 3.6 Flash、3.5 Flash-Lite 模型配置**  
   内容：完成两款新模型的配置、能力标记（thinking、多模态工具调用）、别名和代码执行配置，支持新模型快速接入。  
   链接: google-gemini/gemini-cli PR #28673
6. **#28678 [P2] 修复 OAuth 回调超时导致的资源泄漏**  
   内容：统一 OAuth 回调服务器的收尾和资源清理逻辑，避免残留超时回调和内存泄漏。  
   链接: google-gemini/gemini-cli PR #28678
7. **#28679 [P2] 改进 Vertex AI 401 错误提示**  
   内容：当用户使用标准 Gemini API Key 配置 Vertex AI 时，给出明确的认证错误指引，降低调试成本。  
   链接: google-gemini/gemini-cli PR #28679
8. **#28680 [P2] 拒绝 A2A 代理的 OpenID Connect

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

[LLM fallback] stepfun returned an empty response.

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

⚠️ 摘要生成失败。

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

[LLM fallback] stepfun returned an empty response.

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code 社区动态日报（2026-08-04）

---
### 今日速览
今日 Qwen Code 发布 v0.21.5 稳定版，核心新增 macOS 平台 Electron 桌面应用迁移至 Tauri 壳的 opt-in 一次性更新桥接，降低老用户升级成本。社区今日围绕可信 Agent 运行时安全、桌面端体验优化、多工作区性能治理等方向展开大量讨论，共 33 条 Issue 更新、50 条 PR 更新，安全与稳定性相关议题占比最高。

---
### 版本发布
1. **v

</details>

---
*本日报由 [agents-radar](https://github.com/huang-yi-dae/agents-radar) 自动生成。*