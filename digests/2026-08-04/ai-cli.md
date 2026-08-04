# AI CLI 工具社区动态日报 2026-08-04

> 生成时间: 2026-08-04 12:27 UTC | 覆盖工具: 7 个

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

[LLM fallback] stepfun returned an empty response.

---

## 各工具详细报告

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills 社区热点报告（数据截止2026-08-04）

## 1. 热门 Skills 排行（按社区关注度排序）
1. **PR #1298：skill-creator 评估脚本核心修复**
   - 功能：修复`run_eval.py`始终返回0%召回率的bug，同步解决Windows流读取、触发检测、并行工作器兼容问题
   - 讨论热点：关联10+独立复现的评估失效问题，是skill描述优化循环失效的根因修复
   - 状态：OPEN
   - 链接：https://github.com/anthropics/skills/pull/1298

2. **PR #514：document-typography 排版质量控制**
   - 功能：解决AI生成文档的孤儿行、孤段、编号错位等通用排版问题
   - 讨论热点：覆盖所有Claude生成文档场景，用户普适性需求强
   - 状态：OPEN
   - 链接：https://github.com/anthropics/skills/pull/514

3. **PR #538：pdf skill 大小写引用修复**
   - 功能：修正pdf skill的SKILL.md中8处大小写不匹配的文件引用，避免大小写敏感系统报错
   - 讨论热点：跨平台兼容性核心问题，影响Linux/macOS用户的正常使用
   - 状态：OPEN
   - 链接：https://github.com/anthropics/skills/pull/538

4. **PR #486：ODT 开源文档格式支持**
   - 功能：支持OpenDocument格式（.odt/.ods）的创建、模板填写、格式转换与HTML解析
   - 讨论热点：填补开源文档格式Skill空白，与现有微软系文档Skill形成互补
   - 状态：OPEN
   - 链接：https://github.com/anthropics/skills/pull/486

5. **PR #210：frontend-design 技能可执行性优化**
   - 功能：重构前端设计Skill的指令，提升清晰度与可落地性，确保单会话内可执行
   - 讨论热点：聚焦Skill本身的指令质量优化，降低Claude执行歧义
   - 状态：OPEN
   - 链接：https://github.com/anthropics/skills/pull/210

6. **PR #83：Skill 质量与安全分析元技能**
   - 功能：新增skill-quality-analyzer（5维度质量评估）与skill-security-analyzer（安全风险审计）两个元Skill
   - 讨论热点：回应Skill生态治理需求，帮助用户评估第三方Skill的可靠性
   - 状态：OPEN
   - 链接：https://github.com/anthropics/skills/pull/83

7. **PR #541：docx skill 文档损坏修复**
   - 功能：修复docx skill添加修订时与现有书签的ID冲突问题，避免OOXML文档损坏
   - 讨论热点：文档处理稳定性核心问题，影响批量文档修订场景
   - 状态：OPEN
   - 链接：https://github.com/anthropics/skills/pull/541

8. **PR #539：skill-creator YAML 解析防护**
   - 功能：新增前置校验，检测未加引号的description字段含YAML特殊字符时的解析失败问题
   - 讨论热点：降低Skill创建门槛，避免新手常见的YAML格式错误
   - 状态：OPEN
   - 链接：https://github.com/anthropics/skills/pull/539

## 2. 社区需求趋势（从Issue提炼）
- **团队协作与分发**：组织内Skill共享、统一分发渠道需求强烈（关联Issue #228，16条评论）
- **开发工具链完善**：Skill创建、评估、调试工具的稳定性与易用性是核心痛点，多个Issue反馈skill-creator脚本的跨平台兼容问题
- **安全与治理**：Skill信任边界、权限管控、输出质量审计需求凸显，仿冒官方Skill的安全风险引发广泛讨论（关联Issue #492，43条评论）
- **垂直场景Skill供给**：长上下文记忆管理、文档排版、开源格式支持、测试生成、AI Agent治理等细分场景需求明确
- **跨平台兼容**：Windows系统适配、大小写敏感文件系统兼容是高频反馈问题

## 3. 高潜力待合并 Skills
以下PR讨论活跃、问题明确，近期落地概率较高：
1. **PR #1479：plan-file-hygiene 规划文件生命周期管理**
   - 解决项目规划文件无生命周期管理、临时文件堆积问题，社区用户已认领需求
   - 链接：https://github.com/anthropics/skills/pull/1479

