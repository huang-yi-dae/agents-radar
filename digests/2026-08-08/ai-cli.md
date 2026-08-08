# AI CLI 工具社区动态日报 2026-08-08

> 生成时间: 2026-08-08 01:18 UTC | 覆盖工具: 7 个

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

## AI CLI 工具横向对比分析报告 — 2026-08-08

---

### 一、生态全景

AI CLI 工具赛道已进入"平台化竞争"阶段：各工具不再仅比拼编码能力，而是围绕插件生态（MCP/Agent 插件）、企业安全策略、自托管/远程执行、跨工具标准（AGENTS.md）等基础设施展开全面竞争。Claude Code 与 OpenAI Codex 凭借先发优势占据功能深度制高点；Gemini CLI 与 Qwen Code 则在稳定性修复与平台兼容性上投入大量精力。社区对"Agent 可靠性"（状态误报、挂起、静默失败）的容忍度正在下降，对 Windows 平台支持、自定义模型/提供商兼容性、跨会话记忆等诉求呈集中爆发态势。整体趋势是从"能用"向"可信赖、可管控、可扩展"演进。

---

### 二、各工具活跃度对比

| 工具 | 今日 Issues（热点） | 今日 PR（活跃） | Release 情况 | 迭代节奏 |
|------|---------------------|-----------------|--------------|----------|
| **Claude Code** | 10 个热点（1 个👍 4526 超高热） | 3 条公开（社区贡献） | v2.1.224 / v2.1.225 两版 | 稳定双版本节奏 |
| **OpenAI Codex** | 10 个热点（多平台问题集中） | 10+ 已合并 | v0.147.0 稳定 + 3 个 alpha | 高频合并，基础设施侧重点 |
| **Gemini CLI** | 10 个热点（P1 级 5 个） | 10 条（含 1 条 SSRF 安全修复） | 4 版本（2 nightly + preview + 稳定补丁） | 极高频，首个夜间版 |
| **GitHub Copilot CLI** | 10 个热点（3 个 Windows 相关） | 无合并/更新 | 3 个预发布（v1.0.79-7~9） | 预发布连发 |
| **Kimi Code CLI** | 3 个热点（1 个安全事件） | 2 条（竞争同一修复） | 无新版本 | 间歇性，事件驱动 |
| **OpenCode** | 10 个热点（服务端问题占 3） | 10 条（生态扩展导向） | v1.18.15 | 稳定周更 |
| **Qwen Code** | 10 个热点（UI 渲染为主） | 10 条（功能与修复并存） | 2 个 nightly | 日更级迭代 |

---

### 三、共同关注的功能方向

| 功能方向 | 涉及工具 | 具体诉求 |
|----------|----------|----------|
| **跨工具标准（AGENTS.md）** | Claude Code（#6235，👍 4526）、Codex、Amp、Cursor | CLAUDE.md 过于专属，社区强烈要求跟进 AGENTS.md 统一标准，支持多 Agent 协作 |
| **会话生命周期管理** | Claude Code（#13354）、OpenCode（#41102）、GitHub Copilot CLI（#4397） | 上下文续接、自动延续新会话、用量超限后压缩失效、模型选择在 resume 后丢失 |
| **MCP/工具兼容性** | Codex（#26234）、Gemini CLI（#24246）、Kimi Code、Qwen Code（#8550） | 非 OpenAI 端点 MCP 不可用、工具数超 128~400 报 400 错误、SSE 服务器挂起 |
| **Windows 平台适配** | Claude Code、Codex（#10090等）、Copilot CLI（#3622等）、OpenCode（#6560）、Qwen Code（#8625） | 沙箱权限失败、剪贴板失效、文件锁、中文渲染、TUI 粘贴失效——全工具范围的重灾区 |
| **Agent 可靠性** | Gemini CLI（#22323等 5 个 P1）、Claude Code（#84625 后台任务被杀）、Copilot CLI（#4392 僵尸进程） | 状态误报、挂起、静默死亡、子进程不回收，是当前信任度最大杀手 |
| **持久化记忆/跨会话上下文** | Kimi Code（#1283，21 评论）、Claude Code（#13354） | 跨会话复用项目模式与用户偏好，从"会话工具"走向"长期协作者" |
| **企业安全与策略管控** | Claude Code（CVP 拦截）、Codex（按模型审批）、Copilot CLI（allow-auto-only） | 细粒度权限、策略强制、审批流精细化，企业场景渗透加速 |

---

### 四、差异化定位分析

| 工具 | 定位 | 目标用户 | 技术路线特征 |
|------|------|----------|--------------|
| **Claude Code** | "全能型平台" | 中大型团队、企业 | 自托管 Runner 与 Workspace 信任体系构建企业闭环；插件系统向 zip/HTTPS 扩展 |
| **OpenAI Codex** | "基础设施优先" | 开发者、企业安全团队 | code-mode gRPC 协议、Guardian 审查、沙箱元数据——重底层架构投入 |
| **Gemini CLI** | "Agent 可靠性 + 评估驱动" | 对稳定性敏感的开发者 | Caretaker Agent 自动分类、组件级行为评估（76 个测试）、AST 感知工具 |
| **GitHub Copilot CLI** | "企业治理 + 生态扩展" | 企业开发团队 | 企业策略先行（allow-auto-only、代理强制），插件目录扩展走向平台化 |
| **Kimi Code CLI** | "安全敏感型工具" | 个人开发者 | 数据完整性优先（StrReplaceFile 非 UTF-8 修复）、YOLO 模式风险控制 |
| **OpenCode** | "开源服务聚合" | 模型多样化用户 | 多提供商聚合（Go 订阅、Bedrock、DeepSeek）、Synthetic 搜索、模态环境驱动 |
| **Qwen Code** | "高频迭代 + Web 集成" | 中文社区、多端用户 | WebBridge 浏览器直控、ACP 协议深化、Web Shell 作为桌面体验核心载体 |

---

### 五、社区热度与成熟度

**高热高活跃：**
- **Claude Code**：话题度最强（#6235 获 4526👍，347 条评论），社区参与深度高，功能需求驱动的活跃
- **OpenAI Codex**：PR 合并速度最快（单日 10+），社区问题覆盖面最广（从 Linux 内核到 macOS OOM），处于基础能力快速建设期

**中等活跃但问题集中：**
- **Gemini CLI**：Issue 几乎全为"维护者专属"锁定，社区讨论受限但 P1 问题密集，评估体系建设投入大
- **Qwen Code**：日更级迭代，Issue/PR 涉及面广（UI、协议、工具链），但单 Issue 热度偏低（最高👍 3）

**社区活跃度持续积累：**
- **GitHub Copilot CLI**：预发布连发但 24h 无 PR 推进，40+ Issue 提及的长期未修复问题（#2494 持续 4 个月）削弱信任
- **OpenCode**：服务端 401 问题持续两周未解决引发社区焦虑，但功能 PR 活跃，付费用户容忍度在下降
- **Kimi Code CLI**：事件驱动型活跃（安全事件↔PR 竞争），常态关注度偏低

**成熟度判断：**
- 成熟稳定：Claude Code、OpenAI Codex（功能深度 + 生态完善）
- 快速迭代：Gemini CLI、Qwen Code（版本频率最高）
- 平台过渡期：Copilot CLI（企业能力建设）、OpenCode（服务稳定性考验期）

---

### 六、值得关注的趋势信号

1. **AGENTS.md 标准化已不可逆**——Claude Code 社区 4526 个 👍 是最强民意信号。跨工具协作（Codex、Amp、Cursor 已跟进）正在推动新的"事实标准"形成。开发者在选择工具时应优先考虑对 AGENTS.md 的支持度，避免被锁定在单一工具生态。

2. **Windows 平台支持是所有工具的软肋**——7 个工具中有 5 个在本周出现 Windows 特定问题。AI CLI 工具的主要用户群体仍以 macOS/Linux 开发者为主，Windows 适配的投入不足正在成为企业规模化部署的瓶颈。对 Windows 重度用户而言，选择工具时需重点评估平台成熟度。

3. **Agent 可靠性取代基础功能成为第一诉求**——状态误报（Gemini #22323）、静默被杀（Claude Code #84625）、僵尸进程（Codex #12491）、孤儿进程（Copilot CLI #4392）——"Agent 执行结果是否可信"成为所有工具面临的共同挑战。这与 LLM 能力提升后的"信任落差"有关：模型更强了，但框架层的执行管理没有同步跟上。

4. **模型/提供商封闭性引发反弹**——Codex 在非 OpenAI 端点下 MCP 不可用（41👍）、OpenCode 用户反馈"付费用旧模型"（#40409）、LiteLLM 回归（#37425）——自定义模型用户群体正在形成压力集团。工具对第三方模型/提供商的支持程度将成为差异化竞争的重要维度。

5. **安全修复进入"竞速期"**——Gemini CLI 的 SSRF 修复（CVSS 8.6）、Kimi Code 的非 UTF-8 数据破坏修复（两个 PR 竞争）、Copilot CLI 的认证安全回归——安全问题从"特性"上升为"门槛"。社区对安全修复的响应速度正成为衡量工具可信度的标准。

6. **企业安全策略快速渗透 CLI 层**——Codex 按模型类型细化审批策略、Copilot CLI 支持 allow-auto-only 与代理强制、Claude Code 新增 Workspace 信任确认——AI CLI 正在从个人生产力工具演进为企业 IT 治理体系的一部分。对技术决策者的启示：在选择工具时需提前纳入安全合规评估，而非事后补救。

7. **"付费质量对齐"成为新矛盾**——OpenCode Go 的模型路由混乱（#40409）与 401 拦截（#38257）、Claude Code CVP 组织被误拦截（#84689）——随着 AI CLI 工具逐步商业化，服务端可靠性、计费透明度与配额准确性正在成为影响社区信任的新变量。

