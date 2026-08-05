# AI CLI 工具社区动态日报 2026-08-05

> 生成时间: 2026-08-05 03:42 UTC | 覆盖工具: 7 个

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

# AI CLI 工具横向对比分析报告（2026-08-05

---

## 各工具详细报告

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

⚠️ Skills 摘要生成失败。

---

# Claude Code 社区动态日报 2026-08-05
## 今日速览
今日 Anthropics 发布 Claude Code v2.1.222 版本，修复了工作树隔离与会话工具权限两处安全漏洞。社区热度最高的需求为「支持多 Connector 同类型多账号绑定」，同时 Windows 桌面版稳定性、Linux/WSL 内存泄漏类问题仍为反馈集中区，当日新增 10 个核心脚本与插件开发相关的修复 PR。

## 版本发布
### v2.1.222
1. 修复工作树隔离会话及其子代理可对主工作目录执行破坏性 git 命令的问题，现在所有会话类型的文件编辑与 Bash 操作均强制应用隔离规则
2. 修复 PreToolUse 自动允许钩子可绕过后台代理任务工具权限限制的安全问题
版本链接：[anthropics/claude-code Release v2.1.222](https://github.com/anthropics/claude-code/releases/tag/v2.1.222)

## 社区热点 Issues（Top 10）
1. **[增强需求] #27302 支持 Claude/Claude Code Web 端多 Connector 同类型多账号绑定**
   链接：[Issue #27302](https://github.com/anthropics/claude-code/issues/27302)
   重要性：当前仅支持单 Connector 单账号，无法满足同时使用多个同类型服务账号的用户需求，是社区热度最高的需求（👍335、💬226），直接影响企业多账号协作场景的体验。
2. **[性能Bug] #54394 v2.1.117 引入 ugrep 包装导致正则回溯放大，引发 V8 堆 OOM，WSL2 主机冻结**
   链接：[Issue #54394](https://github.com/anthropics/claude-code/issues/54394)
   重要性：v2.1.117 替换 Grep 工具为嵌入式 ugrep 后，所有 grep 调用路由至 claude.exe，复杂正则场景下会触发 OOM，8GB

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

⚠️ 摘要生成失败。

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

用户现在需要生成Gemini CLI社区动态日报，首先按照要求的结构来，先做今日速览，然后版本发布因为没有新的 Releases就省略？对，数据里最新 Releases是无，所以版本发布部分就说无新版本发布。然后社区热点Issues选10个最有价值的，每个说明重要性和社区反应，还要带链接。然后重要PR选10个，每个说修复或者功能内容。然后功能需求趋势，从Issues里提炼，比如子代理优化、记忆系统安全、AST工具集成、性能体验、模型支持这些？然后开发者关注点就是高频的痛点，比如子代理挂起、安全漏洞、内存泄漏、UI卡顿这些？

首先今日速览：今天是2026-08-05，Gemini CLI社区无新版本发布，但核心问题修复和功能迭代持续推进：当日共50条Issue更新、26条PR更新，重点聚焦子代理稳定性、安全漏洞修复、Auto Memory系统优化及多模型支持扩展，其中SSRF、变量注入等高危安全漏洞的修复PR引发社区重点关注。

然后版本发布部分：无新版本发布，当前最新 nightly 版本为 0.47.0-nightly.20260605.g4196596f7（来自PR #27680）。

接下来社区热点Issues，选10个，按重要性来：
1. #22323：子代理恢复逻辑错误，MAX_TURNS中断被误报为目标达成，优先级P1，12条评论，2赞。重要性：会直接导致任务状态误判，掩盖真实执行中断问题，影响自动化流程可靠性。社区反应：多位用户反馈在代码库调查场景下频繁遇到该问题，已标记为需回归测试。
2. #21409：通用代理无限挂起，优先级P1，8评论8赞。重要性：基础功能故障，简单文件操作都会导致cli卡死，影响核心使用体验。社区反应：高赞，大量用户反馈升级v0.33.0后出现，关闭子代理可临时规避。
3. #28555对应的PR？不，Issue是#26525：Auto Memory日志安全风险，优先级P2，4评论。重要性：记忆提取代理会向模型发送未脱敏的本地会话内容，存在敏感信息泄露风险。社区反应：安全团队重点关注，已关联SSRF修复PR推进。
4. #26522：Auto Memory低信号会话无限重试，优先级P2，5评论。重要性：背景提取任务会无限循环处理低价值会话，占用计算资源。社区反应：多位开发者反馈后台资源占用异常升高。
5. #25166：Shell命令执行后卡在“等待输入”，优先级P1，4评论3赞。重要性：基础命令执行流程故障，导致任务流程中断。社区反应：用户反馈在简单命令执行后频繁出现，需强制终止cli。
6. #27913：ACP会话加载不恢复记忆，优先级P1，2评论。重要性：违反ACP协议声明，影响第三方集成场景下的会话连续性。社区反应：ACP集成开发者集中反馈。
7. #21983：浏览器子代理在Wayland下失败，优先级P1，4评论1赞。重要性：Linux Wayland环境核心功能不可用。社区反应：Wayland用户反馈无法使用浏览器自动化功能。
8. #24246：超过128个工具时报400错误，优先级P2，3评论。重要性：工具扩展能力受限，影响复杂工作流搭建。社区反应：自定义工具较多的用户频繁遇到该上限问题。
9. #21968：模型不主动使用自定义技能和子代理，优先级P2，6评论。重要性：降低自动化效率，需要用户手动指令才触发相关能力。社区反应：多位高级用户反馈自定义技能利用率极低。
10. #22672：代理未阻止危险操作，优先级P2，3评论1赞。重要性：存在数据丢失风险，如强制git重置、删库等操作无预警。社区反应：企业用户重点关注，要求增加危险操作拦截机制。

然后重要PR进展，选10个：
1. #28691：修复$VAR/${VAR}变量注入绕过漏洞（GHSA-wpqr-6v78-jr5g），优先级P1，安全类。内容：补全了bash和PowerShell变量替换检测的缺失逻辑，堵住安全网关绕过漏洞，同时加固了自动化问题去重工作流。重要性：高危安全漏洞修复，影响所有用户的命令执行安全。
2. #28557：修复web-fetch.ts的SSRF漏洞，优先级P1，安全类。内容：将同步DNS解析改为异步，修复了域名形式的私有IP地址可绕过拦截的问题，防止访问云元数据等内网资源。重要性：高危安全漏洞，防止内网渗透风险。
3. #28672：修复/compress会话重载及配额回退工具响应丢失，优先级P1，核心类。内容：修复了会话压缩失败、配额错误后工具响应丢失导致的上下文损坏问题，保障会话稳定性。重要性：解决核心会话管理故障，避免上下文丢失。
4. #28639： guarding formatTruncatedToolOutput防止非正maxChars导致输出膨胀，优先级P1，核心类。内容：修复了maxChars为0或负数时，字符串切片异常导致输出膨胀2倍的问题，增加回归测试。重要性：修复基础工具输出逻辑错误，避免上下文浪费。
5. #28681：新增SGLang及OpenAI兼容本地端点支持，优先级P1，核心+CLI类。内容：扩展模型后端支持，允许用户接入SGLang及符合OpenAI规范的本地模型服务。重要性：丰富模型生态，满足本地部署和自定义模型需求。
6. #28664：MCP服务器配置全量展示及stdio环境加固，核心类。内容：扩展MCP扩展更新时的 consent 提示，展示env/cwd/headers等全量配置，同时加固stdio环境参数校验。重要性：提升MCP扩展安全性，避免配置篡改风险。
7. #28640：修复ProjectIdRequiredError文档链接失效，优先级P1，核心类。内容：更新认证错误提示的跳转链接，修复旧链接404问题，同时添加文档重定向。重要性：降低新用户认证问题排查成本。
8. #28641：修复极窄终端宽度下幽灵文本换行无限循环，优先级P2，CLI类。内容：修复了终端宽度小于单个宽字符（如CJK、emoji）时的无限循环bug，增加回归测试。重要性：提升低宽度终端下的使用稳定性。
9. #28530：新增Caretaker Agent问题分类评估框架，核心类。内容：实现了并行评估运行器、LLM-as-a-Judge评分规则，用于Issue自动分类流程的基准测试。重要性：提升社区Issue自动化处理效率。
10. #28597：修复环境变量加载时序导致的settings解析错误，优先级P2，核心类。内容：修复了本地.env文件加载晚于settings解析导致的占位符无法正确替换的问题。重要性：提升配置加载的可靠性，避免自定义配置失效。

然后功能需求趋势，从Issues里提炼：
1. 子代理与自动化能力优化：子代理稳定性（#22323、#21409）、主动调用能力（#21968）、轨迹可视化（#22598）是高频需求，社区希望子代理能更稳定、更智能地融入工作流。
2. 安全与隐私加固：Auto Memory的敏感信息脱敏（#26525）、SSRF/命令注入漏洞修复（#28555、#28691）、危险操作拦截（#22672）是社区重点关注方向，尤其是企业用户对数据安全要求极高。
3. 性能与体验优化：终端resize卡顿（#21924）、外部编辑器退出后界面损坏（#24935）、工具上限调整（#24246）是用户体验类的高频需求。
4. 多模型与集成扩展：本地模型支持（#28681相关需求）、AST感知代码工具（#22745）、ACP协议完善（#27913）是技术集成类的主要需求。
5. 记忆系统可靠性：Auto Memory的低信号会话过滤（#26522）、无效补丁隔离（#26523）、会话记忆恢复（#27913）是记忆功能优化的核心方向。

然后开发者关注点，总结痛点和高频需求：
1. 稳定性痛点：子代理无限挂起、Shell命令执行后卡顿、会话压缩失败是当前最高频的故障，影响核心使用流程，社区期待优先修复。
2. 安全漏洞 urgency：SSRF、变量注入等高危漏洞的披露引发开发者对命令执行安全的担忧，尤其是自定义工具和MCP扩展场景下的安全防护需求强烈。
3. 配置与兼容性：settings加载时序错误、终端宽度兼容性问题、Wayland环境适配等边缘场景的bug影响特定用户群体的使用体验，期待更完善的兼容性测试。
4. 能力边界拓展：超过400工具的调用上限、本地模型接入、AST感知代码工具等需求反映出开发者希望Gemini CLI能支持更复杂的工程场景，摆脱当前的工具和模型限制。
5. 自动化效率：自定义技能调用率低、子代理轨迹不可见、危险操作无拦截等问题导致开发者需要大量手动干预，期待提升代理的自主性和可控性。

等下，要注意每个Issue和PR都要带链接？对，要求每个条目附GitHub链接。还有要注意语言简洁专业，适合技术开发者。哦对，版本发布部分因为没有新的Releases，所以直接说无新版本发布就行？对，数据里最新 Releases（过去24小时）是无，所以版本发布部分就写“### 版本发布
无过去24小时内的新版本发布，当前最新 nightly 版本为 0.47.0-nightly.20260605.g4196596f7（PR #27680）”。

然后检查有没有符合要求，不要思考过程，直接输出。对了，热点Issues要选10个，刚才选的那10个没问题，都是评论多或者优先级高的。PR也是选10个重要的，尤其是安全和核心修复的。然后功能需求趋势和开发者关注点要贴合数据里的内容，不要瞎编。

等下，有没有漏的？比如那个浏览器子代理的Wayland问题，还有ACP的会话问题，都放进去了。还有Auto Memory的几个问题也都放进去。PR里的安全相关的两个P1的肯定要放，然后核心修复的几个，还有模型支持的。

对了，链接的格式要对，比如Issue #22323的链接是 https://github.com/google-gemini/gemini-cli/issues/22323 ，PR的是 https://github.com/google-gemini/gemini-cli/pull/对应的编号。

现在整理成结构清晰的格式：

首先标题：Gemini CLI 社区动态日报（2026-08-05）

然后各个部分：

## 今日速览
2026-08-05 Gemini CLI 社区无新版本发布，核心迭代与问题修复持续推进：当日共 50 条 Issue 更新、26 条 PR 更新，重点聚焦子代理稳定性、高危安全漏洞修复、Auto Memory 系统优化及多模型支持扩展，其中 SSRF、变量注入等安全修复 PR 引发社区高度关注。

## 版本发布
无过去24小时内的新版本发布，当前最新 nightly 版本为 0.47.0-nightly.20260605.g4196596f7（[PR #27680](https://github.com/google-gemini/gemini-cli/pull/27680)）。

## 社区热点 Issues（共10条）
1. [#22323](https://github.com/google-gemini/gemini-cli/issues/22323) 子代理 MAX_TURNS 中断被误报为目标达成（优先级 P1，12 评论，2 赞）
   重要性：该 bug 会导致自动化任务状态误判，掩盖真实的执行中断问题，严重影响依赖子代理的自动化流程可靠性。
   社区反应：代码库调查场景用户反馈频繁，已标记为 `need-retesting` 等待回归验证。
2. [#21409](https://github.com/google-gemini/gemini-cli/issues/21409) 通用代理无限挂起（优先级 P1，8 评论，8 赞）
   重要性：核心功能故障，简单文件操作、命令执行都会导致 CLI 卡死，无法自动恢复。
   社区反应：高赞需求，大量用户反馈升级 v0.33.0 后触发，关闭子代理可临时规避。
3. [#26525](https://github.com/google-gemini/gemini-cli/issues/26525) Auto Memory 未脱敏发送会话内容（优先级 P2，4 评论）
   重要性：背景提取代理会直接将本地会话内容发送给模型，仅依赖模型端脱敏，存在敏感信息泄露风险。
   社区反应：安全团队重点关注，已关联 SSRF 修复 PR 同步推进安全加固。
4. [#26522](https://github.com/google-gemini/gemini-cli/issues/26522) Auto Memory 低信号会话无限重试（优先级 P2，5 评论）
   重要性：背景提取任务会无限制循环处理低价值会话，持续占用系统计算资源。
   社区反应：多位开发者反馈后台 CPU/内存占用异常升高，期待增加低信号过滤机制。
5. [#25166](https://github.com/google-gemini/gemini-cli/issues/25166) Shell 命令执行后卡在“等待输入”（优先级 P1，4 评论，3 赞）
   重要性：基础命令执行流程故障，已完成的命令仍显示为等待用户输入，导致任务流程中断。
   社区反应：简单命令场景下高频触发，用户需强制终止 CLI 才能恢复。
6. [#27913](https://github.com/google-gemini/gemini-cli/issues/27913) ACP 会话加载不恢复对话记忆（优先级 P1，2 评论）
   重要性：违反 ACP 协议 `loadSession: true` 的声明，影响第三方工具集成时的会话连续性。
   社区反应：ACP 集成开发者集中反馈，无法在会话重载后保留上下文。
7. [#21983](https://github.com/google-gemini/gemini-cli/issues/21983) 浏览器子代理在 Wayland 下失效（优先级 P1，4 评论，1 赞）
   重要性：Linux Wayland 环境下浏览器自动化功能完全不可用，覆盖大量 Linux 开发者用户。
   社区反应：Wayland 用户反馈无法使用浏览器相关自动化能力，期待适配。
8. [#24246](https://github.com/google-gemini/gemini-cli/issues/24246) 工具数量超过 128 个时报 400 错误（优先级 P2，3 评论）
   重要性：工具调用上限过低，限制复杂工作流的搭建，无法支持大规模自定义工具场景。
   社区反应：自定义工具较多的用户频繁触发该错误，呼吁提高上限或实现动态工具裁剪。
9. [#21968](https://github.com/google-gemini/gemini-cli/issues/21968) 模型不主动调用自定义技能与子代理（优先级 P2，6 评论）
   重要性：大幅降低自动化效率，需要用户手动明确指令才会触发相关能力，违背自动化设计初衷。
   社区反应：高级用户反馈自定义技能利用率极低，期待优化代理的工具调用策略。
10. [#22672](https://github.com/google-gemini/gemini-cli/issues/22672) 代理未拦截危险操作（优先级 P2，3 评论，1 赞）
    重要性：存在数据丢失风险，如无预警执行 `git reset --force`、强制删库等危险命令。
    社区反应：企业用户重点关注，要求增加危险操作拦截和二次确认机制。

## 重要 PR 进展（共10条）
1. [#28691](https://github.com/google-gemini/gemini-cli/pull/28691) 修复 $VAR/${VAR} 变量注入绕过漏洞（GHSA-wpqr-6v78-jr5g，优先级 P1，安全类，Large）
   内容：补全 `detectBashSubstitution()` 和 `detectPowerShellSubstitution()` 的缺失检测逻辑，堵住安全网关绕过漏洞，同时加固自动化问题去重工作流。高危安全漏洞修复，影响所有用户的命令执行安全。
2. [#28557](https://github.com/google-gemini/gemini-cli/pull/28557) 修复 web-fetch SSRF 漏洞（优先级 P1，安全类，Medium）
   内容：将同步 DNS 解析改为异步，修复域名形式的私有 IP 地址可绕过 `isBlockedHost` 拦截的问题，防止访问云元数据、内网服务等敏感资源。高危安全漏洞修复，降低内网渗透风险。
3. [#28672](https://github.com/google-gemini/gemini-cli/pull/28672) 修复 /compress 会话重载失败及配额回退响应丢失（优先级 P1，核心类，Large）
   内容：修复会话压缩时的初始化失败问题，以及配额错误、用户 ESC 中断后工具响应丢失导致的上下文损坏问题，保障会话稳定性。
4. [#28639](https://github.com/google-gemini/gemini-cli/pull/28639)  guarding 工具输出截断逻辑防止输出膨胀（优先级 P1，核心类，Small）
   内容：修复 `formatTruncatedToolOutput` 在 `maxChars <= 0` 时的异常切片行为，避免输出膨胀 2 倍，增加回归测试。
5. [#28681](https://github.com/google-gemini/gemini-cli/pull/28681) 新增 SGLang 及 OpenAI 兼容本地端点支持（优先级 P1，核心+CLI 类，XL）
   内容：扩展模型后端支持，允许用户接入 SGLang 服务及符合 OpenAI 规范的本地模型服务，丰富模型生态。
6. [#28664](https://github.com/google-gemini/gemini-cli/pull/28664) MCP 服务器配置全量展示及 stdio 环境加固（核心类，Large）
   内容：扩展 MCP 扩展更新时的 consent 提示，展示 `env`/`cwd`/`headers` 等全量配置，同时加固 stdio 环境参数校验，避免配置篡改风险。
7. [#28640](https://github.com/google-gemini/gemini-cli/pull/28640) 修复认证错误文档链接失效（优先级 P1，核心类，XS）
   内容：更新 `ProjectIdRequiredError` 的跳转链接，修复旧文档链接 404 问题，同时添加文档重定向，降低新用户排查成本。
8. [#28641](https://github.com/google-gemini/gemini-cli/pull/28641) 修复极窄终端宽度下幽灵文本换行无限循环（优先级 P2，CLI 类，Small）
   内容：修复终端宽度小于单个宽字符（CJK、emoji）时的无限循环 bug，增加回归测试，提升低宽度终端下的使用稳定性。
9. [#28530](https://github.com/google-gemini/gemini-cli/p

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI 社区动态日报（2026-08-05）
## 今日速览
过去24小时项目发布2个补丁版本v1.0.79-1与v1.0.79-2，分别修复配置项兼容性与终端提示行适配问题；社区共更新42条Issue，MCP兼容性、企业特性、会话管理相关讨论最活跃，另有2条公开PR待审阅。

## 版本发布
### v1.0.79-2
- 优化提示行布局：将当前固定提示上移至标签栏预留行，减少时间线占用，同时保持提示样式一致
- 默认关闭30行以下终端的固定提示功能，避免遮挡输出，用户可通过`pinnedPrompts`配置手动开启
### v1.0.79-1（Breaking Change）
- 沙盒配置项`allowDevToolCaches`正式重命名为`allowDevToolAccess`，旧配置项已停止读取且静默忽略，若之前设置为`false`会自动恢复默认开启状态，请及时迁移配置文件
> 版本链接：[v1.0.79-2](https://github.com/github/copilot-cli/releases/tag/v1.0.79-2) | [v1.0.79-1](https://github.com/github/copilot-cli/releases/tag/v1.0.79-1)

## 社区热点 Issues（Top 10）
1. [#1504 添加自定义主题支持](https://github.com/github/copilot-cli/issues/1504)（OPEN | 8评 | 23赞）
   社区呼声最高的功能需求，用户希望支持自定义可共享主题（如JSON格式配置文件），目前处于长期待实现状态，是界面定制类需求的核心方向。
2. [#1697 会话分叉功能](https://github.com/github/copilot-cli/issues/1697)（OPEN | 3评 | 25赞）
   支持将当前对话分叉为并行会话并共享上下文，解决多任务并行时上下文丢失的痛点，获赞数仅次于主题需求，用户参与度极高。
3. [#1285 企业级Agent不显示](https://github.com/github/copilot-cli/issues/1285)（OPEN | 7评 | 9赞）
   私有仓库下定义的Agent无法在CLI及VS Code中展示，企业用户自定义Agent的核心使用路径受阻，目前仍在排查中。
4. [#2692 Web Search工具MCP报错](https://github.com/github/copilot-cli/issues/2692)（CLOSED | 6评 | 2赞）
   github-mcp-server的Web Search工具调用时报`Streamable HTTP error`，已确认关闭，疑似MCP服务端兼容性问题。
5. [#4328 WSL2下Ctrl+H快捷键异常](https://github.com/github/copilot-cli/issues/4328)（OPEN | 5评）
   Windows Terminal环境变量泄漏导致WSL2下Ctrl+H被误判为删除整词，影响基础输入体验，跨平台输入适配问题持续暴露。
6. [#4005 企业计费实体未选择导致无法保存记忆](https://github.com/github/copilot-cli/issues/4005)（OPEN | 4评 | 3赞）
   企业部署环境下Copilot记忆功能失效，提示计费实体未选择，影响上下文记忆能力的正常使用。
7. [#4202 内置view工具误报路径不存在](https://github.com/github/copilot-cli/issues/4202)（OPEN | 4评 | 1赞）
   1.0.73版本起内置view工具对已存在文件报路径不存在，1.0.71版本正常，已定位为版本回归问题。
8. [#4370 v1.0.79-1 MCP初始化失败](https://github.com/github/copilot-cli/issues/4370)（OPEN | 2评 | 1赞）
   新版本调用未实现`server/discover`方法的MCP服务器（如FastMCP）时初始化失败，影响自定义MCP工具的使用。
9. [#4349 企业托管设置策略校验失败](https://github.com/github/copilot-cli/issues/4349)（OPEN | 1评 | 0赞）
   企业返回的合法权限配置值`"enable"`被CLI校验拒绝，导致所有本地/自定义MCP服务器被阻止，企业MCP生态适配问题。
10. [#4364 macOS下企业MCP注册中心TLS验证失败](https://github.com/github/copilot-cli/issues/4364)（OPEN | 0评 | 0赞）
    私有CA证书被rustls拒绝，导致所有MCP服务器无法连接，影响macOS企业用户的MCP工具使用。

## 重要 PR 进展
1. [#4355 合并请求](https://github.com/github/copilot-cli/pull/4355)（OPEN | XavierMP14提交）
   待审阅的常规合并PR，暂无公开功能说明。
2. [#4366 安全合规修复PR](https://github.com/github/copilot-cli/pull/4366)（OPEN | vault-chatops[bot]提交）
   针对copilot-cli的基础安全漏洞修复，需要维护者替换所有`<UPDATE_ME>`占位符后合并，完成合规整改。

## 功能需求趋势
从全部42条Issue提炼，社区关注度最高的三个方向为：
1. **个性化体验升级**：自定义主题、会话分叉/云同步、持久化上下文显示等会话管理与界面定制需求占比最高，是用户期待的核心功能方向。
2. **企业级特性完善**：Agent管理、托管设置兼容、计费实体配置、私有MCP生态支持是企业用户的核心诉求，相关Issue讨论热度持续上升。
3. **兼容性与稳定性修复

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

⚠️ 摘要生成失败。

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

⚠️ 摘要生成失败。

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

⚠️ 摘要生成失败。

</details>

---
*本日报由 [agents-radar](https://github.com/huang-yi-dae/agents-radar) 自动生成。*