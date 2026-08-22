# AI CLI 工具社区动态日报 2026-08-23

> 生成时间: 2026-08-23 02:30 (GMT+8) | 覆盖工具: 7 个 CLI + Claude Code Skills
> 本日报由 agents-radar 本地自动化生成，所有摘要/对比/撰写均由执行代理人工完成，未调用任何外部大模型 API。

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

# AI CLI 工具社区动态横向对比分析报告（2026-08-23）

## 1. 生态全景

今日 AI CLI 赛道最值得记录的不是某个 release，而是**口碑天平的可测量位移**。Hacker News 当日最高赞技术帖是《A week of using Codex more than Claude》（94👍 / 104💬），紧随其后是《Anthropic appears to be A/B testing reduced effort levels in Claude Code》（51👍 / 45💬）；而 Claude Code 仓库内长期第一高赞 issue #77136「模型越来越倾向于重复性修辞腔调」已累积 **343👍 / 60💬**。三条独立信号指向同一件事：**用户开始怀疑"同一个订阅买到的智能在缩水"**——这是比功能缺失更难修的信任问题。

但另一侧同样不太平。Codex 在 08-21 更新后立刻出现 #40075「Shell Helper / PowerShell / Git 命令全部无法执行」的回归，属于「核心能力当天崩」级别的事故。所以今天的准确描述不是"Codex 赢了"，而是**两家头部产品同时在为高速迭代付出体验税，用户正在用脚投票测量哪边的税更低**。

主干节奏上，今天出现清晰的三档分层：**日更稳定档**（Claude Code v2.1.240、Gemini nightly、Qwen v0.22.0 正式版）、**alpha 冲刺档**（Codex rust-v0.150.0-alpha.2/.3/.5/.6 一天内连发 4 个预发布）、**冻结档**（Copilot CLI 停在 08-14 的 v1.0.81-7、Kimi 停在 07-16 的 1.49.0）。

## 2. 各工具活跃度对比（近 24h）

| 工具 | 活跃 Issues（新建） | PR（新建） | Releases（近期） |
|------|-------------------|-----------|----------------|
| Claude Code | 100+（41 条新建） | 0（仓库不开放外部 PR） | **v2.1.240（08-22）**、v2.1.239（08-21） |
| OpenAI Codex | 100+（40 条新建） | 0（仓库不开放外部 PR） | rust-v0.150.0-alpha.6/.5/.3/.2（08-21） |
| Gemini CLI | 100+（1 条新建） | 0 | v0.56.0-nightly.20260822、v0.57.0-preview.0 |
| GitHub Copilot CLI | 8（2 条新建） | 0 | v1.0.81-7（08-14，**8 天未发新版**） |
| Kimi Code CLI | 3（0 条新建） | 2 | 1.49.0（07-16，**37 天未发新版**） |
| OpenCode | 62（43 条新建） | 38（29 条新建） | v1.18.21 / v1.18.20（08-21） |
| Qwen Code | 10（3 条新建） | **90（27 条新建）** | **v0.22.0（08-22）**、v0.21.14-nightly.20260822 |
| Claude Code Skills | 3（1 条新建） | 8（5 条新建） | — |

> 读表提示：Claude Code / Codex / Gemini 的 issue 计数触及 API 单页上限（100），其中相当比例是历史 issue 被 bot 刷新标签，故上表额外标注「新建」列——**新建数才是当日真实增量**。按此口径，Gemini CLI 今日近乎静默（仅 1 条新 issue，标题只有一个词 "edge"），而 OpenCode 的 43 条新 issue 是全场最高。

## 3. 共同关注的功能方向