2. **PR #1367：self-audit 输出质量审计Skill**
   - 实现机械验证+四维度推理质量 gates，覆盖全会话输出质量管控
   - 链接：https://github.com/anthropics/skills/pull/1367

3. **PR #1261：触发评估文件隔离修复**
   - 解决skill-creator并行评估时向用户项目写入临时文件的问题，避免会话冲突
   - 链接：https://github.com/anthropics/skills/pull/1261

4. **PR #1302：color-expert 颜色知识Skill**
   - 覆盖多套颜色命名系统、色彩空间选择等通用颜色知识，跨领域适用性强
   - 链接：https://github.com/anthropics/skills/pull/1302

## 4. Skills 生态洞察
当前社区最集中的诉求是**完善Skill开发-评估-分发-治理全链路体验，同时补齐垂直场景高质量Skill供给，解决跨平台兼容与安全信任痛点**。

---

# Claude Code 社区动态日报（2026-08-04）
## 今日速览
今日Claude Code发布v2.1.221版本，新增VSCode Focus视图与Linux沙箱凭证掩码能力；社区过去24小时共更新50条Issue、2条PR，其中VSCode扩展额度误判、Windows GPU进程崩溃、Opus 5记忆失效等平台与模型类问题关注度最高。

## 版本发布
### v2.1.221
更新内容：
1. VSCode扩展新增Focus视图：通过`Ctrl+Alt+F`或「Claude Code: Toggle Focus view」命令切换，可折叠工具活动为每轮可展开摘要，附带运行中工具实时指示器，减少聊天界面干扰。
2. Linux平台为沙箱凭证文件新增`mode: "mask"`支持，提升凭证安全性。
Release链接：https://github.com/anthropics/claude-code/releases/tag/v2.1.221

