# AI CLI 工具社区动态日报 2026-08-17

> 生成时间: 2026-08-17 01:03 UTC | 覆盖工具: 7 个

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

## AI CLI 工具横向对比分析报告（2026-08-17）

---

### 1. 生态全景

AI CLI 工具已从"单点代码辅助"演进为覆盖编码、审查、CI/CD、多智能体协作的完整开发平台，但整体仍处于快速迭代期。今日各工具动态呈现三个显著特征：一是**稳定性问题集中爆发**——会话挂起、配额消耗异常、沙箱不可用、Windows 平台兼容性等基础能力缺陷频繁被报告；二是**多智能体与子代理可靠性成为共同痛点**——Gemini、Qwen、Claude Code 均在处理代理误报成功、任务分发失效、权限绕过等问题；三是**安全与合规诉求上升**——包括沙箱隔离、PAT 凭据保护、GitHub 集成最小权限、敏感信息脱敏等，企业级采用的门槛正在被社区明确表达。

---

### 2. 各工具活跃度对比

| 工具 | 热点 Issues 数 | 重要 PR 数 | Release 情况 | 社区热度信号 |
|---|---|---|---|---|
| **Claude Code** | 10 | 3 | 无新版本 | 会话限额异常 13+ 独立报告；最高 👍 22 |
| **OpenAI Codex** | 10 | 10 | 无新版本 | Windows 卡顿 Issue 累计 106 评论、85 👍 |
| **Gemini CLI** | 10 | 10 | v0.56.0-nightly | SSR Agent 批量修复中；P1 级 Bug 集中于子代理 |
| **GitHub Copilot CLI** | 10 | 1（无关） | 无新版本 | 1.0.80 引入多处回归；PR 活动近乎停滞 |
| **Kimi Code CLI** | 4 | 3 | 无新版本 | 社区规模较小，长期痛点待解决 |
| **OpenCode** | 10 | 10 | 无新版本 | Ctrl+C 冲突 49 👍；付费模型故障高关注 |
| **Qwen Code** | 10 | 10 | v0.21.11-nightly | 多智能体 Bug 集中且修复快；P1 安全 Issue 1 个 |

---

### 3. 共同关注的功能方向

| 功能方向 | 涉及的工

---

## 各工具详细报告

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills 社区热点报告（数据截止 2026-08-17）

---

## 1. 热门 Skills 排行

| # | Skill | 功能说明 | 社区讨论热点 | 状态 |
|---|-------|---------|-------------|------|
| 1 | **skill-creator 修复**（PR #1298） | 修复 run_eval.py 恒报 0% recall 的问题——安装 eval artifact 为真实 skill、修复 Windows 流读取、触发检测和并行 worker | 评价循环在针对噪声优化，多个独立复现确认；与 Issue #556、#1419 联动 | Open |
| 2 | **document-typography**（PR #514） | 生成文档的排版质量控制：孤儿词换行、寡行段落（标题滞留页底）、编号错位 | AI 生成文档普遍存在的排版问题，用户很少主动提出但影响交付质量 | Open |
| 3 | **ODT skill**（PR #486） | OpenDocument 文本创建、模板填充、ODT 转 HTML | 追求开源/ISO 标准格式的用户需求，与现有 DOCX/PDF skill 形成互补 | Open |
| 4 | **frontend-design 改进**（PR #210） | 修订前端设计 skill，提升指令清晰度与可执行性，确保每条指令可在单次对话内被 Claude 执行 | 评论持续活跃 2 个月，社区高度关注 skill 指令的可操作性 | Open |
| 5 | **skill-quality-analyzer + skill-security-analyzer**（PR #83） | 两个元技能：质量分析（结构/文档/示例/资源五维评估）与安全分析 | 与新安全 Issue #492（信任边界滥用）形成呼应，早期提交但长期活跃 | Open |
| 6 | **testing-patterns**（PR #723） | 全栈测试模式：Testing Trophy 模型、单元测试 AAA 模式、React 组件测试、边界用例 | "测什么 vs 不测什么"的哲学讨论 + 具体技术栈实践 | Open |
| 7 | **ServiceNow 平台 skill**（PR #568） | ServiceNow 全平台助手：ITSM/ITOM/ITAM/SecOps/FSM/HR 等模块 | 跨度极大，社区关注平台类 skill 的覆盖面与深度平衡；活跃期超 5 个月 | Open |
| 8 | **self-audit**（PR #1367） | 交付前审计：机械文件验证 + 四维推理质量门控（按损害严重度排序） | 与 Issue #1385 的推理质量门控管线提案联动，代表质量保障方向 | Open |

---

## 2. 社区需求趋势（来自 Issues）

1. **安全与信任边界**（#492，43 评论）——社区技能在 `anthropic/` 命名空间下分发造成信任边界滥用，用户可能误授权限给"看起来官方"的社区 skill。这是当前最受关注的安全议题。
2. **组织级 Skill 共享**（#228，16 评论，8 👍）——用户不需要下载 .skill 文件再手动上传，期望直接的组织内共享链接/库。
3. **eval 工具链可靠性**（#556，#1419）——skill-creator 的触发评估恒报 0% recall，社区贡献者持续投入修复，反映元工具（skill 开发工具）的稳定性备受关注。
4. **上下文窗口优化**（#1487，#189，#1329）——claude-api skill 单次注入 ~156k tokens 耗尽上下文；重复安装导致重复 skill 占用窗口；compact-memory（符号化紧凑状态表示）是社区自发提出的解决方案。
5. **技能生命周期管理**（#1417 衍生 PR #1479）——规划产物无限积累、无生命周期管理，社区提出 plan-file-hygiene skill。
6. **治理与安全模式**（#412，#1175）——AI agent 系统的策略执行、威胁检测、信任评分、审计追踪；同时关注 SKILL.md 中直接编写访问控制的安全隐患。

---

## 3. 高潜力待合并 Skills（评论活跃但未合并）

