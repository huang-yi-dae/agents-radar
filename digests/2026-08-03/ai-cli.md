# AI CLI 工具社区动态日报 2026-08-03

> 生成时间: 2026-08-03 15:58 UTC | 覆盖工具: 7 个

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

# AI CLI 工具横向对比分析报告（2026-08-03）

## 1. 生态全景

当前 AI CLI 工具已从"单一模型对话"进入 **"多模型混合 + 工具链深度集成 + 跨设备会话"** 的竞争阶段。各主流工具均保持高频迭代，但方向上出现明显分化：Claude Code 聚焦订阅权益落地与桌面端体验，OpenAI Codex 以密集的内部重构为 MCP 与计费模型铺路，Gemini CLI 处于安全修复与 Agent 稳定性攻坚期，Qwen Code 通过正式版发布加速向"多渠道 Agent 平台"演进，而 Kimi Code 与 Copilot CLI 则在记忆系统、多模型切换等差异化功能上寻求突破口。值得警惕的是，**数据安全（会话丢失/静默删除）与平台稳定性（Windows/macOS）成为跨工具共性短板**。

## 2. 各工具活跃度对比

| 工具 | 今日关注 Issues | 今日活跃 PR | Release | 热度代表 | 活跃特征 |
|------|:-:|:-:|:-:|------|------|
| Claude Code | 10 | 2（文档） | 无 | #29355 会话重命名 82👍 | 高关注、低发布，付费权益问题发酵 |
| OpenAI Codex | 10 | 10（全合并） | 无 | #35058 Diff崩溃 122👍（已关闭） | PR 密集，内部重构期 |
| Gemini CLI | 10 | 10 | v0.55.0-nightly | #1689 长命令阻塞 20👍 | 迭代最快，安全/稳定性攻坚 |
| GitHub Copilot CLI | 10 | 0 | 无 | #3282/#3709 BYOK 各 20👍 | 社区需求旺盛，官方动作较少 |
| Kimi Code | 2 | 9（3 合并） | 无（依赖升级） | #1282 远程控制 24👍 | 小步快跑，中文环境修复积极 |
| OpenCode | 10 | 10 | 无 | #6231 模型自动发现 201👍 | 全栈活跃，订阅链路问题集中爆发 |
| Qwen Code | 10 | 10 | **v0.21.4 正式版** | #8400 会话静默删除（P1） | 发布+功能双向推进，数据安全受关注 |

> 注：Issues/PR 数为各日报收录的 Top 代表性条目，非当日总量。

## 3. 共同关注的功能方向

**A. 多模型与 BYOK 管理（5 个工具）**
- **Copilot CLI**：会话内 /model 切换本地 BYOK（#3709）
- **OpenCode**：自动发现 OpenAI 兼容本地模型（#6231，201👍）
- **Codex**：gpt-5.6-luna 模型能力标签与运行时不一致（#35097）
- **Qwen Code**：Bailian 模型列表与内置目录不同步（#8432）
- **Claude Code**：Max 订阅无法使用 Fable 5（#79337，56 评论）

**B. MCP 生产级运维能力（4 个工具）**
- **Codex**：按需重启单 MCP 服务器（#4955）、认证热切换（#14144）
- **Copilot CLI**：CI 中 MCP registry 鉴权失败（#4346）
- **Qwen Code**：重复 tool call id、SDK 嵌入式 MCP 会话恢复失效（#8382/#8433）
- **Kimi Code**：ACP 模式需显式区分"用户关闭"与"不支持"（#2507）

**C. 会话数据安全与跨端续接（4 个工具）**
- **Qwen Code**：Windows 桌面端会话静默自动删除（#8400，P1）
- **Claude Code**：SSH Remote 重启后历史会话"失忆"（#63025）
- **OpenCode**：连续更新后历史/配置全部丢失（#39560）
- **Kimi Code**：跨设备 Remote Control（#1282，24👍）

**D. 可观测性与 Agent 行为透明（3 个工具）**
- **Gemini CLI**：子代理恢复后误报成功（#22323，P1）
- **Copilot CLI**：ACP 审批弹窗仅显示高层摘要而非可执行命令（#4335）
- **Codex**：回合级技能状态存储于 ExtensionData（#36740）

**E. Windows/跨平台体验修复（5 个工具）**
- **Codex**：WMI 高 CPU（#29499）、全局输入延迟（#28855）
- **Claude Code**：macOS 登录死循环（#22685）
- **Copilot CLI**：WSL2 下 Ctrl+H 误判（#4328）
- **Qwen Code**：ConEmu 输出闪烁（#8385）
- **Kimi Code**：GBK 编码控制台启动崩溃（#2577）

## 4. 差异化定位分析

| 工具 | 定位 | 核心优势 | 当前短板 |
|------|------|----------|----------|
| **Claude Code** | 订阅制高端 Agent | Anthropic 模型生态、Max 套餐权益、桌面/远程控制覆盖广 | 付费权益落地不稳、登录链路脆弱 |
| **OpenAI Codex** | 工程化重型 Agent | 后台重构密度高、MCP 架构前瞻、rollout 预算模型创新 | VS Code 扩展稳定性、Windows 性能拖后腿 |
| **Gemini CLI** | 安全优先的开发者代理 | 安全修复响应快（SSRF）、AST 感知探索、Nightly 高速迭代 | Agent 挂起/误报等信任度问题待解 |
| **Copilot CLI** | GitHub 生态内嵌工具 | 多模型灵活切换、技能市场、ACP 模式 | 官方迭代慢，技能数量受限，三方可扩展性弱 |
| **Kimi Code** | 中文开发者友好 CLI | Memory System 探索、中文编码修复、远程控制需求高赞 | 日活 Issue 量小，生态规模尚小 |
| **OpenCode** | 多端统一开放平台 | 模型自动发现（201👍）、五端共用运行时（#40108）、OTA 更新 | 订阅/支付链路故障、数据泄漏事件 |
| **Qwen Code** | 多渠道 Agent 平台 | Web Shell 正式版、IM（钉钉/飞书/企微）+ Email 渠道扩展、工作流级控制 | 数据安全（静默删除）、长会话缓存失效 |

**技术路线核心分歧**：
- **Codex / Gemini** 押注 **协议与运行时重构**（MCP 运维化、AST 感知），追求底层可靠性；
- **Qwen / OpenCode** 押注 **多端/多渠道接入**（IM、邮件、桌面、Web），追求场景覆盖；
- **Kimi / Copilot** 押注 **会话层体验**（记忆系统、多模型即时切换），追求交互连续性。

## 5. 社区热度与成熟度

**第一梯队：OpenAI Codex、Gemini CLI**
- Codex：PR 全合并、Diff 崩溃 122👍（今日关闭）、MCP 系列重构集中合并，处于"内功修炼"成熟期；
- Gemini：Nightly 每日发布，P1 Issue 快速响应（OAuth、SSRF），社区反馈闭环效率最高。

**第二梯队：Claude Code、OpenCode、Qwen Code**
- 三者热度高但**负面信号明显**：Claude Code 付费权益问题（56 评论）、OpenCode 支付链路故障（6+ 条支付相关 Issue）、Qwen Code P1 数据安全缺陷，均可能侵蚀用户信任。

**第三梯队：Copilot CLI、Kimi Code**
- Copilot：需求热度真实（BYOK 两个 20👍），但 0 PR + 大量 triage 关闭，社区开始焦虑；
- Kimi：体量最小，但 Memory/Remote 两个功能需求粘性高，中文 Windows 修复有差异化价值。

## 6. 值得关注的趋势信号

1. **多模型/本地模型不再"可选"而是"默认"**：OpenCode #6231 获 201👍 为今日全行业最高，Copilot 双 BYOK Issue 各 20👍——开发者拒绝被锁定在单一模型或单一托管商。工具链的模型抽象层（自动发现、切换、兼容端点）将在 6 个月内成为标配能力。

2. **会话数据的"所有权"成为信任分水岭**：Qwen 静默删除会话、OpenCode 连续更新丢数据、Claude SSH 会话"失忆"、Codex sessions 目录 165GiB——四起高严重性数据事件同日出现，说明多数工具在持久化/迁移/清理的设计上未达生产级标准。具备独立于 UI 的会话存储与可审计清理机制的工具将获得显著差异化优势。

3. **MCP 正在经历"从可用到可运维"的关键转折**：Codex 的 MCP 去重重构（#36716/#36734）、重启/热更新需求（#4955、#14144）、Copilot 的 CI 鉴权失败（#4346）、Qwen 的稳定性缺陷，共同指向同一结论：MCP 生态已跨过"能不能连"阶段，进入"能否在生产环境中可靠运行"的深水区。服务发现、健康检查、热重启、凭证轮换将是下一波竞争点。

4. **Windows 平台成为"隐形扣分项"**：Codex 的 WMI 高 CPU + 输入延迟、Qwen 的会话静默删除（Windows）、Copilot 的 WSL2 按键冲突、Kimi 的 GBK 崩溃——Windows 问题的跨工具密集出现，恰说明各团队优先保障了 macOS/Linux 体验。对于占据开发者市场约 30% 的 Windows 用户，谁先系统性解决平台稳定性，谁就能获得显著的增量口碑。

5. **Agent 可信度开始超越能力本身**：Gemini 的"超限误报成功"（#22323）、Copilot 的"审批弹窗不可见命令"（#4335）、Qwen 的"可信 Agent 运行时"提案（#8102）、Kimi 的"空答案 vs 不支持"语义区分（#2507）——社区对 LLM 输出的无条件信任正在消退，**确定性执行边界、可追溯决策、显式状态语义**成为新的关注焦点，这与企业级采纳的需求一致。

6. **CLI 正从"终端里的工具"演变为"跨端协作平台"**：Qwen 把 Web Shell 升级为桌面应用并接入 IM/Email 渠道，OpenCode 实现五端共享运行时，Kimi 的 Remote Control 获 24👍，Claude/Codex 均在桌面端发力——AI CLI 的战场已从终端窗口扩展至桌面应用、浏览器、移动端与聊天软件的融合层。纯 TUI 工具若不补全多端能力，将在 1-2 年内面临场景覆盖劣势。

---

*以上数据分析基于 2026-08-03 各工具 GitHub 社区日报，反映截取时间点的社区动态，供技术决策参考。*

---

## 各工具详细报告

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills 社区热点报告
**数据来源**: github.com/anthropics/skills | **数据截止**: 2026-08-03

---

## 1. 热门 Skills 排行

以下按社区讨论活跃度排序（当前均为 **open** 状态）：

