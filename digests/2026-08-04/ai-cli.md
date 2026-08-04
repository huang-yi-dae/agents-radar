# AI CLI 工具社区动态日报 2026-08-04

> 生成时间: 2026-08-04 14:12 UTC | 覆盖工具: 7 个

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

# 2026-08-04 主流AI CLI工具社区动态横向对比分析报告

## 1. 生态全景
当前AI CLI工具整体处于快速迭代与生态竞争阶段，各厂商围绕IDE深度集成、Agent能力完善、企业级安全合规三大方向推进产品演进；社区反馈显示，跨平台兼容性、基础交互稳定性、token成本控制是当前普遍存在的短板，生态开放能力（如ACP协议支持、团队协作功能）已成为差异化竞争的核心要素。

## 2. 各工具活跃度对比
| 工具 | 当日Issue更新数 | 当日PR更新数 | Release情况 |
|------|----------------|-------------|-------------|
| Claude Code | 未披露（Top10已列） | 未披露 | v2.1.221正式版 |
| OpenAI Codex | 37条 | 未披露（Top10已列） | 4个Rust CLI alpha预发布版本（v0.147.0系列） |
| Gemini CLI | 30条 | 31条 | 无新版本 |
| Kimi Code CLI | 5条 | 3条 | 无新版本 |
| OpenCode | 50条 | 20条 | v1.18.12、v1.18.13两个维护版本 |
| Qwen Code | 33条 | 50条 | v0.21.5正式版+每日nightly测试版 |

## 3. 共同关注的功能方向
1. **跨场景协作与上下文连续性**
   涉及工具：Claude Code、OpenAI Codex、Kimi Code CLI、Qwen Code
   具体诉求：Claude Code需支持非main分支diff对比、团队技能Git仓库同步；OpenAI Codex需会话分叉共享上下文、跨设备云同步；Kimi Code CLI需跨会话持久化记忆；Qwen Code需多工作区会话管理能力。
2. **生态开放与跨工具集成**
   涉及工具：Kimi Code CLI、Qwen Code、OpenAI Codex、Claude Code
   具体诉求：Kimi Code CLI需扩展ACP协议能力（模型发现、mid-session切换、权限控制）；Qwen Code需完善JetBrains IDE的ACP适配（上下文用量展示、外部工具守卫）；OpenAI Codex需支持自定义LLM端点；Claude Code需开放技能系统供团队复用。
3. **基础体验与跨平台兼容性**
   涉及工具：全部6款工具
   具体诉求：覆盖Windows/W

---

## 各工具详细报告

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills 社区热点报告（截止 2026-08-04）

## 热门 Skills 排行