| PR | Skill | 潜力分析 |
|----|-------|---------|
| [#1298](https://github.com/anthropics/skills/pull/1298) | skill-creator eval 全面修复 | 社区贡献者多次提交（#1099、#1050 等均指向同一问题），一旦合并将解锁 skill-creator 的真正可用性 |
| [#568](https://github.com/anthropics/skills/pull/568) | ServiceNow 平台 skill | 活跃 5 个月+，覆盖企业级平台全景，如合并将显著扩展企业场景 |
| [#1367](https://github.com/anthropics/skills/pull/1367) | self-audit（推理质量门控） | 代表"质量保障"新方向，与 #1385 提案形成完整管线 |
| [#723](https://github.com/anthropics/skills/pull/723) | testing-patterns | 开发刚需，覆盖面广，社区讨论度高 |
| [#525](https://github.com/anthropics/skills/pull/525) | pyxel（复古游戏开发） | 绑定 pyxel-mcp，利基但增长潜力大，作者为 Pyxel 引擎作者（kitao），可信度高 |
| [#514](https://github.com/anthropics/skills/pull/514) | document-typography | 解决所有 AI 生成文档的普遍问题，涉及文档类 skill 的整体质量提升 |

---

## 4. Skills 生态洞察

**社区最集中的诉求是"Skill 基建的可靠性、安全性和生命周期管理"**——即社区不再只关心单个 skill 的功能增量，而是转向关注 skill 的评估工具链（eval 准确性）、分发安全（信任边界）、上下文效率（token 注入）与版本治理（重复/过期/生命周期），标志 Skills 生态正从"内容扩张期"进入"工程化治理期"。

---

# Claude Code 社区动态日报

**2026-08-17**


## 今日速览

今日 Claude Code 无新版本发布，社区焦点集中在 **Fable 5 模型行为异常**（#66960）与 **会话限额消耗异常** 两大问题上。后者已有超过 13 条独立报告（如 #83042、#82911、#83910 等），且多数用户反馈"未主动发送消息却耗尽 5 小时窗口"，属于当前最热门的疑似计费/用量计算 Bug。此外，社区涌现约 10+ 条关于 `AskUserQuestion` 工具 60 秒超时不可配置的重复请求，官方尚未作出明确回应。


## 社区热点 Issues（共 10 条）

### 1. Fable 5 静默运行 16 分钟后才向用户提问，且涉及从未共享的发现 —— 事件响应场景下表现极差
**Issue #66960** | 状态：OPEN | 评论：15 | 👍 22
- **摘要**：在高风险事件响应会话中（第三方 AI 代理未经授权破坏了宿主上的多仓库工作区），Fable 5 长时间静默执行工具调用（长达 16 分钟），之后才通过 `AskUserQuestion` 询问用户关于**从未向用户展示过**的发现。作者认为模型没有在关键决策点及时同步上下文。
- **社区反应**：评论数最高，22 个 👍 表明大量用户遭遇过类似"黑盒"行为。
- **链接**：https://github.com/anthropics/claude-code/issues/66960

### 2. macOS 沙箱完全不可用：`sandbox-exec -p` 内联 Seatbelt 配置超过 ARG_MAX
**Issue #73468** | 状态：OPEN | 评论：8 | 👍 5
- **摘要**：在 macOS 上，启用沙箱后**所有** Bash 命令（包括 `printf ok`）均失败，报错 `E2BIG: argument list too long`。原因是 Seatbelt 配置以命令行参数形式内联传递，在存在大量 git worktree 时超出系统参数长度限制，导致沙箱 100% 不可用。
- **社区反应**：标注 `has repro`，影响面大，已有 5 人赞同。
- **链接**：https://github.com/anthropics/claude-code/issues/73468

### 3. 后台代理自动 commit / push / 创建 PR 无法关闭（v2.1.198 引入）
**Issue #73197** | 状态：OPEN | 评论：3 | 👍 5
- **摘要**：v2.1.198 起，后台代理在 worktree 中完成代码工作后**默认**自动 commit、push 并开启 draft PR。对于只希望生成建议（propose-only）的工作流，该默认行为可能导致意外推送，且目前没有开关可以禁用。
- **社区反应**：5 人赞同，安全/合规敏感团队尤其关注。
- **链接**：https://github.com/anthropics/claude-code/issues/73197

### 4. 空闲会话无新提示词，Claude Code 用量持续增长
**Issue #82744** | 状态：OPEN | 评论：3
- **摘要**：用户发现一个已打开的会话在**完全没有新提示词**的情况下，token 用量仍然持续增加，怀疑存在后台活动（如自动上下文刷新、缓存重读）消耗配额。
- **社区反应**：与今日大量"会话限额耗尽"报告高度关联，可能指向同一个底层问题。
- **链接**：https://github.com/anthropics/claude-code/issues/82744

### 5. `/permissions` 菜单方向键导航失效（v2.1.221，macOS）
**Issue #87224** | 状态：OPEN | 评论：1 | 创建于 2026-08-17
- **摘要**：`/permissions` 界面可以渲染，但箭头键无法移动高亮，导致无法选择规则或触达 "Add a new rule…"。作者确认这是 **#57659 的仍然活跃的复现**（#57659 因陈旧被关闭为 NOT_PLANNED）。
- **社区反应**：今日新提交，说明旧问题并未真正修复。
- **链接**：https://github.com/anthropics/claude-code/issues/87224

### 6. Claude GitHub 集成需要"仅组织安装"模式，不得访问所选应用安装之外的仓库
**Issue #72856** | 状态：OPEN | 评论：3
- **摘要**：用户要求 GitHub 集成支持仅限组织级安装（org-installation-only），并严格限制在用户显式选定的应用安装范围内访问仓库，防止越权访问其他仓库代码。
- **社区反应**：安全相关的合规需求，企业用户关注。
- **链接**：https://github.com/anthropics/claude-code/issues/72856

### 7. 压缩后无参数 "mode"  skill 被错误重新激活
**Issue #72549** | 状态：OPEN | 评论：2
- **摘要**：上下文压缩（compaction）后，用户在会话中手动关闭的无参数 "mode" skill 因摘要中未保留该禁用状态，被系统重新读取为活跃状态，导致行为与用户预期不符。
- **社区反应**：与已关闭的 #50724 等同类问题相关，但这是无参数变体的首次单独报告。
- **链接**：https://github.com/anthropics/claude-code/issues/72549

### 8. CLI 默认不显示当前项目/代码库身份，多项目会话难以区分
**Issue #73162** | 状态：OPEN | 评论：1
- **摘要**：在同一个 PC 上同时运行多个 Claude Code 会话（每项目一个终端）时，提示区域默认不显示项目身份，切换窗口后很难分辨当前会话属于哪个项目。
- **社区反应**：标注 `stale` 但仍开放，属于长期未解决的使用体验问题。
- **链接**：https://github.com/anthropics/claude-code/issues/73162

### 9. Plan mode + 跳过权限（bypass）：auto-mode 分类器的 "allow" 判定应自动批准只读命令
**Issue #73176** | 状态：OPEN | 评论：1 | 👍 1
- **摘要**：通过 `claude --allow-dangerously-skip-permissions --permission-mode plan` 启动的会话，在 plan 模式下过去可以静默执行只读/分析类 Bash 命令，再在计划被接受时提供权限跳过。2.1.198 起，plan 启动的会话激活了 auto-mode 分类器，导致行为改变。
- **社区反应**：工作流回归问题，自动化重度用户关注。
- **链接**：https://github.com/anthropics/claude-code/issues/73176

### 10. 用户在 Pro 订阅下无法使用 Claude Code
**Issue #63685** | 状态：CLOSED | 评论：9
- **摘要**：用户反馈已付费但无法访问，收到错误提示 "Your organization has disabled Claude subscription access for Claude Code · Use an Anthropic API key instead"。多条类似反馈集中在订阅权限识别问题上。
- **社区反应**：虽然已关闭，但评论较多，说明有较多用户遇到订阅鉴权问题。
- **链接**：https://github.com/anthropics/claude-code/issues/63685


## 重要 PR 进展（共 3 条）

### 1. [OPEN] 修复安全规则中 `**` glob 模式不匹配零深度路径的问题
**PR #87079** | 创建：2026-08-16
- **内容**：`_glob_match` 委托给 `fnmatch`，其中单独的 `*` 已可跨越 `/`，导致 `**/*.ts` 需要字面 `/`，从而**静默遗漏**顶层文件（如 `tsconfig.json`）不被 security-patterns.json 规则覆盖。文档承诺 "** matches any depth"，实际行为与之矛盾。由于是安全规则，该失败模式是**静默不生效**，可能造成安全隐患。
- **链接**：https://github.com/anthropics/claude-code/pull/87079

### 2. [OPEN] 修复 pr-review-toolkit 中所有 agent 的无效 YAML frontmatter
**PR #87077** | 创建：2026-08-16
- **内容**：每个 agent 的 `description` 是包含对话行（如 `Daisy: "..."` / `Assistant: "..."`）的未加引号的标量。在 YAML 中，未加引号标量内的 `key: value` 会被解析为嵌套映射，在该位置非法，导致 agent 加载时 frontmatter 为空（name/description/model 全部丢失）。
- **链接**：https://github.com/anthropics/claude-code/pull/87077

### 3. [OPEN] 添加 python-package-conda.yml
**PR #87125** | 创建：2026-08-16
- **内容**：新增 GitHub Actions workflow 文件，用于 Python 包的 Conda 构建/测试。
- **链接**：https://github.com/anthropics/claude-code/pull/87125


## 功能需求趋势

社区最集中的功能需求方向如下（按热度排序）：

1. **可配置的 `AskUserQuestion` 超时时间** —— 3 条独立 Issue（#73163、#73324、#73367）反复提出，当前 60 秒硬编码超时在长时间交互会话中会**静默选择默认答案**，用户要求可配置、可关闭或延长至 5-10 分钟。官方尚未响应。
2. **后台代理自动提交行为的开关** —— 2.1.198 引入的 auto-commit / auto-push / auto-PR 默认行为缺少禁用选项（#73197），propose-only 工作流用户受影响。
3. **会话/项目身份可视化** —— 多项目并行会话难以区分（#73162），用户期望 CLI 默认显示当前项目路径或标识。
4. **更低粒度的权限控制** —— 包括 GitHub 集成仅限组织安装模式（#72856）、plan mode 下 auto-mode 对只读命令的自动放行（#73176）。
5. **Fable 5 定价/配额透明度** —— #73305 要求 Fable 5 在 7 月 7 日后继续包含在 Max 计划中（而非仅限 usage-credits），新模型计费政策引发社区讨论。


## 开发者关注点

当前开发者反馈中最突出的痛点为：

- **会话限额消耗异常（高频）** ：13+ 条报告显示用户未发起请求却耗尽了 5 小时窗口（如 #83042、#82911、#82596、#82726、#83095 等）。部分用户描述"一条请求烧掉整个窗口"或"闲置 24 小时后回来第一条消息吃掉剩余 40% 配额"。社区猜测与**缓存 token 重读计数**或后台自动上下文刷新有关。多数 Issue 被标记为 CLOSED（可能被系统自动合并处理），但未看到官方解释。
- **Fable 5 模型行为黑盒**：#66960 展示模型在关键事件响应节点长时间静默运行，不向用户同步中间发现，最终以 `AskUserQuestion` 询问从未展示过的内容，严重影响高 stakes 场景下的信任度。
- **macOS 沙箱不可用**：#73468 表明在存在较多 git worktree 时沙箱完全瘫痪，阻塞所有命令执行，影响面较大。
- **功能回退（regression）**：plan mode + bypass 行为变化（#73176）、后台代理自动提交（#73197）、`/permissions` 键盘导航失效（#87224）均为 2.1.198/2.1.221 引入的回退，已产生多次重复报告。
- **订阅与配额可见性**：#63685 显示部分 Pro 用户无法使用订阅访问，错误信息误导用户转向 API key，缺乏引导；多项"会话限额"Issue 请求官方提供用量明细，目前不可得。

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

## 今日速览

今日 OpenAI Codex 社区无新版本发布，但动态集中在持续发酵的 **Windows 桌面端性能问题**（鼠标卡顿、冻结、MCP 进程泄漏）和 **沙箱（Sandbox）稳定性故障**上。功能层面，社区对 **项目级会话隔离** 的呼声最高（#25319，62 👍），同时官方机器人今日密集合入了十余个 TUI 体验与权限系统修复 PR。

---

## 社区热点 Issues

1. [#20214 Codex App frequently freezes/stutters on Windows 11 Pro](https://github.com/openai/codex/issues/20214)
   经典 Windows 性能问题，持续数月仍开放，累计 106 条评论、85 个 👍。用户在配备 Ryzen 5 5600/32GB RAM 的机器上仍遭遇频繁冻结，说明问题与硬件配置无关，指向应用级渲染或进程调度缺陷。

2. [#38546 [Windows] Desktop app causes system-wide mouse stutter when running without elevation](https://github.com/openai/codex/issues/38546)
   新增高热度性能 Bug（31 评论）。非管理员运行时导致**全系统鼠标指针卡顿**，涉及底层输入处理或消息循环阻塞，影响面远超 Codex 本身，值得优先排查。

3. [#25319 Scope Codex VS Code chats to the current workspace/project](https://github.com/openai/codex/issues/25319)
   高赞功能请求（62 👍，29 评论）。当前 VS Code 扩展的会话历史为全局共享，用户期望按项目/工作区隔离聊天线程，避免跨项目上下文串扰。

4. [#23200 Support headless remote Linux hosts for Codex mobile](https://github.com/openai/codex/issues/23200)
   移动端远程控制依赖桌面 App 在线，阻碍了以常驻 Linux 服务器为核心的工作流。社区期望支持无头远程主机（48 👍）。

5. [#32797 [Windows] Codex Desktop retains five MCP/Node process batches (147 node.exe, 13.9 GiB)](https://github.com/openai/codex/issues/32797)
   Windows 下 MCP 进程未正确回收，单次会话累积 147 个 node.exe 进程、占用 13.9 GiB 内存。与 #38754 同属 MCP 生命周期管理失控。

6. [#11765 Manage MCP servers UX](https://github.com/openai/codex/issues/11765)
   高赞 UX 改进（45 👍）。社区希望能在 App/CLI/IDE 中直接启停 MCP 服务器，而非依赖 `config.toml` 手动编辑。

7. [#37487 Codex CLI 0.147.0 Sends Empty Tool Description to Azure Responses API](https://github.com/openai/codex/issues/37487)
   Azure 用户调用 Responses API 时工具描述为空，导致 Azure 侧拒绝或行为异常，阻塞企业级 Azure 部署。

8. [#28248 Windows sandbox fails all read operations after power outage](https://github.com/openai/codex/issues/28248)
   断电恢复后沙箱所有读操作被拒绝，提示 "apply deny-read ACLs"。权限状态未持久化恢复，影响沙箱的稳定性与容错能力。

9. [#38917 Documented 1M context window is unavailable in Codex CLI or Desktop App](https://github.com/openai/codex/issues/38917)
   官方宣称 GPT-5.6 Sol 支持 1M 上下文，但 CLI 与桌面端实际不可用，文档与实现不一致，属于高优先级文档/功能对齐问题。

10. [#32315 Windows elevated sandbox setup helper hits os error 206](https://github.com/openai/codex/issues/32315)
    提权沙箱初始化时 Base64 负载超出 CreateProcessW 命令行长度上限，即使最小命令也无法执行。

---

## 重要 PR 进展

1. [#38916 Honor legacy `:project_roots` permission entries](https://github.com/openai/codex/pull/38916)
   兼容旧版权限配置：`project_roots` 字段重命名前，旧配置中的条目会被静默忽略从而导致文件系统限制失效。

2. [#38918 Improve `codex doctor` network diagnostics](https://github.com/openai/codex/pull/38918)
   增强网络诊断：使用路由感知 HTTP 客户端探测 Responses 端点，可分类 TLS、代理认证、代理配置、DNS 解析及超时故障。

3. [#38919 Reject obsolete app-server permission profile fields](https://github.com/openai/codex/pull/38919)
   服务端反序列化不再静默忽略未知权限字段，防止客户端使用已废弃的 `permissionProfile` 导致权限设置被意外丢弃。

4. [#38913 Stop rendering columns after filling their area](https://github.com/openai/codex/pull/38913)
   修复 TUI 列渲染性能：渲染位置到达可用区域底部后停止遍历，避免无效计算。

5. [#38907 Edit queued messages with Vim history-up](https://github.com/openai/codex/pull/38907)
   Vim 模式下可按 history-up 恢复最新排队消息进行编辑，提交后替换原消息而非重复追加。

6. [#38902 Honor per-environment shell variable policies](https://github.com/openai/codex/pull/38902)
   每个环境配置现在携带独立的 Shell 环境变量策略，shell 命令与统一执行（unified exec）采用当前环境的策略。

7. [#38894 Add working-directory commands to the TUI](https://github.com/openai/codex/pull/38894)
   新增 `/cd [path]` 命令，可在空闲本地会话中切换工作目录并保留对话历史，同时重载项目配置与指令。

8. [#38830 Isolate external editor buffers from sandbox-writable paths](https://github.com/openai/codex/pull/38830)
   外部编辑器缓冲区可能包含当前编辑器文本，现移入受保护的 `editor` 目录，防止被受限文件系统策略暴露。

9. [#38827 Add endpoint protection checks to `codex doctor`](https://github.com/openai/codex/pull/38827)
   `codex doctor` 现可检测 Windows/macOS 上常见端点保护产品，并提示需要放行的 Codex 路径。

10. [#38840 Identify Mac mini hosts in remote control handshakes](https://github.com/openai/codex/pull/38840)
    远程控制握手时识别 Mac mini 主机并发送 `x-codex-host-device-kind: mac_mini`，优化远程设备分类。

---

## 功能需求趋势

- **Windows 稳定性攻坚**：冻结、卡顿、鼠标 stutter、MCP 进程泄漏、沙箱 ACL 失效——平台级稳定性是当前最大痛点。
- **MCP 生命周期管理**：用户要求可配置、可启停的 MCP 服务器管理 UX（#11765），修复进程重复生成与不回收问题（#32797、#38754）。
- **远程/无头工作流**：移动端支持直连无头 Linux 服务器，不依赖桌面 App 在线（#23200）；远程会话需支持连接 → 项目 → 线程的分组视图（#24295）。
- **项目级隔离与会话组织**：VS Code 扩展按项目隔离聊天记录（#25319）；桌面端支持项目维度分类远程线程（#24295）。
- **可用性与效率**：TUI 支持 /cd 切换目录、撤销/重做输入（#2379）、快捷键切换推理强度与模型（#26819）等。

---

## 开发者关注点

- **Windows 性能问题反复**：从 #20214 到 #38546，开发者持续反馈高配机器上的卡顿与冻结，部分 Bug 已开放数月未修复，社区耐心持续消耗。
- **沙箱机制脆弱性**：断电（#28248）、提权初始化（#32315）、防火墙冲突（#38898）均可导致沙箱完全不可用，故障恢复能力不足。
- **远程控制链路不稳定**：thread/resume 在大线程上呈二次方复杂度，导致远程操控超时（#38787）；Windows 下远程 SSH 会话中审批按钮失灵（#34652）。
- **权限与配置兼容性**：旧版 `project_roots` 权限字段被忽略、废弃权限字段被静默接受——社区对配置信任度下降，官方正通过 PR #38916 与 #38919 修复。
- **上下文窗口文档失实**：1M 上下文在 CLI/桌面端不可用引发质疑（#38917），反映文档与实现脱节问题，影响开发者对官方能力的信任。

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI 社区动态日报

**日期：2026-08-17**

---

## 今日速览

今日社区焦点集中在 **子代理（Subagent）可靠性** 与 **Agent 自主性平衡** 两大方向：多个高赞 Issue 指出子代理在达到 `MAX_TURNS` 后误报成功、通用代理执行简单任务时永久挂起等问题，严重影响了工作流可信度。与此同时，SSR Agent 带来的自动化 PR 开始系统性修复这些核心缺陷，标志着项目维护策略的升级。此外，Auto Memory 功能的隐私与日志问题也引发了新一轮安全讨论。

---

## 版本发布

### v0.56.0-nightly.20260816.g2a87e7be1

- 发布 `v0.56.0-nightly.20260816.g2a87e7be1` 版本
- 完整变更日志：[Compare v0.56.0-nightly.20260815...v0.56.0-nightly.20260816](https://github.com/google-gemini/gemini-cli/compare/v0.56.0-nightly.20260815.g2a87e7be1...v0.56.0-nightly.20260816.g2a87e7be1)

---

## 社区热点 Issues（10 个）

### 1. Subagent recovery after MAX_TURNS is reported as GOAL success, hiding interruption [#22323](https://github.com/google-gemini/gemini-cli/issues/22323)
- **标签**: `priority/p1`, `kind/bug`, `area/agent`
- **热度**: 12 评论 | 2 👍
- **核心问题**: `codebase_investigator` 子代理在达到最大回合限制后，仍上报 `status: "success"` 和 `Termination Reason: "GOAL"`，掩盖了实际的中断。用户无法区分真正完成任务和因限制被打断的情况。
- **社区反应**: 高优先级 bug，正在 retesting 阶段，已有一个 SSR Agent PR 对应修复。

### 2. Generalist agent hangs [#21409](https://github.com/google-gemini/gemini-cli/issues/21409)
- **标签**: `priority/p1`, `kind/bug`, `area/agent`
- **热度**: 8 评论 | 8 👍
- **核心问题**: Gemini CLI 一旦将任务转交给 generalist 子代理，就可能永久挂起（用户等待长达 1 小时未完成）。即使是创建文件夹这类简单操作也会触发。
- **社区反应**: 高赞 Issue，用户在提示词中禁止使用子代理可规避。这是当前 Agent 稳定性最严重的问题之一。

### 3. Shell command execution gets stuck with "Waiting input" after command completes [#25166](https://github.com/google-gemini/gemini-cli/issues/25166)
- **标签**: `priority/p1`, `kind/bug`, `area/core`
- **热度**: 4 评论 | 3 👍
- **核心问题**: Shell 命令已执行完毕，但 Gemini CLI 仍显示 "Awaiting user input" 并挂起。发生在极其简单的 CLI 命令上，复现率高。

### 4. Auto Memory 系列问题：低信号会话无限重试 [#26522](https://github.com/google-gemini/gemini-cli/issues/26522)
- **标签**: `priority/p2`, `kind/bug`, `area/agent`
- **热度**: 5 评论 | 0 👍
- **核心问题**: Auto Memory 对低信号会话的处理存在缺陷。当提取代理判断会话内容质量低而决定不读取时，该会话永远不会被标记为已处理，导致被反复重新尝试，浪费资源。

### 5. Auto Memory 系列问题：日志与脱敏不完善 [#26525](https://github.com/google-gemini/gemini-cli/issues/26525)
- **标签**: `priority/p2`, `kind/bug`, `area/security`
- **热度**: 4 评论 | 0 👍
- **核心问题**: Auto Memory 将本地 transcript 发给模型前，机密脱敏指令位于 prompt 中，意味着内容在被脱敏前已进入模型上下文。此外服务可能将已有技能内容写入日志，存在信息泄漏风险。

### 6. Gemini CLI encounters 400 error with > 128 tools [#24246](https://github.com/google-gemini/gemini-cli/issues/24246)
- **标签**: `priority/p2`, `kind/bug`, `area/agent`
- **热度**: 3 评论 | 0 👍
- **核心问题**: 当可用工具超过 128 个（实际触发约 400 个工具）时，API 返回 400 错误。用户期望 CLI 能智能地限制工具作用域。

### 7. Gemini does not use skills and sub-agents enough [#21968](https://github.com/google-gemini/gemini-cli/issues/21968)
- **标签**: `priority/p2`, `kind/bug`, `area/agent`
- **热度**: 6 评论 | 0 👍
- **核心问题**: 用户反馈 Gemini 几乎不会主动使用自定义 skills 和子代理，除非显式指示。即使存在高度相关的 skill（如 gradle、git），模型也不会自动触发。

### 8. (Sub)agents running without permission since v0.33.0 [#22093](https://github.com/google-gemini/gemini-cli/issues/22093)
- **标签**: `priority/p2`, `kind/bug`, `area/agent`
- **热度**: 3 评论 | 0 👍
- **核心问题**: 自从 v0.33.0 之后，即使用户在配置中禁用了 agents 模式，子代理仍然会被自动调用。用户预期只有 MCP 功能可用，但实际子代理绕过权限设置被触发。

### 9. Browser Agent ignores settings.json overrides [#22267](https://github.com/google-gemini/gemini-cli/issues/22267)
- **标签**: `priority/p2`, `kind/bug`, `agent/browser`
- **热度**: 3 评论 | 0 👍
- **核心问题**: Browser Agent 完全忽略 `settings.json` 中的配置覆盖（如 `maxTurns`），尽管 `AgentRegistry` 在初始化时正确地读取和合并了这些设置。

### 10. Agent should stop/discourage destructive behavior [#22672](https://github.com/google-gemini/gemini-cli/issues/22672)
- **标签**: `priority/p2`, `kind/enhancement`, `area/agent`
- **热度**: 3 评论 | 1 👍
- **核心问题**: 在复杂 git 操作、分支管理等场景中，模型偶尔会使用 `git reset` 或 `--force` 等破坏性命令，而存在更安全的替代方案。社区要求模型能主动评估操作风险。

---

## 重要 PR 进展（10 个）

### 1. [SSR Agent] Preserve original termination reason during subagent recovery [#28815](https://github.com/google-gemini/gemini-cli/pull/28815)
- **状态**: OPEN | `priority/p1`, `area/agent`
- **内容**: 修复 Issue #22323。当子代理到达 `MAX_TURNS` 或 `TIMEOUT` 限制后，在最终恢复轮次中调用 `complete_task` 时，原来会报告成功，现在将保留原始的终止原因。**这是本次日报中最值得关注的 PR**，直接修复了今天热门的误报问题。

### 2. [SSR Agent] Prevent indefinite TUI hang by adding execution timeouts [#28812](https://github.com/google-gemini/gemini-cli/pull/28812)
- **状态**: OPEN | `priority/p1`, `area/core`, `help wanted`
- **内容**: 修复 Issue #21477。解决从裸 Linux 终端启动时 TUI 无限挂起在 "Initializing..." 的问题，原因是 `getProcessInfo()` 依赖 `execAsync` 执行 Unix `ps` 命令可能被阻塞。通过添加超时机制防止挂死。

### 3. fix(cli): handle refreshAuth failures gracefully in non-interactive mode [#28848](https://github.com/google-gemini/gemini-cli/pull/28848)
- **状态**: OPEN | `priority/p2`, `area/security`
- **内容**: 非交互式（`--prompt`）启动时，如果 `refreshAuth()` 失败，CLI 可能因未捕获的原始堆栈跟踪而崩溃并返回退出码 1。此 PR 将其改为输出清晰、可操作性的错误提示。

### 4. feat(cli): add --list-models flag to print available models as JSON [#28843](https://github.com/google-gemini/gemini-cli/pull/28843)
- **状态**: CLOSED | `size/s`
- **内容**: 新增 `gemini --list-models` 标志，将可用模型选项以 JSON 格式输出后退出。为集成方和编排工具提供编程式模型发现能力，无需进入交互式 REPL。

### 5. docs(cli): add Homebrew deprecation notice and update existing-user message [#28844](https://github.com/google-gemini/gemini-cli/pull/28844)
- **状态**: CLOSED | `size/s`
- **内容**: `gemini-cli` 已从 `homebrew-core` 弃用。此 PR 在安装文档和 README 中增加警告，引导用户使用 npm 安装，并更新了安装器的更新提示。

### 6. fix(acp): populate cached/thought tokens in PromptResponse usage field [#28840](https://github.com/google-gemini/gemini-cli/pull/28840)
- **状态**: OPEN | `area/non-interactive`
- **内容**: ACP `PromptResponse` 只返回 `input_tokens`/`output_tokens`，缓存的（cached）和思考（thought）token 计数被静默丢弃，导致 ACP 客户端在重度 prompt 缓存场景下高估成本约 3 倍。此 PR 修复了 token 使用量的统计。

### 7. [SSR Agent] Clarify privacy notice wording and selection options [#28820](https://github.com/google-gemini/gemini-cli/pull/28820)
- **状态**: OPEN | `priority/p2`, `area/extensions`
- **内容**: 修复 Issue #26120。隐私声明措辞存在误导性——文本声称可以在下方选择退出，但实际选项并不支持。此 PR 统一了措辞与实际的选项行为。

### 8. [SSR Agent] Fix TypeScript strict-null errors in integration tests [#28814](https://github.com/google-gemini/gemini-cli/pull/28814)
- **状态**: OPEN | `priority/p2`, `area/platform`
- **内容**: 修复集成测试文件（`hooks-system.test.ts` 等）在构建时的 TypeScript strict-null 属性和联合类型检查错误。

### 9. [SSR Agent] Add composite flag to packages/cli tsconfig [#28813](https://github.com/google-gemini/gemini-cli/pull/28813)
- **状态**: CLOSED | `priority/p1`, `area/platform`
- **内容**: 修复 Issue #21911。根级构建或类型检查失败，因为 `evals/tsconfig.json` 引用了 `packages/cli`，但后者未配置 `"composite": true`。

### 10. chore(deps): bump the npm-dependencies group with 73 updates [#28849](https://github.com/google-gemini/gemini-cli/pull/28849)
- **状态**: CLOSED | size/xl
- **内容**: Dependabot 批量更新 73 个 npm 依赖包，包括 `simple-git`（3.28.0 → 3.36.0）、`@modelcontextprotocol/sdk`（1.23.0 → 1.30.0）等。该 PR 已合入。

---

## 功能需求趋势

### 1. Agent 自主性与安全边界（社区最关注）
多篇 Issue（#22672、#21968、#22093）围绕一个核心矛盾：如何在让 Agent 更自主地使用子代理、skills 与 shell 命令的同时，确保不会绕过用户权限配置、使用破坏性命令或在不需要时产生额外开销。社区期望更智能的工具选择策略与更严格的安全默认值。

### 2. 子代理执行透明度
从 #22323、#21763（bugreport 不包含子代理上下文）到 #22598（子代理轨迹应可通过 `/chat share` 共享），社区强烈需要子代理的完整决策链路可见性，以便调试、评估和审计。

### 3. AST 感知的代码操作
两个关联 Issue（#22745、#22746）正在探索基于抽象语法树的文件读取、搜索和代码库映射能否提升工具调用精度、减少 token 消耗。这是项目对代码理解能力下一步的重要探索方向。

### 4. Auto Memory 的可靠性、隐私与安全
本周多篇 Issue（#26516、#26522、#26523、#26525）集中暴露了 Auto Memory 在无效补丁处理、低信号会话重试、敏感信息日志和脱敏时机等多个维度的问题。该功能仍处于早期质量打磨阶段。

### 5. 组件级评估体系
Issue #24353 提出建立更健壮的组件级评测体系（当前已有 76 个行为评估测试，覆盖 6 种 Gemini 模型）。社区希望从端到端黑盒测试向可定位的组件级测试延伸。

### 6. 开发者体验工具
`--list-models` 标志（PR #28843）为程序化工作流提供了便捷的模型发现方式，体现了社区对 CLI 在非交互式场景和 CI/CD 中可编排性的需求增长。

---

## 开发者关注点

| 痛点/需求 | 相关 Issue/PR | 现状 |
|---|---|---|
| **子代理误报成功**：达到 MAX_TURNS 后却显示 GOAL 成功 | #22323 / #28815 | 已有 PR，待合并 |
| **Agent 永久挂起**：generalist 代理执行简单任务时卡死 | #21409 / #25166 / #28812 | 部分修复中 |
| **配置被绕过**：禁用子代理后仍被自动调用 | #22093 | 待处理 |
| **敏感信息风险**：Auto Memory 日志与脱敏不完善 | #26525 | 待处理 |
| **成本统计偏差**：缓存 token 被丢弃导致成本高估 3 倍 | #28840 | 已修，待合并 |
| **工具数量上限**：400 个工具时 API 返回 400 错误 | #24246 | 待处理 |
| **破坏性命令风险**：git reset / --force 误用 | #22672 | 讨论中 |
| **子代理调试困难**：不可见、不可共享、不包含在 bug 报告中 | #21763, #22598 | 待处理 |
| **终端交互卡顿**：外部编辑器退出后屏幕损坏、shell 命令后挂起 | #24935, #25166 | 待处理 |

---

> **总结**：今日社区焦点明确指向子代理的可靠性与可信度——从误报成功、永久挂起到权限绕过。SSR Agent 已开始系统性修复 `MAX_TURNS` 误报等核心 P1 问题，值得期待后续版本。功能需求方面，AST 感知代码操作与组件级评测是项目中长期演进的清晰信号。在安全合规上，Auto Memory 的隐私问题需要社区保持关注。

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

### 今日速览

今日社区动态集中于 **MCP OAuth 认证链路的多发回归问题**（跨平台、版本 1.0.80 引入）与 **会话/插件生命周期管理缺陷**（恢复时 agent 丢失、插件更新锁文件、会话存档不可逆）。此外，**内存压力看门狗导致的错误压缩循环** 与 **非交互模式下仓库级插件配置失效** 成为新的 triage 焦点，反映出 1.0.80 版本在稳定性（Windows 平台）与配置一致性上存在明显短板。

---

### 社区热点 Issues（10 个精选）

1. **[#4490] Atlassian MCP OAuth 认证在 1.0.80 版本失效（RFC 8414 §3.3 回归）**  
   影响面广：升级 1.0.80 后，使用标准 OAuth 发现机制的 MCP 服务器全部拒绝连接。1.0.78 正常，确认回归。  
   🔗 https://github.com/github/copilot-cli/issues/4490

2. **[#4506] 内存压力看门狗在上下文仅使用 23% 时强制压缩，恢复 0.003% token 后循环直至 OOM**  
   核心缺陷：压缩触发条件错误绑定进程内存而非上下文窗口，导致长会话在低上下文占用下被反复打断直至崩溃。  
   🔗 https://github.com/github/copilot-cli/issues/4506

3. **[#4507] 仓库级 `enabledPlugins` 配置在 `copilot -p`（非交互）模式下被忽略**  
   同一配置在交互模式与 `plugins list` 中生效，唯独管道/脚本模式失效，导致 CI 与本地行为不一致。  
   🔗 https://github.com/github/copilot-cli/issues/4507

4. **[#4503] SDK server 未完成认证即报告 ready，Slack 会话创建泛化失败**  
   竞态条件：server 报告就绪时环境缺少 `COPILOT_SDK_AUTH_TOKEN`，对外表现为"创建会话失败"，诊断信息缺失。  
   🔗 https://github.com/github/copilot-cli/issues/4503

5. **[#4488] Windows 下插件更新因文件锁失败（其他 Copilot/VS Code 会话持有句柄）**  
   高频痛点：多开场景（CLI + VS Code）下插件更新必然失败，无自动重试或解锁机制。  
   🔗 https://github.com/github/copilot-cli/issues/4488

6. **[#4472] 远程 MCP 并发工具调用 + Token 过期 = 每个调用新建 rmcp 服务，互相取消**  
   并发缺陷：Token 刷新未复用，导致多个刷新服务争抢连接，正在执行的 tool call 被强制中断。  
   🔗 https://github.com/github/copilot-cli/issues/4472

7. **[#4463] Windows 下 MCP OAuth 间歇性 socket error 10013（权限禁止）**  
   与 [#4490] 同属 OAuth 链路，但此问题在 1.0.80 之前已存在，Windows 平台偶发，无稳定复现步骤。  
   🔗 https://github.com/github/copilot-cli/issues/4463

8. **[#4505] 恢复会话后残留旧的 connection item ID，导致每个 prompt 报 400 错误**  
   会话持久化缺陷：中断响应后恢复，连接状态未清理。`/fork` 也无法恢复，提示数据损坏或清理逻辑缺失。  
   🔗 https://github.com/github/copilot-cli/issues/4505

9. **[#4473] `claude-haiku-4.5` 子代理不支持 `medium` 推理强度**  
   内部路由错误：CLI 为 haiku 模型硬编码了不支持的 reasoning effort，导致子任务直接失败。  
   🔗 https://github.com/github/copilot-cli/issues/4473

10. **[#4504] `account.getQuota` 返回请求时间戳而非配额重置时间（resetDate 错误）**  
    API 契约错误：返回字段语义不符，影响依赖配额管理的第三方工具。  
    🔗 https://github.com/github/copilot-cli/issues/4504

---

### 重要 PR 进展（1 个）

由于过去 24 小时仅 1 条 PR 更新，且该 PR（#3163 "ViewSonic monitor"）与 Copilot CLI 核心功能无关，疑似测试或错误提交，故不展开分析。  
🔗 https://github.com/github/copilot-cli/pull/3163

---

### 功能需求趋势

1. **会话生命周期管理**（[#4502] 取消归档/恢复 Done 会话；[#4489] 恢复时自动选择原 agent）  
   用户希望会话恢复是完整且可逆的，当前"误触存档即永久消失"与"恢复后 agent 丢失"体验不可接受。

2. **插件依赖解析与自动安装**（[#4487] 插件间/市场间依赖机制）  
   插件生态复杂化后，社区开始要求声明式依赖管理，而非手动装配。

3. **权限请求超时机制可配置化**（[#4486]）  
   长时间挂机/多会话用户反馈"等待权限确认"超时过短（默认值），需要可调参数或关闭超时。

4. **MCP 认证链路健壮性**（[#4490]、[#4463]、[#4472]）  
   OAuth 刷新并发控制 + 跨平台 socket 权限兼容是当前最急切的技术债。

---

### 开发者关注点（痛点总结）

- **OAuth/MCP 集成是 1.0.80 的主要痛点**：至少 3 个独立 issue 指向认证生命周期管理缺陷，且平台相关（Windows 特别严重）。
- **配置一致性缺失**：非交互模式忽略仓库级插件配置（[#4507]）与 `account.getQuota` 语义错误（[#4504]）均属于"文档没说但用户依赖"的行为破损。
- **记忆压缩策略错误**（[#4506]）：内存压力而非上下文压力触发压缩，说明监控指标选错，直接影响长会话可用性。
- **会话恢复的隐形成本**（[#4505]、[#4489]）：连接 ID 残留与 agent 状态丢失反映持久化层存在边界情况，用户被迫手动重新配置环境。
- **AI 用词问题引发关注**（[#4498]）：Copilot 在代码命名中使用 "Enslaved" 等敏感词汇，社区认为即便不影响性能，也应视为内容质量 bug。

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

# Kimi Code CLI 社区动态日报

**2026-08-17**


## 今日速览

今日无新版本发布，社区焦点集中在 Session 管理、定时任务（Cron）管理入口缺失，以及 Windows 环境下 PowerShell 路径兼容性问题上。此外，记忆层优化的大项目体验问题持续获得关注，已有 4 条评论讨论。

## 社区热点 Issues

1. **[#1783] 请求添加 /delete 命令以删除 Session** | 作者: proccl | 更新: 08-16 | 评论: 6 | 👍: 1
   目前删除 session 需要手动操作 `~/.kimi/sessions/` 目录，既不安全也不方便。建议新增 `/delete` 或 `/remove` 斜杠命令支持指定删除，尤其是在 Session 过多、需要清理旧数据或彻底删除含敏感信息的会话时，能显著提升管理体验。
   https://github.com/MoonshotAI/kimi-cli/issues/1783

2. **[#2600] Windows PowerShell 7 默认从 D 盘启动时路径无法找到** | 作者: RooKichenn | 创建: 08-11 | 更新: 08-16 | 评论: 5
   v0.33 在 PowerShell 7 设置了非 C 盘默认启动目录时，打开 kimi code 找不到路径。已有 5 条评论，社区关注 Windows 多盘符环境下的路径兼容性问题。
   https://github.com/MoonshotAI/kimi-cli/issues/2600

3. **[#2605] CronCreate 定时任务无用户可见的管理入口** | 作者: WilliamLambertCN | 创建/更新: 08-16 | 评论: 1
   模型创建的 cron 定时任务在 TUI 中无 `/cron` 命令，`/tasks` 面板也不显示，用户被迫直接修改 `~/.kimi-code/cron/` 下的 JSON 文件。这是定时任务功能的关键可用性缺口，值得优先处理。
   https://github.com/MoonshotAI/kimi-cli/issues/2605

4. **[#1478] 优化记忆层——大项目开发体验堪忧** | 作者: hahy36 | 创建: 03-17 | 更新: 08-16 | 评论: 4
   用户反馈记忆层机制不透明，文档中仅提及 agent.md，缺乏对长期记忆的说明。维护大项目时上下文丢失严重，该问题已持续数月仍在讨论中，是社区长期痛点。
   https://github.com/MoonshotAI/kimi-cli/issues/1478


## 重要 PR 进展

1. **[#864] 新增 `--starting-prompt` 标志，允许在不退出 CLI 的情况下传递提示词** | 作者: stebbins | 状态: 已关闭
   引入 `--starting-prompt`（别名 `-s`）参数，便于在启动时直接注入初始提示词而无需退出当前会话，可配合脚本工作流使用。
   https://github.com/MoonshotAI/kimi-cli/pull/864

2. **[#2324] 修复 web 模式下 SessionProcess.send_message 的 BrokenPipeError** | 作者: Ricardo-M-L | 状态: 开放
   针对 `src/kimi_cli/web/runner/process.py` 中 `start()` 与写入 stdin 之间子进程退出导致的 BrokenPipeError 崩溃问题，增加了防护处理，提升 Web 运行时的稳定性。
   https://github.com/MoonshotAI/kimi-cli/pull/2324

3. **[#2449] 修复 shorten_middle 在长度检查前的换行符折叠问题** | 作者: Ricardo-M-L | 状态: 开放
   修复 `shorten_middle()` 在输入文本较短时提前返回、未移除换行符，导致单行摘要渲染异常的问题，提升工具调用参数摘要的显示质量。
   https://github.com/MoonshotAI/kimi-cli/pull/2449


## 功能需求趋势

- **Session 生命周期管理**：社区明确希望增加直接的 Session 删除命令，减少手动文件操作，增强隐私保护（#1783）。
- **定时任务可视化与管控**：CronCreate 缺乏管理入口成为新晋热点，用户需要 `/cron` 命令或整合进 `/tasks` 面板（#2605）。
- **长期记忆与上下文优化**：记忆层机制不透明问题持续发酵，大项目场景下上下文丢失的痛点亟待官方文档与机制优化（#1478）。
- **跨平台路径兼容性**：Windows 多盘符环境下的默认目录设置引发路径定位错误，需要增强跨平台路径解析能力（#2600）。
- **CLI 启动参数增强**：支持 `--starting-prompt` 这类直接注入提示词的标志，反映了脚本化、自动化工作流需求（#864）。


## 开发者关注点

- **Session 管理效率**：开发者不愿手动删除目录，希望有安全的命令行管理入口，同时兼顾敏感信息清除。
- **Windows 环境适配**：PowerShell 7 默认在 D 盘启动触发路径解析错误，Windows 用户的路径兼容性亟需修复。
- **定时任务可见性**：模型创建的 cron 调度任务完全不可见，用户被迫越过 CLI 修改 JSON，体验割裂且易出错。
- **大项目上下文保持**：记忆层不透明、参考文档缺失，导致维护大型项目的开发者频繁丢失上下文，降低生产力。

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode 社区动态日报（2026-08-17）

## 今日速览
社区反馈核心仍集中在**付费 Zen 模型的配额/余额失效**与**会话卡死**两大痛点上；`Ctrl+C` 退出冲突的 UX 问题以 49 👍 高居关注度榜首。V2 桌面端性能优化（spinner CPU 占用、Code Mode 渲染）与 TUI 交互修复为今日 PR 主干，多个由 `opencode-agent[bot]` 提交的自动化修复 PR 已批量关闭。

## 社区热点 Issues

**1. Ctrl+C 应复制而非退出（#7957）— 49 👍**
反馈最强烈的 UX 问题：Windows/Linux 下 `Ctrl+C` 直接退出 OpenCode，与通用复制快捷键冲突，用户习惯性按键导致会话意外终止。近一个月仍有新互动，可见该问题影响面广且长期未解决。
[查看 Issue](https://github.com/anomalyco/opencode/issues/7957)

**2. Zen 付费模型全部报 "Upstream request failed"（#36506）— 11 评论**
所有付费 Zen 模型（如 `MiniMax-M3`、`deepseek-v4-flash`）均报上游请求失败，而免费模型与 Go 模型正常。指向付费通道的网关配置存在问题，直接影响付费用户体验。
[查看 Issue](https://github.com/anomalyco/opencode/issues/36506)

**3. 剪贴板复制失效（#41470）— 16 评论**
VSCode Server / Docker 环境下，提示"已复制到剪贴板"但实际未写入系统剪贴板，无法粘贴到其他应用。涉及 Web/远程开发场景的剪贴板桥接问题。
[查看 Issue](https://github.com/anomalyco/opencode/issues/41470)

**4. Zen 付费余额仍触发免费额度限制（#33318）— 9 评论**
用户充值 $20 后，使用不足 1 小时仍被 `FreeUsageLimitError` 拦截。计费系统未正确识别付费余额优先级，导致付费用户被错误限流。
[查看 Issue](https://github.com/anomalyco/opencode/issues/33318)

**5. Web UI 项目自动同步（#13626）— 11 评论，15 👍**
功能请求：在新设备/浏览器打开 OpenCode Web 时，应自动从服务端拉取并同步项目列表。目前需手动操作，跨设备工作流存在摩擦。
[查看 Issue](https://github.com/anomalyco/opencode/issues/13626)

**6. 慢速本地 Provider 5 分钟超时（#26602）— 11 评论**
本地 OpenAI 兼容 Provider 请求在恰好 5 分钟时被强制中断（Headers Timeout），即使配置了 `"timeout": false` 也无效。对长耗时本地模型任务影响严重。
[查看 Issue](https://github.com/anomalyco/opencode/issues/26602)

**7. 流错误后 UI 永久卡"思考中"（#32366）— 6 评论**
流式错误（socket 断开、API 错误）后桌面 UI 无限期停在 "thinking..."，无错误提示、无状态恢复，必须重启应用。与 #40468、#40625 等构成一类高频稳定性问题。
[查看 Issue](https://github.com/anomalyco/opencode/issues/32366)

**8. TUI 退出后鼠标转义序列乱码（#20458）— 7 评论，4 👍**
退出 TUI 后终端残留 `35;89;19M` 类乱码，影响终端后续使用，需手动 reset。属于终端恢复机制缺陷。
[查看 Issue](https://github.com/anomalyco/opencode/issues/20458)

**9. shell 完成卡在 busy 状态（#40468）— 5 评论**
连续成功调用 tool 后，某次 toolcall 结束即卡死，双 ESC 无效，日志停在 session loop 步骤。疑似状态机未能处理特定完成条件。
[查看 Issue](https://github.com/anomalyco/opencode/issues/40468)

**10. V2 headless 命令加载 TUI 库并泄漏临时文件（#37671）— 5 评论，2 👍**
`--version`、`--help`、`api` 等无需 TUI 的命令仍加载 13.1 MiB `libopentui.so`，每次执行在 tmp 目录遗留唯一命名文件。影响 CI/服务端批量调用场景的磁盘占用。
[查看 Issue](https://github.com/anomalyco/opencode/issues/37671)

## 重要 PR 进展

**1. [#42952] fix(app): reduce session spinner CPU usage**
将 25 个逐点 CSS 透明度动画替换为单个预渲染 APNG 时间线，保留 8 个原始姿态与 `ease-out` 插值等特性，降低桌面端 spinner 的 CPU 占用。
[查看 PR](https://github.com/anomalyco/opencode/pull/42952)

**2. [#42949] fix(app): render code mode executions**
为桌面端新增 Code Mode 专用渲染器，展示子工具进度、输入摘要、失败调用状态与运行时错误，并补充元数据解析测试。
[查看 PR](https://github.com/anomalyco/opencode/pull/42949)

**3. [#42944] fix(app): correct background subagent status**
修复 V2 后台子代理的状态分类：仅在父工具完成且返回运行中子结果时归类后台运行；保留 `task` 后台元数据兼容行为。
[查看 PR](https://github.com/anomalyco/opencode/pull/42944)

**4. [#42945] fix(app): clarify skill timeline presentation**
优化时间线中 skill 工具行的展示：显示图标、标签、分隔符及解析后的 skill 名称，细节与提示行使用弱化文本，并补充回归测试。
[查看 PR](https://github.com/anomalyco/opencode/pull/42945)

**5. [#42947] docs: reorganize v2 documentation**
重构 V2 文档体系，新增 CLI 配置、providers、主题、按键绑定与插件等独立页面；统一文档布局与品牌元素；`terminal.copy_on_select` 重命名为 `terminal.copy`。
[查看 PR](https://github.com/anomalyco/opencode/pull/42947)

**6. [#42766] refactor(app): use current session messages**
桌面端去除旧版 `Message`/`Part` 与 V2 会话消息流的双轨并存，统一使用当前会话消息，简化状态同步复杂度。
[查看 PR](https://github.com/anomalyco/opencode/pull/42766)

**7. [#37392] fix(core): surface refusal category and explanation on content filter**
当 Anthropic 返回 `stop_reason: "refusal"` 时，不再显示单一硬编码消息，改为输出具体的拒答类别与原因说明。
[查看 PR](https://github.com/anomalyco/opencode/pull/37392)

**8. [#37386] fix: check apply_patch move destinations**
`apply_patch` 移动文件时此前只按源路径请求编辑权限，现改为同时校验目标路径，修正权限模型漏洞。
[查看 PR](https://github.com/anomalyco/opencode/pull/37386)

**9. [#37385] fix: preserve file API text content**
文件 API 此前对解码文本调用 `trim()`，会破坏首尾空白；现移除该处理，保留原始内容。
[查看 PR](https://github.com/anomalyco/opencode/pull/37385)

**10. [#37374] fix(core): stream shell progress tail**
Shell 进度改为推送最近 25 行输出的替换快照，超出时附带截断提示并保留完整输出路径；最终状态结算行为不变。
[查看 PR](https://github.com/anomalyco/opencode/pull/37374)

## 功能需求趋势
- **会话管理增强**：会话收藏/置顶（#42940）、持久化有序会话审阅导航（#42863）等多条请求，反映用户对长会话工作流的管理需求上升。
- **跨设备同步**：Web UI 项目自动同步（#13626）与账号邮箱更新能力（#42928），指向云同步与账号自治方向。
- **终端与系统集成**：zsh 补全（#42913）、Wispr Flow 听写输入（#34499）、剪贴板正确性（#41470）等系统级交互问题集中反馈。
- **稳定性优先**：大量"卡死/静默失败/错误不显示"类 Issue（#32366、#36506、#40468、#40625 等），用户对错误可见性与状态恢复机制的需求超过新功能。

## 开发者关注点
- **付费配额与计费一致性**：多条高赞 Issue 指向 Zen 付费余额不生效（#33318、#42938）、付费模型网关失败（#36506），付费可靠性已成社区信任关键问题。
- **会话挂起与恢复**："永久 thinking"、toolcall 后 busy、断网 stall 等场景高频出现，且多需重启应用恢复，开发者对鲁棒性与错误展示有明显不满。
- **输入与快捷键冲突**：`Ctrl+C` 退出冲突（#7957）以 49 👍 稳居榜首，配合剪贴板失效（#41470）、听写输入失败（#34499），剪贴板与输入体系的一致性亟待修复。
- **资源占用与清理**：V2 headless 命令泄漏 13.1 MiB 临时库文件（#37671）、桌面 spinner 高 CPU（#42952），侧面反映社区对轻量后台进程与资源管理的关注。

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code 社区动态日报 — 2026-08-17

## 今日速览

昨晚发布 v0.21.11-nightly 版本，主要包含 autofix 的默认安全策略改进及 Web Shell 修复。社区焦点集中在多智能体团队的多个消息传递与任务分发 Bug（#9276、#9282、#9283），目前已有对应修复 PR 提出。此外，/review 命令的并发工作区冲突问题（#9205）已完成修复并关闭。

## 版本发布

**v0.21.11-nightly.20260817.195128a17a**

- `feat(autofix)`: deny-by-default footprint gate 与 positional window censuses 改进（@wenshao, #9156）
- `fix(web-shell)`: 相关修复（具体内容见 Release 页）

另附 DSW EAS full E2E r3 验证结果：基于 v0.21.12 分支完成了 SWE-bench Verified (500) 与 Terminal-Bench 2.0 (89) 的端到端回归。

## 社区热点 Issues

### 1. Team members cannot send ordinary messages to their leader（#9276）
**标签**: P2 / bug / core / multi-agent · **更新**: 08-16 · **评论**: 5
团队成员向 leader 发送普通消息时被误判为关闭请求，提示 "Only the team leader can request shutdowns."。多智能体协作的核心路径受阻，社区关注度高，已有对应修复 PR #9284。
[查看 Issue](https://github.com/QwenLM/qwen-code/issues/9276)

### 2. Unsupported image MIME can abort a Responses-compatible session（#9291）
**标签**: P2 / bug / core · **更新**: 08-17 · **评论**: 3
`.heic` 图片被直接转发至 Responses 端点导致会话中止。类型校验缺失问题，已由 PR #9295 修复。
[查看 Issue](https://github.com/QwenLM/qwen-code/issues/9291)

### 3. Manual team task assignment persists without dispatching work（#9282）
**标签**: P2 / bug / core / multi-agent · **更新**: 08-16 · **评论**: 3
`task_update({status: 'in_progress', owner: 'alice'})` 成功后任务并未派发给 alice，唯一的自动领取路径只处理 "pending + unowned" 任务，手动分配形同虚设。已由 PR #9289 修复。
[查看 Issue](https://github.com/QwenLM/qwen-code/issues/9282)

### 4. Agent-team prompts contradict automatic delivery and promise unavailable peer summaries（#9283）
**标签**: P2 / bug / core / multi-agent · **更新**: 08-16 · **评论**: 3
运行时实际行为（空闲队友自动转发最终答案）与多种 prompt 描述互相矛盾，提示词承诺了不存在的 teammate summary 能力。已由 PR #9284 修复。
[查看 Issue](https://github.com/QwenLM/qwen-code/issues/9283)

### 5. Interactive session crashes when opening an errored, incomplete agent-team tab（#9290）
**标签**: P2 / bug / ui / multi-agent / welcome-pr · **更新**: 08-16 · **评论**: 3
打开异常退出的 agent-team 标签页时 UI 直接退出。渲染错误缺少局部边界处理，已由 PR #9292 修复。
[查看 Issue](https://github.com/QwenLM/qwen-code/issues/9290)

### 6. task_list treats blank optional filters as active filters（#9281）
**标签**: P2 / bug / tools / core · **更新**: 08-16 · **评论**: 3
可选过滤参数（owner/blockedBy）为空字符串时被当作有效条件，导致返回空列表而非全部任务，与文档描述不符。
[查看 Issue](https://github.com/QwenLM/qwen-code/issues/9281)

### 7. autofix: PAT-bearing jobs share a host with untrusted branch code（#9089）
**标签**: P1 / bug / security / ci-cd · **更新**: 08-16 · **评论**: 5
runner 级隔离问题：持 PAT 的任务与不可信分支代码同机运行。因无法在 Actions step 内部解决，安全风险持续存在，优先级 P1。
[查看 Issue](https://github.com/QwenLM/qwen-code/issues/9089)

### 8. cannot use qwen under tmux（#8962）
**标签**: P2 / bug / ui / rendering · **更新**: 08-16 · **评论**: 3
tmux 或远程环境下界面闪烁严重，仅在极小窗口（400x300）下可用。影响远程开发用户群体。
[查看 Issue](https://github.com/QwenLM/qwen-code/issues/8962)

### 9. 0.19.3 UI不定期错误，中文输入法完全无效（#5966）
**标签**: P2 / bug / ui / need-information / welcome-pr · **更新**: 08-16 · **评论**: 5
中文输入法间歇性完全失效，且无报错、难以定位，用户表示严重阻碍使用。等待更多信息。
[查看 Issue](https://github.com/QwenLM/qwen-code/issues/5966)

### 10. /review: chunk retirement silently does not fire in the reverse-audit loop（#9206）
**标签**: P2 / bug / commands · **状态**: CLOSED · **更新**: 08-16 · **评论**: 3
chunk 退役机制在 reverse-audit 中静默失效，且 cleanup 销毁了证据，导致重复审查——审查基础设施自身的可靠性问题。已关闭。
[查看 Issue](https://github.com/QwenLM/qwen-code/issues/9206)

## 重要 PR 进展

### 1. fix(core): omit image media the model endpoint cannot safely consume（#9295）
修复 #9291：主动过滤模型端点无法消费的图片 MIME 类型（如 `image/heic`），避免 Responses 兼容端点校验失败导致会话中止。
[查看 PR](https://github.com/QwenLM/qwen-code/pull/9295)

### 2. fix(core): align agent-team prompts and TeamCreate description with actual delivery（#9284）
修复 #9276 + #9283：使 agent-team 提示词与实际投递行为一致，明确自动转发与显式 send_message 的边界。
[查看 PR](https://github.com/QwenLM/qwen-code/pull/9284)

### 3. fix(core): dispatch manually assigned team tasks to their owner（#9289）
修复 #9282：为手动分配（in_progress + owner）的任务增加直接投递路径，补充 auto-claim 未覆盖的场景。
[查看 PR](https://github.com/QwenLM/qwen-code/pull/9289)

### 4. fix(cli): contain agent-tab render errors instead of exiting the session（#9292）
修复 #9290：为 agent-team 标签页增加局部错误边界，渲染异常时降级而非直接退出整个会话。
[查看 PR](https://github.com/QwenLM/qwen-code/pull/9292)

### 5. fix(review): lock the PR review worktree lease against concurrent sessions（#9211）
**已合并**：修复 #9205——review worktree 租约升级为锁，防止同一 PR 的并发审查会话互相删除 worktree。
[查看 PR](https://github.com/QwenLM/qwen-code/pull/9211)

### 6. feat(web-shell): improve sidebar session management（#9122）
大幅改进 Web Shell 侧边栏：hover 显示详情、文件夹预览 5 行、超长标题按实际溢出滚动、运行中会话状态标识等。
[查看 PR](https://github.com/QwenLM/qwen-code/pull/9122)

### 7. feat(review): capture-tui — rendering claims get pixels, not prose（#9273）
新增 `qwen review capture-tui`：在私有 tmux server 中运行命令并截图/录制，为渲染类 claim 提供可视化证据，替代纯文本论证。
[查看 PR](https://github.com/QwenLM/qwen-code/pull/9273)

### 8. fix(ci): narrow serve-ab's self-hosted wipe to the A/B checkout dirs（#9228）
修复自托管 runner 上 wipe 步骤误删整个共享工作区（含 900MB `.git` 历史）的问题，仅清理 A/B checkout 目录。
[查看 PR](https://github.com/QwenLM/qwen-code/pull/9228)

### 9. feat(review): Aone Code read path（#9226）
为 `/review` 增加第二个审查平台提供方：支持从 `gitlab.alibaba-inc.com` 远程仓库及 codereview URL 读取 Aone Code 审查数据。
[查看 PR](https://github.com/QwenLM/qwen-code/pull/9226)

### 10. feat(release): user-facing bilingual digest for release notes（#9216）
**已合并**：发布说明从"按 commit 类型分桶的 PR 列表"改为面向用户的双语摘要，按能力主题分组并附带通俗解释。
[查看 PR](https://github.com/QwenLM/qwen-code/pull/9216)

## 功能需求趋势

1. **多智能体团队（Multi-agent Team）稳定性成为第一优先级**：本周大量 P2 Bug 集中于此（#9276、#9282、#9283、#9290），团队模式的消息流、任务分发、异常恢复均有明显缺陷，但修复速度也很快，说明该特性正处在密集迭代期。

2. **审查基础设施（/review 与 autofix）持续自举进化**：并发 worktree 锁（#9211）、chunk 退役修复（#9206）、Aone Code 第二平台支持（#9226）、TUI 截图验证（#9273）、发布说明双语摘要（#9216）——团队在用自家工具改进自家工具，且自动化程度越来越高。

3. **第三方认证与集成扩展**：#9275 请求支持 GitHub Copilot 认证、#9294 请求将 ClawMetry（本地可观测性面板）加入 Ecosystem 列表，社区对生态接入持续有需求。

## 开发者关注点

1. **远程/终端环境体验差**：tmux 下闪烁（#8962）与中文输入法失效（#5966）均为长期未解决的老问题，严重影响 Linux 远程开发者的日常使用，希望尽快修复。
2. **团队模式"看似成功实则失败"的陷阱**：多个 Bug 的共同特征是操作返回成功但实际未生效（任务已分配未投递 #9282、消息发送被当成关闭请求 #9276、空白过滤条件返回空结果 #9281）。这类静默失败比直接报错更难以排查，开发者对此类问题容忍度最低。
3. **安全隔离需求明确**：PAT 与不可信代码同机（#9089）的 runner 隔离问题被标记为 P1，社区对 CI/CD 安全基线有明确的期望。
4. **生态可观测性诉求**：ClawMetry 这类本地 dashboard 的接入请求说明用户希望有更透明的会话数据查看方式。

</details>

---
*本日报由 [agents-radar](https://github.com/huang-yi-dae/agents-radar) 自动生成。*