### ① skill-creator 评估工具链修复 — 讨论热度第一
**PR [anthropics/skills#1298](https://github.com/anthropics/skills/pull/1298)**（MartinCajiao, 2026-06-10）
- **功能**：修复 `run_eval.py` 对所有 skill 描述一律报告 `recall=0%` 的致命缺陷，涉及将评估产物安装为真实 skill、Windows 流读取、触发检测与并行 worker 修复。
- **热点**：关联 Issue #556（12 条评论）及 10+ 独立复现，是整个仓库最集中的 bug 战场。同类 PR 还有 #1099、#1050、#1323、#1261，形成"围攻 skill-creator"之势。

### ② document-typography — 文档排版质检
**PR [anthropics/skills#514](https://github.com/anthropics/skills/pull/514)**（PGTBoos, 2026-03-04, 更新 2026-03-13）
- **功能**：针对 AI 生成文档的孤儿行（1-6 词溢出）、段首标题滞留页底、编号错位等排版问题做质量管控。
- **热点**：直击"Claude 生成的每个文档都会犯"的高频痛点，覆盖所有文档生成场景。

### ③ ODT — OpenDocument 全套处理
**PR [anthropics/skills#486](https://github.com/anthropics/skills/pull/486)**（GitHubNewbie0, 2026-03-01, 更新 2026-04-14）
- **功能**：创建/填充/读取/转换 `.odt`、`.ods`，并支持 ODT 转 HTML，补全了官方仓库文档类 skill 的开源格式缺口。
- **热点**：与 LibreOffice/ISO 标准办公场景强相关，社区对非 Microsoft 格式支持呼声渐高。

### ④ frontend-design 重构
**PR [anthropics/skills#210](https://github.com/anthropics/skills/pull/210)**（justinwetch, 2026-01-05, 更新 2026-03-07）
- **功能**：全面修订 frontend-design skill，确保每条指令可被 Claude 在单次会话中执行，提升行为可引导性。
- **热点**：社区关注官方 skill 的"可操作性"而非"可读性"，类似批评也出现在 Issue #202（skill-creator 读起来像开发文档而非操作指令）。

### ⑤ skill-quality-analyzer + skill-security-analyzer — 元技能
**PR [anthropics/skills#83](https://github.com/anthropics/skills/pull/83)**（eovidiu, 2025-11-06, 更新 2026-01-07）
- **功能**：新增两个元技能——质量分析器（结构文档 20%、SKILL.md 质量、示例、资源等五维评估）与安全分析器，用于审查其他 skill 本身。
- **热点**：回应了社区对"skill 质量参差"和"官方仓库安全边界"的双重焦虑（关联 Issue #492）。

### ⑥ self-audit — 交付前推理质量门禁
**PR [anthropics/skills#1367](https://github.com/anthropics/skills/pull/1367)**（YuhaoLin2005, 2026-06-28, 更新 2026-07-02）
- **功能**：先做机械性文件校验（声称的输出是否真实存在），再按损害严重度做四维推理审计，宣称适配任何项目/技术栈/模型。
- **热点**：属于"agent 自我治理"新方向，与 Issue #1385（三闸门质量管线提案）互相呼应。

### ⑦ testing-patterns — 全栈测试模式库
**PR [anthropics/skills#723](https://github.com/anthropics/skills/pull/723)**（4444J99, 2026-03-22, 更新 2026-04-21）
- **功能**：覆盖 Testing Trophy 模型、单元测试 AAA 模式、React Testing Library、测试命名与边界用例等完整测试栈。

### ⑧ color-expert — 色彩专家
**PR [anthropics/skills#1302](https://github.com/anthropics/skills/pull/1302)**（meodai, 2026-06-10, 更新 2026-07-21）
- **功能**：涵盖 ISCC-NBS、Munsell、XKCD、RAL 等色彩命名体系与 OKLCH/OKLAB/CAM16 等色彩空间选型表。
- **热点**：来自知名色彩库作者，专业化程度高，近期仍在活跃更新。

---

## 2. 社区需求趋势（来自 Issues）

| 方向 | 代表 Issue | 评论 | 诉求 |
|---|---|---|---|
| **安全与信任边界** | [#492](https://github.com/anthropics/skills/issues/492) | 43 | 社区 skill 混入 `anthropic/` 命名空间，伪造官方身份诱导用户授权，要求建立 trust boundary 机制 |
| **企业级共享** | [#228](https://github.com/anthropics/skills/issues/228) | 16 (👍8) | 组织内 skill 库/直链共享，替代"下载文件→IM 传输→手动上传"的原始流程 |
| **开发工具链可靠性** | [#556](https://github.com/anthropics/skills/issues/556) | 12 (👍7) | `run_eval.py` 全部查询 0% 触发率，skill 优化环在"对噪声优化"；[#1061](https://github.com/anthropics/skills/issues/1061) 补充 Windows 三连坑 |
| **skill 生命周期管理** | [#1329](https://github.com/anthropics/skills/issues/1329) | 9 | 符号化紧凑记忆格式（compact-memory），减少长跑 agent 的 prose 记忆上下文开销 |
| **自我治理/质量门禁** | [#1385](https://github.com/anthropics/skills/issues/1385) | 4 | 任务前校准→对抗性审查→交付验证三闸门管线；[#412](https://github.com/anthropics/skills/issues/412)（closed）曾提议 agent-governance 安全模式 |
| **互操作协议** | [#16](https://github.com/anthropics/skills/issues/16) | 4 | 将 Skills 暴露为 MCP 工具，统一"软件即 API"的信号协议 |
| **上下文管理** | [#1487](https://github.com/anthropics/skills/issues/1487) | 4 | claude-api skill 单次调用注入 ~156k token 撑爆上下文窗口，质疑 bundled skill 的 token 效率 |
| **多平台支持** | [#29](https://github.com/anthropics/skills/issues/29) | 4 | AWS Bedrock 上的 Skills 可用性 |

---

## 3. 高潜力待合并 Skills

以下 PR 讨论活跃、功能完整度高，近期有望落地：

| Skill | PR | 说明 |
|---|---|---|
| **plan-file-hygiene** | [#1479](https://github.com/anthropics/skills/pull/1479) | 2026-07-25 创建，解决规划产物无生命周期的累积问题，回应了 Issue #1417 指定的方案，更新至 07-27，最新鲜 |
| **self-audit** | [#1367](https://github.com/anthropics/skills/pull/1367) | v1.3.0 已迭代，机械校验+四维推理门禁，与 #1385 提案联动，作者活跃 |
| **color-expert** | [#1302](https://github.com/anthropics/skills/pull/1302) | 作者为知名开源色彩库维护者，覆盖体系完整，仍在 07-21 更新 |
| **testing-patterns** | [#723](https://github.com/anthropics/skills/pull/723) | 覆盖完整测试栈，但 04-21 后暂停更新，需关注是否重启 |
| **document-typography** | [#514](https://github.com/anthropics/skills/pull/514) | 高频痛点+低实现复杂度，若补上 eval 用例，合并门槛低 |
| **ODT** | [#486](https://github.com/anthropics/skills/pull/486) | 补全官方文档类 skill 矩阵的明显空缺，4 月仍在更新 |

---

## 4. Skills 生态洞察

**社区最集中的诉求是"先把 skill 的生产工具修好"——围绕 `run_eval.py` 的 0% recall 与 Windows 兼容性问题已产生 5+ 个修复 PR 和 3+ 个 Issue（#556、#1061、#1169），其次是期待更多可验证、可信赖、有质量门禁的专业化领域 skill 进入官方仓库。**

一句话总结：**当前生态的核心矛盾是"造 Skill 的工具本身不可靠"与"验 Skill 的手段本身缺失"，社区既在抢修开发链路的正确性，也在用元技能（质量分析、安全分析、self-audit）为诚信危机建防火墙。**

---

# 🤖 Claude Code 社区动态日报 — 2026-08-03

## 今日速览

今日无新版本发布，社区讨论热度聚焦于 **Max 用户无法使用 Fable 5**（#79337，56 评论）与 **macOS 桌面应用登录死循环**（#22685，31 评论）两大痛点。另有一个高赞功能需求（82 👍）请求支持编程式会话重命名，暗示社区对自动化工作流的强烈渴望。

---

## 版本发布

过去 24 小时内无新版本 Release。

---

## 社区热点 Issues（Top 10）

### 1. 🔥 Max 用户惨遭降级：Fable 5 提示"需要用量积分"
**Issue #79337** | 56 评论 | 21 👍 | [链接](https://github.com/anthropics/claude-code/issues/79337)
- **现象**：自 7 月 20 日 Fable 5 成为 Max 计划标配起，Claude Code 在 Max 账号下拒绝使用该模型，静默降级至 Opus 4.8，并报错"Fable 需要用量积分"。
- **影响**：已订阅 Max 的用户无法使用计划内新模型，属于直接影响付费体验的严重故障，社区讨论激烈。
- **状态**：OPEN，含复现步骤。

### 2. 🔥 macOS 桌面应用陷入"Invalid authorization"登录死循环
**Issue #22685** | 31 评论 | 22 👍 | [链接](https://github.com/anthropics/claude-code/issues/22685)
- **现象**：Claude Desktop App (v1.1.1520) 每次启动即报 `Invalid authorization`，Magic Link 登录反复失败，应用完全不可用。
- **影响**：macOS 用户被完全阻塞在登录环节，且该 Issue 自 2 月存在至今仍未修复，社区不满情绪明显。

### 3. 💡 高赞需求：允许编程式重命名会话（如自动识别 Ticket ID）
**Issue #29355** | 12 评论 | **82 👍** | [链接](https://github.com/anthropics/claude-code/issues/29355)
- **诉求**：当用户在对话中提及 `TICKET-123` 等编号时，Claude 应自动重命名当前会话；目前仅支持手动 `/rename`，且无 Hook 可触发。
- **价值**：82 个 👍 是本期最高，反映开发者希望将会话管理纳入自动化工作流（如与 Linear 等项目管理工具联动）。

### 4. Remote Control "断开连接"必现报错：读取 `session_url` 属性崩溃
**Issue #77915** | 23 评论 | 4 👍 | [链接](https://github.com/anthropics/claude-code/issues/77915)
- **现象**：关闭远程控制开关时，必现 `Cannot read properties of undefined (reading 'session_url')`，疑似 toggle-off 路径缺少空值守卫。
- **影响**：跨平台（Windows/macOS）远程控制功能的核心路径存在缺陷。

### 5. Linux Cowork 官方构建不支持 yukonSilver，尽管 KVM/vsock 均正常
**Issue #73568** | 14 评论 | 4 👍 | [链接](https://github.com/anthropics/claude-code/issues/73568)
- **现象**：官方 Linux Cowork 构建将 `yukonSilver` 标记为不支持，但用户的 KVM 与 vsock 环境实测通过。
- **影响**：Linux 用户在 Cowork 场景下被无端限制模型选择，疑似检测逻辑误判。

### 6. 浏览器自动化工具（Playwright/Puppeteer）在 Web 沙箱中无法使用
**Issue #11791** | 10 评论 | 16 👍 | [链接](https://github.com/anthropics/claude-code/issues/11791)
- **根因**：Web 沙箱的安全代理不支持 HTTPS CONNECT 隧道，导致浏览器自动化工具完全不可用，属于架构级限制。
- **价值**：16 👍 显示该问题关注度较高，社区呼吁至少补充文档说明，避免用户浪费时间。

### 7. 功能需求：Cowork 与 Claude Chat 的用户状态应统一
**Issue #55842** | 9 评论 | 11 👍 | [链接](https://github.com/anthropics/claude-code/issues/55842)
- **诉求**：Cowork（桌面预览版）与 Claude Chat（Web/iOS/Android）目前数据互为孤岛，希望共享 Memory、文件、技能与连接器。
- **价值**：若实现，将大幅提升多端工作流的连贯性。

### 8. ⚠️ 数据丢失：SSH Remote 重启后 `projects` 字段被置空，历史会话"失忆"
**Issue #63025** | 7 评论 | 5 👍 | [链接](https://github.com/anthropics/claude-code/issues/63025)
- **现象**：桌面客户端连接 SSH Remote 后重启，远端 `~/.claude.json` 的 `projects` 字段被置为 `null`，UI 显示所有会话"无消息"，但 `.jsonl` 日志文件仍完好。
- **严重性**：涉及用户数据完整性与远程开发工作流信任，属高优先级数据丢失类缺陷。

### 9. ❌ 已关闭：Token 用量极度虚高导致"Prompt too long"
**Issue #52646** | 8 评论 | [链接](https://github.com/anthropics/claude-code/issues/52646)
- **现象**：Windows 平台下 Token 计数异常膨胀，导致误报"Prompt too long"，实际上下文远未达到限制。
- **状态**：已关闭（可能已修复或被标记为重复），但历史数据对排查类似问题仍有参考价值。

### 10. 计费异常：无法更新支付方式，账号被误判为 Free
**Issue #80973** | 3 评论 | [链接](https://github.com/anthropics/claude-code/issues/80973)
- **现象**：Max 5x 用户尝试更新支付方式时，连接被切断；官方支持（Fin）后台竟显示账号为 Free 计划。
- **影响**：计费系统与实际订阅状态不同步，可能导致服务中断风险，值得持续关注。

---

## 重要 PR 进展

过去 24 小时仅 2 个 PR 更新，均为插件开发文档改进：

### 1. docs(plugin-dev): 补充 MessageDisplay Hook 使用指南
**PR #83374** | [链接](https://github.com/anthropics/claude-code/pull/83374)
- **内容**：内置 Hook 开发技能文档遗漏了 `MessageDisplay` Hook，本次补充其触发描述、事件说明与快速参考表，并解释流式字段细节。
- **价值**：为插件开发者提供完整的事件类型覆盖，避免因文档缺失导致接入踩坑。

### 2. docs(plugin-dev): 记录 `skipLfs` 市场源配置
**PR #77977** | [链接](https://github.com/anthropics/claude-code/pull/77977)
- **内容**：为 `github` 与 `git` 市场源补充 `skipLfs` 选项文档，并新增 GitHub 简写与通用 Git URL 跳过 LFS 下载的示例。
- **关联**：解决 #63035 提出的文档缺失问题，帮助大仓库用户避免不必要的 LFS 流量消耗。

---

## 功能需求趋势

| 方向 | 代表 Issue | 社区热度 |
|------|-----------|---------|
| **新模型 / Max 权益落地** | #79337（Fable 5 不可用） | 56 评论，21 👍 |
| **认证与账号状态一致性** | #22685（登录循环）、#80973（支付方式异常） | 高 |
| **会话编程式管理** | #29355（自动重命名） | 82 👍（本期最高） |
| **跨端统一状态** | #55842（Cowork 与 Chat 共享上下文） | 中 |
| **平台覆盖与检测优化** | #73568（Linux Cowork 误判） | 中 |
| **浏览器自动化支持** | #11791（沙箱代理限制） | 16 👍 |
| **远程开发可靠性** | #63025（SSH 数据丢失） | 中 |
| **可配置性增强** | #55509（空闲阈值可调）、#55485（NixOS 下 effort 无法修改） | 低 |
| **多 Provider 并行** | #38135（Max + OpenRouter 并存） | 已关闭，但需求真实 |

---

## 开发者关注点

1. **付费权益的确定性**：Max 用户对"订阅了新模型却无法使用，且被静默降级"的现象非常敏感（#79337）。社区期待更透明的模型可用性状态与降级提示（而非静默切换）。
2. **登录与计费的稳定性**：macOS 登录死循环（#22685）持续时间过长，已严重影响日常使用；支付方式更新失败（#80973）则可能进一步引发服务中断。
3. **远程开发的数据安全**：SSH Remote 下 `projects` 字段被置空（#63025）虽不删除日志文件，但 UI 层的"失忆"足以打击用户信任。
4. **自动化工作流被阻塞**：浏览器自动化与沙箱代理的架构冲突（#11791）限制了 Web 环境的工具生态；而高赞的编程式会话重命名（#29355）则表明开发者希望将 Claude Code 深度嵌入现有工程流程。
5. **配置系统的边界情况**：NixOS/home-manager 管理下无法修改 effort（#55485）等特殊环境问题，暴露了配置文件交互的兼容性盲区。

---
*本日报由 AI 辅助整理，数据来源：[github.com/anthropics/claude-code](https://github.com/anthropics/claude-code)，仅反映截取时间点社区动态。*

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex 社区动态日报 — 2026-08-03

## 今日速览

今日 Codex 仓库无新版本发布，社区焦点集中在 **Windows 平台稳定性**（CPU 占用、输入延迟、崩溃）与 **VS Code 扩展体验**（Diff/Review 页面崩溃、空白面板）两大阵营。背后值得注意的是一连串**内部质量重构 PR**——`apply_patch` 执行路径整合、MCP 资源操作去重、rollout 预算单位支持等，表明团队正在集中清理技术债并为新计费/额度模型铺路。

## 版本发布

今日无新版本发布。

## 社区热点 Issues

以下为过去 24 小时内社区讨论度/关注度最高的 10 个 Issue：

### 1. Codex Diff 在 macOS VS Code 中崩溃：“Oops, an error has occurred”
- **Issue**：[#35058](https://github.com/openai/codex/issues/35058)（已关闭）
- **讨论**：49 条评论，122 👍，创建于 07-24，关闭于 08-03
- **摘要**：在 VS Code 中，每次 Codex 编辑文件后打开 “Codex Diff” 标签页即白屏报错，任何仓库均可复现（Apple Silicon + VS Code 1.128.0）。这是近期社区反馈最强烈的扩展问题，现已关闭，说明修复已合入。

### 2. gpt-5.6-luna 被标记为 MultiAgent V1，导致 V2 spawn_agent 拒绝调用
- **Issue**：[#35097](https://github.com/openai/codex/issues/35097)（开放中）
- **讨论**：13 条评论，37 👍
- **摘要**：codex-cli 0.145.0 中，`gpt-5.6-luna` 在模型目录里被标记为 MultiAgent V1，而当前默认的 V2 `spawn_agent` 会拒绝该模型，导致子代理不可用。模型能力标签与运行时之间的不一致，影响所有依赖 subagent 工作流的用户。

### 3. 新增：支持重启单个 MCP 服务器
- **Issue**：[#4955](https://github.com/openai/codex/issues/4955)（开放中）
- **讨论**：9 条评论，23 👍
- **摘要**：开发者在迭代自定义 MCP 服务器时，只能通过重启整个 Codex CLI 才能让改动生效。希望新增 `codex mcp restart <server>` 类工具，避免破坏当前会话。这是 MCP 工作流中长期高票需求。

### 4. Codex 启动后造成 Windows WMI Provider Host 高 CPU 占用
- **Issue**：[#29499](https://github.com/openai/codex/issues/29499)（开放中）
- **讨论**：16 条评论，23 👍
- **摘要**：Codex Desktop 启动后，WMI Provider Host（WmiPrvSE.exe）持续高 CPU，疑似轮询系统信息时未做缓存或退避。影响 Windows 用户整体系统流畅度。

### 5. 线程导航/加载因无界元数据与全量历史 hydration 变慢
- **Issue**：[#21211](https://github.com/openai/codex/issues/21211)（开放中）
- **讨论**：22 条评论，2 👍
- **摘要**：根因之一是 `threads.title` 被写入完整首条用户消息，但更深层的问题是 SQLite 线程列表/导航路径存在无界元数据膨胀、加载时急切 hydration 大量历史数据，导致切换线程卡顿。

### 6. Windows Computer Use 截图失败：SetIsBorderRequired 报 0x80004002
- **Issue**：[#25178](https://github.com/openai/codex/issues/25178)（开放中）
- **讨论**：22 条评论，12 👍
- **摘要**：Windows 10 22H2 下，Computer Use 可列窗口、发键盘指令，但任何截图相关调用都会先触发 `SetIsBorderRequired failed: 不支持此接口`。阻塞依赖截图的自动化闭环。

### 7. Codex Desktop（Windows）导致间歇性全系统输入延迟
- **Issue**：[#28855](https://github.com/openai/codex/issues/28855)（开放中）
- **讨论**：15 条评论，18 👍
- **摘要**：Codex Desktop 打开后，鼠标与键盘出现周期性全局卡顿；日志干净、插件全部禁用仍可复现。重负载场景下其他应用无此问题，疑似 GUI 事件循环或某后台轮询干扰系统输入。

### 8. VS Code Codex 扩展整体变空白
- **Issue**：[#9615](https://github.com/openai/codex/issues/9615)（开放中）
- **讨论**：15 条评论，14 👍
- **摘要**：Windows 11 + VS Code 下，扩展面板（Codex 视图）随机变成全白/全空，需要重载窗口恢复。已被标记为 Papercuts 2026 待办，但四个月仍未关闭，社区开始焦虑。

### 9. MCP OAuth 重新认证成功后，活动会话仍使用过期 refresh token
- **Issue**：[#14144](https://github.com/openai/codex/issues/14144)（开放中）
- **讨论**：11 条评论，13 👍
- **摘要**：执行 `codex mcp login <server>` 重新认证后，当前正在运行的 Codex 会话不会自动切换新 token，仍以 `invalid_grant` 失败，必须重启整个 app/session。属于 MCP 认证体验的关键缺陷。

### 10. Windows Codex App 无法定位安装于非标准盘的 CLI
- **Issue**：[#22672](https://github.com/openai/codex/issues/22672)（开放中）
- **讨论**：9 条评论，13 👍
- **摘要**：当 WSL2 / CLI 安装在非 C 盘时，Codex Windows Desktop 查找 `codex` 可执行文件的路径写死，导致找不到 CLI、自动化功能不可用。多盘 Windows 用户受影响明显。

## 重要 PR 进展

以下为过去 24 小时内更新的 10 个重要 PR：

### 1. 使用服务端报告的 rollout 预算单位计费
- **PR**：[#36715](https://github.com/openai/codex/pull/36715)（已合并）
- **内容**：当 Responses API 在 usage 中返回 `codex_rollout_budget_units` 时，直接以此扣减共享 rollout 预算；服务端未返回时才回退到加权 token 计算。同时拒绝非有限值或负值，防止预算被污染。配合新计费模型的重要改动。

### 2. 从响应 usage 中解析 rollout 预算单位
- **PR**：[#36641](https://github.com/openai/codex/pull/36641)（已合并）
- **内容**：将 Responses API 返回的 `codex_rollout_budget_units` 解析进 `TokenUsage`，但不进入序列化协议、JSON schema 和 TypeScript 类型，保持内部实现细节不外泄。是 #36715 的前置工作。

### 3. 目标变更时保留 SQLite 线程元数据
- **PR**：[#36632](https://github.com/openai/codex/pull/36632)（已合并）
- **内容**：修复设置/清除线程 goal 时，rollout reconciliation 可能覆盖 SQLite 独有的线程元数据（包括线程预览）的问题。改为当 SQLite 已引用同一事件时跳过 reconciliation。避免用户线程信息意外丢失。

### 4. 整合 apply_patch 运行时执行路径
- **PR**：[#36745](https://github.com/openai/codex/pull/36745)（已合并）
- **内容**：将“直接工具调用”与“拦截 shell 命令”两条 apply_patch 路径统一到同一个执行 helper；补丁安全检查现在直接返回可执行调用或拒绝原因。减少逻辑分裂，降低权限与补丁行为不一致的概率。

### 5. 在扩展数据中存储回合技能状态
- **PR**：[#36740](https://github.com/openai/codex/pull/36740)（已合并）
- **内容**：将每回合的 host skills 快照存入 `ExtensionData`，通过 `TurnContext::skills_snapshot` 暴露；隐式技能调用的去重状态也改为回合级惰性持有。对钩子/扩展开发者更友好，状态归属更清晰。

### 6. 去重 MCP resource list 处理
- **PR**：[#36734](https://github.com/openai/codex/pull/36734)（已合并）
- **内容**：`list_mcp_resources` 与 `list_mcp_resource_templates` 共用参数标准化、server 选择、cursor 校验与分页逻辑；用统一的 server-tagged 包装器生成确定性排序结果。减少 MCP 资源列表相关逻辑重复与潜在分页不一致。

### 7. 去重 MCP resource 操作处理
- **PR**：[#36716](https://github.com/openai/codex/pull/36716)（已合并）
- **内容**：新增共享 runner 统一处理 MCP resource 操作的生命周期事件、输出序列化、截断、计时与错误处理；覆盖 list/read/list_templates 三类操作。降低 MCP 资源相关故障的排查成本。

### 8. 将代码模式工具分析与模型响应关联
- **PR**：[#36729](https://github.com/openai/codex/pull/36729)（已合并）
- **内容**：为 code mode 的 `exec` / `wait` 调用发射动态工具调用分析数据，包含耗时与结束状态，并将 code-mode 单元格与嵌套工具调用关联到来源/后续模型响应 ID。显著改善 code-mode 的可观测性。

### 9. 避免在注册期间构建 code-mode 定义
- **PR**：[#36764](https://github.com/openai/codex/pull/36764)（已合并）
- **内容**：检查工具资格与冲突时直接基于已注册工具名派生 code-mode 工具名；跳过不支持的/空的工具规格，不再序列化 schema 或修改描述。降低启动与注册阶段的 CPU/内存开销。

### 10. 简化回合元数据状态所有权
- **PR**：[#36727](https://github.com/openai/codex/pull/36727)（已合并）
- **内容**：`TurnMetadataState` 不再为每个字段包一层 `Arc`，改为整体 `Arc<TurnMetadataState>` 供 Git enrichment 后台任务持有。减少锁粒度、简化生命周期管理。

## 功能需求趋势

从当前 Issue 中可以提炼出社区最关注的四个功能方向：

1. **MCP 生态成熟度（呼声最高）**
   - 按需重启单个 MCP 服务器（[#4955](https://github.com/openai/codex/issues/4955)，23 👍）
   - 重新认证后会话内 token 热切换，无需重启（[#14144](https://github.com/openai/codex/issues/14144)）
   - macOS Desktop 未暴露已启用的 node_repl / 捆绑 Chrome 工具（[#31533](https://github.com/openai/codex/issues/31533)）
   - CLI 端内置 node_repl MCP 启动失败（[#32447](https://github.com/openai/codex/issues/32447)）
   - 社区不再满足于“能用”，而是要求 MCP 具备生产级运维能力（重启、热更新、可观测性）。

2. **Windows 平台体验修复**
   - 高 CPU、输入延迟、路径错误、WSL2 切换失败等系统性 Windows 问题（[#29499](https://github.com/openai/codex/issues/29499)、[#28855](https://github.com/openai/codex/issues/28855)、[#22672](https://github.com/openai/codex/issues/22672)、[#36320](https://github.com/openai/codex/issues/36320)）
   - 趋势判断：Windows 用户占比上升，平台稳定性正成为阻碍采纳的关键短板。

3. **钩子系统“全生命周期”覆盖**
   - 将 TUI 交互提示（“Implement this plan?”、reasoning scope 等）暴露给外部钩子（[#19328](https://github.com/openai/codex/issues/19328)，6 👍）
   - 新增 `TaskCompleted` 事件，表示一次用户请求的端到端完成（[#17333](https://github.com/openai/codex/issues/17333)）
   - 现有 PreToolUse/PostToolUse/Stop 已不够，外部工具需要更完整的会话生命周期信号。

4. **输入方式扩展**
   - 直接向 CLI 粘贴剪贴板图片（[#19143](https://github.com/openai/codex/issues/19143)，6 👍）
   - Gmail connector 支持多个命名账户（[#30418](https://github.com/openai/codex/issues/30418)，5 👍）
   - 多模态输入与多账户连接器逐渐成为自动化场景的标配诉求。

## 开发者关注点

- **Windows 性能是最大痛点**：多条 Windows 独占 issue（WMI CPU 100%、全系统输入延迟、0xc06d007f 崩溃、OneDrive 断连）长期未关闭，涉及版本跨度从 26.506 到 26.727，属系统性回归而不是单版本 bug。
- **VS Code 扩展可靠性存疑**：Diff 页面崩溃（#35058）、Review 页面崩溃（#35362）、整个面板空白（#9615）、跨工作区共享会话列表（#33734）——扩展的 UI 稳定性在过去数月内频繁被投诉，社区对“打开即报错”的容忍度正在下降。
- **会话存储体积失控**：#35458 显示 `~/.codex/sessions` 可达 165 GiB，其中 95% 是 base64 图片；每次 compaction 都会全量重写截图并被子代理 fork 继承。存活性问题比功能问题更隐蔽、更难清理。
- **模型目录数据准确性**：#35097（MultiAgent 版本冲突）、#35581（模型选择器暴露隐藏模型且描述文案错乱）反映社区对模型元数据的敏感度——一旦标签与运行时行为不一致，直接影响用户对模型的信任。
- **第三方模型兼容性仍在早期**：DeepSeek 思考模式下因 `reasoning_content` 缺失导致多轮对话 400（[#24500](https://github.com/openai/codex/issues/24500)），说明自定义模型适配还没形成稳定路径。

> 摘要：今日是“无新版本，但内部迭代密集”的一天。团队合入了一批 MCP 与 apply_patch 的重构、rollout 计费新字段支持，以及线程元数据保留修复。社区情绪上，Windows 性能/崩溃问题与 VS Code 扩展稳定性的持续发酵值得关注，建议尽快发布修复版本以缓解负面反馈。

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI 社区动态日报（2026-08-03）

## 今日速览

今日社区围绕 Agent 稳定性与安全修复展开密集讨论：Nightly v0.55.0 持续迭代，一批针对子代理挂起、OAuth 登录失败、SSRF 漏洞等关键问题的 PR 集中提交。同时，“子代理恢复后误报成功”与“通用 Agent 永久挂起”两大 P1 Issue 仍为社区关注焦点。

## 版本发布

- **v0.55.0-nightly.20260803.gf47d6c6f7**：例行 Nightly 版本，包含近期功能与修复，完整变更见 [Full Changelog](https://github.com/google-gemini/gemini-cli/compare/v0.55.0-nightly.20260802.gf47d6c6f7...v0.55.0-nightly.20260803.gf47d6c6f7)。

## 社区热点 Issues（Top 10）

1. **[#1689] Run blocking/long running shell commands in background**（CLOSED，P2，Bug，24 评论，👍20）  
   用户提交代码时因 GPG/YubiKey 签名导致 CLI 长时间阻塞且难以中止。  
   链接：https://github.com/google-gemini/gemini-cli/issues/1689

2. **[#22323] Subagent recovery after MAX_TURNS is reported as GOAL success**（OPEN，P1，Bug，12 评论）  
   `codebase_investigator` 子代理实际已触及最大轮次限制，却仍报告 `status: "success"`，误导主 Agent 决策。  
   链接：https://github.com/google-gemini/gemini-cli/issues/22323

3. **[#21409] Generalist agent hangs**（OPEN，P1，Bug，8 评论，👍8）  
   任何触发 generalist agent 的简单操作（如创建文件夹）都会永久挂起，用户等待一小时后只能手动取消。  
   链接：https://github.com/google-gemini/gemini-cli/issues/21409

4. **[#28229] OAuth login fails for Google AI Pro users**（OPEN，P1，Security，7 评论，👍4）  
   浏览器端认证成功，但 CLI 登录失败，提示 “This client is no longer supported”。影响 Windows + Google AI Pro 用户。  
   链接：https://github.com/google-gemini/gemini-cli/issues/28229

5. **[#25166] Shell command execution gets stuck with "Waiting input" after command completes**（OPEN，P1，Core，4 评论，👍3）  
   简单 CLI 命令执行完毕后仍显示 “Awaiting user input” 并挂起，复现率高。  
   链接：https://github.com/google-gemini/gemini-cli/issues/25166

6. **[#24353] Robust component level evaluations**（OPEN，P1，EPIC，7 评论）  
   行为评估测试已从零扩展到 76 个，当前目标是覆盖全部 6 个支持的 Gemini 模型，并建立组件级评估体系。  
   链接：https://github.com/google-gemini/gemini-cli/issues/24353

7. **[#22745] Assess the impact of AST-aware file reads, search, and mapping**（OPEN，P2，EPIC，7 评论）  
   探索 AST 感知工具在精确读取方法边界、降低 token 噪声、辅助 codebase 导航方面的价值。  
   链接：https://github.com/google-gemini/gemini-cli/issues/22745

8. **[#21983] Browser subagent fails in Wayland**（OPEN，P1，Browser Agent，4 评论）  
   Wayland 环境下浏览器子代理直接以 “GOAL” 终止，无法完成预期任务。  
   链接：https://github.com/google-gemini/gemini-cli/issues/21983

9. **[#26522] Stop Auto Memory from retrying low-signal sessions indefinitely**（OPEN，P2，Memory，5 评论）  
   Auto Memory 对低信号会话反复重试，浪费 token 且未正确标记为已处理。  
   链接：https://github.com/google-gemini/gemini-cli/issues/26522

10. **[#22093] Subagents running without permission since v0.33.0**（OPEN，P2，Bug，3 评论）  
    用户明确禁用了 Agents 模式，升级后子代理仍被自动调用，涉嫌违反配置预期。  
    链接：https://github.com/google-gemini/gemini-cli/issues/22093

## 重要 PR 进展（Top 10）

1. **[#28642] refactor(core): replace tree-sitter Bash parser with unbash**（P1，Core）  
   移除 WASM 运行时与异步初始化，改用同步 `unbash` 解析器，降低复杂度与依赖体积。  
   链接：https://github.com/google-gemini/gemini-cli/pull/28642

2. **[#28557] fix: resolve SSRF vulnerability in web-fetch.ts by using async DNS resolution**（P1，Security）  
   修复 `isBlockedHost` 仅检查字面 IP、域名可绕过 SSRF 防护的问题。  
   链接：https://github.com/google-gemini/gemini-cli/pull/28557

3. **[#28639] fix(core): guard formatTruncatedToolOutput against non-positive maxChars**（P1，Core）  
   修复 `maxChars <= 0` 时输出被异常放大约 2 倍的回归缺陷。  
   链接：https://github.com/google-gemini/gemini-cli/pull/28639

4. **[#28660] fix(sdk): keep sendStream alive on malformed tool arguments**（SDK）  
   `JSON.parse()` 失败时不再中断流，而是转为结构化 `functionResponse` 错误，提升鲁棒性。  
   链接：https://github.com/google-gemini/gemini-cli/pull/28660

5. **[#28653] fix(cli): make session retention collision-safe**（Agent）  
   会话 ID 碰撞可能导致误删无关对话，此 PR 引入了碰撞安全机制。  
   链接：https://github.com/google-gemini/gemini-cli/pull/28653

6. **[#28655] fix(core): make Whisper model downloads failure-atomic**（Core）  
   中断的 Whisper 下载不再污染最终 `.bin` 文件，避免脏状态。  
   链接：https://github.com/google-gemini/gemini-cli/pull/28655

7. **[#28657] fix(cli): prevent malformed GitHub JSON from crashing extensions**（Extensions）  
   为 `fetchJson()` 增加错误处理，防止截断的 GitHub API 响应导致扩展崩溃。  
   链接：https://github.com/google-gemini/gemini-cli/pull/28657

8. **[#28641] fix(cli): prevent ghost text wrapping infinite loop at narrow widths**（Core）  
   修复窄终端下 CJK/emoji 宽字符引发的死循环。  
   链接：https://github.com/google-gemini/gemini-cli/pull/28641

9. **[#28658] fix(core): don't start voice recording before providers are ready**（Core）  
   确保 Whisper 进程或 Gemini Live socket 就绪后才开始录音，避免无声记录。  
   链接：https://github.com/google-gemini/gemini-cli/pull/28658

10. **[#28640] fix(core): point ProjectIdRequiredError at current auth docs**（P1，Core）  
    修正失效的 `goo.gle` 短链，转向 `geminicli.com` 官方认证文档。  
    链接：https://github.com/google-gemini/gemini-cli/pull/28640

## 功能需求趋势

- **Agent 行为可观测性**：子代理轨迹难以追踪（#22598），Bug 报告不包含子代理上下文（#21763），社区强烈要求端到端可见性。
- **内存系统（Auto Memory）治理**：“低信号会话重试”“redaction 确定性”“非法 patch 隔离” 等系列 Issue（#26516-#26525）表明记忆功能正从 “能用” 走向 “可靠”。
- **AST 感知代码分析**：#22745、#22746 组成的 EPIC 探讨用 AST 工具提升文件读取、搜索与 codebase 映射效率，减少 token 浪费。
- **安全与权限收敛**：OAuth 失败（#28229）、SSRF 修复（#28557）、红action 确定性（#26525）、阻止破坏性命令（#22672）等问题密集出现，安全成为 P1 重点。
- **终端交互体验优化**：窄宽度死循环（#19985/#28641）、resize 闪烁（#21924）、外部编辑器退出后的屏幕刷新（#24935）等细节问题被持续打磨。

## 开发者关注点

- **高优先级痛点**：通用 Agent 永久挂起（#21409）、子代理不遵守 maxTurns 配置（#22267）、运行权限被忽略（#22093）——这些直接影响信任度的问题被反复提及。
- **稳定性回归**：#25166 “命令完成后卡在 Waiting input”、#22466 错误的 `\n` 转义、#22186 get-shit-done 崩溃，用户对回归缺陷容忍度在下降。
- **“工具过多” 的困惑**：超过 128 个工具触发 400 错误（#24246），用户与维护者都期望更智能的工具调度策略。
- **多平台适配**：Wayland 下的浏览器子代理（#21983）、Windows OAuth（#28229）、PowerShell 安装问题（#28447）说明跨平台可靠性仍是短板。

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI 社区动态日报 — 2026-08-03

## 1. 今日速览

今日社区活跃度集中在**多模型支持与 BYOK 切换**（#3282、#3709）和**新模型 gpt-5.6-luna 的 API 可用性问题**（#4337）上，同时新提交的 triage Issue 集中暴露了 ACP 模式、MCP 鉴权、终端渲染等方向的多项待确认缺陷。插件项目级作用域（#1665）虽已关闭，但 14 条评论与 18 个 👍 表明社区对该功能仍有强烈诉求。今日无新版本发布，PR 也无新增。

## 2. 版本发布

过去 24 小时无新版本 Release。

## 3. 社区热点 Issues

共筛选出 10 个值得关注的 Issue，按热度与代表性排序：

- [#3282 支持在 Copilot CLI 中配置多个 BYOK 模型](https://github.com/github/copilot-cli/issues/3282) — 👍 20 / 7 评论。当前单个 BYOK 模型只能通过环境变量注入，用户无法在 TUI 内切换，需重启会话。代表云端/本地多模型用户的普遍痛点，与 #3709 形成呼应。

- [#3709 允许 /model 在单个会话中切换多个模型（含 BYOK/本地 provider）](https://github.com/github/copilot-cli/issues/3709) — 👍 20 / 3 评论。/model 选择器目前仅列出 GitHub 托管模型，本地 BYOK 服务不在候选列表中，用户被迫绑定单一模型。社区诉求明确：增强模型切换灵活度。

- [#4337 gpt-5.6-luna 在 /models 中展示但 /chat/completions 无法调用](https://github.com/github/copilot-cli/issues/4337) — 新建 2 小时即获 2 条评论。新模型只兼容 /responses 端点，破坏依赖 OpenAI 兼容层的 MoA/聚合工具，属模型上线兼容性问题。

- [#1665 支持插件按项目或仓库作用域安装（非仅限用户级）](https://github.com/github/copilot-cli/issues/1665) — 👍 18 / 14 评论。已关闭但讨论充分。目前插件全局加载，无法按仓库隔离，团队协作场景下的插件治理受阻。

- [#1464 技能安装超过 32 个后，按字母序排列靠后的技能不可达](https://github.com/github/copilot-cli/issues/1464) — 👍 7 / 6 评论。系统提示因 token 限制仅展示 32/63 个技能，导致模型无法选中第 36 位的技能。技能数量可扩展性瓶颈问题。

- [#4078 定时提示（/every /after）触发后杀死现有队列](https://github.com/github/copilot-cli/issues/4078) — 5 评论。调度任务执行后不再弹出队列中的下一项，队列静默失效，属会话调度机制的核心缺陷。

- [#4328 WSL2 下 Ctrl+H 被误解为 Ctrl+Backspace（删词而非删字符）](https://github.com/github/copilot-cli/issues/4328) — 1 评论。Windows Terminal 的 WT_SESSION 环境变量干扰按键映射，影响 WSL2 高频用户的编辑体验。

- [#4334 使用 ctrl+S 暂存的提示在切换会话后丢失，pop 恢复为空](https://github.com/github/copilot-cli/issues/4334) — 新提交。stash/pop 机制在会话切换时数据丢失，输入可靠性问题。

- [#4335 ACP 模式下 toolCall.title 显示高层摘要而非可执行的 shell 命令](https://github.com/github/copilot-cli/issues/4335) — 新提交。影响 Zed 等宿主编辑器中的审批弹窗，用户无法预览实际执行命令，存在安全与可用性双重风险。

- [#4346 MCP registry 策略获取在 GitHub Actions 中返回 403，阻塞非默认 MCP 服务器](https://github.com/github/copilot-cli/issues/4346) — 新提交。使用文档推荐的 GITHUB_TOKEN PAT-less 认证时，MCP 注册表策略拉取失败，CI 场景中所有第三方 MCP 服务器不可用。

## 4. 重要 PR 进展

过去 24 小时无新增或更新的 Pull Request。

## 5. 功能需求趋势

从今日全部 23 条 Issue 中提炼出以下五个社区关注方向：

- **多模型与 BYOK 深度整合**：社区强烈希望在一个会话内自由切换 GitHub 托管模型和本地 BYOK 模型（#3282、#3709），并对新模型的公开 API 兼容性提出要求（#4337）。
- **插件作用域与团队协作**：插件不再仅限于用户级全局安装，按项目/仓库隔离（#1665）成为团队落地插件规范的必要能力。
- **会话与输入状态可靠性**：涉及暂存文本丢失（#4334）、取消输入仍被发送（#4336）、定时任务破坏队列（#4078）等问题，核心诉求是「输入即所得」的状态一致性保障。
- **终端渲染与交互体验**：长 Markdown 链接导致表格重排（#4347）、表格渲染劣化（#2412）、URL 超链接断裂（#4348）、对话历史滚动缺失（#4313）等问题集中出现，反映终端 UI 精细化程度尚有提升空间。
- **ACP/MCP 协议完善**：ACP 模式下工具调用元数据信息不足（#4335），MCP registry 在 CI 中鉴权失败（#4346），表明外部工具链集成仍存在协议层缺陷。

## 6. 开发者关注点

- **模型切换成本过高**：更换 BYOK 模型需终止会话并重设环境变量，/model 列表不含本地模型，多模型工作流被割裂。
- **技能数量存在隐性上限**：超过 32 个技能即出现不可达问题，且无提示与规避方案，技能市场生态扩大后问题将更严重。
- **输入编辑与调度机制 Bug 频发**：WSL2 按键映射错误、stash 数据丢失、取消输入仍被处理、定时任务吞队列，影响日常高频操作的可信度。
- **工具链集成可见性不足**：ACP 审批弹窗看不到真实 shell 命令，MCP 在 CI 中无法通过原生 GITHUB_TOKEN 认证，阻塞自动化流程落地。
- **大量 triage 空 Issue**：今日有 3 条无实质内容的 issue 被迅速关闭（#4338、#4339、#4341），说明社区提交质量参差不齐，但也反映维护团队对垃圾 Issue 的响应效率。

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

# Kimi Code CLI 社区动态日报 — 2026-08-03

## 今日速览

今日无新版本发布，但社区围绕**跨会话记忆（Memory System）**与**远程控制（Remote Control）**两大功能需求持续热议，两条历史 Issue 在今日均有活跃讨论。PR 方面有 **9 条更新**，其中 3 条已合并（含 kosong 0.56.0 版本提升）；修复类 PR 集中在编码兼容性、Hook 任务生命周期、Shell 超时等稳定性问题上。

---

## 版本发布

今日无 Kimi Code CLI 新版本发布。不过 PR #2581 已完成 **kosong 依赖 0.56.0 版本提升**，同步更新了发行说明与依赖锁定，属于内部依赖升级，非 CLI 本体发布。

---

## 社区热点 Issues

> 今日更新 Issue 仅 2 条，全部列入。以下数据反映历史创建、今日更新的长期讨论。

### #1283 [Feature Request] Memory System — 跨会话持久上下文
**创建**: 2026-02-27 | **更新**: 2026-08-03 | **评论**: 15 | 👍: 0

**链接**: https://github.com/MoonshotAI/kimi-cli/issues/1283

- **核心诉求**：实现全面的内存系统，让 CLI 能跨会话记住项目模式、用户偏好与上下文，包括 AI 管理的自动记忆和用户定义的手动记忆。
- **为什么重要**：这是 CLI 类工具从"无状态执行器"走向"智能协作体"的关键能力，直击开发者多会话工作流中的痛点。Issue 持续近半年仍在活跃讨论，说明设计复杂度较高、社区方案尚未收敛。
- **社区反应**：15 条评论在长期 Issue 中属于中等偏高水平，讨论焦点可能集中在记忆存储格式、隐私边界与自动/手动记忆的协调机制上。

### #1282 [Feature Request] Remote Control — 从任意设备继续本地会话
**创建**: 2026-02-27 | **更新**: 2026-08-02 | **评论**: 11 | 👍: 24

**链接**: https://github.com/MoonshotAI/kimi-cli/issues/1282

- **核心诉求**：支持通过手机、平板或浏览器远程控制/续接本地 Kimi Code CLI 会话。
- **为什么重要**：👍 24 是当前 Issue 中最高的社区呼声。反映开发者对"离开工位但继续工作"的强烈需求——本地环境保留完整，但访问入口需要移动化。
- **社区反应**：11 条评论 + 24 个赞，属于高关注度功能请求。该项与 #1283 同由 CatKang 提交，两者可能构成"随时随地 + 记忆完整"的移动办公组合场景。

---

## 重要 PR 进展

> 今日更新 PR 共 9 条，其中 3 条已合并（#2581、#2580、#2471），6 条开放中。

### #2577 fix(web,vis): 旧版控制台编码下启动横幅崩溃
**状态**: OPEN | **更新**: 2026-08-03 | **作者**: ayaangazali

**链接**: https://github.com/MoonshotAI/kimi-cli/pull/2577

- **修复内容**：`print_banner` 使用裸 `print()` 输出包含 U+279C 字符的横幅，在 GBK 等旧版控制台编码下直接崩溃。该问题影响中文 Windows 用户（解决 Issue #2532）。
- **重要性**：对中文开发者而言是实质性的可用性修复；问题出在 `web/app.py:374,376` 和 `vis/app.py:128` 两处调用点。

### #2575 fix(hooks): PostToolUse Hook 通过 fire_and_forget_trigger 触发
**状态**: OPEN | **更新**: 2026-08-03 | **作者**: ayaangazali

**链接**: https://github.com/MoonshotAI/kimi-cli/pull/2575

- **修复内容**：`PostToolUse`/`PostToolUseFailure` 原用 `asyncio.create_task()` 触发后立即丢弃句柄，导致后台任务可能被 GC 回收。改为 `fire_and_forget_trigger` 保持引用。解决 Issue #2564。
- **重要性**：Hook 是自动化工作流的核心扩展点，任务被 GC 可能导致 Hook 不执行或行为随机，属隐蔽的并发正确性缺陷。

### #2554 fix(tools): StrReplaceFile 按运行中内容计数替换
**状态**: OPEN | **更新**: 2026-08-03 | **作者**: ayaangazali

**链接**: https://github.com/MoonshotAI/kimi-cli/pull/2554

- **修复内容**：`StrReplaceFile` 成功消息的替换计数基于原始内容而非运行时内容，在多次替换场景下产生误导性反馈。
- **重要性**：小型修复（<100 LOC），但直接影响工具输出正确性，进而影响 Agent 对文件操作结果的判断。

### #2530 fix(shell): 分离子进程持有管道时不再阻塞至超时
**状态**: OPEN | **更新**: 2026-08-03 | **作者**: ayaangazali

**链接**: https://github.com/MoonshotAI/kimi-cli/pull/2530

- **修复内容**：`_run_shell_command` 在检查退出码前先等待 stdout/stderr EOF，导致 `some_daemon & echo done` 类命令因后台进程持有管道而阻塞至超时。解决 Issue #2468。
- **重要性**：影响所有涉及守护进程/后台任务启动的 Shell 操作，属于 API 使用中的常见陷阱，修复后可大幅提升 Shell 工具的稳定性。

### #2507 fix(acp): 信号 QuestionNotSupported 而非返回空答案
**状态**: OPEN | **更新**: 2026-08-03 | **作者**: ayaangazali

**链接**: https://github.com/MoonshotAI/kimi-cli/pull/2507

- **修复内容**：ACP Server 模式中每个 `QuestionRequest` 都以空 dict 解析，导致模型无法区分"用户主动关闭问题"与"服务器不支持"。改为显式信号 `QuestionNotSupported`。解决 Issue #2495。
- **重要性**：ACP（Agent Client Protocol）的模式语义正确性修复。空答案会让模型误判用户行为，影响多 Agent 协作的可靠性。

### #2535 fix(llm): 将 prompt cache key 限定至 Moonshot API
**状态**: OPEN | **更新**: 2026-08-03 | **作者**: Sanjays2402

**链接**: https://github.com/MoonshotAI/kimi-cli/pull/2535

- **修复内容**：第三方 Kimi 兼容端点不再收到 Moonshot 的 `prompt_cache_key` 参数，官方 Kimi/Moonshot API 保留会话缓存。解决 Issue #2534。
- **重要性**：兼容性修复。减少对第三方端点的无效参数传输，同时保留官方 API 的缓存优化能力。

### #2581 chore(release): 提升 kosong 至 0.56.0
**状态**: CLOSED ✅ | **创建/更新**: 2026-08-03 | **作者**: jackfish212

**链接**: https://github.com/MoonshotAI/kimi-cli/pull/2581

- **内容**：升级 kosong 0.56.0，更新发行说明、根依赖锁定，并通过 `check_version_tag.py` 验证。已完成合并。
- **重要性**：常规依赖升级流程，保障版本一致性与可追溯性。

### #2580 fix(kosong): 无 beta 特性时省略空 anthropic-beta 标头
**状态**: CLOSED ✅ | **创建/更新**: 2026-08-03 | **作者**: 7Sageer

**链接**: https://github.com/MoonshotAI/kimi-cli/pull/2580

- **修复内容**：`Anthropic._streamed_request` 原先无条件构建 `anthropic-beta` 标头，当未声明任何 beta 特性时仍发送空标头。已合并。
- **重要性**：源自对 kosong 0.55.0 的验证报告，属于协议合规性小修复。

### #2471 feat(tools): 新增 Monitor 工具，按行流式输出 stdout
**状态**: CLOSED ✅ | **更新**: 2026-08-02 | **作者**: Nitjsefnie

**链接**: https://github.com/MoonshotAI/kimi-cli/pull/2471

- **内容**：新增 `Monitor` 工具，作为现有后台命令工具的流式对应物，支持逐行读取 stdout。功能提案型 PR，无前置 Issue。
- **重要性**：为 Agent 提供了更细粒度的命令输出观测能力，适合日志尾随、进度监控场景。

---

## 功能需求趋势

从当前 Issue（#1282、#1283）和 PR 功能提案（#2471）可以看出社区最集中的功能方向：

1. **跨会话记忆（Memory System）** — 开发者不满足于 CLI 每次"重开一盘棋"，希望工具能积累项目上下文和用户偏好，成为真正的长期协作者。
2. **远程/跨设备会话续接（Remote Control）** — 与记忆系统形成互补，强调"本地环境不变，访问入口扩展"，向移动端/浏览器延伸。
3. **流式输出监控（Monitor Tool）** — 对命令执行过程的可观测性需求增强，要求细粒度、实时的输出反馈。

整体趋势指向：**CLI 从一次性任务执行工具向持续性、可移动、可观测的智能代理平台演进**。

---

## 开发者关注点

结合今日 PR 修复内容，高频痛点集中在以下方面：

- **中文环境兼容性**：控制台编码（GBK）导致启动崩溃（#2577），中文 Windows 用户首当其冲。这与 KiMi CLI 在国内开发者中的使用场景直接相关。
- **后台/异步任务可靠性**：包括 Hook 任务被 GC（#2575）和分离子进程持有管道导致超时（#2530），均涉及异步生命周期管理，说明 CLI 在多任务/长任务场景下需要更稳健的调度。
- **协议语义精确性**：空答案 vs 不支持（#2507）、空标头 vs 无 beta 特性（#2580）、计数 vs 实际内容（#2554），开发者明确希望工具对"无效"和"未支持"做显式区分，而非静默吞掉。
- **第三方模型端点兼容性**：prompt cache key 不应泄漏给非 Moonshot 端点（#2535），反映出多云/多端点部署已是实际使用常态。

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

## OpenCode 社区动态日报 2026-08-03

### 今日速览

今天社区热点集中在 **OpenCode Go 订阅/支付链路故障集中爆发**（支付成功未激活、邀请奖励失效、登录 500 错误等），同时 **Responses API 支持** 与 **模型自动发现** 的需求持续维持高热度。另外，数据安全类问题（/tmp 文件泄漏、历史会话丢失）也引发了较多讨论。

### 社区热点 Issues

#### 1. 自动发现 OpenAI 兼容提供商模型 — #6231
[GitHub Issue #6231](https://github.com/anomalyco/opencode/issues/6231)  
评论 38｜👍 201  
用户希望 LM Studio、Ollama、llama.cpp 等本地 OpenAI 兼容提供商能自动发现模型，避免手动维护 `opencode.json`。目前点赞数最高的 Issue，反映本地模型工作流中配置管理的迫切需求。

#### 2. 隐私与数据收集澄清 — #459
[GitHub Issue #459](https://github.com/anomalyco/opencode/issues/459)  
已关闭｜评论 18｜👍 58  
虽然是关闭的旧 Issue，但依然被持续关注并更新至今日。用户希望官方提供更明确的隐私/数据收集文档，说明隐私透明性仍是长期关心的话题。

#### 3. DeepSeek V4 Flash 突然要求启用中国托管 — #39845
[GitHub Issue #39845](https://github.com/anomalyco/opencode/issues/39845)  
评论 12｜👍 22  
会话中途突然报错，要求显式开启“Enable models hosted in China”才能继续使用 DeepSeek V4 Flash。与订阅服务的区域策略变动有关，引发了较多讨论。

#### 4. 支持 DeepSeek V4 Flash 的 Responses API — #39829
[GitHub Issue #39829](https://github.com/anomalyco/opencode/issues/39829)  
功能需求｜评论 9｜👍 19  
DeepSeek V4 Flash 正式 checkpoint 已原生支持 OpenAI Responses API，用户希望 OpenCode Go 服务同步跟进。

#### 5. v1.15.1+ 导致 Bun 安装失败 — #27906
[GitHub Issue #27906](https://github.com/anomalyco/opencode/issues/27906)  
评论 21｜👍 13  
v1.15.1 起需要 postinstall 生命周期脚本，但 Bun 默认阻止全局包的 postinstall 执行，导致 Bun 用户无法完成安装。安装器兼容性问题影响面较大。

#### 6. 延迟队列功能需求 — #5408
[GitHub Issue #5408](https://github.com/anomalyco/opencode/issues/5408)  
功能需求｜评论 21｜👍 28  
用户希望在循环工作流中支持延迟队列，以复用上下文、持续捕获学习成果并迭代更新方案。评论和点赞都较高，说明自动化迭代场景有真实需求。

#### 7. 订阅 OpenCode Go 后套餐未生效 — #40234
[GitHub Issue #40234](https://github.com/anomalyco/opencode/issues/40234)  
评论 10  
用户订阅成功后收到邮件，但页面仍显示“请订阅”，并报错 `No payment method`。今日新开 Issue，已有 10 条评论，属于高频问题。

#### 8. /tmp 临时 .so 文件泄漏 — #28089
[GitHub Issue #28089](https://github.com/anomalyco/opencode/issues/28089)  
评论 8｜👍 8  
OpenCode 会在 /tmp 下生成临时 ELF .so 文件但从不清理，随时间累积可消耗上百 GB 磁盘空间。属于严重的资源泄漏问题。

#### 9. OpenCode Zen 模型全部返回 AuthError — #39827
[GitHub Issue #39827](https://github.com/anomalyco/opencode/issues/39827)  
评论 7｜👍 4  
所有 Zen 模型（付费和免费）均返回 `Request blocked by upstream provider`，但各厂商直接 API Key 工作正常，疑似 Zen 服务端故障。

#### 10. 连续更新后关键数据丢失 — #39560
[GitHub Issue #39560](https://github.com/anomalyco/opencode/issues/39560)  
评论 4｜👍 1  
几小时内连续安装 3 个更新后，会话、历史记录、插件与提供商配置全部消失。属于高严重性数据安全事件。

### 重要 PR 进展

#### 1. 统一市场（Unified Marketplace）— #40108
[GitHub PR #40108](https://github.com/anomalyco/opencode/pull/40108)  
新功能｜2026-08-02  
实现统一包模型，并为 Desktop、Web、TUI、CLI、API 客户端提供共享运行时，是重大架构级改进。

#### 2. 请求级 chat.model 插件钩子 — #40188
[GitHub PR #40188](https://github.com/anomalyco/opencode/pull/40188)  
新功能｜2026-08-02  
新增 request-scoped 的 `chat.model` 钩子，插件可在单次请求中替换模型，在 provider/model/auth 解析之前生效，并关联解决 #18793、#24006。

#### 3. 手动刷新模型列表 — #40303
[GitHub PR #40303](https://github.com/anomalyco/opencode/pull/40303)  
新功能｜2026-08-03  
为 TUI 增加 `POST /provider/refresh` 端点，强制刷新模型目录，绕过 60 分钟自动调度。

#### 4. 中文语言支持 — #40297
[GitHub PR #40297](https://github.com/anomalyco/opencode/pull/40297)  
新功能｜2026-08-03  
为 TUI 添加简体中文 locale 支持，并支持从 `LC_ALL`、`LANG` 等环境变量推断语言设置。

#### 5. 子代理模型分配功能 — #17570
[GitHub PR #17570](https://github.com/anomalyco/opencode/pull/17570)  
新功能｜已关闭  
允许用户通过配置和 UI 为 subagent 指定专属模型，弥补子代理模型选择灵活性的缺失。

#### 6. 修复 GPT-5.5/5.6 与 Azure 组合问题 — #40265
[GitHub PR #40265](https://github.com/anomalyco/opencode/pull/40265)  
Bug 修复｜2026-08-03  
修复了 GPT-5.5+ 在 Azure 上使用 `reasoningEffort` 参数时的兼容性故障。

#### 7. 子会话级联归档 — #40273
[GitHub PR #40273](https://github.com/anomalyco/opencode/pull/40273)  
Bug 修复｜2026-08-03  
归档父会话时递归归档所有子会话（相同时间戳），避免父会话归档后仍残留活跃子会话。修复 #40258。

#### 8. 急切索引子会话 — #40274
[GitHub PR #40274](https://github.com/anomalyco/opencode/pull/40274)  
Bug 修复｜2026-08-03  
将 `session.created` 加入 TUI 会话元数据 upsert 路径，防止延迟的会话列表响应影响子会话元数据展示。

#### 9. 位置标签中显示当前分支 — #40289
[GitHub PR #40289](https://github.com/anomalyco/opencode/pull/40289)  
新功能｜2026-08-03  
通过 V2 API 暴露 location-scoped 的 VCS 分支信息，在提示符位置标签和侧边栏中展示 `path:branch`。

#### 10. Diff 查看器优化 — #40285
[GitHub PR #40285](https://github.com/anomalyco/opencode/pull/40285)  
新功能｜2026-08-03  
优化 diff 查看器视觉体验：调整增删 token 配色、左侧栏宽度减至 2px、移除红条虚线纹理、改进行号列对齐。

### 功能需求趋势

- **Responses API 支持**：多个 Issue 要求 OpenCode Go 服务适配新版模型的 Responses API（#39829、#23655），是当前最集中的模型能力需求。
- **模型/提供商管理**：模型自动发现（#6231）、手动刷新模型列表（#40303）、子代理模型指定（#17570）。
- **可观测性增强**：上下文仪表盘展示缓存/新鲜 token 分解（#34298、#40291）、debug info 显示优化（#40300）。
- **会话管理改进**：手动 todo 管理（#38550）、子会话级联归档（#40273）、延迟队列（#5408）。
- **本地化与集成**：TUI 中文支持（#40297）、VS Code 完成通知（#39936）、OAuth 设备流（#40246）。

### 开发者关注点

- **订阅/支付链路稳定性（今日最大痛点）**：支付成功后订阅未激活、控制台 500 错误、邀请奖励失效等问题集中出现（#40234、#40236、#40256、#40283、#40295、#40281）。
- **数据安全与泄漏**：连续更新导致历史数据全部丢失（#39560）、/tmp 下 .so 文件长期无清理机制（#28089）。
- **安装兼容性**：Bun 等非 npm 包管理器在 v1.15.1+ 无法安装（#27906）。
- **区域/合规限制**：DeepSeek 中国托管区域要求（#39845）、欧盟工作区 OAuth 拒绝 GPT-5.6 模型（#40243）。
- **服务稳定性**：Zen 模型全量不可用（#39827）、请求队列 503（#40254）。

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code 社区动态日报 — 2026-08-03

## 今日速览

v0.21.4 正式发布，Web Shell 升级为具备原生生命周期管理和自动更新的桌面级应用；社区围绕「取消操作体验」「长会话缓存失效」「MCP 工具可靠性」等方向集中反馈了多个 P1/P2 缺陷。同时，Agent 运行时确定性与多渠道集成成为新的功能探索热点。

## 版本发布

### [v0.21.4](https://github.com/QwenLM/qwen-code/releases/tag/v0.21.4)
- Web Shell 升级为 release-ready 桌面应用：支持原生生命周期管理、单实例行为和自动更新（[#8132](https://github.com/QwenLM/qwen-code/pull/8132)）。
- Web Shell 历史分页机制改进：可优雅处理超大回合（oversized turns）的展示。

### [v0.21.3-nightly.20260803.e1e5b42ce](https://github.com/QwenLM/qwen-code/releases/tag/v0.21.3-nightly.20260803.e1e5b42ce)
- 完善 TUI 键盘快捷键参考文档（[#8327](https://github.com/QwenLM/qwen-code/pull/8327)）。
- 修复 core 中历史分页被阻塞的问题。

## 社区热点 Issues

### 1. 确定性工具执行边界 —— 可信 Agent 运行时提案（[#8102](https://github.com/QwenLM/qwen-code/issues/8102)）
- **标签**: P3 / feature-request / core / security
- **动态**: 11 条评论，持续讨论中
- **看点**: 提议将语言模型置于信任边界之外，由运行时对模型产生的动作进行确定性约束、授权、观测和评估，是社区对 Agent 安全性的重要长期方向。

### 2. Windows 桌面版会话静默自动删除（[#8400](https://github.com/QwenLM/qwen-code/issues/8400)）
- **标签**: P1 / bug / session-management / Windows
- **动态**: 3 条评论，更新于今日
- **看点**: Desktop v0.0.5 在重启后因 `session/load` 失败（工作区 cwd 不匹配）导致所有会话无确认即被本地镜像删除，是当前最高严重级别的数据安全问题。

### 3. 取消提示后输入内容丢失（[#8316](https://github.com/QwenLM/qwen-code/issues/8316)）
- **标签**: P3 / bug
- **动态**: 7 条评论
- **看点**: Ctrl+C 取消 Agent 思考后，已输入的长提示词不恢复到输入框，用户被迫重新输入，是高频打断场景下的明显体验缺陷。

### 4. 重复 provider tool call id（[#8382](https://github.com/QwenLM/qwen-code/issues/8382)）
- **标签**: P2 / bug / core / session-management
- **动态**: 6 条评论
- **看点**: 工具调用因 "Duplicate provider tool call id" 反复失败，影响长时间会话中的工具执行稳定性。

### 5. 微压缩反复失效 prompt 缓存（[#8452](https://github.com/QwenLM/qwen-code/issues/8452)）
- **标签**: P2 / bug / performance / caching
- **动态**: 3 条评论，更新时间今日
- **看点**: 超过 500K 字符阈值后，工具结果清理进入滚动重写稳态，导致 provider 侧 prompt 缓存被持续击穿；同主题另有一条目 [#8463](https://github.com/QwenLM/qwen-code/issues/8463) 追踪，说明该问题在长会话中影响显著。

### 6. Bailian Token Plan 模型列表不同步（[#8432](https://github.com/QwenLM/qwen-code/issues/8432)）
- **标签**: P2 / bug / authentication / model-switching
- **动态**: 4 条评论，状态 ready-for-human
- **看点**: `/auth` 内置模型列表与 Bailian 个人版 Token Plan 控制台不一致，且图像/视频生成不可用。

### 7. Warp 下 @ 补全标签切换被终端快捷键拦截（[#8330](https://github.com/QwenLM/qwen-code/issues/8330)）
- **标签**: P2 / bug / UI / keybindings
- **动态**: 4 条评论
- **看点**: Ctrl+Tab 在 Warp 中被终端占用，导致 `@` 补全弹窗多分类切换不可用，属于终端适配类问题。

### 8. SDK 嵌入式 MCP 服务在恢复会话后失效（[#8433](https://github.com/QwenLM/qwen-code/issues/8433)）
- **标签**: P2 / bug / MCP / SDK
- **动态**: 3 条评论
- **看点**: 首次查询正常，恢复会话后后续 MCP 工具调用全部失败，集成稳定性问题需尽快定位。

### 9. Email 渠道支持（IMAP/SMTP）（[#8281](https://github.com/QwenLM/qwen-code/issues/8281)）
- **标签**: P3 / feature-request / integration
- **动态**: 5 条评论
- **看点**: 社区提出通过独立邮箱与 Qwen Code Agent 通信的官方渠道需求，属于多渠道接入方向的基础能力。

### 10. Agent 思维展示体验差（[#8319](https://github.com/QwenLM/qwen-code/issues/8319)）
- **标签**: P2 / bug / UI / rendering
- **动态**: 3 条评论
- **看点**: 思维面板因动态尺寸而上下跳动，影响非思维内容的阅读，是当前交互 UI 的主要视觉痛点。

## 重要 PR 进展

### 1. [feat(workflows): 协作式暂停与恢复](https://github.com/QwenLM/qwen-code/pull/8320)
为 Dynamic Workflows 引入调度器级别的暂停/恢复机制：暂停时停止新任务分发，允许在途任务收敛并保持在闸门处，直到恢复。适合长时间多 Agent 协作的精细控制场景。

### 2. [feat: 从任意对话节点 Fork](https://github.com/QwenLM/qwen-code/pull/8274)
改进会话分支能力：不再局限于最新状态，可将任意一条 Assistant 消息作为分支起点，并妥善处理工具调用、取消、元数据等复杂情况。

### 3. [feat(cli): 终端内联图片渲染](https://github.com/QwenLM/qwen-code/pull/8305)
将终端图片基础设施从工作区文件预览扩展到模型与工具的 `inlineData`，在交互式 CLI 中按序保留文本与图片片段。

### 4. [feat(cli): 附件音频桥接](https://github.com/QwenLM/qwen-code/pull/8332)
当主模型不支持音频时，通过批量语音模型将用户 `@` 附件及 ACP 音频 prompt 转写为文本，并标记为不可信机器转写内容，补齐多模态输入能力。

### 5. [feat(core): 压缩缓存共享扩展到 OpenAI 兼容 Provider](https://github.com/QwenLM/qwen-code/pull/8418)
将 prefix-preserving 缓存共享路径从 DashScope 推广到所有 OpenAI 兼容协议 provider，以提高兼容端点的压缩效率与缓存命中率。

### 6. [feat(core): 支持 Qwen 3.8 reasoning effort](https://github.com/QwenLM/qwen-code/pull/8472)
将现有 `/effort` 的五个档位透传为 `qwen3.8-max` / `qwen3.8-max-preview` 的 `reasoning_effort` 参数，新模型接入紧随发布节奏。

### 7. [fix(cli): 流式输出中支持点击展开/折叠思维块](https://github.com/QwenLM/qwen-code/pull/8443)
移除思维块在 pending 状态下禁用手势的限制，模型流式思考过程中即可点击展开或收拢，改善阅读体验。

### 8. [fix(cli): ESC 优先取消进行中的工作](https://github.com/QwenLM/qwen-code/pull/8353)
调整 ESC 按键优先级：Agent 正在响应时，ESC 全局取消请求优先于输入框弹队列逻辑，符合「先停再退出」的用户直觉。

### 9. [fix(serve): 跨文件检测行尾符](https://github.com/QwenLM/qwen-code/pull/8383)
修复读取文本时从「返回切片」而非整个文件推断 `lineEnding` 的问题，避免对含单个 CRLF 行的切片误判为 LF，确保行尾处理正确。

### 10. [feat(web-shell): 侧边栏暴露渠道会话](https://github.com/QwenLM/qwen-code/pull/8457)
Web Shell 项目会话列表增加 Tasks / Channels 切换，可分类查看钉钉、飞书、企微等集成渠道发起的会话，保持刷新状态下所选分类不丢失。

## 功能需求趋势

- **可信 Agent 运行时**: [#8102](https://github.com/QwenLM/qwen-code/issues/8102) 将 LLM 置于信任边界之外、对工具执行进行确定性约束与审计，成为安全方向的顶层设计提案。
- **多渠道集成**: 除已有 IM 渠道外，Email（IMAP/SMTP）被提上议程（[#8281](https://github.com/QwenLM/qwen-code/issues/8281)），Web Shell 侧边栏也在为多渠道会话做界面准备（[#8457](https://github.com/QwenLM/qwen-code/pull/8457)）。
- **会话管理深度增强**: 从任意节点 fork（[#8274](https://github.com/QwenLM/qwen-code/pull/8274)）、Plan & Review 工作流（[#8389](https://github.com/QwenLM/qwen-code/issues/8389)）、协作式暂停恢复（[#8320](https://github.com/QwenLM/qwen-code/pull/8320)）等方向持续推进。
- **性能与缓存优化**: 长会话缓存失效（[#8452](https://github.com/QwenLM/qwen-code/issues/8452)）、工具输出预算（[#7306](https://github.com/QwenLM/qwen-code/issues/7306)）是当前性能焦点。
- **新模型快速支持**: Qwen 3.8 reasoning effort（[#8472](https://github.com/QwenLM/qwen-code/pull/8472)）、Bailian 模型列表同步（[#8432](https://github.com/QwenLM/qwen-code/issues/8432)）表明社区对新模型接入的时效性要求较高。
- **终端 UI/UX 打磨**: 流式思维块交互（[#8443](https://github.com/QwenLM/qwen-code/pull/8443)）、终端兼容性（[#8385](https://github.com/QwenLM/qwen-code/issues/8385)）、快捷键冲突（[#8330](https://github.com/QwenLM/qwen-code/issues/8330)）等细节改进密集。

## 开发者关注点

- **取消/中断行为一致性**: 取消后输入内容不恢复（[#8316](https://github.com/QwenLM/qwen-code/issues/8316)）、`APIUserAbortError` 未被 `isAbortError` 识别导致错误分类（[#8398](https://github.com/QwenLM/qwen-code/issues/8398)）、中止后后续轮次不写入会话记录（[#8356](https://github.com/QwenLM/qwen-code/issues/8356)）——中断路径的体验和语义有待统一。
- **会话数据安全**: 桌面端会话静默删除（[#8400](https://github.com/QwenLM/qwen-code/issues/8400)）引发对本地会话镜像持久化与异常降级逻辑的关注。
- **MCP 工具稳定性**: 重复 tool call id（[#8382](https://github.com/QwenLM/qwen-code/issues/8382)）与 SDK 嵌入式 MCP 会话恢复后失效（[#8433](https://github.com/QwenLM/qwen-code/issues/8433)）是集成场景的主要摩擦点。
- **长会话缓存命中率**: 微压缩导致缓存反复失效（[#8452](https://github.com/QwenLM/qwen-code/issues/8452)）直接影响使用 OpenAI 兼容 provider 的长会话成本与速度，开发者高度敏感。
- **Windows 终端兼容性**: ConEmu/Cmder 下整体输出闪烁（[#8385](https://github.com/QwenLM/qwen-code/issues/8385)）、桌面客户端无法引用正确文件（[#8123](https://github.com/QwenLM/qwen-code/issues/8123)）等跨平台问题仍需持续适配。

</details>

---
*本日报由 [agents-radar](https://github.com/huang-yi-dae/agents-radar) 自动生成。*