---

## 各工具详细报告

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills 社区热点报告（数据截止 2026-08-08）

## 1. 热门 Skills 排行

**#1298 — fix(skill-creator): run_eval.py 评估脚本全面修复**（Open）
功能：修复 `run_eval.py` 在技能描述评估中恒报 0% recall 的问题，涵盖 Windows 流读取、触发检测及并行 worker 缺陷。社区围绕该问题已有 10+ 独立复现（#556），是当前 skill-creator 生态最大的稳定性瓶颈。
https://github.com/anthropics/skills/pull/1298

**#514 — Add document-typography skill**（Open）
功能：针对 AI 生成文档的排版质量控制——孤词换行（1-6 词溢出到下一行）、孤儿段落标题、编号错位。社区讨论聚焦于 AI 生成文档的排版问题是否值得独立成 skill，以及触发条件的精准度。
https://github.com/anthropics/skills/pull/514

**#1367 — Add self-audit: 机械验证 + 四维推理质量门禁**（Open）
功能：交付前审计 skill——先做输出文件的机械存在性验证，再按危害严重度优先级执行四维推理审计（reasoning quality gate）。社区探讨了审计的误报率、与现有代码审查流程的集成方式。
https://github.com/anthropics/skills/pull/1367

**#538 — fix(pdf): 修复 SKILL.md 大小写敏感的引用**（Open）
功能：修复 `skills/pdf/SKILL.md` 中 8 处大小写不匹配（`REFERENCE.md` → `reference.md` 等），保证在大小写敏感文件系统上的可用性。讨论集中在修复范围应否扩展至其他 skill 文件。
https://github.com/anthropics/skills/pull/538

**#541 — fix(docx): 防止修订 w:id 与现有书签冲突**（Open）
功能：修复 DOCX skill 添加修订时因 `w:id` 共享 ID 空间导致文档损坏的问题。涉及 OOXML 规范细节，社区关注其对其他文档类型 skill 的参考价值。
https://github.com/anthropics/skills/pull/541

**#210 — Improve frontend-design skill 清晰度与可执行性**（Open）
功能：重写 frontend-design skill，确保每条指令在单次对话中可被 Claude 实际执行，提升行为引导的具体性。讨论聚焦于 skill 指令的粒度标准。
https://github.com/anthropics/skills/pull/210

**#486 — Add ODT skill：OpenDocument 创建/填充/解析**（Open）
功能：支持 .odt/.ods 文件的创建、模板填充、读取与转 HTML，涵盖 LibreOffice 生态。讨论集中于与现有 docx 技能的架构一致性。
https://github.com/anthropics/skills/pull/486

**#1302 — Add color-expert skill**（Open）
功能：自包含的色彩专业知识——色名体系（ISCC-NBS/Munsell/RAL 等）、色彩空间选型表（OKLCH/OKLAB/CAM16）、配色与无障碍对比度。触发词明确（任何含"颜色"相关需求）。讨论涉及知识密度与 token 消耗的平衡。
https://github.com/anthropics/skills/pull/1302

## 2. 社区需求趋势

**技能安全与命名空间信任** — #492：社区技能被分发至 `anthropic/` 命名空间，造成信任边界滥用风险，用户可能误授予权限给非官方技能。目前评论 43 条，是 repo 中讨论最激烈的问题。

**组织级技能共享** — #228：用户需手动下载 .skill 文件并通过 Slack/Teams 传输，期望 Claude.ai 内直接支持 org-wide 共享链接或共享库（👍 8）。

**文档类技能的稳定性与兼容性**—— 多个 PR/Issue 集中反映：PDF/DOCX/ODT 的格式处理（w:id 冲突、大小写兼容、空白格式重排 #12）是当前最高频的 bug 类型。

**评估工具链可靠性** — #556/#1169：`run_eval.py` 的 0% 触发率问题被多次独立复现，社区强烈要求修复以支撑技能描述优化的自动化闭环。

**技能上下文窗口管理** — #1487：claude-api skill 单次注入约 156k tokens，直接耗尽上下文窗口，反映社区对 skill 体积与注入效率的敏感。同类诉求在 #202（skill-creator 冗长低效）中亦有体现。

**Agent 治理与安全模式** — #412：提出 agent-governance skill 涵盖策略执行、威胁检测、信任评分与审计追踪，表明社区开始关注多代理场景的安全规范。

## 3. 高潜力待合并 Skills

以下 PR 评论活跃且处于 Open 状态，近期落地概率较高：

**#1367 — self-audit 推理质量门禁**（作者持续迭代，更新至 07-02）：机械验证 + 推理质量审计的双层设计，配合 #1385 Issue 中的三关管线提案，显示作者有完整路线图。

**#1298 — run_eval.py 全面修复**：直接解决 #556 和 #1169 两个高赞 issue（合计 👍 8），且 #1099/#1050/#1323/#1261 等多条 PR 均围绕同一评估脚本问题提交，维护者合并任一方案的概率高。

**#723 — testing-patterns skill**：覆盖 Testing Trophy 模型、单元测试、React 组件测试，是社区最常被提出的测试方向需求。

**#525 — pyxel 复古游戏开发**：官方 Pyxel 作者（kitao）亲自提交，社区认可度高，更新至 07-15，仍在活跃维护。

**#1302 — color-expert**：由色彩领域知名开发者提交（meodai，拥有 color-name 等成熟开源库），内容完整度高，近一月有更新。

**#1479 — plan-file-hygiene**（解决 #1417）：解决规划产物无生命周期管理的问题，多名贡献者在 issue 中参与了方案设计，有协作基础。

## 4. Skills 生态洞察

当前社区最集中的诉求是：**skill-creator 评估工具链的可用性修复与技能安全性（命名空间信任、上下文窗口控制）**——即"如何可靠且安全地创建、评估、分发技能"这一元层面问题，其关注度超过了任何单一业务场景 skill。

---

# Claude Code 社区动态日报 — 2026-08-08

## 今日速览

Claude Code 发布 v2.1.224 与 v2.1.225 两个版本，引入**自托管 Runner** 和 **Gateway 用量上限支持**两大核心能力。社区层面，关于 **AGENTS.md 标准支持**的 Issue #6235 评论数已达 347 条（👍 4526），成为最受关注的需求；另有多个与 **Windows 文件锁、Fable 5 文本渲染、后台任务被杀**相关的 bug 引发广泛讨论。

---

## 版本发布

### v2.1.225（最新）
- **Gateway 用量上限支持**：用量警告消息现在会显示具体上限值、重置时间及操作者消息（需 Gateway 同步升级至 2.1.225）
- **Workspace 信任提示**：`claude agents` 对不受信任目录新增信任确认流程，与主 CLI 行为对齐

### v2.1.224
- **自托管环境（Self-Hosted Environments）**：新增 `claude self-hosted-runner` 命令，可将自有机器或容器作为 Claude Code Web、移动端及桌面端会话的运行环境（Team 与 Enterprise 套餐可用）
- **archive 插件源**：支持通过 HTTPS 直接安装 zip 格式插件，无需 git

---

## 社区热点 Issues（Top 10）

### 1. [🔥 热议] 支持 AGENTS.md 标准
**#6235** | 👍 4526 | 💬 347 | [链接](https://github.com/anthropics/claude-code/issues/6235)

社区呼声最高的功能需求。Codex、Amp、Cursor 等工具已开始围绕 AGENTS.md 建立统一标准，而 CLAUDE.md 过于 Claude Code 专属，不利于多 Agent 协作。此 Issue 已持续近一年，评论数仍在增长，建议官方尽快跟进。

### 2. [功能] Session 达到上限后自动继续
**#13354** | 👍 191 | 💬 73 | [链接](https://github.com/anthropics/claude-code/issues/13354)

用户希望在会话达到上下文上限时自动延续新会话（如自动 summary + 新会话），而非手动操作。评论中大量用户表示这是日常高频痛点，尤其影响长任务的连续性。

### 3. [功能] 支持单独禁用插件的某个 Skill
**#14920** | 👍 83 | 💬 14 | [链接](https://github.com/anthropics/claude-code/issues/14920)

macOS 用户希望可按需禁用插件中的特定 skill（如 `commit-commands:commit-push-pr`），而不是只能整包启用/禁用。评论认为当前技能全量加载造成噪音，影响 slash command 使用体验。

### 4. [Bug] Fable 5 文本与工具调用同时返回时，文本不显示
**#81853** | 👍 3 | 💬 5 | [链接](https://github.com/anthropics/claude-code/issues/81853)

使用 `claude-fable-5` 模型时，任何同时含文本和工具调用的响应，终端主视图只渲染工具调用，文本被吞掉（仅能在 Ctrl+O 详细 transcript 中看到）。同环境 Opus 4.8 无此问题。疑似模型特定渲染 bug。

### 5. [Bug] 提示建议被限流状态严格相等判断静默抑制
**#72495** | 💬 4 | [链接](https://github.com/anthropics/claude-code/issues/72495)

Linux 用户定位到 Vxy 组件中客户端派生限流状态为 `allowed_warning` 时，提示建议被静默抑制。已提供预注册预测验证，实锤为 strict-equality gate 问题。

### 6. [Bug] 远程控制环境无法删除，幽灵会话导致永久 404
**#77372** | 👍 1 | 💬 3 | [链接](https://github.com/anthropics/claude-code/issues/77372)

macOS 上注册新环境后，下一次启动返回不同 session ID 并 404。会话被创建后无法被 worker 找到，且已标记为 stale 的环境无法删除。Remote Control 功能可用性受损。