1. **document-typography** (PR #514)  
   解决 AI 生成文档的孤行、寡行、编号错位等排版质量问题，覆盖所有 AI 写作场景的隐性刚需。  
   状态：OPEN  
   链接：https://github.com/anthropics/skills/pull/514

2. **testing-patterns** (PR #723)  
   全栈测试技能包，涵盖测试哲学、单元测试 AAA 模式、React 组件测试等，填补 AI 辅助测试指导空白。  
   状态：OPEN  
   链接：https://github.com/anthropics/skills/pull/723

3. **self-audit** (PR #1367)  
   AI 输出交付前的机械验证 + 四维推理质量审计，作为元技能解决生成内容可信度问题。  
   状态：OPEN  
   链接：https://github.com/anthropics/skills/pull/1367

4. **color-expert** (PR #1302)  
   系统化颜色知识技能，覆盖 ISCC-NBS、Munsell、OKLCH 等命名与色彩空间，提供设计决策参考。  
   状态：OPEN（持续更新至 2026-07-21）  
   链接：https://github.com/anthropics/skills/pull/1302

5. **ODT** (PR #486)  
   支持创建、填写、解析 OpenDocument 格式文件并转 HTML，填补开源文档生态支持空白。  
   状态：OPEN  
   链接：https://github.com/anthropics/skills/pull/486

6. **skill-quality-analyzer & skill-security-analyzer** (PR #83)  
   从结构文档、功能完整性、安全性等五维度评估 Skills 质量，体现社区对 Skill 治理的需求。  
   状态：OPEN  
   链接：https://github.com/anthropics/skills/pull/83

7. **plan-file-hygiene** (PR #1479)  
   管理规划文件生命周期，防止长期运行 agent 的规划 artifact 无限累积。  
   状态：OPEN  
   链接：https://github.com/anthropics/skills/pull/1479

## 社区需求趋势

- **安全与信任边界**：Issue #492（43 评论）揭示对 `anthropic/` 命名空间下社区 Skills impersonation 的强烈担忧，要求建立官方与社区 Skills 的区分机制。
- **组织级协作**：Issue #228（16 评论）呼吁支持团队内 Skills 直接共享，替代手动下载/上传的碎片化流程。
- **跨平台兼容性**：多个 Issue 与 PR（#1061、#1050、#1099、#1298）集中暴露 skill-creator 在 Windows 下的子进程调用、编码、管道读取问题。
- **上下文效率**：Issue #1487 指出 `claude-api` skill 单次调用注入约 156k tokens，社区关注 Skills 的上下文开销控制与按需注入。
- **元技能与质量门控**：Issue #1385 与 PR #1367 呼应，社区期待 Skills 具备自我审计与四维推理质量验证能力。
- **文档互操作与去重**：Issue #189 反映用户希望 `document-skills` 与 `example-skills` 插件内容边界清晰，避免重复注入。

## 高潜力待合并 Skills

以下 PR 功能明确、讨论活跃，具备近期落地条件：

1. **self-audit** (PR #1367) — 四维推理质量审计，契合 AI 输出可信度热点
2. **document-typography** (PR #514) — 排版质量控制，解决普遍质量缺陷
3. **testing-patterns** (PR #723) — 全栈测试技能，开发者刚需
4. **color-expert** (PR #1302) — 系统化颜色知识，设计领域刚需
5. **

---

# Claude Code 社区动态日报（2026-08-04）

---

## 今日速览
今日（2026-08-04）Claude Code发布v2.1.221版本，新增VSCode Focus视图与Linux沙箱凭证掩码能力；社区最热议的功能请求为支持非main分支的diff对比，同时当日反馈了多条会话数据丢失、模型质量回退、新版本终端消息投递故障等严重问题。

---

## 版本发布
- **v2.1.221** 正式发布，更新内容：
  1. VSCode集成新增Focus视图，支持通过`Ctrl+Alt+F`或「Claude Code: Toggle Focus view」命令切换，可将工具活动折叠为单轮可展开摘要，附带实时运行工具指示器，减少界面干扰；
  2. Linux平台沙箱凭证文件新增`mode: "mask"`支持。
  [Release v2.1.221](https://github.com/anthropics/claude-code/releases/tag/v2.1.221)

---

## 社区热点 Issues（Top 10）
1. **[#23626] 支持非main分支的diff对比**（36评论 / 111👍）
   重要性：当前Claude Code仅支持对比main分支代码变更，无法满足多分支并行开发的场景需求，是社区当前热度最高的功能请求。
   [Issue链接](https://github.com/anthropics/claude-code/issues/23626)
2. **[#28729] 将源码控制仓库作为组织技能来源**（35评论 / 83👍）
   重要性：当前团队技能仅支持本地管理，无法通过Git仓库同步，阻碍了团队协作场景下的技能复用，是第二热门的协作类需求。
   [Issue链接](https://github.com/anthropics/claude-code/issues/28729)
3. **[#59248] 静默清理无提示删除会话转录，无恢复入口**（29评论）
   重要性：属于数据丢失级别的严重bug，用户工作区内的历史会话转录被自动清理删除，无法恢复、无法续接，影响核心使用体验。
   [Issue链接](https://github.com/anthropics/claude-code/issues/59248)
4. **[#83510] Claude Generation 5系列模型质量可量级回退**（5评论）
   重要性：有可复现的测量数据支撑，显示新模型 nonsense 检测能力变差、输出冗余度提升约2倍、存在静默rerouting问题，影响模型使用的可靠性。
   [Issue链接](https://github.com/anthropics/claude-code/issues/83510)
5. **[#83798] v2.1.221终端模式消息队列卡死，首轮后消息全部静默丢失**（2评论）
   重要性：新版本引入的严重bug，开启终端模式后仅首轮对话正常，后续所有用户消息无法投递，直接影响CLI核心功能使用。
   [Issue链接](https://github.com/anthropics/claude-code/issues/83798)
6. **[#83795] 模型固定功能设计缺陷，存在4种绕过向量，Sonnet 4.6被静默移除**（2评论）
   重要性：涉及模型选择的安全性和可控性，用户无法固定指定模型版本，且常用模型被静默从菜单下架，影响生产场景的模型稳定性保障。
   [Issue链接](https://github.com/anthropics/claude-code/issues/83795)
7. **[#80471] 按项目分组会话列表时缺失日期筛选功能（回归）**（2评论 / 9👍）
   重要性：桌面端常用功能回归，此前按项目分组时支持1/3/7天日期筛选，更新后该功能消失，影响多项目会话的查找效率。
   [Issue链接](https://github.com/anthropics/claude-code/issues/80471)
8. **[#79386] Max计划用户在Fable 5下被错误提示额度不足**（4评论）
   重要性：付费用户订阅权益未正确识别，明明拥有Max计划额度仍被提示需要购买 credits，影响付费用户体验。
   [Issue链接](https://github.com/anthropics/claude-code/issues/79386)
9. **[#67085] 桌面端活动热力图错误标记会话开始日期，打断连续打卡**（10评论）
   重要性：多天跨度的会话仅标记会话开始日期，导致连续多天使用的打卡记录被错误打断，使用统计准确性受损。
   [Issue链接](https://github.com/anthropics/claude-code/issues/67085)
10. **[#76694] Cowork功能合并后新项目丢失文件夹选择入口**（8评论）
    重要性：Chat与Cowork

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex 社区动态日报 2026-08-04
## 今日速览
今日OpenAI Codex连续发布4个Rust CLI alpha预发布版本，迭代修复多项底层问题；社区热点集中在Windows平台兼容性、token消耗异常、桌面端功能缺陷等痛点，多agent能力、技能系统相关的核心PR完成合并，功能迭代加速。
## 版本发布
今日共有4个Rust CLI预发布版本更新，均为0.147.0系列的alpha迭代：
- rust-v0.147.0-alpha.7
- rust-v0.147.0-alpha.6.1
- rust-v0.147.0-alpha.6
- rust-v0.147.0-alpha.1.2
相关版本包含底层bug修复与功能预演，暂无公开的完整更新日志。
## 社区热点 Issues（Top 10）
1. **#14593 [ Burning tokens very fast ]** (评论628 | 👍283)
   [openai/codex Issue #14593]
   当前热度最高的反馈，覆盖多个版本的Codex客户端均出现token消耗异常过快的问题，Business订阅用户受影响最严重，直接关联使用成本，社区已有大量用户跟进讨论。
2. **#35058 [ Codex Diff crashes in VS Code on macOS ]** (评论50 | 👍122)
   [openai/codex Issue #35058]
   macOS平台VS Code扩展的核心功能缺陷，打开Codex Diff标签页即崩溃，影响所有macOS用户的代码审查流程，已获得大量苹果生态用户的反馈。
3. **#17827 [ Customizable status line ]** (评论38 | 👍143)
   [openai/codex Issue #17827]
   高票功能需求，希望TUI界面支持自定义状态栏，可展示token用量、模型名称、上下文窗口、Git分支等实时信息，对标Claude Code的同类功能，社区呼声较高。
4. **#35119 [ WSL repositories marked as non-Git ]** (评论15 | 👍14)
   [openai/codex Issue #35119]
   Windows 11 + WSL2环境下，Codex Desktop无法识别WSL ext4文件系统中的有效Git仓库，提示"Git is unavailable"，影响WSL开发者的核心使用流程。
5. **#19262 [ CLI misreports gh auth status ]** (评论18 | 👍18)
   [openai/codex Issue #19262]
   Codex CLI 0.124.0版本在会话内错误判定`gh auth status`为无效认证，触发不必要的认证提示，干扰使用GitHub CLI的工作流。
6. **#31987 [ Auto-recharge of credits forced on ]** (评论17 | 👍4)
   [openai/codex Issue #31987]
   付费用户反馈每次购买积分后，自动充值开关都会被强制开启且无法永久关闭，涉及用户设置权限与消费控制问题。
7. **#28080 [ Desktop thread tools lose handlers ]** (评论14 | 👍2)
   [openai/codex Issue #28080]
   Windows桌面版Codex在活跃会话中，线程工具会间歇性丢失处理器，报错`No handler registered`，影响会话稳定性。
8. **#25826 [ Window spills to adjacent monitors ]** (评论10 | 👍12)
   [openai/codex Issue #25826]
   多显示器环境下，Windows桌面版Codex最大化窗口会溢出到相邻显示器，影响多屏用户的使用体验。
9. **#34004 [ Pasting code converts to markdown ]** (评论6 | 👍5)
   [openai/codex Issue #34004]
   代码审查场景下的核心痛点，粘贴代码片段（尤其是diff）会被自动转换为Markdown格式，导致文本错乱，影响工作效率。
10. **#34692 [ Opt-in auto-update for CLI ]** (评论2 | 👍1)
    [openai/codex Issue #34692]
    社区希望为Codex CLI添加可选自动更新功能，无需用户手动执行`codex update`命令即可安装新版本，提升CLI易用性。
## 重要 PR 进展（Top 10）
1

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI 社区动态日报（2026-08-04）

## 今日速览
2026-08-04 过去24小时无新版本发布，社区共更新30条Issue、31条PR，核心动态集中在Agent子系统缺陷修复、内存系统安全优化、新模型支持及本地部署能力扩展上。多个P1级问题已进入修复阶段，新增对SGLang、OpenAI兼容本地端点以及Gemini 3.6 Flash/3.5 Flash-Lite的支持。

## 版本发布
无新版本发布。

## 社区热点 Issues（共10个）
1. [#22323] [P1] 子代理达到最大轮次后错误返回GOAL成功，隐藏中断状态
   链接：https://github.com/google-gemini/gemini-cli/issues/22323
   重要性：影响多仓库代码调查场景的准确性，`codebase_investigator`子代理超时后仍返回成功，导致用户无法感知任务中断。
   社区反应：获2个赞、12条评论，是过去24小时评论数最高的Issue，多位开发者反馈在复杂代码分析任务中遇到该问题。

2. [#21409] [P1] 通用代理执行简单操作时永久挂起
   链接：https://github.com/google-gemini/gemini-cli/issues/21409
   重要性：高优先级故障，代理执行建文件夹等简单shell命令时卡住长达1小时，完全阻塞工作流。
   社区反应：获8个赞、8条评论，用户反馈通过禁用子代理可临时绕过，社区迫切期待修复。

3. [#24353] [P1] 组件级Agent评测体系迭代
   链接：https://github.com/google-gemini/gemini-cli/issues/24353
   重要性：是行为测试体系的后续EPIC，目前已生成76个行为评测用例，覆盖6个Gemini模型，是Agent质量评估的核心基础设施。
   社区反应：获7条评论，维护者团队持续推进中。

4. [#22745] [P2] 评估AST感知文件操作对Agent效率的提升价值
   链接：https://github.com/google-gemini/gemini-cli/issues/22745
   重要性：若落地可减少Agent代码调查时的token消耗和交互轮次，是Agent能力优化的关键探索方向。
   社区反应：获1个赞、7条评论，多位开发者认可AST工具对代码导航的价值。

5. [#21968] [P2] Gemini不会主动调用自定义技能和子代理
   链接：https://github.com/google-gemini/gemini-cli/issues/21968
   重要性：Agent自动化能力缺陷，必须用户明确指令才会调用相关技能，大幅降低自动化工作流的效率。
   社区反应：获6条评论，大量自定义技能用户反馈该问题，希望优化Agent的主动调用逻辑。

6. [#26522] [P

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI 社区动态日报 2026-08-04

## 今日速览
今日GitHub Copilot CLI发布v1.0.78系列版本，新增实验性`/new-worktree`命令，改进交互式shell交互体验并修复登录流程默认配置问题。过去24小时社区共更新37条Issue，覆盖会话管理、插件生态、终端兼容性、企业特性等多个方向，1条社区PR待合并。

## 版本发布
2026-08-03发布v1.0.78及v1.0.78-3版本，核心更新如下：
- 新增：实验性`/new-worktree`命令，支持创建新git worktree并在其中开启新会话
- 改进：交互式shell快捷键现在支持回车触发，且`$`就绪时会显示内联提示
- 修复：Copilot登录现在默认使用浏览器流程适配本地桌面场景
- 其他：内置一级插件会在会话启动时自动更新到最新版本

## 社区热点 Issues
1. **#1697 会话分叉功能需求** [👍25 | 评论3 | OPEN]
   重要性：解决多步骤任务中上下文丢失的痛点，支持将会话分叉为多个并行会话并共享上下文，大幅提升复杂任务处理效率，是当前社区呼声最高的功能需求。
   链接：github/copilot-cli Issue #1697
2. **#1947 云同步会话实现跨设备连续性** [👍6 | 评论4 | CLOSED]
   重要性：解决本地会话无法跨设备同步的核心痛点，支持开发者在多设备间无缝切换工作流，该需求已关闭，说明功能已被官方采纳或落地。
   链接：github/copilot-cli Issue #1947
3. **#1709 插件自动更新机制需求** [👍29 | 评论1 | CLOSED]
   重要性：解决当前插件需手动逐个更新的低效问题，是插件生态最核心的体验优化需求，社区点赞数最高，对应v1.0.78版本已上线内置插件自动更新能力。
   链接：github/copilot-cli Issue #1709
4. **#2692 Web Search MCP工具调用报错** [👍2 | 评论6 | CLOSED]
   重要性：影响Web Search工具的可用性，是过去24小时评论数最高的Issue，涉及github-mcp-server的Streamable HTTP调用错误，该问题已关闭说明已修复。
   链接：github/copilot-cli Issue #2692
5. **#4328 WSL2环境下Ctrl+H快捷键冲突** [👍0 | 评论5 | OPEN]
   重要性：Windows/WSL2用户的高频痛点，WT_SESSION环境变量泄露导致Ctrl+H被误识别为Ctrl+Backspace，影响基础输入体验。
   链接：github/copilot-cli Issue #4328
6. **#2830 自定义颜色主题需求** [👍6 | 评论2 | OPEN]
   重要性：当前仅支持auto/dark/light三种主题模式，无法满足开发者个性化界面及多场景配色需求。
   链接：github/copilot-cli Issue #2830
7. **#2714 插件启用/禁用开关需求** [👍11 | 评论2 | OPEN]
   重要性：当前仅支持安装/卸载/更新插件，无法快速禁用插件，频繁安装卸载操作效率极低，是插件管理的核心体验缺口。
   链接：github/copilot-cli Issue #2714
8. **#4139 支持自定义LLM模型端点** [👍6 | 评论1 | CLOSED]
   重要性：满足开发者及企业用户对接第三方LLM（如Azure OpenAI、本地模型等）的需求，该需求

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

# Kimi Code CLI 社区动态日报（2026-08-04）

---

## 今日速览
2026年08月04日，Kimi Code CLI 过去24小时无新版本发布；社区层面共更新3条开源PR、5条Issue，其中跨会话记忆系统、ACP协议能力扩展等核心功能需求引发讨论，同时Web UI体验缺陷、Windows输入法兼容等体验类问题也有反馈。

---

## 版本发布
过去24小时无新版本发布。

---

## 社区热点 Issues
- **#1283 [OPEN] Feature Request: Memory System - Persistent context across sessions**
  链接：https://github.com/MoonshotAI/kimi-cli/issues/1283
  重要性：是社区呼声最高的核心效率功能，可实现项目上下文、用户偏好的跨会话持久化，大幅提升CLI长期使用体验。社区反应：已积累16条评论，讨论覆盖自动记忆规则、手动记忆配置等多个实现细节。
- **#2573 [OPEN] Bug: Web UI "Connecting to session..." infinite spinner when switching sessions**
  链接：https://github.com/MoonshotAI/kimi-cli/issues/2573
  重要性：影响Web UI（技术预览版）的核心使用流程，切换会话时卡死导致无法正常使用Web端能力。社区反应：今日更新后已收到1条相关反馈，问题复现路径明确。
- **#2584 [OPEN] Bug: Thai (and other IME-based) characters duplicated when typing in the prompt on Windows**
  链接：https://github.com/MoonshotAI/kimi-cli/issues/2584
  重要性：覆盖Windows平台非英语输入法用户的通用使用场景，属于跨平台兼容性缺陷。社区反应：今日新建，目前暂无评论，待验证复现范围。
- **#2583 [OPEN] feat(acp): advertise available models and support mid-session model switching**
  链接：https://github.com/MoonshotAI/kimi-cli/issues/2583
  重要性：是ACP生态集成的关键能力补齐，可让第三方客户端（如Happy Coder、Zed等）发现可用模型、动态切换模型，大幅提升生态兼容性。社区反应：今日新建，暂无评论，需求指向明确。
- **#2582 [OPEN] [bug] CLI stream hangs indefinitely during generation, session becomes unusable**
  链接：https://github.com/MoonshotAI/kimi-cli/issues/2582
  重要性：影响CLI核心生成功能的稳定性，流卡顿会导致整个会话失效，属于高优先级缺陷。社区反应：今日更新，目前暂无评论，需进一步排查复现条件。

---

## 重要 PR 进展
- **#2200 [OPEN] fix(shell): adapt timeouts for long commands**
  链接：https://github.com/MoonshotAI/kimi-cli/pull/2200
  内容：自动为git子模块清理、clone/fetch、包安装、构建等常见耗时命令延长超时时间，保留默认60s超时规则，同时兼容调用方传入的显式超时配置，解决工程场景下长耗时命令被强制终止的问题。
- **#2585 [OPEN] feat(cli): set AI_AGENT for subprocesses**
  链接：https://github.com/MoonshotAI/kimi-cli/pull/2585
  内容：为pip/uv及独立二进制入口点启动的子进程统一暴露`AI_AGENT=kimi`环境变量，兼容外部包装工具传入的自定义值，方便外部工具识别Kimi启动的子进程，提升工具链集成与可观测性。
- **#2364 [OPEN] feat(acp): support permission mode switching**
  链接：https://github.com/MoonshotAI/kimi-cli/pull/2364
  内容：对应Issue #1414，实现ACP协议层的权限模式切换能力，完善Kimi会话的权限控制机制，提升第三方工具集成时的安全性，该PR依赖#2363需按序合并。

---

## 功能需求趋势
从当前Issue反馈来看，社区核心关注的功能方向集中在三类：
1. **生态集成能力**：以ACP协议相关的模型发现、权限控制、会话内模型切换需求为代表，开发者希望Kimi能更好适配IDE、编辑器、移动端等第三方工具生态；
2. **跨平台体验优化**：Windows平台输入法兼容、Web UI稳定性是当前反馈最多的体验类问题，覆盖非英语用户及Web端用户群体；
3. **效率与稳定性提升**：跨会话记忆系统属于效率类核心需求，同时长耗时命令超时、生成流卡顿等稳定性问题也受到开发者重点关注。

---

## 开发者关注点
当前开发者的反馈痛点和高频需求可总结为：
1. 第三方生态打通是首要诉求，尤其是面向编码场景的IDE/编辑器集成能力；
2. 跨平台兼容性存在明显短板，Windows平台及非英语输入环境的体验有待优化；
3. 核心场景稳定性不足，长耗时工程命令、大模型生成环节的异常问题影响正常开发流程；
4. 期待更多提升开发效率的个性化功能，如跨会话上下文记忆等。

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode 社区动态日报 2026-08-04
## 今日速览
今日 OpenCode 发布 v1.18.12、v1.18.13 两个维护版本，主要修复了 RTL 布局、Azure 模型推理、剪贴板交互等高频问题；社区对剪贴板失效、新版本高 CPU 占用、Zen API 服务异常等问题的反馈持续活跃，共 50 条 Issue 更新，另有 20 条核心 PR 推进，涉及插件能力扩展、稳定性优化等多个方向。

## 版本发布
### v1.18.13
- TUI 修复：GitHub PR 评审的上下文中现在会包含 PR 编号和 URL
- Desktop 修复：解决多个标签页、抽屉、缩放、标题栏交互的从右到左（RTL）布局问题，统一适配 RTL 场景的方向图标
### v1.18.12
- Core 修复：解决 Azure GPT-5.5+ 开启推理功能时完成请求失败的问题（@frederiknsgo）
- Desktop 修复：降低粘贴大图/附件时的编辑器卡顿；项目搜索现在支持匹配所有已知最近项目，不再仅限制前 5 个

## 社区热点 Issues（Top 10）
1. **#4283 [OPEN] Copy To Clipboard 失效**（评论117，👍109）
   基础交互缺陷，用户选择 TUI 响应文本后无法复制到剪贴板，覆盖全平台，是当前社区反馈量最高的问题。链接：anomalyco/opencode Issue #4283
2. **#30086 [OPEN] 新版本高 CPU 占用**（评论43，👍22）
   v1.18 系列更新后 CPU 占用飙升，用户无法同时运行多个会话，严重影响多任务使用体验。链接：anomalyco/opencode Issue #30086
3. **#40453 [OPEN] OpenCode Go 网关全模型返回 500**（评论1）
   Zen API 所有模型的 `/chat/completions` 接口均返回 HTTP 500，仅模型列表接口正常，影响所有 OpenCode Go 付费用户的核心使用。链接：anomalyco/opencode Issue #40453
4. **#40409 [OPEN] `deepseek-v4-flash` 模型路由错误**（评论3）
   OpenCode Go 的 `deepseek-v4-flash` 接口实际返回 DeepSeek V3.2 内容，存在模型版本与计费不匹配的问题。链接：anomalyco/opencode Issue #40409
5. **#31217 [OPEN] TUI 回车提交失效**（评论7）
   TUI 输入框输入内容后按回车，文本消失但未提交，中英文输入均受影响，是 CLI/TUI 用户的基础痛点。链接：anomalyco/opencode Issue #31217
6. **#32366 [OPEN] 流式错误后 UI 卡在 thinking 状态**（评论5）
   流式请求出错后桌面端 UI 无错误提示、无状态恢复，用户只能重启应用，严重影响使用连续性。链接：anomalyco/opencode Issue #32366
7. **#34087 [OPEN] OpenCode 无响应**（评论7）
   桌面端输入提示后卡在 thinking 状态，无任何输出，影响 Zen 模型调用场景。链接：anomalyco/opencode Issue #34087
8. **#17076 [OPEN] 多文件补丁审批仅显示第一个文件 diff**（评论5，👍19）
   CLI/TUI 模式下 `apply_patch` 多文件修改的审批界面仅展示单个文件 diff，不符合代码审查需求。链接：anomalyco/opencode Issue #17076
9. **#7926 [CLOSED] 终端多路复用器鼠标捕获冲突**（评论11，👍23）
   长期关注的功能需求，在 Zellij、tmux 等终端多路复用器中，TUI 的鼠标捕获会阻断原生复制、快捷键操作，最终被关闭说明已有解决方案落地。链接：anomalyco/opencode Issue #7926
10. **#40451 [OPEN] Zen 模型中途自动停止**（评论2）
    最新版本中 Zen 模型推理中途自动终止，

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code 社区动态日报（2026-08-04）

## 今日速览
今日Qwen Code发布v0.21.5正式版，新增macOS Electron桌面端向Tauri壳层迁移的可选一次性更新桥接功能；社区当日共33条Issues更新、50条PR更新，核心围绕可信Agent运行时建设、会话管理、桌面端体验优化等方向展开讨论，安全与性能问题是当前关注焦点。

## 版本发布
- **v0.21.5 正式版**：核心更新为macOS Electron桌面应用用户提供迁移至新Tauri壳层的可选更新桥接，降低桌面端迁移成本。  
  发布链接：https://github.com/QwenLM/qwen-code/releases/tag/v0.21.5
- **v0.21.4-nightly.20260804.d6f55a1c9  nightly测试版**：同步推送日常构建版本，包含最新功能修复。  
  发布链接：https://github.com/QwenLM/qwen-code/releases/tag/v0.21.4-nightly.20260804.d6f55a1c9

## 社区热点 Issues（Top 10）
1. **#8102 可信Agent运行时架构提案**（17条评论）  
   重要性：定义了Qwen Code核心架构演进方向，提出将LLM置于信任边界外，由运行时对模型输出进行确定性约束、授权、观测与评估，是安全能力的顶层设计。社区讨论热烈，多位开发者参与方案细节探讨。  
   链接：https://github.com/QwenLM/qwen-code/issues/8102
2. **#8519 tmux环境下严重闪屏问题**（11条评论）  
   重要性：Linux/tmux用户的高频痛点，几乎每秒闪屏1-2次严重影响CLI使用体验，创建当日即获得大量反馈。  
   链接：https://github.com/QwenLM/qwen-code/issues/8519
3. **#8051 多工作区守护进程资源使用限制**（9条评论）  
   重要性：`qwen serve`生产级性能核心问题，当前仅限制工作区和会话数量，未约束请求体、WebSocket组装等内存占用，多用户场景下存在资源耗尽风险。  
   链接：https://github.com/QwenLM/qwen-code/issues/8051
4. **#8136 Provider警告消毒器泄露密码bug**（6条评论）  
   重要性：安全类高危问题，消毒器在处理含端口的URL和含`@`的密码时存在逻辑缺陷，会导致用户凭证泄露到状态 payload 中，影响面广。  
   链接：https://github.com/QwenLM/qwen-code/issues/8136
5. **#8356 用户中断操作后会话转录丢失**（5条评论）  
   重要性：会话持久化核心bug，触发`APIUserAbortError`后后续对话不会写入本地会话转录，影响用户中断操作的会话连续性，Windows环境可复现。  
   链接：https://github.com/QwenLM/qwen-code/issues/8356
6. **#8493 取消的文件工具仍会修改文件系统**（5条评论）  
   重要性：安全与可靠性缺陷，`write_file`和`edit`工具在异步准备阶段被取消后仍会执行文件写入，可能导致意外文件变更。  
   链接：https://github.com/QwenLM/qwen-code/issues/8493
7. **#8527 超时错误被包装后无法自动重试**（3条评论）  
   重要性：服务稳定性问题，包装后的超时错误会丢失原始错误码，无法命中4xx/5xx重试逻辑，OpenAI兼容端点用户反馈频繁。  
   链接：https://github.com/QwenLM/qwen-code/issues/8527
8. **#8513 ACP客户端缺少上下文使用量展示**（3条评论）  
   重要性：IDE集成方向痛点，Qwen Code作为ACP代理在JetBrains IDE中运行时无法显示上下文使用量，同类代理Codex已支持该能力。  
   链接：https://github.com/QwenLM/qwen-code/issues/8513
9. **#8521 持久化助手内联图片以支持会话恢复**（2条评论）  
   重要性：多模态会话增强需求，当前会话恢复时助手输出的内联图片会丢失，该需求可提升多模态场景的使用连续性。  
   链接：https://github.com/QwenLM/qwen-code/issues/8521
10. **#8538 桌面端复制响应按钮失效**（2条评论）  
    重要性：桌面端基础体验bug，Windows平台Qwen Code Desktop 0.0.5版本复制按钮无响应，影响基础使用流程。  
    链接：https://github.com/QwenLM/qwen-code/issues/8538

## 重要 PR 进展（Top 10）
1. **#8392 macOS Electron到Tauri迁移桥接**  
   内容：为macOS Electron桌面用户提供可选的一次性更新桥接，支持平滑迁移到新版Tauri壳层，是v0.21.5的核心功能。  
   链接：https://github.com/QwenLM/qwen-code/pull/8392
2. **#8531 保留超时重试元数据**  
   内容：修复超时错误包装后丢失原始错误码和HTTP状态的问题，确保4xx/5xx重试策略正常生效，对应解决Issue #8527。  
   链接：https://github.com/QwenLM/qwen-code/pull/8531
3. **#8518 修复macOS桌面端构建签名问题**  
   内容：对Tauri打包时嵌入的ripgrep和Node.js二进制文件进行代码签名，解决0.0.6版本macOS notarization失败的问题。  
   链接：https://github.com/QwenLM/qwen-code/pull/8518
4. **#8125 新增外部工具守卫提供者**  
   内容：为`qwen serve`的ACP托管部署添加可选的外部预执行策略校验，支持通过本地回环HTTP服务进行工具调用前的身份与版本校验，提升生产环境安全性。  
   链接：https://github.com/QwenLM/qwen-code/pull/8125
5. **#8467 Web Shell Git能力扩展**  
   内容：新增未提交、未暂存、暂存、已提交、分支对比等多维度Git差异查看来源，支持可搜索的提交和分支选择器，优化Web端开发体验。  
   链接：https://github.com/QwenLM/qwen-code/pull/8467
6. **#7859 Web Shell原生实时语音（实验性）**  
   内容：为macOS平台的Web Shell添加实时语音交互能力，默认禁用，仅通过API暴露，为后续语音交互场景打基础。  
   链接：https://github.com/QwenLM/qwen-code/pull/7859
7. **#8419 多模态压缩复用提示缓存**  
   内容：优化多模态会话压缩逻辑，支持复用当前会话的提示缓存，避免媒体历史直接路由到摘要器，提升多模态处理效率。  
   链接：https://github.com/QwenLM/qwen-code/pull/8419
8. **#8481 Linux Wayland环境复制优化**  
   内容：Wayland环境下优先使用原生`wl-copy`实现文本复制，修复Wayland会话中终端复制功能失效的问题。  
   链接：https://github.com/QwenLM/qwen-code/pull/8481
9. **#7925 启动时清理过时工作树快照**  
   内容：修复工作树会话注销后残留项目快照的问题，避免临时工作树路径积累导致配置污染。  
   链接：https://github.com/QwenLM/qwen-code/pull/7925
10. **#8439 恢复VP模式下的终端原生交互能力**  
    内容：修复虚拟视口模式下SGR鼠标跟踪导致的超链接点击、右键上下文菜单失效问题，提升CLI交互体验。  
    链接：https://github.com/QwenLM/qwen-code/pull/8439

## 功能需求趋势
1. **IDE/ACP集成深化**：多个需求围绕JetBrains等IDE的ACP适配展开，包括上下文用量展示、推理力度配置、DingTalk等通道能力扩展，是当前跨平台集成的核心方向。
2. **可信Agent运行时建设**：从顶层架构推进信任边界建设，包括确定性工具执行边界、外部工具策略守卫、Hook系统安全修复，是安全能力演进的重点。
3. **会话管理与持久化增强**：社区高度关注会话恢复完整性、多工作区资源管控、中断操作后的状态保持，以提升长时间使用的连续性。
4. **多平台体验优化**：覆盖macOS壳层迁移、Windows基础功能修复、Linux终端适配、Kitty图片生命周期管理等场景，补齐各平台体验短板。
5. **生产环境稳定性优化**：daemon内存管控、超时重试逻辑、MCP热加载残留等问题反馈集中，反映企业级部署场景的强诉求。

## 开发者关注点
1. **安全可靠性问题优先级最高**：凭证泄露、文件工具取消失效、shell命令误报成功等安全问题反馈集中，是社区当前最关注的修复方向。
2. **Linux环境体验待完善**：tmux闪屏、Wayland复制失效、终端快捷键失灵等Linux场景问题反馈较多，影响开发者日常使用效率。
3. **企业级部署需求凸显**：多工作区资源限制、ACP子进程内存分配、外部工具策略校验等需求，反映出项目在企业级场景的落地诉求。
4. **多模态场景能力待补齐**：内联图片持久化、提示缓存复用等需求，对应多模态模型普及后的使用场景，是近期功能迭代的热点。
5. **CI/CD自动化效率受关注**：反向审计性能优化、E2E故障自动修复、发布流程稳定性等，是项目维护效率的核心关注点。

</details>

---
*本日报由 [agents-radar](https://github.com/huang-yi-dae/agents-radar) 自动生成。*