- **空响应与中途截断，正在从"偶发 bug"升级为"计费黑洞"**：OpenCode 今日新开 #44148「Go plan 上出现空 completion（finish_reason=other）与长推理请求的中途截断」，与既有 #41469「空 LLM 响应导致会话静默停止（finish: unknown, 0 tokens）」、#32149「无响应停止处理」构成同一条故障链。Zeroclaw 侧的 PR #9447「classify incomplete terminal responses」是同一命题的工程解法。共性诉求已经很明确：**失败必须可归因，不能既扣了 token 又当成"干净结束"**。
- **记忆持久化是今日跨工具共识度最高的缺口**：Kimi #1283「Memory System — 跨会话持久上下文」以 40💬 成为该仓库讨论第一（且有中文 issue #1478「能否优化记忆层？搞大项目的时候很痛苦」直接呼应）；Codex #18343 要求「分层记忆管理（global / project / hybrid / per-thread）」；Claude Code #88862 是一份高质量田野报告——「多个并发会话共用一个 git clone，实测碰撞并给出三种用户态缓解方案」。三者从不同角度指向同一个事实：**记忆与并发隔离仍是各家都没做完的地基**。
- **Windows 依旧是全赛道公摊的技术债**：Claude Code #88818（MSIX 包异常关闭后无法启动，提示需重装）、#88864（Qemu 虚拟机 arm64 正常但 x86+KVM 100% CPU 永久挂起）、#85891（Win11 主窗口强制置顶）；Codex #39209（rollout 路径使用 `\\?\` 前缀时归档报 os error 2）、#39170（启用高级功能后 15–40 秒内丢失 ChatGPT 鉴权）、#40075（08-21 更新后 PowerShell/Git 全挂）；Copilot CLI #4111（原地自动更新后长会话仍在执行旧代码）。反向印证的是 OpenCode PR #44214——**直接上原生 Windows ARM64 桌面端（Electron 38）**，把 Windows 当一等公民做，是当前最实的差异化切口。
- **Skills 安全边界首次被正面击穿**：`anthropics/skills` 今日新开 #1631「run_eval.py 中未净化的 skill_name 导致路径穿越」。这是一条真实漏洞，不是功能请求。配合 PR #1629 / #1630（修复 eval harness 三处缺陷，此前会静默报出 0.0 触发率）可以读出：**Skills 生态正从"能不能跑"进入"跑得可信不可信"阶段**，而评测工具自身的正确性是第一道门。

## 4. 差异化定位

- **Claude Code**：v2.1.240 保持日更，工程节奏没问题，但**声誉侧承压最重**。#77136（343👍）指控输出腔调劣化、#87640 报告 Fable 5 的 `[reasoning_extraction]` 安全护栏对单词问候语误报、#84352（139💬）反映已通过 CVP 审核的组织仍被安全护栏拦截。再叠加 HN 上的 A/B 降智猜测，其核心矛盾已从「功能够不够」变成**「护栏与降本是否在悄悄侵蚀我付费买到的能力」**。这类问题只能靠透明度而非补丁解决。
- **OpenAI Codex**：一天连发 4 个 alpha，是全场迭代最激进的。社区最想要的仍是跨端连续性——#5609「在 ChatGPT 网页端与 VSCode 内的 Codex 之间同步会话历史」（66👍）与 #27565「类 Claude Code 的远程控制」（15👍）。但激进的代价是 #40075 这类当日回归，以及 #37475（0.147.0 拒收 Amazon Bedrock 输入并破坏 subagent 交接）、#22844（远程 SSH 下 `@browser` 不可用）。定位是**OpenAI 全端统一入口，用稳定性换取速度**。
- **Gemini CLI**：nightly 照常滚（v0.56.0-nightly.20260822），但社区侧今日几乎无声——唯一新建 issue #28964 标题仅一个词。存量痛点仍卡在准入与信任：#28912「提示无有效许可证」（18💬）、#28341「无限鉴权循环」、#22323「subagent 在 MAX_TURNS 后被误报为 GOAL 成功，掩盖了中断」。**#22323 是今日全赛道最危险的一类 bug——失败被上报成成功，会污染一切自动化评测**。
- **GitHub Copilot CLI**：8 天未发新版，issue 总量仅 8 条，但诉求高度收敛且一致：#3709（27👍）与 #3282（26👍）都是「一个会话内切换多个 BYOK / 本地模型」。今日新开 #4566「Agent 反复口头确认工作但不实际执行工具调用」，是典型的 agent 可信度问题。定位仍是**企业受管环境入口，模型自由度是其最大的用户张力**。
- **Kimi Code CLI**：37 天未发新版，今日 0 条新建 issue，外部声量为全场最低。有价值的信号只有一条：#1283（40💬）证明**即使在低活跃仓库，记忆系统也是最高优先级的用户诉求**。两条 PR（#2594 修复 StrReplaceFile 编辑丢失非 UTF-8 字节、#2614 补插件安全与持久化数据文档）说明维护者仍在，只是节奏极慢。
- **OpenCode**：**今日新建 issue（43）与新建 PR（29）双榜第一，是社区活跃度冠军**。既有高赞 #7101「支持全局/项目级自定义系统提示词」（127👍，已关闭）、#5121「Windows winget 安装」（27👍）反映其用户极重可定制。新 PR 组合能看出打磨方向非常"工程":#44127（消除冗余 git 子进程 spawn，改用无 spawn 的未跟踪文件统计）、#44218（在未跟随的会话分配状态前就丢弃事件）、#44197（清理剪贴板文本）、#44219（为 Cloudflare AI Gateway 统一路由翻译带点号的 Anthropic 模型 id）。另外 #39845（27👍 / 22💬）值得单独标注——「DeepSeek V4 Flash 突然要求开启『启用中国托管模型』开关」，是**地缘合规开始直接影响开发者日常工作流**的实例。
- **Qwen Code**：**PR 体系工业化程度全场第一（90 条活跃 / 27 条新建），且今日发布 v0.22.0 正式版**。高讨论 PR 集中在 provider 广度与缓存效率：#8368（接入 Kimi 与小米 MiMo，72💬）、#8332（附件音频桥，70💬）、#8276（跨延迟工具发现保留 prompt cache，64💬）。今日新 PR 更偏可靠性内核：#9705（在实时会话重放期间保持 in-flight 工具调用为 pending）、#9718（依据模型声明来收敛 skill 公告）、#9745（为修复轮次设预算，且其超时不计入总上限）。唯一需要警惕的是 issue #9733——**loop detection 在正常校验循环上误判，直接杀掉无人值守的 turn**，这是自动化场景的致命伤。
- **Claude Code Skills**：今日主题就是**安全与评测自净**。#1631 路径穿越（新建）、#1252（`product-self-knowledge` 在文档 URL 抓取失败时降级为公网搜索——静默降级即数据来源不可控）、#1559 + PR #1629 / #1630（eval harness 会对可用描述误报 0% 触发率，并新增 `--scan-full-turn` 以测量 skill 是否真的触发）。可以概括为：**Skills 正在补齐"可验证"这一环**。