### 7. [Bug] Claude Code ≥ 2.1.205 在 KVM 虚拟机中 100% CPU 空转
**#77208** | 💬 3 | [链接](https://github.com/anthropics/claude-code/issues/77208)

KVM 客户机（kvm64 CPU 模型）上，Claude Code 2.1.205+ 直接 livelock，连 `--version` 都无输出。同时静默破坏 Linux 桌面版 Code 标签页。已标记为 regression + desktop 双标签。

### 8. [Bug] CVP 已批准组织仍被 cyber safeguards 拦截
**#84689** | 💬 4 | [链接](https://github.com/anthropics/claude-code/issues/84689)

CVP（Claude Verified Partner）组织即使 org ID 确认匹配，仍然被网络安全策略拦截，且申诉表单无字段可填。疑似审批系统与策略引擎未同步。

### 9. [Bug] 两个相同会话中本地 peer-messaging socket 绑定失败
**#84945** | 💬 3 | [链接](https://github.com/anthropics/claude-code/issues/84945)

macOS 上同一 Mac 启动两个完全相同的 CLI 会话（同二进制、同参数、同 cwd），其中一个无法绑定 `/tmp/cc-socks` peer socket，导致跨会话消息单向不可达。

### 10. [Bug] Windows 上 ECONNRESET 在流式响应首块后触发
**#84072** | 💬 3 | [链接](https://github.com/anthropics/claude-code/issues/84072)

Windows 10/11 上 Claude Code v2.1.222 流式响应收到第一块数据后连接被重置。VS Code 扩展与终端均可复现，疑似网络栈或代理兼容性问题。

---

## 重要 PR 进展

当前公开 PR 共 3 条，全部为社区贡献：

