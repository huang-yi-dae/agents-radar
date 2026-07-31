# AI CLI 工具社区动态日报 2026-07-31

> 生成时间: 2026-07-31 03:23 UTC | 覆盖工具: 7 个

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

# AI CLI 工具横向对比分析报告（2026-07-31）

## 1. 生态全景

AI CLI 工具正从"单模型对话终端"加速演进为"多代理协作 + 跨端同步 + 策略可控"的完整开发环境。今日 7 个主流项目共涌现 60+ 活跃议题，核心矛盾集中在**上下文管理粗糙**（内置 skill 塞爆窗口、128K 硬编码回退）、**Windows 平台稳定性欠账**（BSOD、GPU 崩溃、沙箱损坏）以及**多代理编排不可靠**（误报成功、静默失败、唤醒缺失）。与此同时，配额透明化与安全加固（SSRF、凭据泄露）正从"边缘诉求"上升为"信任基石"。

## 2. 各工具活跃度对比

| 工具 | 热点 Issues | 有效 PR | 版本发布 | 社区最强信号 |
|---|---|---|---|---|
| Claude Code | 10 精选 | 0（1 垃圾 PR 被关） | 无（最新 v2.1.220） | 移动端多账户切换 👍530 / 148 评论 |
| OpenAI Codex | 10 精选 | 10（5 已合并） | 无 | Codex Diff 崩溃 👍100 / 39 评论 |
| Gemini CLI | 10 精选 | 10（0 合并，全 Open） | 无 | Agent 挂起 👍8，安全 PR 优先 |
| GitHub Copilot CLI | 10 精选 | 0 更新 | **v1.0.77 / v1.0.77-0**（浏览器 OAuth） | Rewind 依赖 git 👍10 |
| Kimi Code CLI | **3** | 1 | 无 | 记忆系统 7 评论（跨 5 个月） |
| OpenCode | 10 精选 | 10（5 已合并） | **v1.18.10**（Modal 模型发现） | `/compact` 增强需求 👍28 |
| Qwen Code | 10 精选 | 10 | **v0.21.1-nightly**（CI/Web Shell 修复） | 凭据泄露安全缺陷（P2/security） |

> 注：Issues/PR 数为当日精选或活跃数，非全量。

## 3. 共同关注的功能方向

| 方向 | 涉及工具 | 具体诉求与代表性议题 |
|---|---|---|
| **上下文/Token 管理** | Claude Code（#63566 内置 skill 塞满上下文、#82748 模型表缺失致窗口失真）、Copilot CLI（#4310 静默回退 128K）、OpenCode（#5200 原生 compaction，28👍） | 压缩质量、窗口大小准确性、防止无端上下文暴涨 |
| **Windows 稳定性** | Codex（Sysmon 驱动 BSOD、powershell 高 CPU、沙箱 1920 错误）、Qwen（0.21.1 崩溃×3、LMStudio 连接失败）、Kimi（间歇冻结）、Claude（GPU 崩溃致 MSIX 不可启动） | 系统级风险已超出"工具不好用"，影响开发机安全 |
| **子代理/多代理可靠性** | Gemini（#22323 MAX_TURNS 中断误报 success）、Copilot CLI（#4293 全工具子代理静默空响应）、Codex（#15723 子代理完成后不唤醒主代理）、Qwen（#8172 Agent Team 消息排队堵塞） | 状态误报、后台唤醒缺失、编排死锁 |
| **配额/限流透明化** | Codex（#32707 5 小时额度消失、#36213 新模型配额争议）、Copilot CLI（#4295/#4308 无预警、任务后持续扣费）、Kimi（#2571 429 完全不可用）、OpenCode（#39791 固定窗口 429 停止重试） | 实时用量、上限预警、模型间配额公平 |
| **模型/Provider 兼容性** | OpenCode（qwen3.7-max 401、GLM-5.1 参数无效、xAI 原生映射）、Qwen（Anthropic 转换器 4 连修）、Claude（#82748 claude-opus-5 缺失） | 新模型适配滞后、跨厂商转换器正确性 |
| **会话/状态管理** | Claude（#42050 三端统一、#36151 移动端多账户）、Codex（#31754 resume 回归）、OpenCode（#30054 升级后历史消失）、Gemini（#28596 跨工作区会话列表）、Qwen（#8178 工作区状态隔离） | 跨端续跑、可靠恢复、多工作区隔离 |
| **安全加固** | Gemini（#28555 SSRF CVSS 8.6 已出修复 PR）、Qwen（#8136 凭据经 `/status` 泄露）、Codex（#36207 沙箱违规结构化事件） | DNS 绕过、凭据脱敏、沙箱审计 |
| **可观测性** | Claude（#77846 statusLine 暴露 per-model 限流）、Qwen（#8180 工具执行状态、#8150 TTFT）、Codex（规范化沙箱事件） | 状态行生态、telemetry 标准化 |

## 4. 差异化定位分析

| 工具 | 定位 | 核心优势 | 当前短板 |
|---|---|---|---|
| **Claude Code** | 深度 Agent 工作流 + 全端生态 | Hooks/Skills/Subagents 体系最成熟；模型能力强；移动端布局积极（👍530 验证需求） | 主仓库 PR 长期冷清；核心链路出现"消息静默丢弃"类黑天鹅 bug |
| **OpenAI Codex** | 企业级自动化底座 | 工程化投入大：独立运行时、并行工具调用、Enterprise Automation 计划；PR 合并效率高 | Windows 是重灾区；多代理唤醒机制缺失拖累自动化闭环 |
| **Gemini CLI** | 评估驱动 + 安全前瞻 | 组件级评估体系（76 个行为测试）；AST 感知代码理解已立项；SSRF 漏洞当日出修复 PR，响应快 | Subagent 误报成功伤害信任；P1 bug 长尾（挂起、shell 卡死） |
| **GitHub Copilot CLI** | GitHub 生态入口 · 正式版 1.0 | 与 Copilot 订阅/AI Credits 深度绑定；浏览器 OAuth 补全登录体验；v1.0.77 节奏稳定 | 非 git 工作流被排斥；Credits 消耗不透明直接引发用户不满 |
| **Kimi Code CLI** | 早期追赶者 | 记忆系统需求明确（5 个月持续更新） | 社区规模最小（3 活跃 Issues）；版本碎片化严重（0.29.2 与 1.49.0 并存） |
| **OpenCode** | 开源多 Provider 中立层 | 模型兼容层最广（Qwen/GLM/Gemini/xAI/ChatGPT 全覆盖）；TUI 插件热重载；LAN provider 自动发现；PR 最活跃 | 多 provider 参数映射仍脆弱；升级回归频发（edit 中断、会话消失） |
| **Qwen Code** | 阿里系模型 + Claude Code 兼容迁移 | 夜间版持续迭代（CI 活跃）；Anthropic 转换器专项修复（承接 Claude 用户迁移）；Agent Team/PR Autofix 自动化方向明确 | Windows 崩溃与 LMStudio 连接故障；配置写入路径错误（worktree 场景） |

## 5. 社区热度与成熟度

- **用户基数最大 / 需求最强烈**：**Claude Code**（👍530 高赞跨端需求）与 **OpenAI Codex**（👍100 崩溃议题）——两者社区反馈规模不在同一量级，反映其现有用户盘最大。
- **工程迭代最快**：**OpenCode**（10 个 PR 中 5 个当日合并）与 **Codex**（10 个 PR 中 5 个合并）并列第一；**Qwen Code** 以夜间版发布保持高频节奏，但多为小步修复。
- **正式化程度**：**Copilot CLI** 刚发布 1.0.77 进入正式阶段；**Claude Code** 已稳定在 2.x；**Codex/Gemini/OpenCode/Qwen/Kimi** 均在 1.0 以下（或 0.x/nightly），仍处快速迭代期。
- **贡献通道健康度**：Claude Code 主仓库 PR 通道"冷清到异常"（唯一 PR 为垃圾提交），与社区讨论热度形成反差；OpenCode/Qwen 的开源贡献生态更活跃，但 PR 多来自核心团队而非外部开发者。
- **成熟度综合排序**：Claude Code > Copilot CLI ≈ Codex > Gemini CLI ≈ OpenCode ≈ Qwen Code > Kimi Code CLI。

## 6. 值得关注的趋势信号

1. **上下文工程成为新护城河**。模型能力趋同后，"把对话高效塞进窗口"的技术拉开差距。OpenCode 已请求接入 OpenAI 原生 compaction 端点，Copilot 还在被 128K 硬编码反噬，Claude 的内置 skill 会无端消耗 77% 上下文。**对开发者**：评估工具时测试长会话的 token 膨胀曲线，而非只看首轮响应质量。

2. **多代理编排的"状态同步"是隐藏难点**。误报 success（Gemini）、子代理完成后主代理不唤醒（Codex）、静默空响应（Copilot CLI）并非孤例，而是跨工具的共性缺陷。**对开发者**：构建自动化流水线时，必须为"子代理最终状态"增加独立校验层，不能盲目信任 `status: success`。

3. **Windows 用户正在被系统性辜负**。从 BSOD（Codex/Sysmon）到 GPU 崩溃（Claude）、从沙箱 1920 错误到 PowerShell 轮询高 CPU——Windows 已成为所有 CLI 工具的事故高发区。**对开发者**：若主力平台是 Windows，短期内优先选择沙箱/权限设计更保守的工具（如 Copilot CLI），并为不可用场景准备 fallback。

4. **配额可见性 = 商业信任的隐形战场**。Copilot CLI 的"任务完成后仍扣费"（#4308/#4309）与 Codex 的"额度从界面消失"（#32707）指向同一本质：用户对不可见的消耗零容忍。**对开发者**：企业采购时要求 CLI 提供配额告警 API 或 status_line 集成，避免月底账单惊吓。

5. **安全漏洞从"理论"走向"实锤"**。Gemini 的 SSRF（CVSS 8.6，DNS 解析绕过）、Qwen 的凭据经 `/status` 泄露、Codex 的沙箱策略被指过度激进——Agent 权限越大，攻击面越真实。**对开发者**：审查工具的网络访问策略，确保凭据仅存本地且支持确定性脱敏，优先跟进已发布安全修复 PR 的项目。

6. **跨端/跨工具会话同步将成为下一个竞争焦点**。Claude 的移动端多账户切换（👍530）、三端统一（👍27）与 Gemini 的跨工作区会话列表（PR #28596）均指向同一方向：**"工作不限于单一终端"**。**对开发者**：选择工具时关注其会话文件格式是否开放（如 JSON/Markdown），为将来迁移或跨工具桥接保留可能性。

---

## 各工具详细报告

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills 社区热点报告