## 5. 值得关注的趋势信号

- **信任正在成为比功能更硬的竞争壁垒。** 今天最贵的三条信号——Claude 腔调劣化（343👍）、HN 降智 A/B 猜测（51👍）、Gemini 失败误报成功（#22323）——全都不是"少了什么功能"，而是"我不敢确定它是否照我以为的方式在工作"。**能率先把 effort 等级、护栏触发、失败原因做成可观测面板的产品，会拿到不对称优势。**
- **激进迭代与当日回归已成常态，用户开始把"回归频率"当选型指标。** Codex 一天 4 个 alpha 对应 #40075 核心命令全挂；OpenCode 一天 29 个新 PR 但同时新开 43 个 issue。**高速度不再自动等于领先，回归率才是真实的迭代质量。**
- **合规与地缘正在下沉到 CLI 层。** OpenCode #39845（DeepSeek V4 Flash 需显式开启"中国托管模型"）说明模型可用性已不只是技术问题。多 provider 抽象（Qwen #8368、Zeroclaw Hailo-Ollama）的真实价值，正在从"性价比选择"转向"合规兜底"。
- **Skills 已过了"能用"阶段，正在进入"可审计"阶段。** 同一天里，GitHub Trending 上出现 3 个 Skills 相关项目（mattpocock/skills、obra/superpowers、andrej-karpathy-skills），而 `anthropics/skills` 内部在修路径穿越和评测误报。**生态热度与安全成熟度出现明显时间差，这个差就是未来事故的窗口。**

---

## 各工具动态明细

### Claude Code（[anthropics/claude-code](https://github.com/anthropics/claude-code)）