| PR | 说明 |
|---|---|
| [#84854](https://github.com/anthropics/claude-code/pull/84854) | **docs**: 修复示例 hook 脚本中过期的文档链接（docs.anthropic.com → code.claude.com），仓库内 46 处引用已统一 |
| [#84747](https://github.com/anthropics/claude-code/pull/84747) | **fix(hookify)**: 修复 `load_rules()` 在 `event=None` 时绕过事件过滤器的问题，确保 Read/Browser 等工具仅触发 `all` 作用域规则 |
| [#84711](https://github.com/anthropics/claude-code/pull/84711) | **fix(security)**: 修复插件脚本中的 YAML 注入与符号链接凭证覆写问题（对应 #76580） |

> 注：当前 PR 队列较短，官方合并节奏值得关注。两条安全修复 PR 建议社区重点 review。

---

## 功能需求趋势

从近 30 条活跃 Issue 中提炼出以下趋势：

1. **AGENTS.md 标准化**（#6235，👍 4526）：跨工具统一的代码库说明文件格式成为社区最强诉求
2. **会话生命周期管理**（#13354、#51791）：上下文续接、会话重命名、清理等操作被频繁提及
3. **自托管与远程控制**（#50884、#77372）：随 v2.1.224 自托管 Runner 发布，相关环境的生命周期管理需求开始涌现
4. **细粒度权限控制**（#14920、#84956）：对插件 skill 级禁用、工具级 permission allow 规则的精确性要求提高
5. **模型兼容性**（#81853、#79247）：Fable 5 的渲染与任务执行问题引发关注，用户对"模型换新但功能回退"较为敏感

---

## 开发者关注点

- **Windows 更新/重载文件锁**（#76192、#84962）："Another program is using this file" 错误反复出现，即使干净退出也无法更新，已成 Windows 平台头号体验问题
- **后台任务静默死亡**（#84625）：`run_in_background: true` 的长时间 Bash 任务被无声杀死，无 OOM、无错误提示，发现问题时已大量浪费 token
- **权限提示阻塞**（#78487）：后台派生 Agent 卡在未应答权限弹窗上，无超时/自动拒绝机制，最长静默 stall 55 分钟——在 Workflow 自动化场景中影响严重
- **grep shim 灾难性回溯**（#82179）：Bash 工具内置的 ugrep 模拟在特定正则组合下 OOM（6.6 GB RSS），20 KB 文件即触发，属于高危稳定性问题
- **文档与实现脱节**（#74149、#84939）：`ScheduleWakeup` 声称 5 分钟 TTL 但实际 1 小时；插件安装静默执行 `bun install` 无文档说明——开发者对"文档即契约"的期待落空
- **/goal 长度限制**（#84953）：4000 字符限制在粘贴后才报错，且拒绝引用文件，长条件下成本浪费严重

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex 社区动态日报

**2026-08-08**


## 今日速览

v0.147.0 稳定版发布，带来可安装的 Agent 插件系统与对话折叠管理两项重要功能；过去 24 小时合并了 20+ 个 PR，集中在代码模式（code-mode）基础设施、技能系统重构与流式连接稳定性上。社区方面，Windows 平台问题持续高发，Computer Use 功能在 Windows 上的多项缺陷成为热点。


## 版本发布

### rust-v0.147.0（稳定版）
**新功能：**
- **可安装的 Agent 插件**：支持在本地、个人、工作区及远程插件目录中安装便携式 Agent 插件并跨目录搜索（#36544, #36409, #36919, #36796）
- **对话管理增强**：支持将对话组织为持久化的手动排序分区（sections），并支持增量浏览长对话记录（#35722, #36007, #36380, #36948）

**发布链接：** https://github.com/openai/codex/releases/tag/rust-v0.147.0

### rust-v0.148.0-alpha 系列
- **rust-v0.148.0-alpha.1 / alpha.2 / alpha.4** 已陆续发布，为 0.148 系列的功能迭代预览版。

**发布链接：** https://github.com/openai/codex/releases/tag/rust-v0.148.0-alpha.4


## 社区热点 Issues

### 1. Codex 在多消息对话中回复旧消息而非最新消息
**#8648** | 评论 82 | 👍 58 | 状态：开放
https://github.com/openai/codex/issues/8648

> 经典老 issue 仍在持续发酵，社区关注度极高。在长对话中，Codex 偶尔会回复较早的消息，导致上下文错乱。该 issue 自 1 月创建以来已积累 82 条评论，覆盖多个版本和模型，影响面广。

### 2. Codex.app GUI 的 MCP 子进程未被回收——1300+ 僵尸进程、37GB 内存泄漏
**#12491** | 评论 38 | 状态：已关闭
https://github.com/openai/codex/issues/12491

> GUI 版中 MCP 子进程在任务完成后未被正确回收，导致大量僵尸进程和严重内存泄漏。已标记为已关闭，但社区评论仍持续，用户关心修复是否真正生效。

### 3. 非 OpenAI Responses API 提供商（Ollama、LM Studio、OpenRouter）下 MCP 工具不可用
**#26234** | 评论 32 | 👍 41 | 状态：开放
https://github.com/openai/codex/issues/26234

> Codex 将 MCP 工具序列化为专有的 namespace 格式，导致通过本地服务器、网关或 AWS Bedrock 等非 OpenAI 端点运行时，模型无法调用任何 MCP 工具。第三方提供商用户受影响严重，是当前最受关注的自定义模型集成问题。

### 4. VS Code 插件 Codex Diff 视图报错 "Oops, an error has occurred"
**#35481** | 评论 26 | 👍 54 | 状态：已关闭
https://github.com/openai/codex/issues/35481

> Windows 平台上打开 Codex Diff 视图时内容无法渲染。虽然反馈数高（👍54），但已标记关闭，用户可能需等待下一版本验证修复效果。

### 5. 允许任何项目设置 trust_level = "trusted"
**#14599** | 评论 16 | 👍 57 | 状态：开放（功能需求）
https://github.com/openai/codex/issues/14599

> 社区热度最高的功能需求之一（👍57）。用户希望提供配置选项，免除每次打开项目时的手动信任确认。该 issue 已累计 16 条讨论，但官方尚未给予明确排期。

### 6. Windows 上 elevated_windows_sandbox 导致所有 agent 命令失败
**#10090** | 评论 24 | 状态：开放
https://github.com/openai/codex/issues/10090

> 启用 elevated sandbox 后，所有命令均返回 `(no output)`，日志显示 `CreateProcessAsUserW failed: 5`（拒绝访问）。此问题持续多月未解决，Windows 企业管理场景用户受阻。

### 7. Windows Computer Use 在 EnumWindows 时失败（0x80070003）
**#37043** | 评论 17 | 状态：开放
https://github.com/openai/codex/issues/37043

> Computer Use 基础功能在 Windows 上不可用——`sky.list_apps()` 和 `sky.list_windows()` 直接报系统找不到路径错误，重启无法恢复。该问题与 #37415、#37484 共同构成 Windows Computer Use 故障群。

### 8. apply_patch 与 managed sandbox 在 Ubuntu 24.04 上因 Bubblewrap 失败
**#29908** | 评论 14 | 状态：开放
https://github.com/openai/codex/issues/29908

> 内核 6.17 + Bubblewrap 0.9.0 环境下，`apply_patch` 和沙箱命令在启动前即失败，与仓储权限无关。影响 Linux 最新发行版用户。

### 9. v0.147.0 引入 LiteLLM provider 流式请求回归
**#37425** | 评论 4 | 👍 3 | 状态：开放
https://github.com/openai/codex/issues/37425

> 从 v0.146.0 升级到 v0.147.0 后，LiteLLM 自定义提供商的流式请求持续失败。属于新版本引入的回归问题，使用自定义网关的用户需要关注。

### 10. macOS 应用启动时因解析 Claude Desktop 数据导致 OOM 崩溃
**#36523** | 评论 3 | 状态：开放
https://github.com/openai/codex/issues/36523

> 标记为 [P0][Regression]：macOS 应用每次启动时 `external-agent-import` 会解析 Claude Desktop 的 1.73GB 数据，导致 V8 堆内存溢出崩溃。26 小时内崩溃 26 次，受影响机器此前零崩溃记录。数据迁移功能反而成为稳定性隐患。


## 重要 PR 进展

### 1. 忽略 cyber 模型的可复用命令审批
**#37516** | 已合并
https://github.com/openai/codex/pull/37516

> 对安全专精（cyber）模型及 `auto_review.ignore_rules` 列表中的模型，过滤已保存的 `allow` 前缀规则，保留 prompt、forbidden、network 与 host-executable 策略。

### 2. Guardian 审查会话复用父级压缩
**#37513** | 已合并
https://github.com/openai/codex/pull/37513

> 新增 `guardian_reuse_parent_compaction` 功能：父历史重写后，Guardian 审查会话以最新加密压缩结果重新播种，避免上下文丢失。

### 3. 托管模型强制自动审查
**#37511** | 已合并
https://github.com/openai/codex/pull/37511

> 新增 `auto_review.required_on_models` 托管要求，强制指定模型使用 `on-request` 审批策略，模型 slug 跨配置层取并集。

### 4. 定义 code-mode host gRPC 协议
**#37510** | 已合并
https://github.com/openai/codex/pull/37510

> 新增 `codex.code_mode.v1` protobuf API，管理代码模式会话、执行、等待、工具回调等；Rust 绑定基于 tonic 生成。

### 5. 响应元数据中包含沙箱模式
**#37507** | 已合并
https://github.com/openai/codex/pull/37507

> 在常规、预热、压缩与 detached memory 请求的 turn 元数据中新增 `sandbox_mode` 字段，并保留该字段防止客户端覆盖。

### 6. 禁用 code-mode WebSocket 的 Nagle 算法
**#37504** | 已合并
https://github.com/openai/codex/pull/37504

> 对出站远程会话和入站 WebSocket 连接启用 `TCP_NODELAY`，降低 code-mode 小数据包延迟。

### 7. 进程终止时保留子进程等待器
**#37498** | 已合并
https://github.com/openai/codex/pull/37498

> 终止会话时不再 abort 子进程 waiter，而是分离（detach）它，确保 PTY 子进程退出状态能被正确记录——直接回应 #12491 中的僵尸进程问题。

### 8. 添加 MCP 事件发现与订阅
**#37494** | 已合并
https://github.com/openai/codex/pull/37494

> 新增 `McpResourceClient::list_events` 暴露托管插件运行时事件，支持可取消的 `events/stream` 订阅，生命周期通知按请求路由。

### 9. 限制诊断日志中的 payload 追踪
**#37497** | 已合并
https://github.com/openai/codex/pull/37497

> HTTP 传输、SSE 与 WebSocket 诊断降级至 DEBUG 级别，防止高吞吐 payload 撑爆 SQLite 日志库。

### 10. 连接失败时保持响应流活跃
**#37485** | 已合并
https://github.com/openai/codex/pull/37485

> HTTP 连接失败与其他网络错误分类处理；采样请求按 5–60 秒指数退避重试，并显示 "Reconnecting..." 状态。


## 功能需求趋势

**1. 插件生态（MCP 与 Agent Plugins）**
- v0.147.0 已落地可安装插件机制，但 MCP 工具在非 OpenAI 端点的兼容性（#26234）是最大缺口
- 插件 MCP 服务器需要用户密钥与环境变量配置路径（#24401，👍8）
- MCP OAuth DCR 请求了错误的 authorization-server scope（#35253）

**2. Windows 平台支持**
- Computer Use 在 Windows 上出现多类故障：EnumWindows 失败（#37043）、spawn EPERM + ACL 问题（#37415）、窗口附加/所有者识别异常（#37484）
- 沙箱进程创建持续报 `CreateProcessAsUserW failed: 5`（#10090、#13965、#14211）
- 扩展加载失败（#37458）、项目会话创建受限（#34499）

**3. 自定义模型与提供商兼容性**
- 非 OpenAI Responses API（LiteLLM、Bedrock 等）下 MCP 工具不可用（#26234）
- v0.147.0 引入 LiteLLM 流式回归（#37425）
- 社区对自定义模型支持的需求持续上升，但官方支持力度仍显不足

**4. 性能与稳定性**
- macOS 应用启动 OOM 崩溃（#36523）、16GB 内存机器崩溃循环（#37493）
- 恢复会话时重放完整历史而非引导最新 turn（#34663）
- 大量图片型 subagent 历史导致桌面端崩溃（#35799）

**5. 使用体验**
- 满权限历史会话仍要求审批（#21839）
- 项目无法新建 Chat 或迁移 Work 会话（#34300）
- 希望在无降级体验下使用 Codex Micro 全局按住说话（#34812）
- 允许任意项目设置 `trust_level = "trusted"` 以跳过手动确认（#14599）


## 开发者关注点

- **Windows 沙箱权限问题成为最高频痛点**：`CreateProcessAsUserW failed: 5` 在多期 issue 中反复出现（#10090、#13965、#14211），涉及 elevated sandbox、apply_patch、WindowsApps ACL 等多个场景。沙箱在 Windows 平台的核心路径可能仍存在系统性设计问题。
- **macOS 内存崩溃集中爆发**：多个独立 issue（#36523、#37493）指向外部数据导入（Claude Desktop 数据）和内存不足（16GB）场景下的 V8 OOM。多台机器同时受影响，疑似近版本引入的回归。
- **自定义模型支持呼声高、官方响应慢**：MCP 工具在非 OpenAI 端点的 namespace 序列化问题（#26234）获得 41 👍 和 32 条评论，LiteLLM 回归（#37425）也迅速获关注。自定义模型用户已成为不可忽视的社区群体。
- **僵尸进程与内存泄漏修复可期**：PR #37498 （保留子进程等待器）直接针对 #12491 的僵尸进程问题。MCP 子进程生命周期管理有望在 0.148 系列得到改善。
- **安全策略精细化**：多个 PR（#37516、#37511）将审批与自动审查策略细化为"按模型类型"管理，表明 Codex 正在面向企业安全场景增强管控粒度。
- **低延迟优化持续进行**：禁用 Nagle 算法（#37504）、连接失败重试（#37485）等，针对 code-mode 和流式传输的延迟与稳定性优化是当前基础设施层面的主要投入方向。

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI 社区动态日报 — 2026-08-08

## 今日速览

昨日发布 4 个版本，包括两个 nightly 版本、一个 preview 补丁版本以及 v0.54.4 稳定版补丁。社区讨论焦点集中在 subagent 在 MAX_TURNS 后误报 GOAL 成功、generalist agent 挂起以及 Auto Memory 低信号重试等 agent 可靠性问题上。此外，一项高危 SSRF 漏洞修复 PR 已提交，值得关注。

---

## 版本发布

### v0.56.0-nightly.20260808.gcf22ac7e8
首个将容量耗尽（Capacity Exhaustion）重新归类为终端错误的版本。此前容量耗尽会被视为可重试的临时错误，现改为终端错误以改善错误处理逻辑。同时更新了 Firestore schema，增加 `error` 和 `pr_number` 字段。

**发布链接**: https://github.com/google-gemini/gemini-cli/releases

### v0.55.0-preview.2
对 preview.1 的补丁修复版本，针对 PR #28716 的容量耗尽错误处理进行了 cherry-pick。

**发布链接**: https://github.com/google-gemini/gemini-cli/releases

### v0.54.4
稳定版补丁。为 v0.54.0 合入修复（56f9688），版本号在 0.54.1 和 0.54.2 之后迭代至 0.54.4。

**发布链接**: https://github.com/google-gemini/gemini-cli/releases

---

## 社区热点 Issues

### 1. Subagent 在 MAX_TURNS 后误报 GOAL 成功
- **Issue #22323** | 🔒 维护者专属 | P1 | 12 条评论 | 👍 2
- **链接**: https://github.com/google-gemini/gemini-cli/issues/22323
- codebase_investigator subagent 在达到最大轮次限制后仍返回 `status: "success"` 和 `Termination Reason: "GOAL"`，但实际上未执行任何分析。这掩盖了中断事实，可能误导用户对任务完成状态的判断。社区对此反应强烈，属高风险误导性 bug。

### 2. Generalist agent 挂起
- **Issue #21409** | 🔒 维护者专属 | P1 | 8 条评论 | 👍 8
- **链接**: https://github.com/google-gemini/gemini-cli/issues/21409
- 委托给 generalist agent 时 CLI 会无限挂起，即使是最简单的文件夹创建操作也会卡住，有用户等待长达一小时。强制不使用 subagent 可绕过问题。高 👍 数表明该问题影响面较广。

### 3. 组件级评估体系
- **Issue #24353** | 🔒 维护者专属 | P1 | 7 条评论
- **链接**: https://github.com/google-gemini/gemini-cli/issues/24353
- 追踪组件级行为评估的 EPIC，目前已生成 76 个行为评估测试并覆盖 6 个 Gemini 模型。社区关注组件可靠性的系统性验证，定位为基础设施类 EPIC。

### 4. AST 感知的文件读取与代码库映射
- **Issue #22745** | 🔒 维护者专属 | P2 | 7 条评论
- **链接**: https://github.com/google-gemini/gemini-cli/issues/22745
- 调研 AST 感知工具的价值，包括精确读取方法边界以减少 token 噪声、更高效导航代码。关联 Issue #22746 建议从 tilth 或 glyph 工具入手。核心目标是减少多轮调用中的 token 浪费。

### 5. Gemini 不主动使用 skills 和 sub-agents
- **Issue #21968** | 🔒 维护者专属 | P2 | 6 条评论
- **链接**: https://github.com/google-gemini/gemini-cli/issues/21968
- 用户反馈 Gemini 几乎不会主动使用自定义 skills 和 sub-agents，即使任务高度相关。用户已配置 gradle 和 git skills 及详细描述，仍需显式指令才会调用。开发者对此有共鸣，因为自定义 agent 的价值依赖于此。

### 6. Shell 命令执行卡在 "Waiting input"
- **Issue #25166** | 🔒 维护者专属 | P1 | 4 条评论 | 👍 3
- **链接**: https://github.com/google-gemini/gemini-cli/issues/25166
- 简单 CLI 命令执行完成后，CLI 仍显示为活动并停留在 "Awaiting user input" 状态。涉及不应等待输入的极简命令，高频复现。高 👍 说明该问题对日常开发流影响明显。

### 7. Auto Memory 对低信号会话无限重试
- **Issue #26522** | 🔒 维护者专属 | P2 | 5 条评论
- **链接**: https://github.com/google-gemini/gemini-cli/issues/26522
- Auto Memory 仅在提取 agent 成功读取转录后才将会话标记为已处理。低信号会话会反复出现在索引中并被无限重试。应从产品逻辑上避免低质量会话反复占用计算资源。

### 8. Browser subagent 在 Wayland 环境下失败
- **Issue #21983** | 🔒 维护者专属 | P1 | 4 条评论 | 👍 1
- **链接**: https://github.com/google-gemini/gemini-cli/issues/21983
- browser subagent 在 Wayland 会话中无法运行，直接报 GOAL 终止。Wayland 用户无法使用浏览器自动化能力，属兼容性缺陷，期待后续修复。

### 9. 超过 128 个工具时出现 400 错误
- **Issue #24246** | 🔒 维护者专属 | P2 | 3 条评论
- **链接**: https://github.com/google-gemini/gemini-cli/issues/24246
- 工具数量超过 400 时 API 返回 400 错误（Issue 标题记 128，正文记 400）。用户期望 agent 更智能地按需裁剪工具范围，该问题直接限制大规模 MCP 工具集的使用场景。

### 10. 对话分享无法看到 subagent 轨迹
- **Issue #22598** | 🔒 维护者专属 | P3 | 2 条评论 | 👍 1
- **链接**: https://github.com/google-gemini/gemini-cli/issues/22598
- subagent 轨迹已保存在聊天记录服务中但不可见。用户需要 `_/chat share_` 支持查看和分享 subagent 运行轨迹以便审查和评估。对 agent 行为调试和可观测性有直接价值。

---

## 重要 PR 进展

### 1. 修复模型容量耗尽误报及配额映射
- **PR #28730** | DavidAPierce | 打开
- **链接**: https://github.com/google-gemini/gemini-cli/pull/28730
- 修复 CLI 中虚假的模型容量耗尽错误提示，修正 core 包的客户端配额查询映射，确保瞬时容量高峰时保留 "Keep trying" 选项。

### 2. 新增 Gemini 3.6 Flash 和 3.5 Flash-Lite 模型配置
- **PR #28673** | Blackmanx | 打开
- **链接**: https://github.com/google-gemini/gemini-cli/pull/28673
- 在 core 包中为 Gemini 3.6 Flash 和 3.5 Flash-Lite 添加基础模型定义、能力配置（thinking、multimodalToolUse）、别名和代码执行支持。

### 3. 修复 IDE 连接中的目录不匹配问题
- **PR #28729** | amelidev | 打开
- **链接**: https://github.com/google-gemini/gemini-cli/pull/28729
- 修复在 Cider（或使用虚拟/FUSE 目录路径的 VS Code fork/远程工作区）下 Gemini CLI 无法连接 IDE 扩展的问题。此前候选端口文件存在但工作区路径不匹配导致连接被错误丢弃。

### 4. 修复 web-fetch 的 SSRF 漏洞
- **PR #28725** | alifakbxr | 打开 | 关联 Issue #28555
- **链接**: https://github.com/google-gemini/gemini-cli/pull/28725
- 修复 CVSS 8.6 的 SSRF 漏洞。恶意用户可通过自定义域名指向私有/回环 IP（如 169.254.169.254）绕过 DNS 保护。涉及安全关键修复，建议优先关注合并进度。

### 5. 环境变量加载时序修复
- **PR #28597** | WolfGreyDev | 打开
- **链接**: https://github.com/google-gemini/gemini-cli/pull/28597
- 修复设置生命周期中的加载顺序竞态条件。此前 settings 文件在本地 .env 加载前就被解析和展开，导致占位符解析失败。此问题影响动态环境变量配置的用户。

### 6. 阻止 diff hunk 标记被误识别为 @file 引用
- **PR #28581** | tlysanhuo | 打开
- **链接**: https://github.com/google-gemini/gemini-cli/pull/28581
- 防止统一/组合 diff 的 hunk 标记被误处理为 @file 引用。消除了每个 hunk 两次递归的全工作区 glob 搜索，避免大型 diff 提示词下的 minimatch/path-scurry 堆增长。

### 7. 修复 Auto Memory 确定性脱敏
- **PR #28716**（合入 nightly） | luisfelipe-alt
- **链接**: https://github.com/google-gemini/gemini-cli/pull/28716
- 将容量耗尽重新归类为终端错误的一部分。配合 nightly 发布，改善错误可诊断性。详见 v0.56.0-nightly 发布说明。

### 8. Caretaker Agent 基础设施系列
- **PR #28690** | chadd28 | 已关闭
- **链接**: https://github.com/google-gemini/gemini-cli/pull/28690
- 为 Caretaker Agent 增加 GitHub `issue_comment.created` webhook 处理，支持维护者和 reporter 通过 `@caretaker-agent` 提及或 `/caretaker triage` 命令触发对 NEEDS_INFO 状态问题的重新分类。相关配套 PR：#28727（Cloud Run eval 入口）、#28530（triage 评估框架）、#28524（prompt hill-climbing 优化）。

### 9. 添加本地评估报告命令和开发者文档
- **PR #28369** | ved015 | 打开
- **链接**: https://github.com/google-gemini/gemini-cli/pull/28369
- 新增 `npm run eval:report` 命令，从 Vitest report.json 聚合各模型的通过率并映射回 inventory 策略。同时补充行为评估的开发者指南，支持重复测试名的正确映射。

### 10. 新增 eval:validate 静态分析命令
- **PR #28344** | ved015 | 打开
- **链接**: https://github.com/google-gemini/gemini-cli/pull/28344
- 新增 `eval:validate` 命令，针对 9 条规则静态验证评估源文件，违规时以退出码 1 退出，适合 CI 门禁。为评估文件质量提供自动化保障。

---

## 功能需求趋势

| 方向 | 相关 Issue/PR | 热度说明 |
|------|-------------|----------|
| **Agent 可靠性** | #22323、#21409、#25166、#21983 | 当前最高优先级方向，涵盖误报状态、挂起、卡死等问题 |
| **AST 感知代码操作** | #22745、#22746 | 通过 AST 精确读取方法边界，减少 token 消耗和多轮调用 |
| **自动内存系统改进** | #26522、#26525、#26523、#26516 | 防止低信号重试、强制脱敏、隔离非法 patch |
| **工具数量扩展** | #24246 | 目前 128~400 个工具时会出现 400 错误，限制大规模工具集 |
| **新增模型支持** | PR #28673 | 社区持续关注 Gemini 3.6 Flash 和 3.5 Flash-Lite 的接入 |
| **可观测性** | #22598、#21763 | 需要 subagent 轨迹的可见性和分享能力 |
| **行为评估体系** | #24353、PR #28369、PR #28344 | 系统化评估 agent 行为，支持 CI 门禁 |

---

## 开发者关注点

- **Subagent 状态误报**：MAX_TURNS 中断被报告为 GOAL 成功的问题被广泛讨论，影响对 agent 执行结果的信任度。
- **Generalist agent 挂起**：简单任务委托后无限等待，高 👍 数表明影响范围大；用户需要显式禁用 subagent 才能绕过。
- **Shell 交互卡死**：命令已完成后仍显示 "Waiting input"，高频复现于极简命令执行场景。
- **复杂 git/文件操作的破坏性行为**（#22672）：模型在复杂 git 操作中使用 `git reset` 或 `--force` 而非更安全的替代方案，需要限制。
- **外部编辑器退出后的终端损坏**（#24935）：terminalBuffer 模式下退出外部编辑器后需要强制全屏刷新。
- **自动内存中的安全与效率**：转录内容发送至模型后才进行脱敏，以及低信号会话反复重试的问题，均涉及隐私保护和资源利用效率。
- **Wayland 浏览器自动化**：browser subagent 在 Wayland 会话下不可用，限制了 Linux 用户。

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

## 今日速览

过去 24 小时内，GitHub Copilot CLI 连续发布了 3 个预发布版本（v1.0.79-7 至 v1.0.79-9），核心更新集中在沙箱配置可视化、企业策略支持（allow-auto-only 与代理强制）以及 Agent 插件扩展机制。Issue 方面，Windows 平台问题持续升温——剪贴板静默失效、特定代码页下复制清屏、通知导致崩溃等三个平台缺陷同时被社区报告；另有 8 个新提交的 triage 状态 Issue 集中在技能发现回归、会话恢复模型丢失、权限配置不加载等使用层面的问题。PR 方面过去 24 小时无合并或更新。

## 版本发布

**v1.0.79-9**（最新）
- `/sandbox` 配置对话框现在显示沙箱设置在 settings.json 中的存储位置。

**v1.0.79-8**
- 新增：支持企业 `allow-auto-only` 策略，使 `/allow-all auto` 在完全 allow-all 被阻止时仍可用。
- 新增：允许企业托管沙箱策略强制使用代理 URL，同时凭据仍由用户控制。
- 改进：`/sandbox` 配置对话框对 git、gh 等条目进行分组展示。

**v1.0.79-7**
- 新增：Agent 插件（spec 格式）现在可在 `com.github.copilot/extensions/` 目录下发布扩展。
- 新增：支持 kimi-k3 模型。
- 新增：`--plan` 可与 `--mode autopilot` 结合使用，先规划后执行，无需等待审批。
- 改进：用户多选提示交互优化。

## 社区热点 Issues

**#2494** — `copilot login` 自动确认钥匙串提示（回归，不等待用户输入）
[链接](https://github.com/github/copilot-cli/issues/2494)
一个持续 4 个月之久的认证回归问题，在系统钥匙串不可用时 CLI 自动代替用户输入 "y/N"，导致认证流程异常终止。11 条评论说明该问题影响面较广且至今未修复。

**#1632** — 支持 skills 子文件夹以便更好组织
[链接](https://github.com/github/copilot-cli/issues/1632)
社区需求强烈的功能请求（👍 23），用户拥有超过 10 个自定义 skill 但受限于扁平结构，尝试放入子文件夹时被拒绝。是当前最受关注的组织性功能需求。

**#3622** — Windows 上复制到剪贴板静默失败
[链接](https://github.com/github/copilot-cli/issues/3622)
Windows 平台复制操作显示成功但粘贴内容不变的问题，v1.0.48 之后引入的回归。与今日新提交的 #4391（复制清屏）同属 Windows 终端渲染层缺陷，平台稳定性问题集中爆发。

**#4311** — Transcript 渲染为空白行直到内容或终端宽度变化
[链接](https://github.com/github/copilot-cli/issues/4311)
交互模式下转录区域空白但内容仍在（滚动可见），`/resume` 无法恢复。涉及测量行缓存失效后未重新触发渲染效果，属于终端渲染核心逻辑缺陷。

**#4401** — 回归：skill 工具无法找到 `~/.agents/skills` 下的有效 skills
[链接](https://github.com/github/copilot-cli/issues/4401)
v1.0.78 中 skill 发现机制回归，SKILL.md 存在但无法被调用，疑似 #2230 修复不完整。直接影响所有使用自定义 skill 的用户。

**#4397** — resume 会话自动切换回默认模型
[链接](https://github.com/github/copilot-cli/issues/4397)
使用 `--model` 指定的模型在 resume 会话后丢失，回退到默认模型。对依赖特定模型工作流的用户造成困扰，且不一定有直观提示。

**#4398** — permissions.config 中的 allowed_directories 从未被加载
[链接](https://github.com/github/copilot-cli/issues/4398)
用户配置的允许目录完全不生效，`/list-dirs` 中不可见，导致每次访问都被权限系统拦截。权限配置的核心路径失效属严重缺陷。

**#4392** — 启动时认证后的 MCP 客户端重建遗留孤儿 stdio 进程
[链接](https://github.com/github/copilot-cli/issues/4392)
每次启动都会产生一批未被杀死的 MCP 子进程，长期运行会积累大量僵尸进程，消耗系统资源。

**#4118** — `/app` 命令未默认选中当前工作目录
[链接](https://github.com/github/copilot-cli/issues/4118)
虽然已标记 CLOSED，但获得 👍 35 的高热度，表明社区对 GitHub Copilot App 与 CLI 的联动体验有较高期待，手动选择目录的流程被视为明显摩擦。

**#2947** — 支持在 CLI 中报告任何会话的 token 用量
[链接](https://github.com/github/copilot-cli/issues/2947)
虽然处于 CLOSED 状态，但获得 👍 7，是成本敏感型用户的核心诉求。Token 计量对企业和重度用户至关重要。

## 重要 PR 进展

过去 24 小时内无 PR 更新或合并。

## 功能需求趋势

- **企业策略适配**：v1.0.79-8 引入的 `allow-auto-only` 和强制代理支持表明企业治理需求正在加速向 CLI 渗透，大型组织对权限管控和网络合规的要求成为开发重点。
- **Agent 插件生态扩展**：v1.0.79-7 支持 `com.github.copilot/extensions/` 目录，将 plugin 机制从内置能力升级为可扩展生态，配合 #4209（自定义 agent 的 skill 工具别名）的需求，社区正在推动 agent 能力的模块化和可组合性。
- **新模型接入加速**：kimi-k3 模型的加入延续了高频模型适配节奏，用户对模型选择自由度和会话级模型记忆（#4397）的需求同步上升。
- **桌面通知与会话管理**：#2941（需要人工输入时桌面通知）和 #4395（恢复会话列表快捷删除）反映用户在多任务场景下对 CLI 可见性和会话生命周期管理的需求。
- **Windows 平台稳定性**：连续 3 个 Windows 相关问题（#3622、#4391、#4219）集中暴露，平台适配质量成为社区关注焦点。

## 开发者关注点

- **Windows 平台缺陷密集**：剪贴板静默失败、特定代码页（936）下复制清屏、通知导致的崩溃——Windows 用户在三个不同维度遭遇平台特有问题，且部分为回归，说明 Windows 适配测试覆盖不足。
- **配置持久化与作用域混乱**：permissions.config 不加载（#4398）、模型选择不持久（#4397）、workspace 类型无法设默认（#4396）、banner 设置 "once" 无效（#4129）——配置项的加载时机、优先级和读写一致性问题反复出现，开发者对配置系统的信任度受到影响。
- **自动化流程断裂**：`copilot login` 不等待用户输入就直接确认（#2494）、Esc 取消阻塞读取时误杀后台 agent（#3980）——交互流程中的意外行为打断开发者心流，这类问题虽小但直接影响日常使用体验。
- **版本管理与可复现性**：#4402 指出 npm 安装的 `copilot` 实际上是一个 loader 而非版本固定，同一路径在不同时间运行不同版本，导致环境不一致和问题难以复现，开发者呼吁文档化 `--prefer-version` 或提供真正的版本锁定机制。

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

### Kimi Code CLI 社区动态日报 — 2026-08-08

#### 1. 今日速览
今日社区聚焦于**工具安全性与数据完整性**：一则关于 Agent 在 YOLO 模式下误删工作区外目录的 Issue 引发对权限边界的热议；同时两个针对 `StrReplaceFile` 的 PR 正在竞争解决非 UTF-8 文件被静默破坏的严重缺陷。功能方面，长期悬而未决的“持久化记忆系统”请求（#1283）持续获得关注，表明用户对跨会话上下文保持有强烈需求。

#### 2. 版本发布
过去 24 小时内无新版本发布。

#### 3. 社区热点 Issues

**#2596 Agent 误删工作区外目录（YOLO 模式）** `[新]`
- **链接**: [Issue #2596](https://github.com/MoonshotAI/kimi-cli/issues/2596)
- **重要性**: 严重安全事件。Agent 在执行 `rm -rf` 时误删了 `~/.pi/agent/sessions` 下的真实用户数据，起因是早期 `ln -sfn` 创建符号链接失败未被察觉。直接暴露了 YOLO 模式下文件系统操作的验证缺失。
- **社区反应**: 0 条评论（刚创建），但标志着社区对高风险命令执行信任度的担忧上升。

**#1283 功能请求：跨会话持久化记忆系统** `[长期热帖]`
- **链接**: [Issue #1283](https://github.com/MoonshotAI/kimi-cli/issues/1283)
- **重要性**: 连续数月活跃，获得 21 条评论。用户希望 CLI 能自动记录项目模式、用户偏好并跨会话复用，包含 AI 管理笔记和手动指令两种模式。这是提升 Agent 连续工作能力的关键基础设施。
- **社区反应**: 讨论热烈，用户普遍认为这是从“会话工具”迈向“长期协作者”的分水岭功能。

**#2591 StrReplaceFile 静默破坏非 UTF-8 文件** `[驱动 PR 的根因]`
- **链接**: [Issue #2591](https://github.com/MoonshotAI/kimi-cli/issues/2591) *(注: 由 PR #2595 关联)*
- **重要性**: 该缺陷导致任何包含非 UTF-8 字节的文件（如图片、压缩包）在编辑时被永久损坏（乱码替换）。属于高危数据完整性 Bug，直接影响工具在二进制文件混杂目录下的可用性。
- **社区反应**: 已催生两个竞争性修复 PR（#2594、#2595），开发者正在就“保留原字节”与“拒绝编辑”两种策略权衡。

#### 4. 重要 PR 进展

**#2594 修复：StrReplaceFile 保留非 UTF-8 原始字节**
- **链接**: [PR #2594](https://github.com/MoonshotAI/kimi-cli/pull/2594)
- **内容**: 放弃整文件“字符串-重编码”流程，改为在原始字节缓冲区上定位并替换 `old`/`new` 子串，确保编辑范围外的无效 UTF-8 序列不被触碰。
- **评价**: 技术路线更优，在保留文件完整性的同时维持编辑能力，但实现复杂度略高。

**#2595 修复：StrReplaceFile 拒绝编辑非 UTF-8 文件**
- **链接**: [PR #2595](https://github.com/MoonshotAI/kimi-cli/pull/2595)
- **内容**: 在编辑前检测文件是否为合法 UTF-8，若否直接报错拒绝操作，防止数据损坏。
- **评价**: 方案保守、逻辑简单，安全性高，但会阻断用户对含二进制文件的目录进行文本编辑（即使编辑点远离二进制区域）。

#### 5. 功能需求趋势
- **持久化状态管理**: 跨会话记忆（#1283）是当前呼声最高的功能，核心诉求是让 Agent 积累项目知识和用户偏好。
- **安全执行边界**: 误删事件（#2596）引发对 YOLO 模式风险控制的讨论，预计将出现更多关于命令白名单或目录访问限制的请求。
- **文件编码健壮性**: 针对非 UTF-8 文件的处理成为热点，开发者期望工具在混合内容环境中具备更强的鲁棒性。

#### 6. 开发者关注点
- **信任与安全**: 开发者对 Agent 执行破坏性命令（`rm -rf`、`ln -sfn`）的前置检查不足表示关切，要求增加关键操作确认或回滚机制。
- **数据完整性**: 对编辑工具静默更改未涉及内容（如字节转码）的容忍度极低，强调“最小干预”原则。
- **上下文连续性**: 多开发者反馈“每次新会话需重新描述项目背景”的效率痛点，直接驱动了 Memory System 需求的升温。

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

## OpenCode 社区动态日报 — 2026-08-08

### 今日速览

v1.18.15 发布，主要修复消息顺序与截断清理问题。社区焦点集中在 OpenCode Go 服务的 401 上游拦截错误与计费异常，多个高频 Issue 持续发酵。PR 侧涌现一批 Web 端体验修复，以及 Mermaid 图渲染、Modal 环境驱动等新功能贡献。

---

### 版本发布

**v1.18.15** 发布，聚焦 Core 稳定性修复：

- 修复导入或历史消息 ID 乱序时，消息时间线排序错误的问题
- Revert 与 fork 操作现在严格遵循真实消息时间线，而非按 ID 排序
- 截断清理逻辑改为按文件时间戳更可靠地删除陈旧文件

---

### 社区热点 Issues

**1. OpenCode Go 返回 401，上游拦截 chat/completions 但 /v1/models 正常** — [#38257](https://github.com/anomalyco/opencode/issues/38257)
 45 条评论，11 👍。影响面广：所有 Go 订阅下的模型调用均被上游拒绝，疑似服务端问题。持续两周未解决，社区焦虑度上升。

**2. 图片粘贴后部分模型无法读取** — [#5359](https://github.com/anomalyco/opencode/issues/5359)
 18 条评论。1.0.134 正常，1.0.137 起回归，涉及 LiteLLM + Vertex AI 后端。属于影响多模态工作流的长期未解 bug。

**3. 请求支持加密货币支付 Go 订阅** — [#23153](https://github.com/anomalyco/opencode/issues/23153)
 17 条评论，37 👍，是所有 Issue 中👍 数最高。付费方式诉求强烈，社区积极跟进。

**4. Amazon Bedrock Opus 4.6 compaction 失败** — [#14332](https://github.com/anomalyco/opencode/issues/14332)
 16 条评论。`thinking` 块被修改导致 compaction 报错，涉及模型上下文压缩的关键路径，已关闭但讨论仍热。

**5. OpenCode Go 的 deepseek-v4-flash 实际返回 V3.2** — [#40409](https://github.com/anomalyco/opencode/issues/40409)
 14 条评论。计费/质量不匹配，标记为高严重度。用户实际拿到的是旧版模型，知识截止日期落后。

**6. PowerShell 中无法粘贴内容** — [#6560](https://github.com/anomalyco/opencode/issues/6560)
 13 条评论。Windows 11 环境下 TUI 剪贴板失效，右键与 Ctrl+V 均无效，影响 Windows 用户日常输入。

**7. DeepSeek thinking 模式下行 reasoning_content 未回传报错** — [#24334](https://github.com/anomalyco/opencode/issues/24334)
 10 条评论。DeepSeek API 要求 thinking 模式下必须原样回传 `reasoning_content`，否则返回 400，影响推理类模型的 agent 会话。

**8. 添加 OpenRouter 后出现 Unexpected server error** — [#29748](https://github.com/anomalyco/opencode/issues/29748)
 7 条评论，持续更新中。切换项目后出现服务端错误，重启也无法恢复，属于环境配置后的持久性故障。

**9. 用量显示超 100% 且无法压缩** — [#41102](https://github.com/anomalyco/opencode/issues/41102)
 3 条评论。用量统计超过 100% 后上下文压缩功能失效，影响长会话使用体验。

**10. GitHub Copilot 每次会话都要求重新认证** — [#40183](https://github.com/anomalyco/opencode/issues/40183)
 3 条评论。凭据已存储且 `expires:0`，但每次新会话仍提示重新登录，认证状态持久化存在缺陷。

---

### 重要 PR 进展

**1. 自动修复项目列表：从首页填充项目** — [#41158](https://github.com/anomalyco/opencode/pull/41158)
 修复 `opencode web` 首页空白问题：保留服务端空搜索索引结果，缺失时回退到列出当前主目录，兼容逻辑完全保留在前端。

**2. TUI 渲染 Mermaid 图表** — [#41113](https://github.com/anomalyco/opencode/pull/41113)
 新增内置 TUI 插件，可在会话记录中直接渲染 Mermaid 流程图、时序图与状态图。渲染器以私有包 `@opencode-ai/merman` 形式引入。

**3. 添加工作区解除封禁端点** — [#41170](https://github.com/anomalyco/opencode/pull/41170)
 新增 Support API 端点，使用现有 `SUPPORT_API_KEY` 鉴权，支持按工作区 ID 解除封禁，重复解封幂等。

**4. 修复外部 worktree 会话标签显示** — [#41147](https://github.com/anomalyco/opencode/pull/41147)
 恢复规范项目目录之外的会话标签，如 Git 兄弟 worktree 中的会话。此前的清理逻辑导致这些会话目录标签被误删。

**5. LSP 通配符根标记匹配修复（如 *.cabal）** — [#41169](https://github.com/anomalyco/opencode/pull/41169)
 修复 `NearestRoot` 对 glob 形式根标记的探测失败问题，使 LSP 项目根目录定位更可靠。

**6. 添加 `opencode web --no-open` 选项** — [#41167](https://github.com/anomalyco/opencode/pull/41167)
 支持启动 Web UI 时不自动打开浏览器标签页，适合自定义启动流程的用户。

**7. websearch 工具新增 Synthetic 后端** — [#41160](https://github.com/anomalyco/opencode/pull/41160)
 在 exa 与 parallel 之外增加第三个搜索后端 `"synthetic"`，模型选择更丰富。

**8. 修复无附件能力模型下工具结果媒体提取** — [#41161](https://github.com/anomalyco/opencode/pull/41161)
 修复 `supportsMediaInToolResult` 对 Anthropic/OpenAI SDK 无条件返回 `true` 的问题，为不支持附件的模型正确降级。

**9. 配置级 npm 覆盖传递至继承模型** — [#41159](https://github.com/anomalyco/opencode/pull/41159)
 修复提供商配置中的 `npm` 覆盖（如 `provider.synthetic.npm`）在继承模型上被静默丢弃的问题。

**10. 服务端新增 Modal 环境驱动** — [#41118](https://github.com/anomalyco/opencode/pull/41118)
 首个 Environment 契约宿主绑定：Modal 沙箱驱动，附带共享文件系统一致性测试。测试显示 Modal exec 与文件系统性能约在同一水平。

---

### 功能需求趋势

- **OpenCode Go 服务体验**：认证故障、模型路由混乱与计费异常占据大量 Issue，社区在付费质量与透明性上的容忍度正在下降
- **加密支付**：Crypto 支付诉求获得了极高的社区支持度（37 👍），是近期呼声最高的新功能
- **Web 端体验优化**：项目列表、目录选择、浏览器启动行为等 Web UI 细节是当前迭代重点
- **Mermaid 渲染**：在 TUI 中直接渲染图表获得社区积极响应，文档与图表工作流将受益
- **扩展能力**：Synthetic 搜索后端、原生后台子代理（PR #40923）等扩展性功能持续涌入，平台生态边界不断拓宽

---

### 开发者关注点

- **服务可用性与质量对齐**：Go 订阅大量用户反馈"付费拿旧模型"、"被上游拦截"、配额与账单不符，开发者对服务透明度和一致性要求极高
- **多模态附件回归**：从 1.0.137 起图片读取失效长期未修复，持续影响视觉工作流，开发者对关键回归的修复速度有抱怨
- **模型上下文管理**：thinking 块回传合规、上下文压缩失效、用量统计异常等问题集中出现在与推理模型的 agent 会话中，是复杂场景下的高频痛点
- **认证状态持久化**：GitHub Copilot 每次会话重新认证的问题影响了依赖该提供商的用户，认证凭据可靠性亟待提升
- **Windows 体验**：TUI 粘贴失效属于典型且影响范围大的平台缺陷，但长时间未闭环，Windows 用户反馈渠道不够畅通

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code 社区动态日报

**2026-08-08**


## 今日速览

昨日发布两个 nightly 版本（v0.21.7-nightly.20260807 / 20260808），主要修复 CI 中 autofix 接管准入问题。社区讨论集中在 Windows 终端中文显示模糊、tmux 内闪屏、跨平台终端兼容性等 UI 渲染问题，同时 WebBridge 浏览器控制、本地控制模式等功能需求获得较高关注。


## 版本发布

**v0.21.7-nightly.20260808.4ec0371e6**

- fix(ci): 修复 autofix 接管被阻塞时无法上报的问题（PR #8410）
- docs: 补充 serve 子会话并发相关文档

**v0.21.7-nightly.20260807.fca8f3c1f**

- fix(ci): 修复 autofix 接管被阻塞时无法上报的问题（PR #8410）


## 社区热点 Issues

### 1. Windows 终端中文输入拼音显示模糊
[#8625](https://github.com/QwenLM/qwen-code/issues/8625) · `type/bug` · `scope/windows` · 评论 6

Windows 终端中输入中文时拼音渲染模糊，难以辨认。该问题影响中文用户日常输入体验，已标记 `welcome-pr` 欢迎社区贡献修复。

### 2. tmux 内闪屏（SSH + iTerm2 环境）
[#8562](https://github.com/QwenLM/qwen-code/issues/8562) · `type/bug` · `scope/linux` · 评论 5

用户通过 iTerm2 SSH 到 Ubuntu 并在 tmux 中运行 Qwen Code，对话时仅在 tmux 分屏内出现闪屏。用户用 Qwen 3.8 Max 排查后定位为 Qwen Code 版本问题。与 #8659 可能同源。

### 3. 为 usage telemetry 增加 runtime 和 client 归因
[#8660](https://github.com/QwenLM/qwen-code/issues/8660) · `type/feature-request` · `category/telemetry` · 评论 5

建议在默认 usage-statistics 负载中增加稳定的 runtime 和第一方 client 归因。当前 `properties.channel` 已能区分部分入口，但覆盖面不足。已有对应 PR 推进。

### 4. 基于 Web Shell 构建低维护成本的桌面应用
[#8092](https://github.com/QwenLM/qwen-code/issues/8092) · `type/feature-request` · `roadmap/platform-distribution` · 评论 5

建议复用现有 Web Shell 作为桌面应用的主要 UI，避免维护独立桌面实现。社区对桌面端体验有持续需求，该方向已被标记为路线图项目。

### 5. Windows 桌面版启动崩溃：EISDIR lstat 'C:'
[#8615](https://github.com/QwenLM/qwen-code/issues/8615) · `type/bug` · `P1` · 评论 5

Desktop v0.1.0 在 Windows 上打开工作区时崩溃，bundled runtime 报 `EISDIR lstat 'C:'`。已关闭，属高优先级桌面端阻塞问题。

### 6. `qwen mcp list` 在 SSE 服务器无响应时无限挂起
[#8550](https://github.com/QwenLM/qwen-code/issues/8550) · `type/bug` · `scope/mcp` · 评论 4

当 MCP 服务器使用 SSE transport 且不发送 `endpoint` 时，`qwen mcp list` 会永久挂起而非超时返回。已关闭，标记 `ready-for-agent`。

### 7. Desktop 端 Markdown 链接点击无响应
[#8593](https://github.com/QwenLM/qwen-code/issues/8593) · `type/bug` · `category/ui` · 评论 4

Assistant 消息中的 Markdown 链接有样式但点击后无任何反应——既不打开浏览器也不显示错误。已关闭。

### 8. Context 使用百分比在状态栏和 footer 重复显示
[#8695](https://github.com/QwenLM/qwen-code/issues/8695) · `type/feature-request` · `category/ui` · 评论 3

默认同时开启状态栏和 footer 时，context 使用百分比出现两次（状态栏 `11.4% used` + footer `11.4%`）。建议去掉一处冗余展示。

### 9. Windows 独立安装包在 PowerShell 无法解析 Get-FileHash 时失败
[#7118](https://github.com/QwenLM/qwen-code/issues/7118) · `type/bug` · `P2` · 评论 4 · 👍 3

SHA-256 校验环节在 PowerShell 环境异常时直接导致安装失败，回退到 `--method npm` 安装。持续开放中，社区关注度较高（3 👍）。

### 10. 新增功能建议：强化 Agent 事实核验行为
[#8701](https://github.com/QwenLM/qwen-code/issues/8701) · `type/feature-request` · `need-discussion` · 评论 2

建议通过 system prompt 或"严格核验模式"增强 Agent 的事实核验能力：先验证再下结论、全链条验证、transcript 分级对待、排障时先查自身近期变更等五条增强。


## 重要 PR 进展

### 1. 精确匹配 attribution marker 值
[#8712](https://github.com/QwenLM/qwen-code/pull/8712) · `fix(cli)` · 新提交

daemon 和 desktop attribution marker 仅在值严格为 `1` 时生效，`0`/`false` 回退为 `ACP`。修复 #8670 引入的归因误报问题。

### 2. 刷新 MCP 会话元数据而无需重连
[#8522](https://github.com/QwenLM/qwen-code/pull/8522) · `fix(core)` · autofix/takeover

当 `trust`、`alwaysLoadTools`、`includeTools` 或 `excludeTools` 变化时，刷新 MCP tool/prompt/resource 注册，同时保持健康传输。将 handle 生命周期与传输身份解耦。

### 3. 通过 ACP 暴露推理强度（reasoning effort）选项
[#8526](https://github.com/QwenLM/qwen-code/pull/8526) · `feat(cli)` · autofix/takeover

ACP 客户端可通过 `session/set_config_option` 设置 `thought_level`（Default 到 Max 六档），复用 Qwen 推理配置。

### 4. review 加入软性 tool-call 预算
[#8708](https://github.com/QwenLM/qwen-code/pull/8708) · `perf(review)` · 新提交

`agentToolBudget` 作为软性 tool-call 上限（clamp(30 + effective/20, 30, 60)）烘焙进 finder/auditor 简报，防止调用方无限膨胀。

### 5. 澄清中断后的可复用 SDK 查询语义
[#8711](https://github.com/QwenLM/qwen-code/pull/8711) · `docs`

明确说明：中断当前 turn 不会关闭 multi-turn query 和输入流，可继续后续 prompt；session 关闭或 controller 取消才会终结整个 session。

### 6. tmux 支持交互式终端 sub-agent
[#8613](https://github.com/QwenLM/qwen-code/pull/8613) · `feat(web-shell)` · autofix/takeover

Agent 可在 daemon 主机上的 tmux session 中运行交互式 CLI（REPL、TUI 应用等），Web Shell 以实时终端视图呈现。

### 7. 标准 ACP context usage 更新通知
[#8528](https://github.com/QwenLM/qwen-code/pull/8528) · `fix(acp)` · 已合并

每次 main-session 模型轮次后发射标准 `usage_update` 通知，`used` 报告最新 prompt 占用，`size` 取自模型 context 上限。已合并。

### 8. 源码级 WebSearch 无模型配置提示改进
[#8665](https://github.com/QwenLM/qwen-code/pull/8665) · `fix(cli)` · 新提交

启动时若启用 WebSearch 但未配置模型，展示含可直接复制的 `settings.json` 示例和 env-var 替代方案的提示信息。

### 9. 长期 Goal 证据检查点
[#8465](https://github.com/QwenLM/qwen-code/pull/8465) · `feat(core)` · autofix/takeover

为长期运行 Goal 增加 Core 持有的持久化证据检查点：证据目录达到硬限制前暂停自动续跑，由独立无工具验证器压缩累积证据。

### 10. Qwen WebBridge：直接浏览器控制
[#8707](https://github.com/QwenLM/qwen-code/pull/8707) · `feat(chrome)` · review/self-reported

暴露 Kimi WebBridge 兼容的 `/command` 和 `/status` 端点，实现完整 17 动作浏览器控制面（对应 Issue #8699）。通过 `qwen serve` 连接 Chrome 扩展和真实 Chromium profile。


## 功能需求趋势

**1. 浏览器/外部工具直接控制（新增长点）**

Qwen WebBridge 提案（#8699 + PR #8707）借鉴 Kimi WebBridge，希望在 `qwen serve` 之上提供直接浏览器控制通道，不依赖 MCP。表明社区对"Agent 控制浏览器"场景有明确需求。

**2. 本地控制模式 / 移动端访问**

[#8595](https://github.com/QwenLM/qwen-code/issues/8595) 提出"Local Control"模式：通过 QR 码扫码从手机访问并接管本地会话（CLI + Desktop）。与 #8092（Web Shell 桌面化）方向一致，社区期望降低远程访问门槛。

**3. Web Shell 体验持续迭代**

Web Shell 相关 PR 密集：tmux 交互式终端（#8613）、全屏 artifact 面板（#8614）、composer 工具栏改造（#6699/#6701）等。Web Shell 正成为桌面体验的核心载体。

**4. 遥测与归因增强**

#8660 和 PR #8670/#8712 表明项目在完善 usage telemetry 的归因能力（daemon/desktop 渠道标识），同时注意环境变量兼容性（#8697 的 OTEL 冲突）。

**5. ACP 协议集成深化**

ACP 相关进展包括 usage_update 通知（#8528）和 reasoning effort 选项（#8526），持续增强 JetBrains 等 ACP 客户端的集成体验。


## 开发者关注点

**1. 终端渲染兼容性是最大痛点**

Windows 中文输入模糊（#8625）、tmux 闪屏（#8562）、Web 终端闪烁/撕裂（#8659）、PuTTY 中键粘贴失效（#8672）——多个终端环境下的渲染/交互问题集中出现，跨平台终端兼容性成为高频问题。

**2. `useTerminalBuffer` 默认开启引发问题**

#8659 指出默认的 `useTerminalBuffer: true`（Virtualized History 模式）在 Web 终端中执行全屏 ANSI 重绘导致持续闪烁/撕裂，可能需要按终端能力自适应。

**3. 功能重复与 UI 冗余**

#8695 指出 status line 和 footer 同时显示 context 使用率，属于细节体验问题，社区对 UI 整洁度有要求。

**4. 中断/信号处理的语义一致性**

多个 issue（#8491 signal 终止误报成功、#8495 stream-json 中断破坏会话控制）围绕"中断如何影响会话生命周期"展开，开发者对中断语义的确定性有较高要求。

**5. 安装与配置体验**

Windows 安装器在 PowerShell 环境异常时直接失败（#7118），WebSearch 配置提示不友好（#8665）——安装和初始化环节的容错性和引导性有待加强。

**6. 文档与基础设施质量**

#8692 指出 `integration-tests/` 的 tsconfig 存在 TS5063 导致类型检查从未执行过；DingTalk interactiveCards 配置更新丢失（#8515）——工具链质量与配置管理需要补强。

</details>

---
*本日报由 [agents-radar](https://github.com/huang-yi-dae/agents-radar) 自动生成。*