## 社区热点 Issues（Top 10）
1. [#79441](https://github.com/anthropics/claude-code/issues/79441) [OPEN] VSCode扩展在用户Max计划剩余20%周Fable额度时仍报「需要usage credits」阻止Fable 5使用，影响付费用户正常功能。该Issue为当前热度最高的开放Issue，已有14条评论、12个👍。
2. [#81159](https://github.com/anthropics/claude-code/issues/81159) [OPEN] Windows 11下Opus 5执行页内浏览器操作时触发GPU进程崩溃（exitCode 101457950），导致Claude Desktop崩溃且MSIX安装包损坏，共11条评论，严重影响Windows桌面端稳定性。
3. [#68721](https://github.com/anthropics/claude-code/issues/68721) [CLOSED] v2.1.178起原生团队管理工具TeamCreate/TeamDelete不再暴露的回归问题，已修复关闭，是过去24小时评论数最多的Issue，共18条讨论、7个👍。
4. [#73453](https://github.com/anthropics/claude-code/issues/73453) [OPEN] v2.1.198起headless模式运行Agent子任务时，子任务启动约50秒后主进程退出，后台任务被强制终止，影响CI/CD场景下Agent SDK的使用，共3条评论、2个👍。
5. [#83789](https://github.com/anthropics/claude-code/issues/83789) [OPEN] Opus 5模型忽略自身持久记忆和过往会话记录就执行操作，导致重复解决过往已解决的问题，单日造成多小时的无效工作，是模型行为的严重回归问题。
6. [#80576](https://github.com/anthropics/claude-code/issues/80576) [OPEN] VSCode扩展中AskUserQuestion组件会遮挡Claude输出的前置文本消息，影响对话可读性，共2条评论、6个👍，是VSCode端体验类的高反馈问题。
7. [#64479](https://github.com/anthropics/claude-code/issues/64479) [OPEN] Linux平台Edit工具在处理包含字面量/转义混合Unicode的多行old_string时会失败，影响代码编辑场景的准确性，共7条评论。
8. [#82582](https://github.com/anthropics/claude-code/issues/82582) [OPEN] Windows Terminal中 Claude Code 的链接会打开两次，原因是TUI和终端同时响应OSC 8超链接点击事件，共2条评论、1个👍，影响Windows终端用户体验。
9. [#83798](https://github.com/anthropics/claude-code/issues/83798) [OPEN] v2.1.221 macOS 26.6下终端模式存在消息队列停滞问题，第一轮会话正常，后续用户消息会被静默丢弃，是刚发布版本的新回归问题。
10. [#83807](https://github.com/anthropics/claude-code/issues/83807) [OPEN] Wayland平台复制功能异常，一半复制操作无法写入剪贴板，原因是两个wl-copy调用竞争，影响Linux Wayland用户的基础使用。

## 重要 PR 进展
过去24小时共新增2个PR，均为开放状态：
1. [#83374](https://github.com/anthropics/cl

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex 社区动态日报（2026-08-04）

## 今日速览
今日OpenAI Codex社区最受关注的是VS Code扩展的Codex Diff崩溃问题（已标记关闭完成修复），同时Windows、Linux平台的多项兼容性bug持续引发讨论；版本侧发布3个Rust CLI alpha测试版本，PR侧核心聚焦技能系统重构、MCP能力扩展与线程管理优化。

---

## 版本发布
今日发布3个Rust生态Codex CLI alpha测试版本，均为迭代测试版本，未披露详细更新日志：
- rust-v0.147.0-alpha.7
- rust-v0.147.0-alpha.6
- rust-v0.147.0-alpha.1.2

---

## 社区热点 Issues（Top 10）
1. **[#35058](https://github.com/openai/codex/issues/35058) [CLOSED] VS Code扩展Codex Diff崩溃**
   重要性：影响所有

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI 社区动态日报（2026-08-04）
## 今日速览
2026-08-04 Gemini CLI社区动态以稳定性修复、安全增强和新模型支持为核心：当日共更新30条热门Issue、20条高互动PR，涵盖Agent可靠性、认证流程、本地模型适配等关键方向，多个P1级问题处于待复测状态，新模型支持和安全修复类PR已提交待合并。

## 版本发布
无新版本发布，最新仍为社区维护的 nightly 版本。

## 社区热点 Issues
1. [Issue #22323](https://github.com/google-gemini/gemini-cli/issues/22323)（P1）：`codebase_investigator`子代理达到最大轮次限制时错误报告为`GOAL`成功，掩盖了实际的中断状态，直接影响复杂任务的可观测性和调试效率，为当日评论数最高的Issue，获12条评论。
2. [Issue #21409](https://github.com/google-gemini/gemini-cli/issues/21409)（P1）：调用通用子代理时会永久卡死，即使是简单的文件夹创建操作也会触发，用户反馈该问题自v0.33.0后出现，禁用子代理可规避，为当日点赞最高的Issue，获8条评论、8个👍。
3. [Issue #19873](https://github.com/google-gemini/gemini-cli/issues/19873)（P2）：提出利用零依赖OS沙盒和模型原生bash亲和力提升代码操作效率，契合Gemini 3模型对POSIX工具的偏好，是Agent能力增强的重要探索方向，获8条评论。
4. [Issue #24353](https://github.com/google-gemini/gemini-cli/issues/24353)（P1）：跟踪组件级自动化评测体系建设，是继行为评测之后的质量保障基础设施升级，目前已积累76个行为评测用例，覆盖6款Gemini模型，获7条评论。
5. [Issue #22745](https://github.com/google-gemini/gemini-cli/issues/22745)（P2）：评估AST感知的文件读写、搜索和代码映射工具的价值，可通过精准读取方法边界减少轮次和token消耗，是代码操作性能优化的核心探索方向，获7条评论。
6. [Issue #21968](https://github.com/google-gemini/gemini-cli/issues/21968)（P2）：反馈Gemini不会主动调用自定义skills和子代理，需要用户显式指令才触发，直接影响Agent的自主性和使用效率，获6条评论。
7. [Issue #26522](https://github.com/google-gemini/gemini-cli/issues/26522)（P2）：自动记忆功能会无限重试低信号会话，导致资源浪费，是该功能的核心稳定性问题，获5条评论。
8. [Issue #25166](https://github.com/google-gemini/gemini-cli/issues/25166)（P1）：shell命令执行完成后，CLI仍显示“等待输入”卡死，是核心终端交互功能的高频bug，获4条评论、3个👍。
9. [Issue #22232](https://github.com/google-gemini/gemini-cli/issues/22232)（P3）：浏览器代理在持久会话模式下遇到锁定的浏览器配置时会直接失败，提出自动会话接管和锁恢复机制，提升浏览器代理的韧性，获4条评论。
10. [Issue #26525](https://github.com/google-gemini/gemini-cli/issues/26525)（P2）：自动记忆功能在脱敏前已将内容发送到模型，且存在不必要的日志记录，存在隐私和安全风险，获4条评论。

## 重要 PR 进展
1. [PR #28681](https://github.com/google-gemini/gemini-cli/pull/28681)（P1，size/l）：新增对SGLang和本地OpenAI兼容端点的支持，扩展了Gemini CLI的后端适配范围，支持用户使用本地部署的模型服务，当日更新待合并。
2. [PR #28679](https://github.com/google-gemini/gemini-cli/pull/28679)（P2，area/security）：优化Vertex AI认证时的401错误提示，当用户使用标准Gemini API key配置Vertex AI认证时，会给出明确的错误指引，改善开发者体验，当日更新待合并。
3. [PR #28680](https://github.com/google-gemini/gemini-cli/pull/28680)（P2，area/security）：修复A2A远程代理的OpenID Connect认证验证缺陷，避免配置阶段误判为有效、实际请求时失败的问题，当日更新待合并。
4. [PR #28678](https://github.com/google-gemini/gemini-cli/pull/28678)（P2，area/security）：修复OAuth回调服务器的超时回调泄漏和资源未释放问题，避免内存泄漏和僵尸进程，当日更新待合并。
5. [PR #28677](https://github.com/google-gemini/gemini-cli/pull/28677)（P1，area/core）：给`IdeClient.getInstance()`的进程遍历逻辑增加3秒超时，避免终端在初始化阶段无限卡在“Initializing...”状态，当日更新待合并。
6. [PR #28676](https://github.com/google-gemini/gemini-cli/pull/28676)（P2，area/core）：修复`relaunchAppInChildProcess`逻辑，将父进程的终止信号（SIGTERM、SIGINT等）转发给子进程，避免子进程变成孤儿进程，当日更新待合并。
7. [PR #28546](https://github.com/google-gemini/gemini-cli/pull/28546)（P1，area/security）：修复使用`GEMINI_API_KEY`认证时残留`Authorization`头导致401错误的问题，通过 stripping 所有`Authorization`头解决认证失败，待合并。
8. [PR #28597](https://github.com/google-gemini/gemini-cli/pull/28597)（P1，size/l）：修复settings加载的竞态条件，确保环境变量在解析settings占位符之前完成加载，避免本地`.env`文件配置不生效的问题，当日更新待合并。
9. [PR #28673](https://github.com/google-gemini/gemini-cli/pull/28673)（P2，area/core）：新增Gemini 3.6 Flash和Gemini 3.5 Flash-Lite的模型配置、能力声明和别名支持，扩展可用模型范围，当日更新待合并。
10. [PR #28566](https://github.com/google-gemini/gemini-cli/pull/28566)（P1，size/m）：将`InvalidStreamError`的错误类型和具体信息传递到CLI UI层，当出现空响应等错误时给出针对性的解决建议（如使用`/compress`压缩上下文），改善故障排查体验，待合并。

## 功能需求趋势
从所有Issue中提炼，当前社区最关注的功能方向包括：
1. **Agent自主性与可靠性**：子代理稳定性、主动调用skills/工具、浏览器代理韧性、代码操作效率提升是最高频的需求。
2. **安全与隐私增强**：自动记忆的脱敏机制、权限控制、认证流程鲁棒性是社区关注的重点。
3. **本地部署与多后端支持**：对SGLang、OpenAI兼容端点、更多Gemini模型的支持需求持续增长。
4. **开发者体验优化**：终端交互

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI 社区动态日报（2026-08-04）
数据来源：github.com/github/copilot-cli

## 今日速览
2026年8月4日，GitHub Copilot CLI发布v1.0.78系列版本，带来工具耗时显示、插件自动更新、交互式Shell快捷键优化及实验性新工作树功能。社区层面，会话管理、插件可控性、自定义模型等方向的需求持续高热，同时WSL2输入兼容、企业MCP访问限制、终端渲染等bug成为当日反馈焦点。

## 版本发布
当日发布v1.0.78及v1.0.78-3两个版本，核心更新如下：
- 新增工具调用耗时时间线：调用超过5秒的工具会实时显示耗时，默认开启，可通过`/settings showToolDurations`关闭
- 插件自动更新：第一方插件会在每次会话启动时自动更新到最新版本
- 交互式Shell快捷键优化：现在支持回车触发，且当"$"处于armed状态时会显示内联提示
- 登录体验优化：本地桌面场景下Copilot登录默认使用浏览器流程
- 实验性新功能：新增`/new-worktree`命令，支持创建新git工作树并在其中开启独立会话
（版本链接：[github.com/github/copilot-cli/releases](https://github.com/github/copilot-cli/releases)）

## 社区热点 Issues
1. **#1697 [OPEN] 会话分叉功能**（👍25 | 评论3）
   需求支持在任务分叉时创建共享上下文的平行会话，解决当前切换会话会丢失上下文的问题，是跨任务效率的核心需求，社区关注度最高。
   链接：github.com/github/copilot-cli/issues/1697
2. **#2714 [OPEN] 插件启用/禁用开关**（👍11 | 评论2）
   当前仅支持安装/卸载/更新插件，无法快速启用禁用，社区要求对标Claude Code等工具的功能，反馈热烈。
   链接：github.com/github/copilot-cli/issues/2714
3. **#1947 [CLOSED] 云同步会话跨设备连续使用**（👍6 | 评论4）
   需求将本地存储的会话同步到云端，实现多设备间工作连续性，已被标记为关闭，预计已纳入官方开发计划。
   链接：github.com/github/copilot-cli/issues/1947
4. **#4139 [CLOSED] 支持自定义LLM模型/端点**（👍6 | 评论1）
   需求允许接入第三方大模型（如Azure OpenAI、本地模型等），已被标记关闭，说明官方已有相关规划。
   链接：github.com/github/copilot-cli/issues/4139
5. **#2830 [OPEN] 自定义颜色主题支持**（👍6 | 评论2）
   当前仅支持auto/dark/light三种主题，无法自定义颜色盘，适合多任务并行开发的用户需求。
   链接：github.com/github/copilot-cli/issues/2830
6. **#4328 [OPEN] WSL2下Ctrl+H被误识别为Ctrl+Backspace**（评论5）
   原生Windows终端的`WT_SESSION`环境变量泄露导致WSL2下删除字符快捷键失效，影响Windows混合开发环境用户的使用体验。
   链接：github.com/github/copilot-cli/issues/4328
7. **#2692 [CLOSED] Web Search MCP工具报错**（评论6）
   调用`github-mcp-server`的Web Search工具时出现Streamable HTTP错误，是MCP生态兼容性的典型问题，已修复。
   链接：github.com/github/copilot-cli/issues/2692
8. **#4349 [OPEN] 企业托管策略校验失败阻塞自定义MCP服务器**（评论1）
   企业托管设置的枚举值校验不兼容合法的`"enable"`值，导致所有本地/自定义MCP服务器无法使用，影响企业用户。
   链接：github.com/github/copilot-cli/issues/4349
9. **#3859 [CLOSED] 关闭记忆功能后Subconscious后台代理仍重复启动**（评论2）
   关闭Copilot Memory后内部per-prompt记忆代理仍会每次用户prompt启动，消耗额外资源，已修复。
   链接：github.com/github/copilot-cli/issues/3859
10. **#4353 [OPEN] 会话压缩可误触且无确认/撤销**（当日新增）
    会话压缩操作无二次确认、无撤销路径，容易误操作丢失上下文，影响会话管理安全性。
    链接：github.com/github/copilot-cli/issues/4353

## 重要 PR 进展
当日仅1条PR更新，暂无详细功能说明：
- PR #4355 [OPEN] 由XavierMP14提交，2026-08-04创建并更新，目前处于开放合并状态，具体变更内容尚未公开。
  链接：github.com/github/copilot-cli/pull/4355

## 功能需求趋势
1. **会话管理增强**：云同步、会话分叉、会话压缩安全管控是当前最高频的需求方向，票数总和超过40，社区希望提升跨会话、跨设备的上下文连续性。
2. **插件生态完善**：插件开关、技能调用修复、自动更新等需求持续出现，社区希望提升插件的可控性和易用性。
3. **自定义能力扩展**：自定义模型端点、自定义主题、工具选择性启用等需求突出，开发者希望提升CLI的适配性以满足个性化场景。
4. **跨平台兼容性优化**：WSL2输入兼容、终端渲染适配（Ghostty、zellij等）、企业托管策略兼容等需求密集，反映Windows/Linux混合环境和企业场景的用户痛点。

## 开发者关注点
1. 交互体验痛点：终端渲染异常（表格重排、超链接截断、屏幕空白）、快捷键兼容性问题（WSL2下快捷键失效）是反馈最多的体验类问题，影响日常使用流畅度。
2. 企业场景限制：MCP服务器访问权限、托管策略兼容性问题阻塞了自定义工具和CI场景的使用，是企业用户的核心痛点。
3. 上下文管理风险：会话压缩无确认、上下文compaction时成本统计丢失等问题，容易导致上下文丢失或成本计算错误，影响长期会话的使用可靠性。
4. 生态兼容性：MCP服务器报错、模型接口不兼容、插件技能调用失败等问题，反映CLI与第三方生态的适配仍需完善。

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

# Kimi Code CLI 社区动态日报（2026-08-04）

## 1. 今日速览
2026年8月4日，Kimi Code CLI社区无新版本发布，共5条Issue更新、7条PR进展。跨平台输入法兼容性、ACP协议模型切换能力、跨会话记忆系统是当前社区最受关注的功能方向，多个稳定性与兼容性修复正在推进。

## 2. 版本发布
过去24小时无新版本发布。

## 3. 社区热点 Issues
| 序号 | Issue 编号 | 类型 | 标题 | 核心说明 | 社区反应 | 链接 |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | #1283 | 功能需求 | 记忆系统：实现跨会话持久化上下文 | 核心诉求是支持AI自动管理的项目模式、用户偏好记忆，以及用户手动自定义指令的能力，是长期高票的功能提案，对提升长期开发场景下的工具粘性至关重要。 | 累计16条社区讨论，参与度最高 | MoonshotAI/kimi-cli Issue #1283 |
| 2 | #2584 | Bug | Windows平台IME输入法字符重复 | 影响kimi-cli 0.31.1在Windows 11平台的提示词输入体验，泰语等基于输入法的字符会出现重复输入，属于基础输入体验缺陷，对非英语地区用户影响较大。 | 创建当日更新，属于高优先级体验bug | MoonshotAI/kimi-cli Issue #2584 |
| 3 | #2583 | 功能需求 | ACP协议支持模型列表广播与中途切换 | 当前ACP客户端（如Zed、Happy Coder移动端）无法发现可用模型列表，也无法在会话中途切换模型，该需求将补齐ACP协议核心能力，拓展Kimi CLI在第三方IDE/编辑器中的集成体验。 | 创建当日更新，属于协议层关键需求 | MoonshotAI/kimi-cli Issue #2583 |
| 4 | #2573 | Bug | Web UI切换会话时无限加载 | 影响kimi-cli 1.48.0的Web UI（技术预览版）在macOS平台的会话切换体验，切换会话后会出现"Connecting to session..."无限转圈，属于Web UI核心流程的阻塞性bug。 | 1条评论，已确认复现 | MoonshotAI/kimi-cli Issue #2573 |
| 5 | #2582 | Bug | CLI流式生成时卡死、会话失效 | 影响kimi-cli 0.31.1在Windows平台使用kimi-k2.7-code模型时的流式输出体验，生成过程中流会无限挂起，导致整个会话不可用，属于高优先级稳定性问题。 | 创建当日更新，属于核心功能阻塞bug | MoonshotAI/kimi-cli Issue #2582 |

## 4. 重要 PR 进展
| 序号 | PR 编号 | 状态 | 标题 | 内容说明 | 链接 |
| --- | --- | --- | --- | --- | --- |
| 1 | #2585 | Open | feat(cli): 向子进程暴露AI_AGENT环境变量 | 实现向Kimi CLI会话启动的子进程设置`AI_AGENT=kimi`环境变量，同时支持保留外部编排工具传入的非空值，方便下游工具识别当前进程由Kimi CLI启动，适配工具链集成场景。 |

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode 社区动态日报 2026-08-04

## 今日速览
今日 OpenCode 连续发布 v1.18.12、v1.18.13 两个修复版本，核心解决 Azure 模型推理请求失败、桌面端 RTL 布局适配、TUI 剪贴板失效等问题。社区最热 Issue 为「TUI 选中文本无法复制到剪贴板」，累计获 109 个赞同、117 条评论；同时多个新功能 PR 合入，包括新增 AWS Kiro 提供商、TUI 动画文本自定义、长会话闲置自动压缩等。

---

## 版本发布
### v1.18.13
- **TUI 修复**：GitHub PR 评审上下文新增 PR 编号与 URL 信息
- **Desktop 修复**：解决多标签页、抽屉、调整大小、标题栏交互的多个从右到左（RTL）布局问题，统一适配 RTL 场景的方向图标逻辑
### v1.18.12
- **Core 修复**：解决 Azure GPT-5.5+ 开启推理模式时完成请求失败的问题
- **Desktop 修复**：降低 Draft 包含大体积粘贴图片/附件时的编辑器卡顿，优化项目搜索匹配最近使用项目的逻辑

---

## 社区热点 Issues（Top 10）
1. **[OPEN] Copy To Clipboard is not working** ([#4283](https://github.com/anomalyco/opencode/issues/4283))  
   TUI 选中文本无法复制到系统剪贴板，是今日评论数最高、赞同最多的 Issue，覆盖全平台用户，基础交互 bug 影响面极广。
2. **[OPEN] Bug: Model generates identical response twice** ([#25270](https://github.com/anomalyco/opencode/issues/25270))  
   模型连续输出完全一致的重复响应，为核心功能异常，已有 24 条讨论，多用户反馈复现。
3. **[CLOSED] session/update notifications sent after session/prompt response** ([#17505](https://github.com/anomalyco/opencode/issues/17505))  
   OpenCode 作为 ACP 提供商时，会话更新通知在响应结束后发送导致客户端内容缺失，是集成场景的关键 bug，已随 PR #40422 修复。
4. **[CLOSED] feat: Add option to disable mouse capture in TUI** ([#7926](https://github.com/anomalyco/opencode/issues/7926))  
   请求支持关闭 TUI 鼠标捕获以适配 Zellij、tmux 等终端复用器，获 23 个赞同，已实现功能并关闭。
5. **[OPEN] [FEATURE]: Add Support for MCP Apps in the desktop app** ([#10884](https://github.com/anomalyco/opencode/issues/10884))  
   请求桌面端支持 MCP Apps 规范，获 44 个赞同，是生态扩展方向的高需求特性。
6. **[CLOSED] [FEATURE]: Add a config to set the sidebar to open/closed by default** ([#3682](https://github.com/anomalyco/opencode/issues/3682))  
   请求支持配置侧边栏默认开关状态，获 26 个赞同，已合入功能并关闭。
7. **[OPEN] [Zen] AuthError: "Request blocked by upstream provider"** ([#39827](https://github.com/anomalyco/opencode/issues/39827))  
   Zen 所有模型（付费/免费）均被上游拦截，Direct 提供商 API 正常，为 Zen 服务严重故障，影响大量订阅用户。
8. **[OPEN] [BUG] TUI prompt input fail on Enter** ([#31217](https://github.com/anomalyco/opencode/issues/31217))  
   TUI 输入框按回车后文本消失但无法提交，为基础交互 bug，中英文输入均受影响。
9. **[OPEN] CLI/TUI multi-file apply_patch approval only shows first file diff** ([#17076](https://github.com/anomalyco/opencode/issues/17076))  
   多文件代码变更审批仅展示首个文件 diff，严重影响代码审查体验，获 19 个赞同。
10. **[OPEN] OpenCode Go deepseek-v4-flash 模型版本错配** ([#40409](https://github.com/anomalyco/opencode/issues/40409))  
    请求 `deepseek-v4-flash` 实际返回 V3.2 版本，知识截止时间不符，为模型服务的严重质量问题，影响付费用户权益。

---

## 重要 PR 进展（Top 10）
1. **[OPEN] some experimental perf improvements** ([#40427](https://github.com/anomalyco/opencode/pull/40427))  
   桌面端渲染性能优化，Home 启动后无超过 50ms 的渲染阻塞任务，显著提升启动速度。
2. **[OPEN] feat(opencode): add Kiro provider** ([#20491](https://github.com/anomalyco/opencode/pull/20491))  
   新增 AWS Kiro 模型提供商，通过内置插件扩展模型支持范围，对应需求 Issue #9165、#26680。
3. **[OPEN] fix(plugin): skip mismatched kind in readV1Plugin detect mode** ([#40426](https://github.com/anomalyco/opencode/pull/40426))  
   修复插件检测模式下 kind 不匹配导致加载失败的问题，解决 Issue #31610。
4. **[OPEN] feat(server): runtime base path support for reverse proxy deployments** ([#28326](https://github.com/anomalyco/opencode/pull/28326))  
   新增 `--base-path` 参数与 `server.basePath` 配置，支持 OpenCode Web 端通过反向代理部署，对应 Issue #7624。
5. **[CLOSED] fix(acp): drain updates before end turn** ([#40422](https://github.com/anomalyco/opencode/pull/40422))  
   修复 ACP 会话更新通知顺序问题，等待会话空闲后再返回响应，已合入并关闭对应 Issue #17505。
6. **[OPEN] feat(tui): add spinnerVerbs config to customize TUI spinner text** ([#40030](https://github.com/anomalyco/opencode/pull/40030))  
   新增 `spinner_verbs` 配置项，支持自定义 TUI 加载动画的文本内容，对应 Issue #19401。
7. **[OPEN] fix(app): correct "sesssion" typo in LayoutRoute tag** ([#40423](https://github.com/anomalyco/opencode/pull/40423))  
   修复 LayoutRoute  discriminated-union 标签拼写错误，解决导航逻辑异常问题，对应 Issue #40421。
8. **[CLOSED] feat(app): RTL layout interactions** ([#40410](https://github.com/anomalyco/opencode/pull/40410))  
   完成桌面端从右到左布局的全场景适配，包括标题栏、文件树、标签页、滚动条等元素的镜像与交互优化，已合入对应今日 RTL 相关修复。
9. **[OPEN] [contributor] fix(tui): include model variants in assistant footer** ([#40415](https://github.com/anomalyco/opencode/pull/40415))  
   修复 TUI 助手消息底部未展示非默认模型变体的问题，对应 Issue #40412。
10. **[OPEN] feat(session): auto-compact stale sessions resumed after idle** ([#40403](https://github.com/anomalyco/opencode/pull/40403))  
    新增闲置长会话恢复后自动压缩逻辑，避免重复发送完整会话前缀导致成本浪费。

---

## 功能需求趋势
1. **基础体验优化**：TUI 剪贴板、RTL 布局、侧边栏配置、终端复用器适配等基础交互问题是社区最高频的需求方向。
2. **生态扩展**：新增模型提供商（Kiro、Poolside、QVAC 等）、支持 MCP Apps 规范、Zen 服务稳定性优化是生态建设重点。
3. **代码协作体验**：多文件 diff 展示、Plan 模式权限管控、文件索引刷新、会话历史无限制检索是开发者协作场景的核心需求。
4. **部署适配**：反向代理支持、bare repo worktree 识别、项目路径变更自动更新是企业级部署场景的常见需求。

---

## 开发者关注点
1. **基础交互稳定性**：TUI 剪贴板失效、回车提交失败、鼠标捕获冲突等问题高频出现，是影响日常使用的首要痛点。
2. **模型服务可靠性**：Zen 上游拦截、模型版本错配、重复响应、推理请求失败等问题直接冲击核心使用流程，社区反馈强烈。
3. **高级功能完备性**：多文件 diff 仅展示首文件、Plan 模式权限漏控、会话历史 100 条/30 天限制等问题，降低了代码协作场景的可用性。
4. **边缘场景兼容性**：终端复用器适配、RTL 布局、反向代理部署等小众但重要的场景 bug，需要持续修复覆盖。

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

[LLM fallback] stepfun returned an empty response.

</details>

---
*本日报由 [agents-radar](https://github.com/huang-yi-dae/agents-radar) 自动生成。*