> 数据来源：[anthropics/skills](https://github.com/anthropics/skills) | 数据截至 2026-07-31 | 共分析 50 个 PR、50 个 Issue

---

## 1. 热门 Skills 排行

以下为评论/关注度最高的 8 个 PR。**值得注意的是，全部处于 open 状态，官方合并节奏明显滞后于社区提交热度。**

### #1 skill-creator 评估工具链修复 — `run_eval.py` 恒定 0% recall
- **功能**：修复 `run_eval.py`（及依赖它的 `run_loop.py`、`improve_description.py`）对所有技能描述恒定报告 `recall=0%` 的严重缺陷，涉及 eval 产物真实安装、Windows 流读取、触发检测与并行 worker 四方面。
- **讨论热点**：关联 issue #556（12 条评论、7👍），10+ 独立用户复现同一故障——技能描述优化循环实际上在对着噪声做优化，这是当前工具链最核心的阻断性问题。
- **状态**：Open | [PR #1298](https://github.com/anthropics/skills/pull/1298)

### #2 document-typography 技能 — AI 生成文档的排版质检
- **功能**：预防 AI 生成文档的三类高频排版缺陷：孤字换行（1-6 个单词溢出到下一行）、段落孤儿（节标题滞留页底）、编号错位。
- **讨论热点**：定位精准——"每个 Claude 生成的文档都会遇到这些问题"，是文档工作流中最真实的质量痛点。
- **状态**：Open | [PR #514](https://github.com/anthropics/skills/pull/514)

### #3 PDF 技能文件引用大小写修复
- **功能**：修正 `skills/pdf/SKILL.md` 中 8 处大小写不匹配（`REFERENCE.md` → `reference.md`、`FORMS.md` → `forms.md`）。
- **讨论热点**：实际文件全为小写、引用却用大写，在大小写敏感的文件系统上会导致 PDF 技能直接失效，属隐蔽的阻断性 bug。
- **状态**：Open | [PR #538](https://github.com/anthropics/skills/pull/538)

### #4 ODT 文档技能 — 开源文档格式全链路支持
- **功能**：OpenDocument（.odt/.ods）的创建、模板填充、读取与 ODT→HTML 解析，触发词覆盖 "OpenDocument / LibreOffice / ISO 标准" 等。
- **讨论热点**：补全了文档技能矩阵中缺失的开源格式环节，与 PDF、DOCX 技能形成完整覆盖。
- **状态**：Open | [PR #486](https://github.com/anthropics/skills/pull/486)

### #5 frontend-design 技能可执行性优化
- **功能**：修订 frontend-design 技能，确保每条指令都可在单次对话内被 Claude 实际执行，提升内部一致性与行为引导精度。
- **讨论热点**：触及技能设计的普遍问题——说明文档"像给人看的开发文档"而非"可执行的技能指令"，与 issue #202 的批评同频。
- **状态**：Open | [PR #210](https://github.com/anthropics/skills/pull/210)

### #6 skill-quality-analyzer + skill-security-analyzer 双元技能
- **功能**：两个元技能（meta-skill）：质量分析器从结构与文档（20%）、资源等五维度评估；安全分析器负责安全审查。
- **讨论热点**：2025-11 提交，榜单中等待最久的 PR，反映社区对"技能质量保障体系自举"的明确需求——用技能来审查技能。
- **状态**：Open | [PR #83](https://github.com/anthropics/skills/pull/83)

### #7 DOCX 技能 tracked change 的 `w:id` 冲突修复
- **功能**：修复 DOCX 技能向含书签的文档添加修订时导致文档损坏的问题——OOXML 中 `w:id` 在书签、修订、批注间共享 ID 空间，原示例使用硬编码 ID 引发冲突。
- **讨论热点**：文档格式技能的"边界条件"修复，体现社区对已有 Skill 的深度打磨。
- **状态**：Open | [PR #541](https://github.com/anthropics/skills/pull/541)

### #8 skill-creator YAML 未加引号 description 校验
- **功能**：在 `quick_validate.py` 中新增预解析校验，检测包含 `:` 的未加引号 description 字段，防止 YAML 静默解析失败导致描述被截断或拆分。
- **讨论热点**：技能前十几行的 YAML frontmatter 是整个触发机制的地基，此类问题会导致技能"无声失效"。
- **状态**：Open | [PR #539](https://github.com/anthropics/skills/pull/539)

---

## 2. 社区需求趋势

### 🔥 安全与信任边界（最热议题，43 条评论）
社区技能在 `anthropic/` 官方命名空间下分发，构成信任边界滥用漏洞——用户可能向非官方技能授予高权限。这是当前社区最强烈的平台级安全诉求。
[Issue #492](https://github.com/anthropics/skills/issues/492)

### 🏢 组织级技能共享（16 评论，8👍）
企业用户要求支持组织内直接共享技能库，替代当下"下载 .skill 文件 → Slack/Teams 传输 → 同事手动上传"的低效链路。
[Issue #228](https://github.com/anthropics/skills/issues/228)

### 🛠️ 工具链可靠性与 Windows 支持（多 issue 共鸣）
- `run_eval.py` 全程 0% 触发率，评估回路失效（[#556](https://github.com/anthropics/skills/issues/556)，12 评论 7👍；[#1169](https://github.com/anthropics/skills/issues/1169)）
- 原生 Windows Python 下 PATHEXT、cp1252 编码、select-on-pipe 三处 Unix 假设缺陷（[#1061](https://github.com/anthropics/skills/issues/1061)，3 评论 2👍）

### 🔁 内容重复与上下文污染（6 评论，9👍——点赞数全榜最高）
`document-skills` 与 `example-skills` 插件安装后包含完全相同的内容，导致重复技能挤占上下文窗口。
[Issue #189](https://github.com/anthropics/skills/issues/189)

### 📐 上下文窗口管理
`claude-api` 技能单次工具调用即注入约 156k tokens，直接耗尽上下文窗口——技能"贪心注入"的典型反例。
[Issue #1487](https://github.com/anthropics/skills/issues/1487)

### 🆕 社区明确期待的新技能方向

| 方向 | Issue | 核心诉求 |
|---|---|---|
| 紧凑记忆 | [#1329](https://github.com/anthropics/skills/issues/1329) | 符号化符号系统压缩长期运行 agent 的散文式记忆 |
| 智能体治理 | [#412](https://github.com/anthropics/skills/issues/412) | 策略执行、威胁检测、信任评分、审计追踪的安全模式 |
| 推理质量闸门 | [#1385](https://github.com/anthropics/skills/issues/1385) | 任务前校准 → 对抗性审查 → 交付验证的三闸门流水线 |
| Skills 即 MCP | [#16](https://github.com/anthropics/skills/issues/16) | 将 Skill 封装为标准 MCP API 接口 |
| Bedrock 支持 | [#29](https://github.com/anthropics/skills/issues/29) | 在 AWS Bedrock 环境使用 Skills |

---

## 3. 高潜力待合并 Skills

以下 PR 讨论活跃但均未合并（全部 open），按关注度与落地概率排序：

| Skill | PR | 提交时间 | 亮点 |
|---|---|---|---|
| testing-patterns | [PR #723](https://github.com/anthropics/skills/pull/723) | 2026-03-22 | 完整测试方法论：Testing Trophy 模型、AAA 模式、React 组件测试、边界用例 |
| color-expert | [PR #1302](https://github.com/anthropics/skills/pull/1302) | 2026-06-10 | 色彩专家知识：ISCC-NBS/Munsell 命名系统、OKLCH/OKLAB 色彩空间选型表 |
| self-audit | [PR #1367](https://github.com/anthropics/skills/pull/1367) | 2026-06-28 | 通用交付前审计：先机械文件验证、再四维度推理审计（v1.3.0） |
| Pyxel 游戏开发 | [PR #525](https://github.com/anthropics/skills/pull/525) | 2026-03-05 | pyxel-mcp 驱动的像素/街机/8-bit 游戏迭代工作流 |
| SAP-RPT-1-OSS 预测 | [PR #181](https://github.com/anthropics/skills/pull/181) | 2025-12-28 | SAP 开源表格基础模型的企业数据预测 |
| plan-file-hygiene | [PR #1479](https://github.com/anthropics/skills/pull/1479) | 2026-07-25 | 规划文件生命周期管理，针对 agent 规划产物无节制堆积 |
| 质量/安全分析器 | [PR #83](https://github.com/anthropics/skills/pull/83) | 2025-11-06 | 元技能，等待最久（约 9 个月仍未合并） |

**补充**：section 1 中的 document-typography（#514）、ODT（#486）同样处于高热度待合并状态，是新技能中落地概率最高的两个。

---

## 4. Skills 生态洞察

> **一句话总结**：当前社区最集中的诉求是两条主线并行——先修复 skill-creator 评估工具链在真实环境（尤其 Windows）的全面失灵，让技能描述优化"有信号可循"；再建立技能分发环节的安全信任（命名空间冒用）与协作共享（组织级共享、去重）机制，而文档排版质量与格式支持（typography/ODT/PDF/DOCX）则是新增技能中最活跃、最贴近用户日常的落地方向。

---

# 🤖 Claude Code 社区动态日报 — 2026-07-31

## 今日速览

今日无新版本发布，社区讨论热度集中在 **移动端多账户切换**（#36151，获 👍530 高赞持续发酵）与 **上下文管理/模型支持** 相关议题。值得警惕的是，今日集中提交了多个高质量 bug 报告：**用户消息被静默丢弃**（#82772）、**grep 包装器静默吞文件**（#82773）、**Workflow args 未转发**（#82770）——这些均指向 CLI 核心链路的可靠性问题。PR 侧仅有 1 条疑似垃圾 PR 被关闭，主仓库贡献通道持续冷清。

---

## 📦 版本发布

无新版本发布。当前最新版本为 **2.1.220**（多个 issue 报告基于此版本）。

---

## 🔥 社区热点 Issues（10 个精选）

### 1. 移动端多账户切换 — 热度王（148 评论 / 👍 530）
**#36151** [Multi-account switching in Claude Mobile app without shared email](https://github.com/anthropics/claude-code/issues/36151)
> 要求在不共享邮箱的前提下支持移动端多账户切换。连续数月保持极高热度，今日仍有新讨论，是当前社区呼声最高的功能需求。

### 2. Claude.ai → Claude Code 上下文共享（26 评论 / 👍 103）
**#13843** [Share conversation context from Claude.ai to Claude Code](https://github.com/anthropics/claude-code/issues/13843)
> 用户希望在 claude.ai 中规划的任务可无缝导入 CLI 继续执行。👍 103 说明跨端工作流衔接已成为刚需。

### 3. Pre/PostToolUse Hooks 长期不执行（38 评论）
**#6305** [Post/PreToolUse Hooks Not Executing in Claude Code](https://github.com/anthropics/claude-code/issues/6305)
> 自 2025 年 8 月提交，至今仍在更新。macOS 上 hooks 静默失效，严重影响自动化工作流，社区对修复进度不满。

### 4. Windows 桌面版 GPU 崩溃（10 评论）
**#80444** [fatal GPU-process crash (0x060C201E) via in-app Browser tab](https://github.com/anthropics/claude-code/issues/80444)
> Windows 11 + RTX 2080 上打开应用内浏览器标签触发 GPU 进程崩溃，**MSIX 包彻底不可启动**，只能通过 Repair 恢复。属于破坏性平台缺陷。

### 5. 实时转向：生成中发送消息（9 评论 / 👍 17）
**#64624** [Real-time steering — send message mid-generation without queueing](https://github.com/anthropics/claude-code/issues/64624)
> 文档承诺了 "Interrupt and steer" 但实际只能排队或按 Esc 全部丢弃。交互效率提升的高频需求。

### 6. Artifact 公开分享持续失败（8 评论 / 👍 15）
**#79824** [Artifact sharing fails: "This version can't be shared publicly" persists](https://github.com/anthropics/claude-code/issues/79824)
> 重新发布或新建 Artifact 都无法解除分享限制，错误提示反复出现，疑似服务端状态问题。

### 7. 跨桌面/移动/CLI 三端统一（6 评论 / 👍 27）
**#42050** [Unified sessions, settings & projects across Desktop, Mobile and CLI](https://github.com/anthropics/claude-code/issues/42050)
> 会话与项目在三端隔离，无法跨端续跑。与 #36151 构成同一大方向的互补诉求。

### 8. 内置 /claude-api skill 上下文塞满（6 评论）
**#63566** [Bundled skill saturates context unconditionally — ~77% spike from neutral question](https://github.com/anthropics/claude-code/issues/63566)
> 一个中性问题导致上下文用量骤增 77%。内置 skill 的上下文管理策略存在严重缺陷，影响 Windows 用户。

### 9. statusLine 暴露模型级速率限制（6 评论）
**#77846** [Expose rate_limits.model_scoped in statusLine stdin](https://github.com/anthropics/claude-code/issues/77846)
> 自 v2.1.80 起 statusLine 已有 plan 级速率数据，但缺 per-model 窗口（如 Fable）。自定义 statusline 生态的可观测性增强请求。

### 10. claude-opus-5 模型表缺失（1 评论 / 今日新建）
**#82748** [claude-opus-5 absent from client model table on 2.1.212](https://github.com/anthropics/claude-code/issues/82748)
> 客户端二进制中 **完全没有 claude-opus-5 字符串**，而兄弟模型均存在。后果：`/context` 显示 200K 分母，与 auto-compact 及 API 的 1M 不一致，**上下文计算失真**。新模型支持不到位的典型表现。

---

## 🔧 重要 PR 进展

**今日无有效 PR 更新。**

唯一出现在热榜中的 #82555（[Claude/youtube instagram mcp yn2u6s](https://github.com/anthropics/claude-code/pull/82555)）为标题随意的 PR，已关闭，判断为垃圾/无效提交。

**分析师观察：** 主仓库 PR 通道长期冷清，社区贡献大概率分流至插件生态或 fork 仓库。对 Anthropic 而言，这既是核心代码控制力的体现，也意味着外部开发者对开箱即用的扩展能力仍有距离感。

---

## 📈 功能需求趋势

从今日全部 Issue 中提炼五个核心方向：

| 方向 | 代表 Issue | 信号强度 |
|---|---|---|
| **跨平台统一与会话同步** | #42050、#36151、#81658、#71616 | 🔴 极强（支撑 👍 数百） |
| **上下文窗口管理优化** | #35150、#63566、#80787、#82748 | 🟠 强（模型增加但管理手段落后） |
| **实时交互控制** | #64624 | 🟡 中（"steer" 从文档 PUA 到落地） |
| **可观测性增强** | #77846、#82408 | 🟡 中（statusLine 生态在崛起） |
| **Hooks/Skills 能力扩展** | #72404、#73774、#6305 | 🟠 强（但 bug 积压拖累信任） |

---

## 🧩 开发者关注点（痛点与高频反馈）

1. **上下文管理仍是头号痛点**
   - 上下文被内置 skill 无端塞满（#63566）
   - opus-5 缺失导致窗口数字失真（#82748）
   - 无法程序化清空/续接上下文（#35150）

2. **消息与任务的静默失败最为致命**
   - **#82772**：用户消息入队 1ms 后被丢弃，无 transcript、无 API 请求，会话永久悬挂
   - **#82770**：Workflow 的 `args` 与 `scriptPath` 同时传入时参数丢失（4/4 复现）
   - **#79575**：`--dangerously-skip-permissions` 下 `/fork` 被反向阻止

3. **Hooks/Skills 可靠性欠账**
   - Hooks 长期不执行（#6305）、skill 重复触发（#73774）、无法通过 hook/skill 重命名会话（#72404）。核心自动化能力处于"半可用"状态。

4. **grep 工具静默吞结果**（#82773）
   - 文件含一个 NUL 字节即被 ugrep 视为二进制并跳过，**零输出零诊断**。对依赖 grep 定位问题的开发者是个隐蔽陷阱。

5. **Windows 平台稳定性欠佳**
   - GPU 崩溃致应用不可启动需 Repair（#80444）
   - 重启后计划任务"幽灵执行"风暴（#74055）
   - 跨平台同步导致对话消失（#81658）

6. **信息展示正确性问题**
   - `tools: []` 的子代理显示为 "Tools: All tools"——**标签与事实完全相反**（#82562）
   - 误导性的 "auto-update failed" 状态无法清除（#82408）

---

*日报基于 anthropics/claude-code 仓库 2026-07-31 公开数据生成，仅供技术参考。*

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex 社区动态日报 — 2026-07-31

## 今日速览

过去 24 小时无新版本发布，社区焦点集中在 **Windows 平台稳定性问题**（Sysmon 驱动崩溃、高 CPU、沙箱配置损坏）与 **速率限制/配额透明度**上。工程侧则以多项合并的基础设施优化为主，包括独立 Codex 代码模式运行时、并行工具调用和协议导出预计算等底层改进。

---

## 社区热点 Issues

### 1. #35058 — Codex Diff 在 VS Code/macOS 上崩溃：“Oops, an error has occurred”
**🔥 100 👍 / 39 评论** | [GitHub Issue](https://github.com/openai/codex/issues/35058)

Codex 编辑文件后打开“Codex Diff”标签页即崩溃，影响所有仓库（包括全新工作区）。环境为 macOS Apple Silicon + VS Code 1.128.0。该问题已持续一周仍在 Open 状态，是当前社区反响最强烈的可用性 bug 之一。

### 2. #31035 — Windows Codex Desktop 反复安装 Sysmon 驱动并导致 BSOD
**22 评论** | [GitHub Issue](https://github.com/openai/codex/issues/31035)

Codex Desktop 在本地/PowerShell 会话中强制卸载后仍会重新安装 Sysinternals Sysmon v13.22（`SysmonDrv.sys`），多次 WinDbg 分析均指向该驱动为蓝屏根因。对于 Windows 重度用户来说属于阻断性稳定性问题。

### 3. #25453 — Windows 上 powershell.exe 每秒被拉起，CPU 占用飙升
**4 👍 / 20 评论** | [GitHub Issue](https://github.com/openai/codex/issues/25453)

Codex Desktop 每秒短生命周期的 powershell.exe 做全进程轮询，持续高 CPU。典型的 Windows 性能回归，严重影响本地开发体验。

### 4. #35803 — Windows 工作区依赖包损坏导致所有 Shell 执行中止
**6 评论** | [GitHub Issue](https://github.com/openai/codex/issues/35803)

损坏的 workspace dependency bundle 导致 Codex Desktop 中一切 shell 命令无法执行，且诊断工具报告“healthy”，重装应用也无法恢复。涉及 `codex-command-runner-0.146.0-alpha.3.1` 和 MSIX 包，更新于 7 月 28 日创建、7 月 31 日仍有更新，修复尚无着落。

### 5. #20570 — 升级后 Windows 沙箱报错 CreateProcessAsUserW failed: 1920
**11 👍 / 15 评论** | [GitHub Issue](https://github.com/openai/codex/issues/20570)

Codex CLI 0.128.0 升级后，Windows 原生沙箱无法创建进程（错误码 1920），用户尝试使用 `gpt-5.5` 时必现。已持续三个月仍未关闭，Windows 沙箱子系统的兼容性修复优先级偏低。

### 6. #15723 — 后台子进程/子代理完成后不唤醒调用方代理
**7 👍 / 13 评论** | [GitHub Issue](https://github.com/openai/codex/issues/15723)

Linux 上 codex-cli 0.116.0：后台 subprocess/subagent 完成后，主代理得不到唤醒，导致多代理任务挂起。涉及 Codex 核心执行模型，影响自动化工作流可靠性。

### 7. #32177 — 文本日志附件可触发“Request blocked”并污染后续对话
**12 👍 / 12 评论** | [GitHub Issue](https://github.com/openai/codex/issues/32177)

Codex App 中附加纯文本日志到已有会话会触发“Request blocked”，并且影响后续所有轮次，即会话状态被持久污染。类似阻断性问题往往与内容安全模块的误判有关，但由于无法从错误信息判断触发规则，用户只能新建会话。

### 8. #31754 — 回归：codex-cli 0.143.0 恢复会话报错 Unknown parameter: input[...].namespace
**3 👍 / 7 评论** | [GitHub Issue](https://github.com/openai/codex/issues/31754)

0.143.0 中 `codex resume` 加载既有会话直接失败，0.142.0 正常。这是典型的协议字段回归，影响所有依赖会话恢复的重度 CLI 用户。

### 9. #32707 — Pro 账户的 5 小时用量额度从 Codex App 中消失
**3 👍 / 8 评论** | [GitHub Issue](https://github.com/openai/codex/issues/32707)

Codex App 与 `account/rateLimits/read` 接口均不再返回 5 小时使用量数据。用户无法感知当前配额消耗，属于账户可见性缺陷，和 #24080（请求暴露 rate-limit 详情）相互印证。

### 10. #36213 — 新模型 GPT-SOL 5.6 对 Plus 用户不公平：请求 2x 配额
**5 评论** | [GitHub Issue](https://github.com/openai/codex/issues/36213)

用户称 GPT-SOL 5.6 已占据大部分使用场景，但 Plus 配额未同步提升，实际可用量减少约 30%。要求为小型模型单独设限或直接加倍 Plus 配额。该问题发布于 7 月 30 日，属于新模型上线后的典型配额争议，社区情绪较激烈（另有 #35552“FUCK YOU OPENAI”为同类表达）。

---

## 重要 PR 进展

### 1. #36217 — 代码模式完全由独立主机（standalone host）运行
**已合并** | [GitHub PR](https://github.com/openai/codex/pull/36217)

将 V8 实现移入专用 `codex-code-mode-runtime` crate，由 `codex-code-mode-host` 承载，Codex 主进程不再内置运行时回退。这会让代码模式的启动和故障隔离更清晰。

### 2. #31591 — 为 Codex Apps 启用并行工具调用
**打开** | [GitHub PR](https://github.com/openai/codex/pull/31591)

新增默认关闭的 `codex_apps_parallel_tool_calls` 特性，仅对 codex_apps MCP server 启用并行工具调用，不改变第三方 MCP server 行为。属于性能提升类 PR，仍在评审中。

### 3. #36228 — 支持 Enterprise 自动化账户计划
**已合并** | [GitHub PR](https://github.com/openai/codex/pull/36228)

认证、后端响应及应用服务器账户/速率限制 API 均可识别 `enterprise_cbp_automation` 计划，并在 UI 中显示为 “Enterprise (Automation)”。面向企业自动化的账户类型补齐。

### 4. #31458 — exec-server：路由远程网络策略决策
**打开** | [GitHub PR](https://github.com/openai/codex/pull/31458)

将 executor-local 的代理策略“未命中”回传至进程级核心策略决策器，保留环境、执行、命令和工具调用的归因，并在断连/进程退出时 fail closed。这是安全策略执行链路的重要补强。

### 5. #31922 — core：新增无工具线程模式（tool-free thread mode）
**打开** | [GitHub PR](https://github.com/openai/codex/pull/31922)

为轻量辅助线程（如生成标题）引入 opt-in `tool_free` 特性：跳过 MCP 启动、技能/插件/工具枚举并强制空工具路由。可显著减少辅助线程的资源开销。

### 6. #31471 — 抽取 Apps 缓存逻辑为 ConnectorRuntimeManager
**打开** | [GitHub PR](https://github.com/openai/codex/pull/31471)

“faster-connectors”系列 PR 的第一步：将 Codex Apps 工具缓存抽象为 `ConnectorRuntimeManager`，按 account/user/workspace 作用域隔离运行时上下文。为后续连接器性能优化打基础。

### 7. #36194 — 流式输出缓冲区不再移动字节
**已合并** | [GitHub PR](https://github.com/openai/codex/pull/36194)

原先每次解码后从 `Vec` 头部移除前缀会造成整体字节搬移；现在改为避免重复搬运，对包含大量无效 UTF-8 字节或高帧消息的流是明显的性能优化。

### 8. #36188 — 使线程历史投影对畸形 rollout 具有韧性
**已合并** | [GitHub PR](https://github.com/openai/codex/pull/36188)

一个失败的 rollout append 会留下被拒绝的行，而同序号的重试成功时，旧代码的字节/序号双检查点可能不同步，导致后续历史无法被投影。本次修复让检查点推进更健壮。

### 9. #36207 — 记录规范化沙箱违规事件
**已合并** | [GitHub PR](https://github.com/openai/codex/pull/36207)

文件系统拒绝和托管网络阻断现在有了统一的结构化事件格式，下游消费者不再需要各自解析后端原始输出。提升可观测性和策略审计能力。

### 10. #36184 — 合并并发远程元数据请求
**已合并** | [GitHub PR](https://github.com/openai/codex/pull/36184)

同一远程路径在 RPC in-flight 期间被多个调用方请求时，现在共享同一 `fs/getMetadata` 请求，避免重复 RPC。远程工作流下的轻微延迟优化。

---

## 功能需求趋势

从近期 Issue 中可以提炼出社区最关心的几个功能方向：

| 方向 | 代表 Issue | 社区诉求 |
|---|---|---|
| **速率限制透明化** | #24080、#32707、#36213 | 在 status_line/UI 中暴露重置时间、余额、计划类型；Plus 用户要求对新模型有公平配额 |
| **Windows 平台稳定性** | #31035、#25453、#35803、#20570、#29317 | Sysmon 驱动 BSOD、进程轮询高 CPU、沙箱进程创建失败、PowerShell AST 解析器 185GB 内存泄漏——Windows 目前是事故重灾区 |
| **会话/状态完整性** | #32177、#31754、#26930、#35647 | 附件污染会话、resume 回归、推理级别重置、fork 存储膨胀——用户对会话数据可靠性信心不足 |
| **沙箱正确性** | #35864、#20570、#31035 | Windows 沙箱对文件/进程权限处理不当，导致 apply_patch 等基本操作失败；用户希望沙箱行为可预测、可恢复 |
| **子代理/后台任务** | #15723、#19742 | 后台子代理完成后不通知主代理；自动化任务一启动就被归档——多代理协作与自动化闭环待完善 |
| **跨设备连续性** | #34804 | 工作区/会话上下文跨设备跟随（Remote 已有雏形，但希望更完整） |
| **IDE 集成稳定性** | #35058 | Codex Diff 在 VS Code 中完全不可用，IDE 插件需尽快修复 |

---

## 开发者关注点

1. **Windows 稳定性是当前最大痛点。** 从 BSOD（Sysmon 驱动）到每秒 powershell 轮询，再到沙箱 CreateProcessAsUserW 失败和 185GB 内存泄漏，Windows 用户面对的是系统级风险，严重程度已超过“开发工具不好用”的范畴。

2. **速率限制缺乏透明度和公平性。** 多个 Issue 指向同一诉求——用户想看到确切的配额剩余、重置时间，并希望 Plus/Pro 的配额差异有合理说明。当新模型（GPT-SOL 5.6）上线而配额未同步时，社区情绪明显反弹。

3. **会话数据可靠性信任度下降。** 无论是 `codex resume` 回归、附件“投毒”整个会话，还是 symlink 导致的线程“消失”，开发者在长时间任务中对会话持久化的信任正在被消磨。

4. **沙箱误伤正常操作。** 安全沙箱在 Windows 上对权限的处理过于激进且错误信息不透明（如“healthy”但实际不可用），用户无法自行排除故障。

5. **后台任务协作仍有缺口。** 子代理完成的唤醒机制缺失、自动化任务被过早归档，说明 Codex 的多代理编排离“可靠的生产级自动化”还有距离。

---

*数据来源：GitHub openai/codex 仓库，更新于 2026-07-31。*

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI 社区动态日报 — 2026-07-31

> 数据来源：[github.com/google-gemini/gemini-cli](https://github.com/google-gemini/gemini-cli)

## 1. 今日速览

过去 24 小时无新版本发布，社区讨论焦点集中在 **Subagent 可靠性与误报问题**（#22323 获 12 条评论，关注度最高）以及 **通用 Agent 挂起**（#21409）。安全方面，一项 **web-fetch SSRF 漏洞（CVSS 8.6）** 成为热点，社区已提交对应修复 PR，另有 3 个 Docker/CI 安全相关 PR 同步推进。整体来看，Agent 稳定性、安全加固与自动记忆（Auto Memory）机制是当前社区最关心的三大方向。

## 2. 版本发布

过去 24 小时内无新版本发布。

## 3. 社区热点 Issues

### 🥇 Subagent 恢复逻辑误报成功 — #22323
**状态**: P1 / Bug · **评论 12** · **👍 2**
`codebase_investigator` 子代理在达到 MAX_TURNS 上限后，被中断却被报告为 `status: "success"` 和 `"GOAL"` 终止原因，掩盖了实际的中断。社区对此反馈强烈，认为这会导致用户对任务结果的误判。
🔗 [Issue #22323](https://github.com/google-gemini/gemini-cli/issues/22323)

### 🥈 通用 Agent 无限挂起 — #21409
**状态**: P1 / Bug · **评论 8** · **👍 8**
`gemini-cli` 委托给通用 Agent 时无限期挂起（即使最简单的建文件夹操作），用户曾等待一小时无果。8 个 👍 表明大量用户遇到同样问题；一个有效 workaround 是显式禁止代理使用子代理。
🔗 [Issue #21409](https://github.com/google-gemini/gemini-cli/issues/21409)

### 🥉 组件级评估体系（EPIC） — #24353
**状态**: P1 / EPIC · **评论 7**
2026-03 提交的 EPIC，已在仓库生成 76 个行为评估测试并覆盖 6 个支持的 Gemini 模型。社区关注其后续对组件级行为评估能力的扩展。
🔗 [Issue #24353](https://github.com/google-gemini/gemini-cli/issues/24353)

### AST 感知文件读取与代码库映射评估 — #22745
**状态**: P2 / EPIC · **评论 7**
探讨 AST 感知工具在精确读取方法边界、减少 token 噪声、优化代码库导航方面的价值。若落地，将显著改善大代码库场景下的 Agent 效率。
🔗 [Issue #22745](https://github.com/google-gemini/gemini-cli/issues/22745)

### Gemini 不主动使用 skills 与子代理 — #21968
**状态**: P2 / Bug · **评论 6**
用户反馈 Gemini 几乎不会主动使用自定义 skills 和子代理，除非显式指令要求。社区认为这与"Agent 自主性"的核心价值相悖。
🔗 [Issue #21968](https://github.com/google-gemini/gemini-cli/issues/21968)

### Auto Memory 对低价值会话无限重试 — #26522
**状态**: P2 / Bug · **评论 5**
自动记忆（Auto Memory）机制在处理低信号会话时，若提取代理判定"无需读取"，该会话会一直保持未处理状态并被反复推送，造成无效轮询与资源浪费。
🔗 [Issue #26522](https://github.com/google-gemini/gemini-cli/issues/26522)

### Auto Memory 日志泄露与确定性脱敏 — #26525
**状态**: P2 / Security · **评论 4**
Auto Memory 在将本地 transcript 发送至模型前未做确定性脱敏，存在密钥泄露风险；且日志中可能包含已有 skill 内容。安全敏感用户值得关注。
🔗 [Issue #26525](https://github.com/google-gemini/gemini-cli/issues/26525)

### Shell 命令执行后卡在 "Waiting input" — #25166
**状态**: P1 / Bug · **评论 4** · **👍 3**
极简 CLI 命令执行完成后，shell 仍显示活动并提示"等待输入"，导致会话流程中断。多次出现，影响日常操作。
🔗 [Issue #25166](https://github.com/google-gemini/gemini-cli/issues/25166)

### Browser Subagent 在 Wayland 下失败 — #21983
**状态**: P1 / Bug · **评论 4**
浏览器子代理在 Wayland 会话环境中直接失败（Termination Reason: GOAL），导致依赖浏览器自动化的任务不可用。
🔗 [Issue #21983](https://github.com/google-gemini/gemini-cli/issues/21983)

### 🔒 SSRF via DNS 解析绕过（CVSS 8.6） — #28555
**状态**: P2 / Security · **评论 2**
`web-fetch` 工具使用同步 `isPrivateIp()` 校验 URL，未进行 DNS 解析，攻击者可利用域名绕过 SSRF 防护访问内网（如 `169.254.169.254`）。这是本周最值得关注的安全漏洞之一，已有对应修复 PR。
🔗 [Issue #28555](https://github.com/google-gemini/gemini-cli/issues/28555)

## 4. 重要 PR 进展

### 🔒 修复 web-fetch SSRF 漏洞（异步 DNS 解析） — #28557
**状态**: Open · P1 · size/s
将 `isBlockedHost` 从同步 `isPrivateIp()` 改为异步 DNS 解析，阻止域名解析到内网地址的绕过攻击。直接修复 #28555，是当前优先级最高的安全 PR。
🔗 [PR #28557](https://github.com/google-gemini/gemini-cli/pull/28557)

### 🔄 修复 auth 无限循环 — #28519
**状态**: Open · P1 · size/s
正确 await `oauth_creds.json` 的异步写入并强制 consent，解决 #28430 中的无限登录循环问题。
🔗 [PR #28519](https://github.com/google-gemini/gemini-cli/pull/28519)

### 📢 InvalidStreamError 明细透传至 UI — #28566
**状态**: Open · P1 · size/m
将后端 `InvalidStreamError` 的 type/message 传递到 CLI UI，可在遇到空响应时给出针对性建议（如提示使用 `/compress` 减少上下文）。提升错误可操作性。
🔗 [PR #28566](https://github.com/google-gemini/gemini-cli/pull/28566)

### ⚡ 修复 diff hunk 标记被误解析为 @file — #28581
**状态**: Open · P2 · size/m
避免将 unified/combined diff 中的 hunk 标记误判为 `@file` 引用，消除大 diff prompt 下递归 workspace 搜索导致的堆内存增长。
🔗 [PR #28581](https://github.com/google-gemini/gemini-cli/pull/28581)

### 🔒 Sandbox Dockerfile 升级至 Node 22 — #28603
**状态**: Open · P1 · size/xs
将沙箱基础镜像从已 EOL 的 `node:20-slim` 升级至 Node 22，修复 #28584。因沙箱直接执行模型指令，EOL 运行时存在安全风险。
🔗 [PR #28603](https://github.com/google-gemini/gemini-cli/pull/28603)

### 🔑 MCP OAuth 刷新使用已存储 client ID — #28481
**状态**: Open · P1 · size/m
修复通过 OAuth discovery + 动态客户端注册的 MCP server 无法刷新 token 的问题：此前刷新在触发网络请求前即失败并删除凭据，导致每次都要重新认证。
🔗 [PR #28481](https://github.com/google-gemini/gemini-cli/pull/28481)

### 🍎 macOS 沙箱模式启动崩溃修复 — #28551
**状态**: Open · size/l
当 runfiles/bundle 中缺少静态 Seatbelt `.sb` 配置文件时，`-s` 沙箱模式启动即崩溃。此 PR 回退到内嵌 profile 以解决关键启动故障。
🔗 [PR #28551](https://github.com/google-gemini/gemini-cli/pull/28551)

### 🆕 新增 `--list-all-sessions` 跨工作区会话列表 — #28596
**状态**: Open · P3 · size/l
允许用户跨所有已注册 workspace 查看和管理会话，并按工作区路径分组。解决多目录场景下"忘记 session 存在哪个目录"的痛点。
🔗 [PR #28596](https://github.com/google-gemini/gemini-cli/pull/28596)

### 🐛 环境变量加载顺序修复 — #28597
**状态**: Open · size/l
修复 settings 生命周期中的加载竞态：此前启动时先解析并展开 settings 再加载 `.env`，导致 settings 中的占位符因环境变量尚未就绪而解析失败。
🔗 [PR #28597](https://github.com/google-gemini/gemini-cli/pull/28597)

### 🤖 无 preview 权限时保留 Auto 模型选项 — #28592
**状态**: Open · P2 · size/s
动态模型配置启用时，即使用户无 preview 访问权限，`/model` 中的 Auto 选项仍应可见（Auto 可解析为稳定模型），避免隐藏有效选项。
🔗 [PR #28592](https://github.com/google-gemini/gemini-cli/pull/28592)

## 5. 功能需求趋势

从全部 Issues 中提炼出的社区核心关注方向：

- **Agent / 子代理可靠性（占比最高）**：如错误恢复误报（#22323）、通用 Agent 挂起（#21409）、browser_agent 接管与锁恢复（#22232）、子代理权限控制（#22093）、轨迹可视化与分享（#22598）。
- **AST 感知代码理解（EPIC #22745 / #22746）**：社区希望更精确地读取方法边界与导航代码库，减少 token 消耗与误读。
- **安全性加固**：SSRF 绕过（#28555）、Auto Memory 确定性脱敏与日志收敛（#26525）、危险操作抑制（`git reset --force` 等）（#22672）。
- **Auto Memory 质量改进**：低信号会话去重（#26522）、无效 patch 隔离（#26523）、整体质量跟踪（#26516）。
- **终端体验优化**：resize 闪烁（#21924）、外部编辑器退出后重绘（#24935）、shell 等待输入卡死（#25166）。
- **评估体系（Evals）建设**：组件级评估 EPIC（#24353）、steering eval 稳定性（#23313）。

## 6. 开发者关注点

- **子代理误报成功是信任度最大威胁**：MAX_TURNS 被中断却报告 GOAL 成功（#22323），开发者普遍担忧自动化流程基于错误状态做出后续决策。
- **Agent 自主能力不足**：Gemini 不主动使用自定义 skills 和子代理（#21968），即使在高度相关的场景下也不会自主调用；另有用户反馈 v0.33.0 后子代理未经许可被使用（#22093）——"用与不用"之间需要更可预期、可控的策略。
- **工具与模型能力边界问题**：超过 128/400 个工具可用时触发 400 错误（#24246）；模型频繁在随机位置创建临时脚本造成工作区污染（#23571）；交互式 prompt 卡死（#22465）。
- **Shell 执行稳定性**：简单命令执行后卡在 "Waiting input"（#25166）与 get-shit-done 输出时崩溃（#22186）严重影响日常使用。
- **安全意识的主动提升**：社区对 SSRF（#28555）、密钥脱敏（#26525）、CI/CD 供应链漏洞（#28594 PoC PR）等安全议题关注度明显上升，开发者期待官方在 Agent 权限、网络访问和凭据处理上提供更严格的默认安全策略。

---
*本日报由 AI 技术分析师基于 GitHub 公开数据自动整理，仅供技术交流与社区动态参考。*

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI 社区动态日报

**日期：2026-07-31**  
数据来源：github.com/github/copilot-cli

---

## 1. 今日速览

昨日连续发布 v1.0.77 与 v1.0.77-0 两个版本，核心亮点是为本地交互终端引入了默认的浏览器 OAuth 登录流程，并允许在 autopilot 审批放行时自动禁用沙箱。社区侧，AI Credits 消耗预警、BYOK 认证扩展、子代理稳定性是当前最受关注的三大议题；另外 `session` 过大附件卡死、非 git 仓库下 Rewind 不可用等老问题仍在持续发酵。

---

## 2. 版本发布

### v1.0.77（2026-07-30）

- **Autopilot 沙箱行为优化**：当无条件 autopilot 审批被允许且绕过（bypass）生效时，当前会话自动禁用沙箱。
- **Ctrl+G 编辑自由回答**：现在可在 `ask_user` 的自由回答场景中用 Ctrl+G 打开 `$EDITOR` 编辑内容，无需关闭当前提示。
- **浏览器 OAuth 登录流**：新增基于浏览器的 Web OAuth 登录方式，并作为本地交互终端的默认登录方式；远程/无头终端仍默认使用 device code。可通过 `--web-flow` 或 `--device-code` 强制指定模式，也可在交互式 `/login` 命令中选择。

**链接**：https://github.com/github/copilot-cli/releases

### v1.0.77-0（2026-07-30）

- **新增浏览器 OAuth 登录流程**（与 v1.0.77 相同），本地交互终端默认启用，远程/无头终端仍用 device code，支持标记强制指定模式。
- 支持 enfor...（原文截断，推测为“enforcing”相关策略，待查看完整 changelog 确认）。

**链接**：https://github.com/github/copilot-cli/releases

---

## 3. 社区热点 Issues（10 个）

### 1. #3767 超大附件永久卡死会话（CLOSED）  
**标签**：会话、上下文记忆 | **评论** 13 | 👍 1  
CAPI 原生 5 MB 限制下，附件超出后整个会话直接 wedged，且无法恢复。该问题是社区长期痛点，本次虽然关闭，但官方是否给出彻底恢复机制仍值得关注。  
**链接**：https://github.com/github/copilot-cli/issues/3767

### 2. #4295 AI Credits 接近用量上限时无预警（OPEN）  
作者对比 Visual Studio 2026 Professional 在聊天会话中已提供 AI Credits 预警功能，希望 CLI 拥有同等能力。Copilot CLI 在长时间后台任务中容易不知不觉消耗 Credits，此需求贴合大量开发者场景。  
**链接**：https://github.com/github/copilot-cli/issues/4295

### 3. #1381 Rewind 强制依赖 git，非 git 用户受影响（OPEN）  
**标签**：会话 | 👍 10  
该问题已存在约 5 个月，作者使用 Jujutsu（jj）作为 VCS，Rewind 不可用。获得 10 个赞，说明非 git 工作流用户群体对此功能诉求强烈。  
**链接**：https://github.com/github/copilot-cli/issues/1381

### 4. #4293 子代理全工具访问时静默失败（OPEN）  
**标签**：agents、tools  
通过 `task` 工具启动的子代理在拥有完整工具集时返回**完全空响应**（无错误、无部分输出、无日志），而限制工具集时却能正常工作。该问题直接指向 agent 工具权限管理的深层 bug。  
**链接**：https://github.com/github/copilot-cli/issues/4293

### 5. #4311 转录区域空白渲染，需强制刷新才恢复（OPEN）  
**标签**：triage、UI 渲染  
交互模式下转录区域随机空白，滚动可看到内容但不会重绘；`/resume` 也只能短暂恢复。疑似 ScrollBox 的 measured-line 缓存失效后未重新触发测量 effect，影响日常使用体验。  
**链接**：https://github.com/github/copilot-cli/issues/4311

### 6. #4310 路由模型无能力数据时静默回退 128K token 预算（OPEN）  
当 routed model 未安装能力限制或 context window 被报告为 0 时，引擎静默使用硬编码 128K token 预算驱动 compaction。对 1M-token 模型（如 Anthropic 大上下文版本）会过早触发上下文压缩，属于隐蔽的性能陷阱。  
**链接**：https://github.com/github/copilot-cli/issues/4310

### 7. #4308 / #4309 AI Credits 在任务完成后仍持续消耗（OPEN）  
两个 issue 几乎同时出现，均报告交互式会话在**所有可见任务已完成**后仍继续消耗 Credits，且未设置 Session limit。涉及账单透明度和后台任务生命周期管理，需官方明确排查。  
**链接**：https://github.com/github/copilot-cli/issues/4308 | https://github.com/github/copilot-cli/issues/4309

### 8. #4306 子任务冻结，无响应（OPEN）  
**标签**：triage  
在 autopilot 模式下使用 `/fleet` 命令循环调度多个 agent/skill（speckit-implement 与 speckit-converge）时，会话中途出现 freeze 且不再响应。多 agent 编排的稳定性问题正在成为高频反馈方向。  
**链接**：https://github.com/github/copilot-cli/issues/4306

### 9. #4299 长会话输入延迟不断恶化（OPEN）  
**标签**：会话、键盘输入 | 👍 1  
长时间运行的会话（尤其是带后台 agent 时）敲击延迟越来越严重，几乎不可用。涉及事件循环、渲染管线在长会话下的性能退化。  
**链接**：https://github.com/github/copilot-cli/issues/4299

### 10. #4301 MCP 工具参数数组/字符串 union 被错误字符串化（OPEN）  
**标签**：MCP、tools  
当 MCP 工具参数的 JSON Schema 为 `anyOf: [array, string]`（如 Zod 的 `z.union([z.array(z.string()), z.string(), z.null()])`）时，CLI 会在发送前将参数扁平化/字符串化，破坏参数类型。影响数组类参数的工具调用。  
**链接**：https://github.com/github/copilot-cli/issues/4301

---

## 4. 重要 PR 进展

过去 24 小时内无公开 PR 更新或合并。

---

## 5. 功能需求趋势

从近 24 小时更新的 27 条 Issues 中，社区最关注的功能方向如下：

### 🔴 AI Credits 用量透明化（3+ 条相关）
- #4295 请求提供 Credits 接近上限的预警
- #4308 / #4309 报告任务完成后 Credits 持续消耗
- 开发者希望 CLI 在长时间/后台任务中提供**实时用量提示**和**消费上限保护**

### 🔴 认证与模型接入灵活性（2+ 条相关）
- #4300 请求 BYO-K 支持 `bearerToken` 认证（企业合规场景禁用 key-based auth）
- #4258 自定义/BYOK provider 在 `-i` 交互模式下启动提示被忽略
- 企业用户对自定义模型网关、Token 认证方式的诉求日益强烈

### 🟡 多代理/子代理可靠性（2 条相关）
- #4293 子代理全工具访问静默失败
- #4306 多 agent 循环调度时子任务冻结
- 官方正在推进 agents 能力，但稳定性和错误可观测性仍是短板

### 🟡 非 git 版本控制支持（1 条，长期）
- #1381 Rewind 依赖 git，jj 等其他 VCS 用户无法使用核心功能，已获 10 个 👍

### 🟡 沙箱与权限细粒度控制（1 条）
- #4298 请求在 settings.json 中为 sandbox 配置工具白名单/选择性启用

### 🟡 终端兼容性（3 条相关）
- #4296 iTerm2 中 Cmd+V 粘贴失效
- #2841 MobaXterm/PuTTY SSH 下鼠标滚轮失效
- #4304 新会话侧边栏无法用方向键导航

---

## 6. 开发者关注点

| 痛点/需求 | 相关 Issue | 说明 |
|---|---|---|
| **长会话性能退化** | #4299 | 长时间运行 + 后台 agent 时键入延迟严重，系统几近不可用 |
| **子代理静默失败** | #4293 | 无错误、无日志、无输出，排查困难 |
| **Credits 消耗不透明** | #4308 / #4309 / #4295 | 任务“看似完成”后仍在扣费，缺乏用量预警 |
| **终端兼容性参差** | #4296 / #2841 / #4304 | iTerm2、MobaXterm 等常见终端各有问题 |
| **日志级别崩溃** | #4297 | `--log-level error` 等合法值直接导致启动崩溃 |
| **上下文预算静默回退** | #4310 | 大上下文模型被 128K 硬编码预算错误压缩，影响输出质量 |
| **MCP 参数类型损坏** | #4301 | 数组/字符串联合类型的工具参数被字符串化，破坏调用 |

---

**总结**：v1.0.77 的浏览器 OAuth 登录与 Ctrl+G 编辑自由回答是体验层面的明确改进；但社区当前最急迫的声音集中在 **AI Credits 消耗透明度、子代理稳定性、长会话性能** 三个方向。建议关注 #4293 与 #4311 的后续修复进展，以及官方是否会对 #4308/#4309 的 Credits 行为给出正式回应。

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

# Kimi Code CLI 社区动态日报（2026-07-31）

## 1. 今日速览
今日社区动态聚焦于稳定性问题：#2571 报告 LLM 服务 429 限流导致 CLI 完全不可用，#2570 则描述 CLI 在 Windows 下间歇性冻结。长期挂起的记忆系统功能请求 #1283 再次获得更新，说明跨会话上下文管理仍是社区刚需。PR #2565 正在修复 hook 异步任务因 WeakSet 引用被意外回收的隐患。

## 2. 版本发布
今日无新版本发布。

## 3. 社区热点 Issues
> 今日数据源中共计 3 个活跃 Issue，以下为全部逐条分析。

### #1283 [Feature Request] Memory System - 持久化上下文记忆系统
- **作者**: CatKang | **创建**: 2026-02-27 | **更新**: 2026-07-30 | **评论**: 7
- **链接**: [MoonshotAI/kimi-cli Issue #1283](https://github.com/MoonshotAI/kimi-cli/issues/1283)
- **为什么重要**: 该 Issue 创建于 5 个月前，今日再次被更新，说明社区对跨会话记忆的诉求长期未得到满足。请求同时包含 AI 自动记忆（自动管理的笔记）和手动记忆（用户定义指令），若落地将极大提升 CLI 在多项目、长周期任务中的实用性。
- **社区反应**: 7 条评论在同类功能请求中属于较高互动，讨论集中在记忆的存储形式、隐私边界以及如何在 CLI 中无感触发读写。

### #2571 [Bug] LLM Overloaded! Can't use Kimi at all
- **作者**: andrew-sz | **创建**: 2026-07-30 | **更新**: 2026-07-30 | **评论**: 1
- **链接**: [MoonshotAI/kimi-cli Issue #2571](https://github.com/MoonshotAI/kimi-cli/issues/2571)
- **为什么重要**: 用户环境为 1.49.0 版本 + Kimi K3 模型，遇到 HTTP 429 限流错误（LLM provider 过载），直接导致 CLI 完全不可用。这是典型的生产阻塞问题，影响面可能波及同一模型服务的所有用户。
- **社区反应**: 刚创建即有 1 条评论，预计会有更多用户跟进确认是否大面积遭遇限流。

### #2570 [Bug] CLI 随机冻结，与浏览器标签页状态相关
- **作者**: XbackMK | **创建**: 2026-07-30 | **更新**: 2026-07-30 | **评论**: 0
- **链接**: [MoonshotAI/kimi-cli Issue #2570](https://github.com/MoonshotAI/kimi-cli/issues/2570)
- **为什么重要**: 用户报告 CLI 在 Windows 11 上出现无响应（spinning moon），且与浏览器标签页状态存在关联。这暗示 CLI 可能依赖本地浏览器会话或 OAuth 状态，会话状态异常时客户端逻辑可能陷入死锁。
- **社区反应**: 暂无评论，但版本号为 0.29.2（远低于当前 1.x），该问题可能已在后续版本中修复，需维护者确认。

## 4. 重要 PR 进展
> 今日数据源中仅 1 个活跃 PR。

### #2565 [fix] hooks: keep a strong reference to fire-and-forget hook triggers
- **作者**: LHMQ878 | **创建**: 2026-07-28 | **更新**: 2026-07-30 | **评论**: 详情见 GitHub
- **链接**: [MoonshotAI/kimi-cli PR #2565](https://github.com/MoonshotAI/kimi-cli/pull/2565)
- **内容**: 修复 #2564。`asyncio` 使用 `WeakSet` 持有运行中的 Task，若任务对象在函数返回后离开作用域，可能被垃圾回收导致 hook 触发失效。修复方式是在 `create_task` 后保存强引用并添加 `done_callback` 以捕获异常。
- **重要性**: 该 PR 精准解决异步任务生命周期管理的经典坑位，避免”灵异现象“——hook 偶尔不执行。对于依赖 hook 做自动化（如 CI/CD 集成）的用户影响较大，属于可靠性修复。

## 5. 功能需求趋势
基于当前活跃 Issue，社区关注方向集中在以下三个方面：

- **跨会话记忆能力**（#1283）：希望 CLI 能记住项目模式、用户偏好与上下文，减少重复对话成本。
- **服务稳定性与限流策略优化**（#2571）：429 限流直接阻断工作流，用户期望更智能的重试机制和负载提示。
- **客户端恢复力**（#2570）：CLI 不应因外部依赖（如浏览器状态）而进入不可恢复的冻结状态，需要更健全的会话管理和超时机制。

## 6. 开发者关注点
- **429 限流应对不足**：错误信息对用户不友好，缺少等待时长建议或自动重试，严重影响核心使用场景。
- **版本碎片化**：活跃用户中仍存在 0.29.2 与 1.49.0 等跨度巨大的版本，部分旧版本问题可能已被修复，但用户缺乏升级路径的明确指引。
- **异步任务生命周期管理**：hook 触发等后台任务容易被误回收，开发者对 asyncio 底层行为（WeakSet）的认知门槛较高，相关问题值得通过框架层设计规避。
- **会话状态耦合浏览器**：CLI 登录态与浏览器状态强相关，浏览器状态变化可能拖垮 CLI 进程，是较为紧迫的健壮性隐患。

---
*以上日报基于 2026-07-31 GitHub 公开数据自动生成。*

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode 社区动态日报（2026-07-31）

## 今日速览

今日发布 **v1.18.10**，核心新增 Modal 模型自动发现能力，桌面端同步优化了附件、Toast 与标签页交互。PR 侧最值得关注的是 Codex 逻辑向 OpenAI 插件收敛的重构已合并，同时模型输入限制、Gemini 推理级别、xAI 原生选项映射等多项模型层改进正在推进。社区讨论热度最高的仍是 TUI "exiting loop" 问题（#38801，17 条评论）与 `/compact` 增强需求（#5200，28 个 👍）。

---

## 版本发布

### v1.18.10

**Core**
- 自动发现可用的 Modal 模型（@devennavani）

**Desktop（改进）**
- 阻止同一附件被重复添加
- 始终显示"新建会话"按钮
- 改进 Toast 通知的堆叠、关闭行为及移动端布局
- 优化标签页 hover 与激活状态样式

🔗 [查看 Release](https://github.com/anomalyco/opencode/releases)

---

## 社区热点 Issues

### 1. #38801 `message="exiting loop"` —— TUI 循环退出问题（17 条评论）
- **状态**：OPEN｜创建 2026-07-25｜更新 2026-07-31
- **为什么值得关注**：当前评论数最高的 Issue。作者坦言"每次想认真用 TUI 都会被迫放弃"，即使把 `step` 调到 80 仍会触发 dreaded 'exiting loop' 消息，严重打击 TUI 使用信心。
- **社区反应**：17 条评论表明多人遇到同类问题，且涉及多种 OpenAI 兼容 API 配置。
- 🔗 [Issue #38801](https://github.com/anomalyco/opencode/issues/38801)

### 2. #5200 `/compact` 应可配置使用 OpenAI Responses API 原生 compaction（28 👍）
- **状态**：OPEN｜创建 2025-12-07｜更新 2026-07-31
- **为什么值得关注**：全站最高赞功能请求（28 👍）。用户希望 `/compact` 调用 OpenAI Responses API 的 compaction 端点（如 gpt-5.1-codex 系列），替代本地截断，以获得更好的上下文压缩质量。
- 🔗 [Issue #5200](https://github.com/anomalyco/opencode/issues/5200)

### 3. #29754 qwen3.7-max 经 OA-兼容端点返回 401 `unsupported_value`（8 条评论）
- **状态**：CLOSED｜创建 2026-05-28｜更新 2026-07-31
- **为什么值得关注**：通过 OpenCode Go（oa-compat）调用 qwen3.7-max 时，`response_format.type` 触发 401 错误，而同环境其他模型（如 mimo-v2-pro）正常，反映了 OpenAI 兼容层参数透传的兼容性缺口。
- 🔗 [Issue #29754](https://github.com/anomalyco/opencode/issues/29754)

### 4. #28011 v1.15.x 起 `edit` 工具连续调用频繁被中断（6 条评论）
- **状态**：CLOSED｜创建 2026-05-17｜更新 2026-07-31
- **为什么值得关注**：从 v1.15.3 开始，对同一文件连续执行 `edit` 会报 `[Tool execution was interrupted]`，v1.14.x 无此问题，属于典型的升级回归 bug，直接影响 Agent 日常编辑效率。
- 🔗 [Issue #28011](https://github.com/anomalyco/opencode/issues/28011)

### 5. #29334 GLM-5.1（ZAI Coding 订阅）报 Invalid API parameter（6 条评论 / 3 👍）
- **状态**：CLOSED｜创建 2026-05-26｜更新 2026-07-31
- **为什么值得关注**：用户未做任何配置变更即开始报错，且附有完整错误截图。GLM 作为国内高频模型，其 API 参数兼容性问题影响面较大。
- 🔗 [Issue #29334](https://github.com/anomalyco/opencode/issues/29334)

### 6. #26907 Web UI 子会话权限审批后提示框卡死（5 条评论）
- **状态**：CLOSED｜创建 2026-05-11｜更新 2026-07-31
- **为什么值得关注**：子代理触发权限请求时，点击 "Allow once/always" 后服务器已返回 `200 true`，但 composer 中的权限提示仍不消失，属于 Web UI 状态同步缺陷。
- 🔗 [Issue #26907](https://github.com/anomalyco/opencode/issues/26907)

### 7. #30054 升级 v1.15.13 后历史会话全部消失（5 👍 / 回归）
- **状态**：CLOSED｜创建 2026-05-31｜更新 2026-07-31
- **为什么值得关注**：`opencode web` 从 v1.15.11 升至 v1.15.13 后，UI 中所有历史会话记录消失。高赞回归问题，说明版本升级对数据持久化的稳定性至关重要。
- 🔗 [Issue #30054](https://github.com/anomalyco/opencode/issues/30054)

### 8. #29963 支持 Linux PRIMARY 选择（中键粘贴）（4 👍）
- **状态**：CLOSED｜创建 2026-05-30｜更新 2026-07-31
- **为什么值得关注**：Linux 用户习惯中键粘贴 PRIMARY 剪贴板，但当前 TUI 仅面向 CLIPBOARD。该功能请求直击 Linux 桌面端体验短板，获得 4 个 👍。
- 🔗 [Issue #29963](https://github.com/anomalyco/opencode/issues/29963)

### 9. #21273 WebUI 无法上传视频文件（4 👍）
- **状态**：CLOSED｜创建 2026-04-07｜更新 2026-07-31
- **为什么值得关注**：`opencode serve` 模式下，即使模型支持视频输入，WebUI 仍提示 "Only images, PDFs, or text files can be attached here"，多模态能力在 UI 层被硬编码限制。
- 🔗 [Issue #21273](https://github.com/anomalyco/opencode/issues/21273)

### 10. #39771 网络错误应快速失败并输出简洁错误（3 条评论 / 新开）
- **状态**：OPEN｜创建 2026-07-30｜更新 2026-07-31
- **为什么值得关注**：新开 Issue，针对网络不稳定场景（作者特别提到中国大陆 GitHub HTTPS 经常被墙但 SSH 正常）：工具会卡满 60–120 秒超时，无快速失败也无 fallback，且大段错误输出影响排查效率。
- 🔗 [Issue #39771](https://github.com/anomalyco/opencode/issues/39771)

---

## 重要 PR 进展

### 1. #39797 fix(core): respect model input limits
- **内容**：为可执行原生模型与 AI SDK 模型增加 `input` 限制；在模型解析与 provider-package 设置中保留 catalog 输入上限；按显式输入限制与"上下文减输出预算"两者中更紧者触发 compact；同步调整 ChatGPT OAuth GPT-5.4/5.5 等模型资格。
- **意义**：解决模型上下文超限时的静默失败问题，是上下文管理的关键补强。
- 🔗 [PR #39797](https://github.com/anomalyco/opencode/pull/39797)

### 2. #39796 feat(ai): support Gemini thinking levels
- **内容**：将 Google AI SDK `thinkingConfig` 显式映射到 Gemini 原生选项，支持 `thinkingBudget`、`includeThoughts`、`thinkingLevel` 任意组合，并补充原生请求 lower 与公共类型定义。
- **意义**：为 Gemini 用户提供官方推理等级控制能力，对齐 Google 最新 API。
- 🔗 [PR #39796](https://github.com/anomalyco/opencode/pull/39796)

### 3. #39795 fix(opencode): spawn configured posix shell directly on Windows
- **内容**：修复 Windows 上配置 POSIX shell（如 `C:/msys64/usr/bin/bash.exe`）无法在 bash 工具中生效的问题，改为直接 spawn 配置的 shell（Closes #38799）。
- **意义**：改善 Windows 下 Git Bash/MSYS2 用户的体验。
- 🔗 [PR #39795](https://github.com/anomalyco/opencode/pull/39795)

### 4. #39257 fix(core): preserve custom Codex endpoints（已合并）
- **内容**：将 ChatGPT/Codex 端点与账户头行为保留在 OpenAI 插件内；通用模型解析器仅处理 OAuth bearer 凭据，不再识别 Codex 方法 ID；允许用户后续 provider 配置覆盖插件默认的 Codex 端点。
- **意义**:修复自定义 Codex 端点被覆盖的回归问题。
- 🔗 [PR #39257](https://github.com/anomalyco/opencode/pull/39257)

### 5. #39734 refactor(core): contain Codex in OpenAI plugin（已合并）
- **内容**：将 ChatGPT/Codex 路由与 catalog 行为完全收拢至 OpenAI 插件；`@ai-sdk/openai` catalog 模型全部改走原生 provider 而非 AI SDK hooks；从通用模型解析器移除 Codex 专属逻辑，并统一 Codex 模型资格与订阅校验。
- **意义**：架构收敛，降低模型解析器与插件之间的耦合，为后续 provider 扩展铺路。
- 🔗 [PR #39734](https://github.com/anomalyco/opencode/pull/39734)

### 6. #39787 fix(core): map xAI native options（已合并）
- **内容**：显式映射 `@ai-sdk/xai` 支持的设置到 xAI 原生选项；校验 reasoning effort、storage、prompt cache key 与 include 取值，非法/不支持参数不再任意透传；新增合并 catalog 与用户配置的映射测试。
- **意义**：提升 xAI（Grok）接入的稳定性与参数可控性。
- 🔗 [PR #39787](https://github.com/anomalyco/opencode/pull/39787)

### 7. #39776 feat(tui): hot-reload local TUI plugins
- **内容**：编辑本地 TUI 插件后无需重启即可在运行中的 TUI 生效；插件导入失败、setup 失败或渲染崩溃被隔离在该插件内，不再拖垮 generation 或整个应用（Closes #39777）。
- **意义**：TUI 插件开发体验的重大改进，降低试错成本。
- 🔗 [PR #39776](https://github.com/anomalyco/opencode/pull/39776)

### 8. #39791 fix(session): stop retrying fixed-window usage quotas
- **内容**：对已知长窗口配额（5 小时 / 周 / 月）的 429 响应不再重试，因为此类配额短期内不可能恢复（Closes #39790）。
- **意义**：避免无意义重试烧 token 和浪费时间，提升配额受限时的用户体验。
- 🔗 [PR #39791](https://github.com/anomalyco/opencode/pull/39791)

### 9. #39764 feat(plugin): add session request hook（已合并）
- **内容**：在 Effect 与 Promise 插件边界暴露 `session.request`；允许插件修改最终外发的原生 LLM URL、HTTP headers 与序列化请求体；该 hook 在请求序列化与鉴权之后调用。
- **意义**：为插件生态增加请求级拦截能力，可支撑审计、代理、私有化改造等场景。
- 🔗 [PR #39764](https://github.com/anomalyco/opencode/pull/39764)

### 10. #27554 feat(opencode): local LAN provider discovery + auto-discover models
- **内容**：在 `/connect` 中新增 `Local (LAN)` 发现能力，通过 mDNS 等机制自动发现局域网内的 OpenAI 兼容服务器并自动获取模型列表（Closes #6231、#27553）。
- **意义**：大幅降低本地/局域网模型（Ollama、LM Studio 等）的接入门槛。
- 🔗 [PR #27554](https://github.com/anomalyco/opencode/pull/27554)

---

## 功能需求趋势

从今日 Issues 与 PR 中可提炼出以下社区关注方向：

| 方向 | 代表 Issue / PR | 热度信号 |
|---|---|---|
| **模型/提供商兼容性** | qwen3.7-max 401（#29754）、GLM-5.1 无效参数（#29334）、xAI 原生映射（#39787）、Gemini thinking（#39796）、Friendli 文档（#39793） | 高频、多模型 |
| **上下文压缩增强** | `/compact` 使用 OpenAI compaction（#5200）、模型输入限制（#39797） | 28 👍，讨论活跃 |
| **TUI / 桌面端体验** | TUI 插件热重载（#39776）、会话选择器范围（#39784）、标签页默认全局（#39783）、Linux PRIMARY 粘贴（#29963） | kitlangton 密集提交 |
| **Web UI 多模态能力** | 视频上传（#21273）、modalities 配置（#30071） | 4 👍，gap 明确 |
| **MCP 生命周期管理** | MCP 孤儿进程（#30123、#30073） | 重复报告，影响资源占用 |
| **网络与错误处理韧性** | 快速失败（#39771）、配额 429 停止重试（#39791）、子代理断连续跑（#30154） | 新开需求，场景真实 |
| **可观测性** | OTel traces 丢失（#30087、#13438） | 两个 Issue 同因，修复中 |

---

## 开发者关注点

1. **Provider API 兼容性阵痛频繁**：多款模型（Qwen、GLM、Z.AI）在 OpenAI 兼容层出现 401、`unsupported_value`、`ECONNRESET` 等错误，且官方 provider 与自定义 provider 之间的参数映射仍不够健壮。社区期望更严格的参数校验与更清晰的错误提示。

2. **升级回归风险突出**：v1.15.x 系列连续出现 `edit` 工具中断（#28011）、历史会话消失（#30054）等回归，说明版本发布节奏快的同时，稳定性保障需加强。

3. **MCP 子进程泄漏成为普遍痛点**：多个 Issue（#30123、#30073）指向退出/重启时 MCP 子进程未被清理，有用户报告积累 30 个孤儿 node.exe 进程，且启动时全量拉起所有 MCP server 也加剧了资源浪费。

4. **长会话性能衰减**：多轮对话后界面明显卡顿（#30101），diff 计算在 1000 文件规模下耗时 13 秒（#20734），上下文膨胀带来的性能问题亟待系统性优化。

5. **配置与环境的"隐形坑"**：全局 MCP 在项目目录存在时失效（#30038）、企业 npm 镜像导致 provider 安装失败但错误信息晦涩（#30069）、Docker 镜像缺少 git 二进制（#27743）——这类环境相关问题虽不高频，但一旦踩中即完全阻塞使用。

6. **网络错误处理不够"聪明"**：中国大陆等网络的现实问题被明确提出（#39771），开发者希望工具具备快速失败、fallback 与精简错误输出的能力，而不是干等超时。

---

*本日报基于 2026-07-31 GitHub 公开数据自动生成，数据源：[anomalyco/opencode](https://github.com/anomalyco/opencode)*

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code 社区动态日报 — 2026-07-31

## 今日速览

Qwen Code 今日发布 `v0.21.1-nightly.20260731.702932cc7`，包含 CI 与 Web Shell 修复。社区讨论热度集中在 **Windows 稳定性**（崩溃、LMStudio 连接失败）与 **Anthropic 转换器系列缺陷**（4 个关联 Issue），同时 **工作区状态隔离** 成为 PR 侧最明确的架构改进方向。

---

## 版本发布

### v0.21.1-nightly.20260731.702932cc7
**主要变更：**
- **fix(ci):** 为 qwen-triage 容器任务增加默认 bash shell（PR [#7838](https://github.com/QwenLM/qwen-code/pull/7838)）
- **fix(web-shell):** 对 Web Shell 相关功能进行修复，具体内容详见版本说明

---

## 社区热点 Issues

### 1. Startup banner 首次渲染缺行（#8124）
**标签：** P2 / bug / UI / Windows  
启动时 TUI 的 ASCII logo 顶部约 3 行偶发缺失，与待定的 provider 更新事件相关，属于首帧 `stdout` 写入问题。已有 9 条评论，社区确认在 Windows 环境下出现频率更高。  
🔗 [Issue #8124](https://github.com/QwenLM/qwen-code/issues/8124)

### 2. 如何获取会话中创建的文件？（#7966）
**标签：** question / session-management  
用户询问区分"直接写入"与"代码间接生成"文件的方案，暴露了会话级文件追踪能力的缺失。6 条评论表明这是工作区管理场景下的高频需求，目前暂无明确方案。  
🔗 [Issue #7966](https://github.com/QwenLM/qwen-code/issues/7966)

### 3. Config 上下文所有权设计（#8083）
**标签：** P1 / enhancement / core  
提出将派生 `Config` 实例的状态所有权显式化，替代当前 `Object.create(base)` 的模式。涉及 subagent、内存代理、审批模式等多条生产路径，是影响面较大的架构设计提案。  
🔗 [Issue #8083](https://github.com/QwenLM/qwen-code/issues/8083)

### 4. Provider 警告清理器安全缺陷（#8136）
**标签：** P2 / bug / security  
`sanitizeProviderWarning` 存在两个安全漏洞：截断含端口的 URL 消息，且当密码包含 `@` 时凭据会泄露到 `/status` 负载中。此问题直接影响用户凭证安全，社区已提交修复 PR。  
🔗 [Issue #8136](https://github.com/QwenLM/qwen-code/issues/8136)

### 5. Anthropic 转换器：历史轮次 thinking 签名残留（#8162）
**标签：** P2 / bug / content-generation  
当历史轮次中的 `tool_use` 被清理后，对应的 `thinking` / `redacted_thinking` 块未同步修剪，导致转换器输出无效消息结构。是近期 Anthropic 转换器系列问题之一。  
🔗 [Issue #8162](https://github.com/QwenLM/qwen-code/issues/8162)

### 6. worktree 设置写入路径错误（#8138）
**标签：** P2 / bug / configuration  
在 git worktree 中修改设置时，`settings.json` 被写入了项目根目录而非 worktree 自身的 `.qwen` 目录，导致多 worktree 场景下的配置互相覆盖。  
🔗 [Issue #8138](https://github.com/QwenLM/qwen-code/issues/8138)

### 7. 桌面版无法连接 LMStudio（#8146）
**标签：** P2 / bug / Windows  
Windows 桌面端连接 LMStudio 时请求未送达 API，界面显示运行中但实际无任何输出，疑似本地 HTTP 请求路由问题。  
🔗 [Issue #8146](https://github.com/QwenLM/qwen-code/issues/8146)

### 8. 基于 Web Shell 构建轻量桌面应用（#8092）
**标签：** feature-request / need-discussion  
提议复用 Web Shell 作为桌面端主要 UI，替代当前独立维护的桌面产品。社区对降低维护成本的方向讨论积极，需进一步明确离线能力与原生集成边界。  
🔗 [Issue #8092](https://github.com/QwenLM/qwen-code/issues/8092)

### 9. 0.21.1 Windows 崩溃（#7972）
**标签：** P2 / bug / Windows  
Windows 用户升级至 0.21.1 后短时间内崩溃 3 次，目前处于 `need-information` 状态，尚无根因定位。是当前 Windows 稳定性问题的代表性反馈。  
🔗 [Issue #7972](https://github.com/QwenLM/qwen-code/issues/7972)

### 10. Agent Team 消息排队问题（#8172）
**标签：** P2 / bug / Agent Team  
Teammate 向 leader 发送的消息仅在 `Idle` 状态下投递，若当前 turn 包含长时间多工具调用，消息会等待整个 turn 结束而非下一个响应点，严重降低团队协作效率。  
🔗 [Issue #8172](https://github.com/QwenLM/qwen-code/issues/8172)

---

## 重要 PR 进展

### 1. feat(channels): 按工作区隔离 daemon 适配器状态（#8178）
为每个 daemon 管理的 channel 实例提供独立的状态目录，结合可读前缀与哈希后缀防止路径穿越。是当前工作区隔离方向的基础设施改动。  
🔗 [PR #8178](https://github.com/QwenLM/qwen-code/pull/8178)

### 2. fix(cli): 阻止 VP 模式静默崩溃（#8088）
为 VP（alternate-screen）模式增加 `uncaughtException` 处理器，将崩溃原因可视化。关联 #7972、#7779 等崩溃报告，虽未直接修复根因，但能显著提升排障效率。  
🔗 [PR #8088](https://github.com/QwenLM/qwen-code/pull/8088)

### 3. feat(hooks): 新增 SessionDelete 事件（#8059）
在显式删除历史会话后触发 `SessionDelete` 钩子，传入 `deleted_session_id`，同步支持 `/delete` 命令与 ACP `deleteSession`，补全会话生命周期管理。  
🔗 [PR #8059](https://github.com/QwenLM/qwen-code/pull/8059)

### 4. fix: 测试套件 Windows 可移植性（#8050）
统一工作区测试与运行时敏感路径在 Windows 上的行为，复用自托管 Windows 验证流程，解决 POSIX 专属语义在 Windows 上的失败。  
🔗 [PR #8050](https://github.com/QwenLM/qwen-code/pull/8050)

### 5. fix(cli): 凭据剥离限定至 URL authority（#8137）
针对 #8136 的修复：将凭据查找范围限定在 URL authority，删除自定义启发式逻辑，避免端口截断与 `@` 泄露问题。  
🔗 [PR #8137](https://github.com/QwenLM/qwen-code/pull/8137)

### 6. feat(telemetry): 跟踪工具执行结果（#8180）
新增 `executionStatus` 字段，记录 `invocation.execute()` 是否进入及执行成功与否，与终端状态互补，提升工具调用可观测性。  
🔗 [PR #8180](https://github.com/QwenLM/qwen-code/pull/8180)

### 7. feat(core): GenAI 首 Token 延迟追踪（#8150）
为 LLM span 增加 GenAI v1.41 流式属性，记录 `gen_ai.response.time_to_first_chunk`（TTFT），用于流式响应性能监控。  
🔗 [PR #8150](https://github.com/QwenLM/qwen-code/pull/8150)

### 8. feat(core): 当前 PR Autofix 监视器（#8121）
为当前分支关联的 PR 提供 `/autofix` 监控：报告 PR 状态、CI/Review 聚合结果，支持 `propose-only`、`auto-commit`、`auto-push` 三种模式。  
🔗 [PR #8121](https://github.com/QwenLM/qwen-code/pull/8121)

### 9. feat(cli): 交互式 TUI 引入 Goal v3（#8005）
TUI 接入 Goal v3 运行时：新增 `/goal` 生命周期命令、持久化卡片与页脚状态、Goal-aware 恢复与分支恢复，以及双通道输入队列。  
🔗 [PR #8005](https://github.com/QwenLM/qwen-code/pull/8005)

### 10. feat(skills): 支持禁用技能级别（#8057）
新增 `skills.disabledLevels` 配置（`project` / `user` / `extension` / `bundled`），可在文件系统访问前跳过禁用级别的技能发现，实现对内置技能的精细管控。  
🔗 [PR #8057](https://github.com/QwenLM/qwen-code/pull/8057)

---

## 功能需求趋势

### 1. 工作区 / 会话状态隔离（最突出）
多个 PR 与 Issue 指向同一方向：daemon 状态需按工作区隔离（[#8178](https://github.com/QwenLM/qwen-code/pull/8178)、[#8056](https://github.com/QwenLM/qwen-code/pull/8056)），worktree 配置写入需独立（[#8138](https://github.com/QwenLM/qwen-code/issues/8138)），会话文件追踪需增强（[#7966](https://github.com/QwenLM/qwen-code/issues/7966)）。

### 2. Anthropic 转换器正确性
针对转换器的连续 4 个缺陷修复集中在 `thinking` 块修剪、`tool_result` 排序、ID 字符集消毒、孤儿 `tool_use` 处理（[#8159](https://github.com/QwenLM/qwen-code/issues/8159) ~ [#8162](https://github.com/QwenLM/qwen-code/issues/8162)），反映社区对跨模型转换稳定性的高要求。

### 3. 可观测性增强
工具执行结果追踪（[#8180](https://github.com/QwenLM/qwen-code/pull/8180)）、GenAI TTFT 指标（[#8150](https://github.com/QwenLM/qwen-code/pull/8150)）、subagent 状态监控（[#8128](https://github.com/QwenLM/qwen-code/issues/8128)）表明用户对运行时透明度的需求持续上升。

### 4. Agent 自动化能力
包括 Agent Team 消息机制完善（[#8172](https://github.com/QwenLM/qwen-code/issues/8172)）、PR Autofix 监视器（[#8121](https://github.com/QwenLM/qwen-code/pull/8121)）、可信 agent 运行时提案（[#8102](https://github.com/QwenLM/qwen-code/issues/8102)），社区正推动从"对话助手"走向"自主执行协作者"。

---

## 开发者关注点

### ⚠️ Windows 平台稳定性
- 0.21.1 在 Windows 上短时间内崩溃 3 次（[#7972](https://github.com/QwenLM/qwen-code/issues/7972)）
- 独立安装程序在 PowerShell 无法解析 `Get-FileHash` 时安装失败（[#7118](https://github.com/QwenLM/qwen-code/issues/7118)）
- 桌面版连接 LMStudio 无请求发出（[#8146](https://github.com/QwenLM/qwen-code/issues/8146)）

### ⚠️ 配置管理的上下文错乱
多个 worktree / workspace 共存时，设置写入与状态管理存在路径错误，用户需要明确的作用域隔离机制。

### ⚠️ 安全问题的敏感度
Provider 警告中密码泄露（[#8136](https://github.com/QwenLM/qwen-code/issues/8136)）引发对凭据处理链路安全的普遍担忧，社区期待更严格的 sanitize 策略。

### ⚠️ CI 可靠性
连续出现 sdk-typescript E2E 测试失败（[#8133](https://github.com/QwenLM/qwen-code/issues/8133)、[#8153](https://github.com/QwenLM/qwen-code/issues/8153)、[#8076](https://github.com/QwenLM/qwen-code/issues/8076)），涉及权限控制、系统控制等核心模块，增加维护负担。

### ⚠️ 前端渲染细节
首帧渲染缺失（[#8124](https://github.com/QwenLM/qwen-code/issues/8124)）、虚拟化历史模式文本无法选中（[#8131](https://github.com/QwenLM/qwen-code/issues/8131)）、VP 模式光标溢出（[#8113](https://github.com/QwenLM/qwen-code/issues/8113)）——这类体验细节虽为 P2/P3，但累积影响日常使用满意度。

</details>

---
*本日报由 [agents-radar](https://github.com/huang-yi-dae/agents-radar) 自动生成。*