**Releases**：[v2.1.240](https://github.com/anthropics/claude-code/releases/tag/v2.1.240)（08-22）、[v2.1.239](https://github.com/anthropics/claude-code/releases/tag/v2.1.239)（08-21）、v2.1.238 / v2.1.237（08-20）——保持接近日更的稳定节奏。

**高热度存量 issue**

| Issue | 热度 | 说明 |
|-------|------|------|
| [#77136](https://github.com/anthropics/claude-code/issues/77136) | 343👍 / 60💬 | Claude 4.7 / 4.8 / 5.0 与 Fable 越来越倾向重复性修辞腔调——该仓库长期第一高赞，属输出质量的系统性投诉 |
| [#32479](https://github.com/anthropics/claude-code/issues/32479) | 140👍 / 90💬 | Claude Desktop 已连接 GitHub Connector 但 Claude 不识别 |
| [#84352](https://github.com/anthropics/claude-code/issues/84352) | 22👍 / 139💬 | 已通过 CVP 审核的组织仍被 cyber safeguard 拦截——护栏误伤企业客户 |
| [#6305](https://github.com/anthropics/claude-code/issues/6305) | 16👍 / 40💬 | Post/PreToolUse Hooks 不执行 |
| [#64630](https://github.com/anthropics/claude-code/issues/64630) | 25👍 / 17💬 | macOS 登录不走系统默认浏览器 |
| [#42700](https://github.com/anthropics/claude-code/issues/42700) | 24👍 / 17💬 | 远程控制会话希望支持 TTS 朗读与语音模式 |
| [#87640](https://github.com/anthropics/claude-code/issues/87640) | 13👍 / 8💬 | Fable 5 的 `[reasoning_extraction]` 护栏对单词问候语误报 |

**今日新建（41 条，摘其要）**

- [#88862](https://github.com/anthropics/claude-code/issues/88862) — 田野报告：多并发会话共用同一个 git clone，作者实测出碰撞并给出三种用户态缓解方案。**今日质量最高的一条用户投稿，直指并发隔离缺位。**
- [#88818](https://github.com/anthropics/claude-code/issues/88818) — Windows MSIX 包在意外关闭后无法启动，提示"需要重新安装"。
- [#88865](https://github.com/anthropics/claude-code/issues/88865) — VSCode 扩展中出现被凭空注入的 tool-call / tool-result 块。**伪造的工具调用记录会直接破坏会话可信度。**
- [#88864](https://github.com/anthropics/claude-code/issues/88864) — Qemu 虚拟机：arm64 正常，x86+KVM 永久挂起（100% CPU），纯 x86 崩溃。
- [#88860](https://github.com/anthropics/claude-code/issues/88860) — 移动端 GUI 的 effort 滑块在打开会话时不反映真实 effort 等级。**结合 HN 上的降智猜测，effort 可见性正在变成敏感问题。**
- [#88847](https://github.com/anthropics/claude-code/issues/88847) — Cowork 与 Chrome 集成问题。

### OpenAI Codex（[openai/codex](https://github.com/openai/codex)）

**Releases**（08-21 一天连发 4 个预发布）：[rust-v0.150.0-alpha.6](https://github.com/openai/codex/releases/tag/rust-v0.150.0-alpha.6)、[alpha.5](https://github.com/openai/codex/releases/tag/rust-v0.150.0-alpha.5)、[alpha.3](https://github.com/openai/codex/releases/tag/rust-v0.150.0-alpha.3)、[alpha.2](https://github.com/openai/codex/releases/tag/rust-v0.150.0-alpha.2)，另有 rust-v0.149.0-alpha.7.1。

**高热度存量 issue**

| Issue | 热度 | 说明 |
|-------|------|------|
| [#5609](https://github.com/openai/codex/issues/5609) | 66👍 / 8💬 | 在 ChatGPT 网页端与 VSCode 内 Codex 之间同步会话历史——最高赞诉求，本质是跨端连续性 |
| [#22844](https://github.com/openai/codex/issues/22844) | 25👍 / 4💬 | 远程 SSH 下应用内浏览器侧栏可用但 `@browser` 不可用 |
| [#39162](https://github.com/openai/codex/issues/39162) | 24👍 / 36💬 | macOS：打开已有会话会使 ChatGPT 鉴权失效并触发重定向 |
| [#37475](https://github.com/openai/codex/issues/37475) | 22👍 / 7💬 | CLI 0.147.0 拒收 Amazon Bedrock 输入并破坏 subagent 交接 |
| [#21128](https://github.com/openai/codex/issues/21128) | 21👍 / 38💬 | Desktop 静默隐藏全局 recent-50 窗口之外的项目会话 |
| [#39170](https://github.com/openai/codex/issues/39170) | 14👍 / 13💬 | Windows 桌面端启用高级功能后 15–40 秒内丢失 ChatGPT 鉴权 |
| [#18343](https://github.com/openai/codex/issues/18343) | 11👍 / 11💬 | 分层记忆管理（global / project / hybrid / per-thread） |
| [#20864](https://github.com/openai/codex/issues/20864) | 6👍 / 23💬 | Desktop 卡顿：全量扫描 `~/.codex/sessions` rollout 文件 |

**今日新建（40 条，摘其要）**

- [#40075](https://github.com/openai/codex/issues/40075) — **08-21 更新后回归：Shell Helper、PowerShell 与 Git 命令全部无法执行。今日全赛道最严重的一条当日回归。**
- [#40116](https://github.com/openai/codex/issues/40116) — App Server：为 workspaceWrite 类 turn 强制限定可读根目录（沙箱收紧）。
- [#40112](https://github.com/openai/codex/issues/40112) — Desktop：已完成的线程在重启后仍显示崩溃前的过期状态，而 rollout 与状态数据库已更新。
- [#40136](https://github.com/openai/codex/issues/40136) — 聊天行历史被截断至 3–4 条，且渲染出未转义的 HTML 实体（如 `&#x20;`）。
- [#40052](https://github.com/openai/codex/issues/40052) — Android：语音模式隐藏已连接的应用工具，切回文字模式后同一会话中又出现。

### Gemini CLI（[google-gemini/gemini-cli](https://github.com/google-gemini/gemini-cli)）

**Releases**：[v0.56.0-nightly.20260822](https://github.com/google-gemini/gemini-cli/releases/tag/v0.56.0-nightly.20260822.g5411f113c)、v0.56.0-nightly.20260821、[v0.57.0-preview.0](https://github.com/google-gemini/gemini-cli/releases/tag/v0.57.0-preview.0)（08-19）、v0.56.0 正式版（08-19）。

**今日社区侧近乎静默——唯一新建 issue [#28964](https://github.com/google-gemini/gemini-cli/issues/28964) 标题仅有一个词 "edge"。** 存量痛点集中在准入与 agent 可信度：

- [#28912](https://github.com/google-gemini/gemini-cli/issues/28912)（6👍 / 18💬）— 提示"您没有此产品的有效许可证"，卡在准入第一步。
- [#28341](https://github.com/google-gemini/gemini-cli/issues/28341)（9👍 / 7💬）— 无限鉴权循环。
- [#21409](https://github.com/google-gemini/gemini-cli/issues/21409)（8👍 / 8💬）— generalist agent 挂起。
- [#22323](https://github.com/google-gemini/gemini-cli/issues/22323)（2👍 / 13💬）— **subagent 在 MAX_TURNS 后的恢复被上报为 GOAL 成功，掩盖了中断。失败伪装成成功，是自动化评测的头号污染源。**
- [#26522](https://github.com/google-gemini/gemini-cli/issues/26522) — 自动记忆对低信号会话无限重试。
- [#21968](https://github.com/google-gemini/gemini-cli/issues/21968) — Gemini 对 skills 与 sub-agents 的利用不足。

### GitHub Copilot CLI（[github/copilot-cli](https://github.com/github/copilot-cli)）

**Releases**：v1.0.81-7（08-14）为最新，**已 8 天未发新版**。

- [#3709](https://github.com/github/copilot-cli/issues/3709)（27👍 / 5💬）与 [#3282](https://github.com/github/copilot-cli/issues/3282)（26👍 / 9💬）— 两条最高赞诉求指向同一件事：**在单个会话内切换多个 BYOK / 本地 provider 模型**。
- [#2306](https://github.com/github/copilot-cli/issues/2306)（3👍 / 7💬）— 提示需企业或组织授权才能使用该 Copilot 功能。
- [#4370](https://github.com/github/copilot-cli/issues/4370) — 1.0.79-1 在 `server/discover` 返回 `-32602` 时 MCP 初始化失败。
- [#4111](https://github.com/github/copilot-cli/issues/4111) — Windows：原地自动更新后仍打开的长会话继续执行旧代码。
- **今日新建**：[#4566](https://github.com/github/copilot-cli/issues/4566)「Agent 反复口头确认工作但不实际执行工具调用」——典型的"假装干活"可信度问题；[#4565](https://github.com/github/copilot-cli/issues/4565) 仓库配置问题告警。

### Kimi Code CLI（[MoonshotAI/kimi-cli](https://github.com/MoonshotAI/kimi-cli)）

**Releases**：1.49.0（07-16）为最新，**已 37 天未发新版**。今日 0 条新建 issue，为全场最静默。

- [#1283](https://github.com/MoonshotAI/kimi-cli/issues/1283)（40💬）— **Memory System：跨会话持久上下文。该仓库讨论量第一，印证记忆是跨工具共识缺口。**
- [#1478](https://github.com/MoonshotAI/kimi-cli/issues/1478) — 中文 issue：「能否优化记忆层？而且我也没在参考文档里看到和记忆有关的东西？搞大项目的时候很痛苦。」与 #1283 同源。
- PR [#2594](https://github.com/MoonshotAI/kimi-cli/pull/2594)（已合）— 修复 `StrReplaceFile` 编辑时丢失非 UTF-8 字节。
- PR [#2614](https://github.com/MoonshotAI/kimi-cli/pull/2614) — 补充插件安全与持久化数据文档。

### OpenCode（[anomalyco/opencode](https://github.com/anomalyco/opencode)）

**Releases**：[v1.18.21](https://github.com/anomalyco/opencode/releases/tag/v1.18.21) / [v1.18.20](https://github.com/anomalyco/opencode/releases/tag/v1.18.20)（08-21）、v1.18.19（08-20）。

**今日新建 issue 43 条 + 新建 PR 29 条，双项全场第一。**

**高热度 issue**

| Issue | 热度 | 说明 |
|-------|------|------|
| [#7101](https://github.com/anomalyco/opencode/issues/7101) | 127👍 / 35💬（已关闭） | 支持全局 / 项目 / 自定义目录级自定义系统提示词 |
| [#39845](https://github.com/anomalyco/opencode/issues/39845) | 27👍 / 22💬 | **DeepSeek V4 Flash 突然要求开启「启用中国托管模型」才能用于 OpenCode Go 订阅——地缘合规直接干扰日常工作流** |
| [#5121](https://github.com/anomalyco/opencode/issues/5121) | 27👍 / 18💬（已关闭） | Windows winget 安装方式 |
| [#34644](https://github.com/anomalyco/opencode/issues/34644) | 16👍 / 2💬 | Copilot Student 计划（Auto-only 模式）下 Copilot provider 未注册 |
| [#16349](https://github.com/anomalyco/opencode/issues/16349) | 14👍 / 7💬 | 支持左右面板布局互换 |
| [#41469](https://github.com/anomalyco/opencode/issues/41469) | 1👍 / 13💬 | 空 LLM 响应导致会话静默停止（finish: unknown, 0 tokens） |

**今日新建摘要**

- [#44148](https://github.com/anomalyco/opencode/issues/44148) — **Go plan 上出现空 completion（`finish_reason=other`）与长推理请求的中途截断。与 #41469 / #32149 构成同一条"静默失败"故障链。**
- [#44142](https://github.com/anomalyco/opencode/issues/44142) — 向 sub-agent 派发 shell 命令时工具执行被中止，任务异常终止。
- [#44151](https://github.com/anomalyco/opencode/issues/44151) — 请求提供 worktree 初始化脚本。
- PR [#44214](https://github.com/anomalyco/opencode/pull/44214) — **新增原生 Windows ARM64 桌面端（Electron 38）。把 Windows 当一等公民，是当前最实的差异化。**
- PR [#44127](https://github.com/anomalyco/opencode/pull/44127) — 消除冗余 git 子进程 spawn，改用无 spawn 的未跟踪文件统计（性能）。
- PR [#44219](https://github.com/anomalyco/opencode/pull/44219) — 为 Cloudflare AI Gateway 统一路由翻译带点号的 Anthropic 模型 id。
- PR [#44218](https://github.com/anomalyco/opencode/pull/44218) — 在未跟随的会话分配状态前就丢弃其事件（内存治理）。
- PR [#44197](https://github.com/anomalyco/opencode/pull/44197) — 清理剪贴板文本。

### Qwen Code（[QwenLM/qwen-code](https://github.com/QwenLM/qwen-code)）

**Releases**：**[v0.22.0](https://github.com/QwenLM/qwen-code/releases/tag/v0.22.0) 正式版（08-22）**、v0.21.14-nightly.20260822、v0.21.15（08-20）。

**PR 体系工业化程度全场第一：90 条活跃 / 27 条新建。**

**高讨论 PR（provider 广度与缓存效率）**

| PR | 讨论 | 内容 |
|----|------|------|
| [#8368](https://github.com/QwenLM/qwen-code/pull/8368) | 72💬 | 新增 Kimi 与小米 MiMo provider |
| [#8332](https://github.com/QwenLM/qwen-code/pull/8332) | 70💬 | 为附件新增音频桥 |
| [#8276](https://github.com/QwenLM/qwen-code/pull/8276) | 64💬 | 跨"延迟工具发现"保留 prompt cache |
| [#8902](https://github.com/QwenLM/qwen-code/pull/8902) | 44💬 | 从共享选项定义派生 bootstrap `--help` |
| [#9228](https://github.com/QwenLM/qwen-code/pull/9228) | 39💬 | 收窄 serve-ab 的自托管清理范围至 A/B checkout 目录 |

**今日新建 PR（转向可靠性内核）**

- [#9705](https://github.com/QwenLM/qwen-code/pull/9705)（14💬）— 在实时会话重放期间保持 in-flight 工具调用为 pending 状态。
- [#9709](https://github.com/QwenLM/qwen-code/pull/9709)（11💬）— 拒绝那些照抄 prompt 自带示例的会话标题。
- [#9718](https://github.com/QwenLM/qwen-code/pull/9718) — 依据模型的声明来收敛 skill 公告。
- [#9745](https://github.com/QwenLM/qwen-code/pull/9745) — 为修复轮次设预算，且其超时不计入总上限。
- [#9737](https://github.com/QwenLM/qwen-code/pull/9737) — 强制 utils 叶层依赖方向（架构债治理）。
- [#9729](https://github.com/QwenLM/qwen-code/pull/9729) — 回填会话与 PR 的绑定并刷新其合并状态。

**需警惕的 issue**：[#9733](https://github.com/QwenLM/qwen-code/issues/9733)「loop detection 在正常校验循环上误判，直接杀掉无人值守的 turn」——**自动化场景的致命伤，与 Gemini #22323 同属"检测机制自身出错"这一类。**

### Claude Code Skills（[anthropics/skills](https://github.com/anthropics/skills)）

今日主题为**安全与评测自净**：

- [#1631](https://github.com/anthropics/skills/issues/1631)（今日新建）— **`run_eval.py` 中未净化的 `skill_name` 导致路径穿越。真实漏洞，非功能请求。**
- [#1252](https://github.com/anthropics/skills/issues/1252) — `product-self-knowledge` skill 在文档 URL 抓取失败时降级为公网搜索。**静默降级意味着数据来源不可控。**
- [#1559](https://github.com/anthropics/skills/issues/1559) — `skill-creator` 的 `run_eval.py` 对本可工作的描述误报 0% 触发率。
- PR [#1629](https://github.com/anthropics/skills/pull/1629) — 修复 eval harness 三处会静默产生 0.0 触发率的缺陷。
- PR [#1630](https://github.com/anthropics/skills/pull/1630) — 新增 `--scan-full-turn`，让评测衡量「skill 是否真的触发过」而非仅看单点。
- PR [#1634](https://github.com/anthropics/skills/pull/1634) — 为 SKIP grep 模式加词边界锚定，避免在 "coherent" 上误命中。
- PR [#1633](https://github.com/anthropics/skills/pull/1633) / [#1632](https://github.com/anthropics/skills/pull/1632) — 重命名 algorithmic-art skill；修复 README 中指向不存在目录的引用。

Skills 生态的关键位移是：**评测工具自身的正确性，第一次被当作前置问题来修**。

---

*本日报由 [agents-radar](https://github.com/huang-yi-dae/agents-radar) 自动生成，所有内容基于 GitHub 公开 API 实时抓取并由执行代理人工撰写，未调用任何外部大模型。*
