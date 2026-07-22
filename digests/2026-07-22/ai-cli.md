# AI CLI 工具社区动态日报 2026-07-22

> 生成时间: 2026-07-22 02:57 UTC | 覆盖工具: 7 个

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

好的，作为专注于AI开发工具生态的资深技术分析师，我将基于您提供的2026年7月22日各主流AI CLI工具的社区动态，为您生成一份横向对比分析报告。

---

## AI CLI 工具生态横向分析报告 (2026-07-22)

### 1. 生态全景

当前AI CLI工具生态正处于**从“新奇玩具”向“生产级基础设施”转型的关键爆发期**。**MCP (Model Context Protocol) 协议的接收与稳定性**、**Agent化工作流的可靠性**、以及**多模型管理与付费一致性**成为整个行业共同面临的“绊脚石”与“分水岭”。各工具在积极拥抱新模型、新协议（如MCP, A2A）的同时，普遍面临由功能快速迭代带来的稳定性阵痛。Windows平台的适配问题在多个工具中集中爆发，成为当前阻碍开发者体验的最大短板。社区情绪从最初的兴奋逐渐转向对**核心稳定性和资源消耗**的务实要求。

### 2. 各工具活跃度对比

| 维度 | Claude Code | OpenAI Codex | Gemini CLI | GitHub Copilot CLI | Kimi Code CLI | OpenCode | Qwen Code |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **社区热点 Issues** | 10 | 10 | 10 | 10 | 5 | 10 | 10 |
| **重要 PR 进展** | 10 | 10 | 10 | 1 (疑似SPAM) | 1 | 10 | 10 |
| **版本发布** | ✅ v2.1.217 | ✅ v0.145.0 | ✅ v0.52.0-nightly | ✅ v1.0.74-0 | ❌ 无 | ❌ 无 | ✅ v0.20.1 & cua-driver-rs v0.7.3 |

**数据洞察：**
- **迭代节奏**：Claude Code与Qwen Code保持最频繁的迭代和发布节奏，社区互动量极高。
- **社区反馈量**：Claude Code、OpenAI Codex、Gemini CLI、OpenCode及Qwen Code社区均有超过10个高热度议题，表明用户基数大且反馈活跃。
- **开发效率**：Kimi Code CLI今日活跃度最低，无论是Issues还是PR数量都显著低于其他工具，可能处于功能或架构调整期。GitHub Copilot CLI的PR进展出现异常（疑似垃圾PR），需关注其社区维护质量。

### 3. 共同关注的功能方向

多个工具的社区都集中反映了以下痛点与需求，这已非单个工具的孤立问题，而是行业共性挑战。

- **MCP 工具链稳定性与完整性**
    - **涉及工具**: Claude Code, Copilot CLI, Kimi Code CLI, Qwen Code, Gemini CLI
    - **具体诉求**: 普遍遇到MCP服务器“连接成功但工具不可见/调用被丢弃”（Claude Code, Copilot CLI, Gemini CLI）、OAuth刷新令牌失效（Copilot CLI）、协议Schema不兼容（Kimi Code）、以及资源（Resources）和提示（Prompts）等原语的缺失（Copilot CLI）。**MCP的“可连接性”已基本解决，但数据层的“可靠交付”与“语义兼容”成为新瓶颈。**

- **Agent 自动化与后台工作流健壮性**
    - **涉及工具**: Claude Code, OpenAI Codex, Gemini CLI, Copilot CLI, Qwen Code
    - **具体诉求**: 后台Agent会话快速终止/崩溃、文件描述符泄漏导致系统性能问题（Claude Code, OpenAI Codex）、Token耗尽/限流导致的重试死循环（Gemini CLI）、以及子代理执行时模型被静默切换（Qwen Code）。**社区对Agent系统的“无监督”模式提出了极高的健壮性要求，任何非预期的卡死、崩溃或资源泄漏都是不可接受的。**

- **Shell 命令执行与输出管理**
    - **涉及工具**: Claude Code, Gemini CLI, Kimi Code CLI
    - **具体诉求**: 命令输出过长导致上下文溢出（Gemini CLI, Kimi Code CLI）、子进程管道阻塞导致超时（Kimi Code CLI）、后台进程管理不当导致僵尸进程（Copilot CLI）。**开发者希望CLI能像专业终端一样精细控制命令生命周期和输出，而非简单粗暴地全部吞入模型上下文。**

- **跨平台体验一致性，尤其是 Windows**
    - **涉及工具**: Claude Code, OpenAI Codex, Copilot CLI, OpenCode, Qwen Code
    - **具体诉求**: Windows平台问题成为重灾区，包括进程管理失调（OpenAI Codex）、文件锁定导致更新失败（Claude Code）、终端兼容性差（Copilot CLI, OpenCode）、编码问题（Claude Code）等。**这已成为制约这些工具在企业级Windows开发者中大规模普及的“硬伤”。**

- **模型可用性与订阅策略透明度**
    - **涉及工具**: Claude Code, Gemini CLI, OpenCode
    - **具体诉求**: 新模型在CLI中不可用/需要额外信用点（Claude Code），配额显示不准确/瞬间耗尽（Gemini CLI），付费订阅模型全部报错（OpenCode）。**开发者对“付费后无法使用”或“使用体验不一致”的容忍度极低，透明、稳定的授权与计费逻辑是建立信任的基础。**

### 4. 差异化定位分析

| 工具 | 核心定位与优势 | 目标用户 | 技术路线特点 | 社区痛点聚焦 |
| :--- | :--- | :--- | :--- | :--- |
| **Claude Code** | **Agent协作与深度TUI优化**。强调插件(Hookify)生态和远程控制，社区对TUI交互细节要求极高。 | 追求极致终端体验和自动化工作流的AI重度用户。 | 快速迭代，积极拥抱新模型（Fable 5），Plugin/Hook机制打磨中，社区参与度极高。 | **稳定压倒一切**：重连、滚动、工具调用等基础功能回归；MCP交付可靠性。 |
| **OpenAI Codex** | **平台化演进与多智能体**。v0.145.0引入分页线程历史和/import迁移，显示其向更复杂会话管理发展。 | 微软生态（VS Code、Windows）开发者，希望深度集成微软开发工作流。 | 引入实验性多智能体和会话管理，但**Windows平台的性能与稳定性是最大短板**，严重拖累用户体验。 | **Windows下的资源治理**：进程风暴、Git扫描、WMI崩溃等系统级性能问题。 |
| **Gemini CLI** | **安全与企业级配置**。重视A2A协议安全（修复RCE），推动策略语言从TOML向CUELang迁移。 | 对安全性和合规性有高要求的企业及Google Cloud生态用户。 | 强调安全加固（Shell注入防御、环境隔离）、策略管理和自动化评估基础设施。 | **生态整合阵痛**：被并入Antigravity的焦虑，配额与旧版工作流保留问题，OAuth认证稳定性。 |
| **GitHub Copilot CLI** | **深度MCP与GitHub生态集成**。依托GitHub庞大的用户基础，社区需求集中在MCP高级特性（资源、订阅）和BYOK模型。 | 所有使用GitHub的开发者，尤其是追求简洁配置和协同工作流的用户。 | 功能迭代相对稳健，社区需求的MCP/BYOK进化方向明确。 | **MCP生态深化受阻**：OAuth刷新、CAPI硬限制、MCP资源支持缺失。 |
| **Kimi Code CLI** | **协议兼容与轻量化**。社区问题规模小，主要卡点在API层协议兼容性和模型行为退化。 | 使用Kimi模型的开发者，可能处于早期采用阶段。 | 功能基础，**模型行为一致性和API兼容性是当前发展的主要瓶颈**。 | **模型可用性风险**：k2.5模型Tool Calling失效，MCP Schema被拒。 |
| **OpenCode** | **极致UI自定义与高扩展性**。付费订阅社区庞大，对UI布局、模型管理、内存性能有极高要求。 | 追求高度自定义UI体验的开源爱好者，以及尝试多种模型的测试者。 | UI/UX迭代活跃（布局交换、推理字段支持），但付费服务稳定性和内存泄漏是核心挑战。 | **付费服务可用性与系统稳定性**：订阅模型批量报错、新旧布局切换、内存泄漏。 |
| **Qwen Code** | **自动记忆与子代理优化**。重点打磨web-shell体验和auto-memory机制，社区对子代理和自动化体验要求高。 | Qwen模型用户，尤其是需要后台自动化和记忆功能的开发者。 | 在自动记忆、子代理、Git集成和web-shell体验等方面进行精细化打磨，迭代节奏快。 | **子代理与记忆健壮性**：模型突变、记忆索引问题、OpenAI兼容适配。 |

### 5. 社区热度与成熟度

- **最高热度与社区驱动 (Claude Code, Qwen Code, OpenAI Codex)**：这些项目的Issues和PR互动量极高，开发者参与度和响应速度都非常快。其中Claude Code和Qwen Code的迭代节奏最快，处于功能爆炸式增长与Bug高频修复的“青春期”。
- **高热度但有隐忧 (OpenAI Codex, OpenCode)**：社区反映热烈，但问题集中在基础体验（性能、付费）而非新功能，说明**用户基础庞大的同时，在核心体验上存在“失分”**。OpenAI Codex的Windows性能问题尤为突出，可能影响其在特定用户群中的口碑。
- **稳健发展与成熟 (GitHub Copilot CLI, Gemini CLI)**：社区讨论更聚焦于**深化现有能力**（如MCP高级功能、企业级配置）而非基础功能修复。这表明工具本身已相对稳定可靠，进入了功能打磨和生态系统扩展阶段。
- **早期或调整期 (Kimi Code CLI)**：社区活跃度最低，问题数量少但影响面广（MCP兼容、模型调用失效），可能处于用户规模扩大前的功能打磨期。

### 6. 值得关注的趋势信号

1.  **MCP从“概念验证”到“生产级考验”**：MCP已成为行业标准，但稳定性是下一个挑战。开发者对MCP的诉求已从“能否连接”转向“能否可靠交付**所有类型**数据（工具、资源、提示）”，并期望有完善的**认证（OAuth）和更新（订阅）机制**。MCP服务器实现的健壮性和协议的语义校验将是未来竞争焦点。

2.  **Agent的“无人驾驶”信任危机**：当Agent从“建议助手”变为“后台执行者”，任何**资源泄漏（fd、Token）、死循环、静默崩溃**都会直接导致生产环境故障，用户信任度会急剧下降。这要求开发者必须内置更强的**资源预算、退避策略、可观测性和故障自愈机制**。

3.  **Windows平台成为“守门人”**：多个顶级CLI工具在Windows上表现不佳，这并非偶然。Windows开发者的群体庞大且对工具体验要求严格。能在Windows上提供稳定、低资源占用、符合其系统习惯体验的工具，将获得巨大的增量市场。这不仅仅是跨平台兼容，更是**对Windows生态（如WMI、进程管理、编码、PowerShell）的深度理解和适配**。

4.  **“订阅税”与模型兼容性焦虑**：模型迭代速度远超CLI工具适配速度，导致付费用户面临“新模型突然不可用”、“订阅等级与功能不匹配”等困惑。**建立清晰、透明、一致的订阅与授权映射关系，并为不同模型提供统一的兼容层**，是留住付费用户的关键。

5.  **自动化基础设施投入成隐形竞争**：Gemini CLI和Qwen Code的社区动态中，都提到了**自动Bug修复流水线、评估覆盖率报告、案例分类机器人**等基础设施的投入。这表明，当功能趋同后，**工程的成熟度和质量保障能力**将成为决定工具能否持续进化的内在因素。

**对开发者的建议**：
- **短期**：评估自身使用场景，优先选择在您主要操作系统（尤其是Windows）上表现稳定的工具。若依赖Agent自动化，需有处理无限重试和资源泄漏的心理准备。
- **中期**：关注MCP生态的成熟度，选择在MCP数据层面兼容性更强的工具，避免因协议升级导致集成中断。
- **长期**：优先考虑对**可观测性（如遥测、日志）**和**资源预算管理**投入更多的工具，这是Agent从“玩具”走向“生产工具”的必备条件。同时，留意各工具在 **“自动修复”和“质量保障”** 方面的基础设施投入，这预示着其长期维护能力。

---

## 各工具详细报告

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

好的，作为一名专注 Claude Code 生态的技术分析师，以下基于 `anthropics/skills` 仓库（数据截止 2026-07-22）生成的社区热点报告。

---

### Claude Code Skills 社区热点报告 (截止 2026-07-22)

#### 1. 热门 Skills 排行

以下 5~8 个 Pull Requests 是社区讨论最集中、关注度最高的 Skills 提案：

| 排名 | Skill (PR) | 功能说明 | 社区讨论热点 | 当前状态 |
| :--- | :--- | :--- | :--- | :--- |
| 1 | **skill-creator 修复** (PR #1298) | 修复 `run_eval.py` 报告错误的 `recall=0%` 的问题，该问题导致描述优化循环失效。 | 核心工具链的可靠性。该问题在多个平台上被独立复现，严重影响 Skill 开发体验。 | **OPEN** |
| 2 | **document-typography** (PR #514) | 对 AI 生成的文档进行排版质量控制，修复孤行、寡段、编号错位等排版问题。 | 针对 AI 生成的文档，用户普遍对呈现质量有较高的关注，期望进行格式优化。 | **OPEN** |
| 3 | **pdf 修复** (PR #538) | 修复 `skills/pdf/SKILL.md` 中引用文件名大小写不一致的问题，确保在大小写敏感系统上的兼容性。 | 虽然是简单的 bug 修复，但体现了社区对 Skill 在不同平台上稳定运行的关注。 | **OPEN** |
| 4 | **ODT 支持** (PR #486) | 新增对 OpenDocument (.odt, .ods) 格式的创建、填充、读取与转换能力。 | 社区对处理开源、标准化办公文档格式的需求强烈，是常见办公自动化场景的补全。 | **OPEN** |
| 5 | **frontend-design 改进** (PR #210) | 对现有前端设计 Skill 进行修订，提升其清晰度、可操作性和内部逻辑一致性。 | 社区不仅关心新 Skill，也关注存量 Skill 的实用性，期望指令能精确指导 Claude 行为。 | **OPEN** |
| 6 | **元技能: 质量与安全分析器** (PR #83) | 新增两个元技能用于分析其他 Skills 的质量和安全性。 | 社区开始关注 Skills 自身的质量和安全性，显示出社区正在走向成熟和规范化。 | **OPEN** |
| 7 | **DOCX / YAML 修复** (PR #541, #539) | 修复 DOCX Skill 因 ID 冲突导致的文档损坏；修复 skill-creator 因 YAML 特殊字符导致的解析错误。 | 工具链的健壮性和边缘情况处理是开发者社区的长期诉求。 | **OPEN** |

#### 2. 社区需求趋势

从活跃的 Issues 中，可以提炼出社区最期待的几个新 Skill 方向：

-   **安全与信任**: 社区对 **官方与社区 Skills 的边界** 关注度最高 (Issue #492, 43 条评论)。用户担忧 `anthropic/` 命名空间下的社区 Skill 可能引起信任滥用。这催生了对 **Skill 安全审计** 和 **签名/认证机制** 的需求。
-   **组织级协作**: 企业用户强烈需要 **组织内部 Skills 的共享和分发** 能力 (Issue #228, 14 条评论)。当前手动下载/上传的流程效率极低，一个内置的共享库是热门需求。
-   **核心工具链稳定性**: 与 skill-creator 相关的 **bug 修复和功能改进** (Issue #556, 12 条评论; Issue #202, 8 条评论) 持续是社区的焦点。`run_eval.py` 等脚本的稳定性问题直接影响了社区开发者的创意落地。
-   **Agent 治理与长期记忆**: 社区开始探索 **Agent 系统的安全模式** (Issue #412) 和 **高效的长期记忆管理** (Issue #1329)，这表明用户场景正从单次对话向复杂的多轮 Agent 任务演进。

#### 3. 高潜力待合并 Skills

以下 PR 评论活跃，尚未合并，属于社区期望近期落地的高潜力 Skills：

-   **skill-creator 修复系列** (PR #1298, #1099, #1050, #362, #361): 多个 PR 聚焦于解决 Windows 兼容性、UTF-8 编码、YAML 解析和评估脚本的可靠性问题。这是 skill-creator 工具的**全面稳定性升级**，一旦完全修复，将极大改善开发者体验。
-   **self-audit (自我审计)** (PR #1367): 一个非常实用的元技能，能在交付前自动进行机械文件验证和四维推理质量审计。它响应了社区对 **AI 输出质量保证** 的普遍需求，格式新颖，实用价值高。
-   **color-expert (颜色专家)** (PR #1302): 一个专注的颜色知识 Skill，覆盖了多种命名系统和色彩空间选择指南。它代表了 **专业知识垂直化** 的趋势，可能以较低成本产生较高评价。
-   **testing-patterns (测试模式)** (PR #723): 提供完整的测试模式覆盖，包括单元测试、React 组件测试、E2E 测试等。这直接响应了开发者对 **代码质量和测试生成自动化** 的长期需求。
-   **security: XSS 防御** (PR #361): 虽然不是直接新增一个 Skill，但其目标是防止 YAML 解析中的代码注入，是提升 **生态安全基线** 的必要修复，被反复提及。

#### 4. Skills 生态洞察

**一句话总结**: 当前社区最集中的诉求是 **“确保核心工具链 (skill-creator) 稳定可靠，并建立社区 Skills 的安全信任与治理机制”**，而非单纯追求新 Skills 的数量。

这表明 Claude Code Skills 生态正从“跑马圈地”的数量增长阶段，进入关注 **质量、稳定性和安全** 的深度优化阶段。

---

## 📰 Claude Code 社区动态日报 | 2026-07-22

**数据来源：** [anthropics/claude-code](https://github.com/anthropics/claude-code)

---

### 1. 今日速览

- 发布小版本 **v2.1.217**，新增 emoji 短代码自动补全功能及会话写入失败警告。
- 社区热议 **Remote Control 自动重连失效**（99 👍，57 评论），以及**全屏模式下完全无法滚动**的 Bug。
- 多起关于 **Fable 5 模型在 CLI 中不可用**（尽管订阅有效）的问题集中涌现，成为新模型上线的典型阵痛。

---

### 2. 版本发布

#### 🔖 v2.1.217
- **新增**：在提示输入区域支持 emoji shortcode 自动补全。例如输入 `:heart:` 插入 ❤️，输入 `:hea` 可获取建议列表。可通过 `emojiCompletionEnabled` 配置关闭。
- **新增**：当会话转录写入失败（如磁盘已满）或由于继承原因导致会话保存关闭时，显示警告。

---

### 3. 社区热点 Issues（Top 10）

#### 1️⃣ [#34255 Remote Control 自动重连失效](https://github.com/anthropics/claude-code/issues/34255)
- **标签**：`bug` `macos` `ios`  
- **摘要**：连接断开后不会自动重连，无任何提示，用户只能手动干预。出现已有 4 个月仍在讨论，社区反应强烈（99 👍，57 评论），是当前最热门 Issue。
- **社区反应**：多位用户报告在 iOS 和 macOS 上均复现，期望尽快修复。

#### 2️⃣ [#72215 全屏模式下滚动彻底失效](https://github.com/anthropics/claude-code/issues/72215)
- **标签**：`bug` `windows` `area:tui`  
- **摘要**：开启全屏渲染模式后，输出超过一屏时无滚动条，方向键、PageUp/Down 均无响应。最新评论指出该问题严重影响日常使用。
- **社区反应**：评论 6 条，赞 4，但严重性高。

#### 3️⃣ [#76357 Windows MSIX 更新时文件锁定导致无法启动](https://github.com/anthropics/claude-code/issues/76357)
- **标签**：`bug` `windows` `desktop`  
- **摘要**：每次更新都弹出“另一程序正在使用此文件”，必须重启系统才能恢复。影响所有 MSIX 用户。
- **社区反应**：有详细复现步骤，开发者已标记 `has repro`，期待下个版本修复。

#### 4️⃣ [#25042 控制提交问题后的自动滚动行为](https://github.com/anthropics/claude-code/issues/25042)
- **标签**：`enhancement` `macos` `area:tui`  
- **摘要**：目前提交问题后终端自动滚到底部，用户希望增加配置选项，允许保持当前视口位置、仅在新输出出现时滚动等。
- **社区反应**：12 评论，31 赞，该需求呼声很高，属于体验优化。

#### 5️⃣ [#79992 macOS 上 filesystem 类 MCP 工具调用被静默丢弃](https://github.com/anthropics/claude-code/issues/79992)
- **标签**：`bug` `macos` `area:mcp`  
- **摘要**：从 2026-07-21 夜间开始，所有 filesystem 类 MCP 工具的调用在通过审批门后静默丢失，本地 MCP 服务器从未收到 `tools/call`。
- **社区反应**：刚提交的 Issue，已有 4 评论，开发者迅速响应，提供回滚和重装均无效，疑为上游问题。

#### 6️⃣ [#79921 桌面端与 VS Code 中会话冻结](https://github.com/anthropics/claude-code/issues/79921)
- **标签**：`bug`  
- **摘要**：多个会话同时存在时，某一个会话收到输入会导致其他会话全部冻结，直到该会话处理完毕。Web 版本正常。
- **社区反应**：3 评论，用户描述清晰，可能与事件循环或进程调度有关。

#### 7️⃣ [#78826 MCP 服务器连接成功但工具不暴露给模型](https://github.com/anthropics/claude-code/issues/78826)
- **标签**：`bug` `macos` `vscode` `area:mcp`  
- **摘要**：远程 HTTP MCP 服务器（如 Google Gmail）OAuth 成功，`/mcp` 显示已连接，`tools/list` 正常返回，但模型从未收到任何工具调用。
- **社区反应**：5 评论，用户提供了详细的日志和复现步骤，推测是协议版本不匹配或过滤逻辑问题。

#### 8️⃣ [#75037 后台 Agent 会话快速终止 & Worker Crash Loop](https://github.com/anthropics/claude-code/issues/75037)
- **标签**：`bug` `macos` `area:agent-view`  
- **摘要**：使用 `claude --bg` 和 `claude agents` 管理多个后台会话时，观察到会话快速终止、附着时 worker 崩溃循环以及后台任务完成记录丢失三方面问题。
- **社区反应**：3 评论，出自高频使用自动化场景的用户，对生产环境影响大。

#### 9️⃣ [#78769 新模型实验隐藏了 Task/TodoWrite 工具](https://github.com/anthropics/claude-code/issues/78769)
- **标签**：`bug` `windows` `area:tools`  
- **摘要**：在最新模型（如 `claude-fable`）上运行时，`TaskCreate`/`TodoWrite` 等关键工具在交互式会话中被隐藏，且环境变量覆盖无效。用户怀疑是 `tengu_vellum_ash` A/B 实验所致。
- **社区反应**：2 评论，属于新模型上线导致的工具可见性 Bug。

#### 🔟 [#79920 后台会话守护进程 fd 风暴导致系统崩溃](https://github.com/anthropics/claude-code/issues/79920)
- **标签**：`bug`  
- **摘要**：长时间运行多个后台 Agent 会话后，文件描述符耗尽（ENFILE），进而导致 `launchd` SIGBUS 和内核恐慌。用户为 macOS 高密度自动化部署场景。
- **社区反应**：2 评论，属于资源泄漏严重问题，需要紧急修复。

---

### 4. 重要 PR 进展（Top 10）

#### 1️⃣ [#80008 添加 Twilight 插件：规范优先的设计/实现技能](https://github.com/anthropics/claude-code/pull/80008)
- **类型**：新功能（插件）  
- **摘要**：引入一个策略性插件，通过“设计-实现-焦点堆栈”模式释放 Claude 在实际项目中的能力，需要大量修改才能合入，但展示了开发方向。

#### 2️⃣ [#79889 fix(hookify): 使 hook 入口点无需 `CLAUDE_PLUGIN_ROOT` 即可运行](https://github.com/anthropics/claude-code/pull/79889)
- **类型**：修复  
- **摘要**：修复了所有 hook 入口点依赖环境变量才能添加 `sys.path` 的问题，现在未设置时也能正确工作。

#### 3️⃣ [#79873 fix(hookify): event: prompt 规则从未触发（payload key 为 `prompt`）](https://github.com/anthropics/claude-code/pull/79873)
- **类型**：修复  
- **摘要**：Claude Code 发送用户提交文本时使用 key `prompt`，但 `_extract_field` 只处理了 `user_prompt`，导致 `event: prompt` 规则永远不触发。PR 修正了字段匹配。

#### 4️⃣ [#79647 fix(hookify): 使导入独立于插件目录名称](https://github.com/anthropics/claude-code/pull/79647)
- **类型**：修复  
- **摘要**：修复了当插件目录名称不是 `hookify` 时导入失败的问题，使插件可被重命名使用。

#### 5️⃣ [#79645 fix(hookify): 以 UTF-8 读取规则和转录文件](https://github.com/anthropics/claude-code/pull/79645)
- **类型**：修复  
- **摘要**：Windows 上默认编码 cp1252 无法解码 UTF-8 规则文件（含箭头、emoji 等），显式指定 UTF-8 解决。

#### 6️⃣ [#79644 fix: 在插件 hook 命令中引用 `${CLAUDE_PLUGIN_ROOT}`](https://github.com/anthropics/claude-code/pull/79644)
- **类型**：修复  
- **摘要**：macOS 下插件根路径含空格（`~/Library/Application Support/...`），未引用的变量导致 shell 分词失败，hook 无法执行。

#### 7️⃣ [#79643 docs(commit-commands): 修正 /commit-push-pr 描述与实际行为一致](https://github.com/anthropics/claude-code/pull/79643)
- **类型**：文档  
- **摘要**：原文档宣称 PR 描述基于分支差异生成，但实际注入的只有 `git status/diff/branch`，无 `git log`。修正文档使其与代码一致。

#### 8️⃣ [#79620 feat: 添加文本转语音朗读 Hook（无障碍）](https://github.com/anthropics/claude-code/pull/79620)
- **类型**：新功能  
- **摘要**：为无障碍和免提工作流新增 TTS Hook，支持 Linux（Piper）、macOS（say）、Windows（PowerShell），能识别 Markdown 并跳过代码块。

#### 9️⃣ [#79640 fix(ralph-wiggum): 使用 disable-model-invocation 保持命令仅用户可用](https://github.com/anthropics/claude-code/pull/79640)
- **类型**：修复  
- **摘要**：之前错误使用了 `hide-from-slash-command-tool`（无效键），现在改为 `disable-model-invocation`，确保模型不能自动触发循环命令。

#### 🔟 [#78532 gateway/gcp: 可选的内部 ALB + PG16 Cloud SQL 版本修复](https://github.com/anthropics/claude-code/pull/78532)
- **类型**：改进  
- **摘要**：修复 GCP Terraform 示例中 PG16 实例默认使用共享核心层失败的问题，并增加可选内部 ALB 支持。

---

### 5. 功能需求趋势

- **MCP 工具链稳定性**：多个 Issue 报告 MCP 服务器连接后工具不暴露、调用静默丢弃、双向丢失等问题，社区对 MCP 的可靠性要求越来越高。
- **后台 Agent 与多会话管理**：后台会话崩溃、文件描述符泄漏、会话冻结等问题凸显了多 Agent 并行场景下的资源治理需求。
- **模型可用性与订阅一致性**：多次出现 Fable 5 等新模型在 CLI 中要求额外信用点，而在桌面端可正常使用的问题，用户期望统一授权逻辑。
- **TUI 交互体验**：全屏滚动失效、AskUserQuestion 输入无响应、自动滚动行为不可控等，表明终端 UI 的精细化交互仍需打磨。
- **Windows 平台特别关注**：MSIX 更新文件锁定、编码处理、路径空格等 Windows 独有 Bug 频繁出现，平台适配力度有待提升。

---

### 6. 开发者关注点

- **高频痛点**：自动重连失效（Remote Control）和全屏滚动问题影响日常使用，开发者在 Issues 中表达了强烈的修复期望。
- **新模型上线的阵痛**：Fable 5 在 CLI 不可用且与订阅状态不一致，导致付费用户困惑，需要立刻排查授权接口。
- **MCP 工具稳定性**：多起“连接成功但工具不可见/调用丢失”的 Bug 让依赖 MCP 集成的开发者感到挫败，尤其是 Gmail、filesystem 等高频场景。
- **资源泄漏**：后台 Agent 导致 fd 耗尽和内核恐慌，对 CI/CD 和自动化部署用户影响巨大，需要优先修复。
- **插件/Hook 机制正在打磨**：大量修复 PR 集中在 `hookify` 插件（编码、导入路径、目录名依赖），说明插件生态处于早期完善阶段，社区参与积极。

---

*以上为 2026-07-22 的社区动态日报，数据截止至 UTC 时间 2026-07-22 23:59。*

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

好的，作为专注于 AI 开发工具的技术分析师，我将根据您提供的 GitHub 数据，为您生成 2026 年 7 月 22 日的 OpenAI Codex 社区动态日报。

---

### **OpenAI Codex 社区动态日报 | 2026-07-22**

#### **今日速览**
今日社区最值得关注的动态有三：一是 **Codex 发布了 v0.145.0 稳定版**，引入了实验性的分页线程历史与多智能体支持，架构上迈出重要一步；二是 **Windows 平台的性能问题持续发酵**，大量 Issue 揭露了由任务管理（taskkill）和 Git 扫描引起的 WMI 风暴及 CPU 占用飙升问题，成为开发者最强烈的痛点；三是社区对 **RTL（从右至左）文本支持** 的呼声再次高涨，凸显了国际化体验的短板。

---

#### **版本发布**
- **[Release] rust-v0.145.0 (`0.145.0`)**
  - **核心亮点**：引入了多项实验性特性，标志着 Codex 在会话管理和多智能体协作方面的重大进展。
  - **主要更新**：
    - **分页线程历史**：新增实验性的分页式线程历史记录，支持高效的对话恢复、搜索、会话名称持久化、子智能体支持以及记忆功能。
    - **`/import` 命令扩展**：扩展了 `/import` 命令的功能，现在可以从 Cursor 和 Claude Code 中迁移设置、MCP 服务器、插件、会话、命令和项目配置，降低了用户迁移成本。
  - **其他发布**：同步发布了 `rust-v0.145.0-alpha.28`、`alpha.29` 和 `alpha.30` 三个先行版本，为正式版迭代做准备。

#### **社区热点 Issues**
1.  **[#33776] [Windows] Taskkill 进程风暴导致系统卡顿**
    - **重要性**：🔥🔥🔥🔥🔥 评论/点赞数最高，报告称 `ChatGPT.exe` 会衍生出数百个 `taskkill.exe` 和 `conhost.exe` 进程，直接导致 WMI 崩溃和 DWM（桌面窗口管理器）性能下降，严重影响正常使用。
    - **链接**: [openai/codex Issue #33776](https://github.com/openai/codex/issues/33776)
2.  **[#30527] [Windows] Defender 行为监控与高 CPU**
    - **重要性**：🔥🔥🔥🔥 广泛影响 Windows 10 用户，更新后 Codex 应用会触发 Microsoft Defender 的高频行为监控，导致 CPU 持续高占用。
    - **链接**: [openai/codex Issue #30527](https://github.com/openai/codex/issues/30527)
3.  **[#19504] [App] 缺乏完整的 RTL 文本方向支持**
    - **重要性**：🔥🔥🔥🔥 长期存在的国际化痛点，阿拉伯语和希伯来语用户反应强烈，文本对齐、标点符号和整体阅读方向均有问题，影响核心体验。
    - **链接**: [openai/codex Issue #19504](https://github.com/openai/codex/issues/19504)
4.  **[#34260] [Windows] 无界的进程清理风暴**
    - **重要性**：🔥🔥🔥🔥 与 #33776 系同一类问题，进一步描述了 Windows 桌面端可能陷入无限进程清理循环，耗尽 WMI 提供程序配额。
    - **链接**: [openai/codex Issue #34260](https://github.com/openai/codex/issues/34260)
5.  **[#28078] [Extension] Xcode 27 Beta 登录失败**
    - **重要性**：🔥🔥🔥 特定于 macOS 平台的 IDE 集成问题，使用 ChatGPT Pro 账号（需邮箱 OTP 验证）登录 Xcode 扩展失败，而普通 Go 账号却正常，暴露出认证流程的兼容性问题。
    - **链接**: [openai/codex Issue #28078](https://github.com/openai/codex/issues/28078)
6.  **[#29499] [Windows] WMI Provider Host 高 CPU**
    - **重要性**：🔥🔥🔥 另一个 WMI 相关性能问题，启动后 WMI Provider Host 持续高 CPU，与上述清理风暴问题共同构成了 Windows 平台的主要性能障碍。
    - **链接**: [openai/codex Issue #29499](https://github.com/openai/codex/issues/29499)
7.  **[#29911] [Windows] 创建空 .git 目录并反复扫描**
    - **重要性**：🔥🔥🔥 揭示了 Codex 在 Windows 下异常的文件系统行为，创建空的 `.git` 目录并持续扫描，不仅导致自身性能问题，还引发了 Windows Defender 的高 CPU 占用。
    - **链接**: [openai/codex Issue #29911](https://github.com/openai/codex/issues/29911)
8.  **[#34014] [Windows] 独立应用与 VS Code 扩展性能差异大**
    - **重要性**：🔥🔥🔥 用户发现同一个项目，在 VS Code 扩展中运行正常，但在独立 Windows 应用中就会导致 WMI 占用 90-100% CPU，暗示了独立应用可能存在独有的缺陷或性能瓶颈。
    - **链接**: [openai/codex Issue #34014](https://github.com/openai/codex/issues/34014)
9.  **[#30926] [Windows] 内核对象增长**
    - **重要性**：🔥🔥 技术深度较高，报告指出 Codex Desktop 通过反复创建 `git.exe` 进程，导致 Windows 内核 `Token` 对象持续增长，可能引发系统层面的资源泄漏。
    - **链接**: [openai/codex Issue #30926](https://github.com/openai/codex/issues/30926)
10. **[#34473] [Windows] Git 根目录解析重试循环导致系统饱和**
    - **重要性**：🔥🔥🔥 最新报告的问题（昨天），一个无法解析的 Git 根目录会引发无退避（no-backoff）的重试循环，导致 84% 的 git 调用超时，机器完全饱和，是近期 Windows 性能问题的又一具体表现。
    - **链接**: [openai/codex Issue #34473](https://github.com/openai/codex/issues/34473)

---

#### **重要 PR 进展**
1.  **[#34655] 尊重认证刷新的代理路由配置**
    - **说明**：修复了 `ChatGPT` Token 刷新请求未遵循系统配置代理策略的问题。
    - **链接**: [openai/codex PR #34655](https://github.com/openai/codex/pull/34655)
2.  **[#34654] 渲染远程环境路径的差异显示**
    - **说明**：改进了在不同路径约定的远程环境中显示代码差异（diff）的能力，增强了多环境支持。
    - **链接**: [openai/codex PR #34654](https://github.com/openai/codex/pull/34654)
3.  **[#34644] 验证 Git 插件 SHA 检出**
    - **说明**：修复了一个潜在的供应链安全风险：当请求的 `SHA` 与远程分支同名时，Git 可能错误地检出分支而非特定提交，现在会验证检出的提交 `HEAD`。
    - **链接**: [openai/codex PR #34644](https://github.com/openai/codex/pull/34644)
4.  **[#34645] 始终分配响应项 ID**
    - **说明**：确保在流式、分叉、压缩等所有会话场景中，客户端创建的响应项都有唯一的 `ID`，提高了数据处理的一致性和可追溯性。
    - **链接**: [openai/codex PR #34645](https://github.com/openai/codex/pull/34645)
5.  **[#34643] 将登录 HTTP 构建迁移至 HttpClient**
    - **说明**：代码重构的一部分，将直接使用 `reqwest` 库的逻辑统一迁移到内部的 `HttpClient`，旨在统一网络请求管理和代理策略。
    - **链接**: [openai/codex PR #34643](https://github.com/openai/codex/pull/34643)
6.  **[#34641] 加固沙盒执行环境的代理设置**
    - **说明**：修复了 Linux `bubblewrap` 沙盒中代理桥接器无法连接的问题，并确保了对 `WS_PROXY` 协议的支持。
    - **链接**: [openai/codex PR #34641](https://github.com/openai/codex/pull/34641)
7.  **[#34640] 更新 Windows 进程树测试**
    - **说明**：配合底层的 `PTY`（伪终端）和管道启动器变更，更新了 Windows 平台的进程树测试，以支持显式指定继承的 `FD`（文件描述符）。
    - **链接**: [openai/codex PR #34640](https://github.com/openai/codex/pull/34640)
8.  **[#34636] 在开启新的对话轮次失败时保持 TUI 打开**
    - **说明**：用户体验改进，当 `turn/start` 请求失败时，终端界面（TUI）不再直接退出，而是显示错误信息并允许用户继续操作。
    - **链接**: [openai/codex PR #34636](https://github.com/openai/codex/pull/34636)
9.  **[#34629] 加固 Windows 提权沙盒启动**
    - **说明**：增强了 Windows 环境下以管理员权限运行沙盒的逻辑，通过更精确的 DACL（任意访问控制列表）权限检查，避免了因权限不足或权限残留引发的启动问题。
    - **链接**: [openai/codex PR #34629](https://github.com/openai/codex/pull/34629)
10. **[#34625] 修复 Windows TUI 导航键处理**
    - **说明**：解决了 Windows 终端在某些模式下，方向键以原始转义字节形式输入，导致 TUI 无法识别导航命令的问题。
    - **链接**: [openai/codex PR #34625](https://github.com/openai/codex/pull/34625)

---

#### **功能需求趋势**
从今日的 Issues 数据中可以提炼出以下核心社区关注点：
1.  **Windows 平台稳定性与性能**：**这是压倒性的第一优先级**。大量 Issue（超过十几个）集中在 Windows 应用上，直接相关的问题包括：进程管理失控（taskkill风暴）、Git 反复扫描、WMI 服务崩溃、Defender 冲突、内核对象泄漏等。用户期待一个“安静”且资源友好的后台进程。
2.  **国际化与多语言支持**：以 `#19504` 和 `#21563` 为代表，对 **RTL（阿拉伯语、希伯来语、波斯语）文本的完整支持** 需求强烈且持续。这表明 Codex 的用户群体正在全球范围内扩展，社区希望获得与英文同等质量的书写体验。
3.  **IDE 与平台集成**：`#28078` 指出的 Xcode 登录问题，以及 `#22965` 提出的 SSH 远程连接问题，表明用户对 **非 VS Code 环境（如 Xcode）和远程开发场景** 的深度集成和可靠体验有很高期待。
4.  **子智能体与高级会话管理**：尽管是实验性功能，但用户对 v0.145.0 中提及的“子智能体”表现出兴趣，同时也有 `#33777` 报告了 `spawn_agent` 可能挂起的 Bug，说明该功能的成熟度和健壮性有待提升。
5.  **自定义代理与网络配置**：一系列 PR（如 `#34655`、`#34649`）关注认证和代理路由，反映了企业在复杂网络环境中使用 Codex 的需求正在增长，社区希望 Codex 能无缝适应其现有的网络策略。

---

#### **开发者关注点**
1.  **Windows 性能成“头号公敌”**：从今日反馈看，Windows 桌面应用几乎成为了“问题重灾区”。开发者最核心的痛点是 **“Codex 让我（的电脑）无法工作”**。热门的 Issue 主要集中在：空闲时高 CPU/IO 占用、触发系统防御机制、系统资源泄漏。这严重影响了开发者的日常使用体验和信任度。
2.  **“基础体验”缺失**：尽管 v0.145.0 引入了激动人心的新特性，但社区的热度却被基础性问题占据。开发者反馈最强烈的并不是缺少新 AI 功能，而是 **应用不会拖慢电脑、正确显示我的语言、以及能无缝登录到我的 IDE**。这表明 Codex 需要在“扎实”的基础体验上投入更多精力。
3.  **认证流程的复杂性**：`#28078` 是认证问题的缩影，揭示了不同账号类型（Pro vs Go）、不同平台（Xcode vs Web）间的认证不兼容问题。开发者希望有一套“即开即用”的简单认证机制，而不是在调试失败原因上浪费时间。
4.  **配置与代理的透明性**：关于代理配置的多个 PR 表明，开发者需要 **无需手动干预** 就能让 Codex 遵循公司或个人的网络代理配置。这种“自动融入现有环境”的能力对于企业级用户至关重要。
5.  **创新与稳定性的博弈**：今天发布的新功能（如分页历史、子智能体）很诱人，但社区当前的焦点是 Windows 上那些“嗡嗡作响”的后台进程。这给开发者的信号是：**“请先让现有功能稳定运行，再添加令人兴奋的新功能”**。对于代码生成工具，稳定和可靠是创新得以落地的基础。

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

好的，这是为您生成的 2026-07-22 Gemini CLI 社区动态日报。

---

# Gemini CLI 社区动态日报 | 2026-07-22

## 今日速览

- **安全与核心稳定性修复是今日主旋律**：最新发布的 Nightly 版本 `v0.52.0` 关键修复了 `a2a-server` 的远程代码执行 (RCE) 漏洞。同时，多个高优先级 PR 正在处理 OAuth 认证回归、shell 命令输出上下文溢出以及变量注入绕过等严重影响开发者体验的 Bug。
- **社区对“被合并”的焦虑持续升温**：关于 Gemini CLI 被并入 Antigravity 生态系统的讨论依然热烈，多个高赞 Issue 反映出开发者对工作流破坏、配额受限和项目未来维护的担忧。
- **自动化和评估基础设施投入显著**：关注点从单一功能转向系统化。多个 PR 和 Issue 涉及自动 Bug 修复流水线、评估覆盖率报告以及案件分类机器人 (Caretaker Bot) 的改进，表明项目正加速成熟。

## 版本发布

- **v0.52.0-nightly.20260722.gc776c665b**: 最新的 Nightly 版本。主要包含一项关键的 **安全修复**：
    - `fix(a2a-server): enforce workspace trust and task isolation to prevent RCE`：修复了在 `a2a-server` 中，由于未强制工作区信任和任务隔离导致的潜在**远程代码执行 (RCE)** 漏洞。此修复对于任何运行或连接到 AI Agent 服务的工作流至关重要。

## 社区热点 Issues

1.  **[#27314] [Feature Request] 回归独立 CLI 或支持完整旧版工作流**
    - **为什么重要**：社区反馈最强烈的 Issue 之一（11 条评论，3 个 👍）。用户 `alborotar` 直言被迫整合入 Antigravity 生态系统是“严重的开发者体验和生产力倒退”。这反映了核心用户群对新方向的抵触和对稳定轻量级工具的强烈需求。
    - **社区反应**：讨论集中在如果无法避免迁移，至少应该提供稳定、完整的旧版 OAuth 工作流作为过渡。
    - **链接**: https://github.com/google-gemini/gemini-cli/issues/27314

2.  **[#19979] [Enhancement] 将策略配置从 TOML 迁移至 CUELang**
    - **为什么重要**：TOML 在处理复杂策略规则时的局限性已成共识（10 条评论）。CUELang 作为一门策略语言，能提供更强大的类型检查、约束和验证能力。这是一个影响企业级部署和策略管理的长期需求。
    - **社区反应**：评论者普遍支持这一方向，认为这是项目成熟化的必要步骤。
    - **链接**: https://github.com/google-gemini/gemini-cli/issues/19979

3.  **[#27191] [Bug] 配额突然显示 100% 耗尽且 CLI 无响应**
    - **为什么重要**：这是一个严重影响正常使用的 P2 Bug（6 条评论，2 个 👍）。用户报告即使没有实际使用，配额也会瞬间耗尽并导致 CLI 挂起。这直接关系到付费用户的可用性和开发者对平台的信任。
    - **社区反应**：用户表达了对配额机制不透明和失效的困惑与不满。
    - **链接**: https://github.com/google-gemini/gemini-cli/issues/27191

4.  **[#27187] [Bug] 客户端 429 重试循环导致 Token 消耗失控**
    - **为什么重要**：这是一个代价极其高昂的 Bug（3 条评论）。当遇到服务端限流 (429) 时，客户端未优雅降级，反而进入重试循环，消耗大量 Token，直到用完计费上限。这对使用付费 API Key 的用户影响巨大。
    - **社区反应**：用户描述了精确的复现场景（结合 Home Assistant MCP 服务器），并要求立即修复。
    - **链接**: https://github.com/google-gemini/gemini-cli/issues/27187

5.  **[#27356] [Enhancement] 保留 Google One 订阅中 Gemini CLI 的权益**
    - **为什么重要**：此 Issue 直接触及用户利益（3 条评论，4 个 👍）。用户担心 Antigravity CLI 的限额远不如 Google One 订阅慷慨，强烈要求保留现有订阅权益。这反映了定价和商业策略变化对用户忠诚度的直接影响。
    - **链接**: https://github.com/google-gemini/gemini-cli/issues/27356

6.  **[#24353] [Epic] 健壮的组件级评估**
    - **为什么重要**：这是一项内部 Epics，但反映了项目对质量基础设施的巨大投入（7 条评论）。目标是构建比端到端测试更细粒度的组件级评估，以精准定位 Agent 行为退化的根因。
    - **链接**: https://github.com/google-gemini/gemini-cli/issues/24353

7.  **[#27205] [Bug] 自定义 Skill 中会主动扫描并共享 `.venv` 目录**
    - **为什么重要**：影响 Skill 开发者的 P2 Bug（5 条评论）。当使用 Python 包管理器（如 `uv`）开发 Skill 时，CLI 会忽略 `.gitignore` 将整个 `.venv` 目录暴露给模型，造成巨大的 Token 浪费和隐私风险。
    - **链接**: https://github.com/google-gemini/gemini-cli/issues/27205

8.  **[#21066] [Bug] 恢复会话缺少 `!shell` 命令及其输出**
    - **为什么重要**：一个存在已久的 P2 Bug（6 条评论），严重影响会话恢复体验。用户在恢复长时间运行的工作流时，必须手动回忆之前执行过的 Shell 命令及其结果，导致工作流中断。
    - **链接**: https://github.com/google-gemini/gemini-cli/issues/21066

9.  **[#21956] [Bug] OAuth Token 刷新静默失败导致无限期挂起**
    - **为什么重要**：这是一个关键的用户体验 Bug（5 条评论，P1 优先级）。在长时间运行的低代码/自动化场景中，Token 刷新失败会导致整个会话无限期挂起且无任何错误提示，调试非常困难。
    - **链接**: https://github.com/google-gemini/gemini-cli/issues/21956

10. **[#25166] [Bug] Shell 命令执行后卡死在“等待输入”状态**
    - **为什么重要**：另一个严重影响自动化工作流的执行类 Bug（4 条评论，3 个 👍）。命令明明已经执行完毕，但 CLI 认为它在等待输入，导致下一步操作无法触发。这在 CI/CD 或无人值守场景中是灾难性的。
    - **链接**: https://github.com/google-gemini/gemini-cli/issues/25166

## 重要 PR 进展

1.  **[#28470] fix(a2a-server): 强制工作区信任和任务隔离防止 RCE**
    - **内容**：重构了 `a2a-server` 的启动和隔离逻辑，通过改进环境加载和进程隔离来防止零点击远程代码执行。**（已合并到 v0.52.0）**
    - **链接**: https://github.com/google-gemini/gemini-cli/pull/28470

2.  **[#28403] fix(core): 阻止环境变量注入绕过**
    - **内容**：修复了 `detectBashSubstitution()` 和 `detectPowerShellSubstitution()` 中的安全漏洞，该漏洞允许特定的变量展开模式绕过安全检查。
    - **状态**: 打开
    - **链接**: https://github.com/google-gemini/gemini-cli/pull/28403

3.  **[#28401] fix(shell): 限制发送给模型的 Shell 命令输出大小**
    - **内容**：为了解决单条命令输出过巨（如 `find /`）导致的 Token 浪费和模型响应退化问题，此 PR 为输出内容增加了大小限制。
    - **状态**: 打开
    - **链接**: https://github.com/google-gemini/gemini-cli/pull/28401

4.  **[#28472] fix(core): 顺序验证缓存凭据并恢复回退机制**
    - **内容**：解决了 Gemini Code Assist Agent 模式中的一个关键认证回归问题（退出代码 `41`）。通过顺序验证缓存凭据并恢复 `GOOGLE_APPLICATION_CREDENTIALS` 回退机制，修复了 VS Code 中的认证失败错误。
    - **状态**: 打开
    - **链接**: https://github.com/google-gemini/gemini-cli/pull/28472

5.  **[#28469] fix(core): 模型回退时轮换会话 ID**
    - **内容**：修复了当模型回退到 `gemini-2.5-flash` 时，因使用旧会话 ID 重试而导致的 `[API Error]` 问题。通过轮换会话 ID，确保状态后端能够正确处理新请求。
    - **状态**: 打开
    - **链接**: https://github.com/google-gemini/gemini-cli/pull/28469

6.  **[#28474] feat(core): 为工具调用遥测添加 Skill 名称维度**
    - **内容**：实现了社区长期期望的功能（Issue #18189），在工具调用计数和延迟指标上增加了 `skill_name` 标签，帮助企业用户更好地监控和分析技能性能。
    - **状态**: 打开
    - **链接**: https://github.com/google-gemini/gemini-cli/pull/28474

7.  **[#28305] feat(evals): 添加 Agent 工具调用格式化和失败摘要**
    - **内容**：提升了评估框架的可调试性。当评估失败时，测试运行器会自动打印一份紧凑、带编号的 Agent 工具调用时间线，包含参数、状态和错误详情。
    - **状态**: 已关闭
    - **链接**: https://github.com/google-gemini/gemini-cli/pull/28305

8.  **[#28169] feat(evals): 添加评估覆盖率报告命令**
    - **内容**：引入 `eval:coverage` 命令，通过交叉引用评估库存工具与工具注册表，自动生成内置工具的评估覆盖率报告，帮助开发者发现测试盲点。
    - **状态**: 已关闭
    - **链接**: https://github.com/google-gemini/gemini-cli/pull/28169

9.  **[#28411] feat(caretaker-triage): 在自动关闭 Issue 前发布评论**
    - **内容**：改进了自动化案件分类机器人 (Caretaker Bot) 的用户体验。在自动添加 `auto-close` 标签前，现在会发布一条评论，解释关闭原因并告知用户如何重新打开或提供更多细节。
    - **状态**: 打开
    - **链接**: https://github.com/google-gemini/gemini-cli/pull/28411

10. **[#28433] feat(pr-generator-orchestrator): 实现迭代 Bug 修复状态机**
    - **内容**：这是一个大型 PR，实现了 SSR Pipeline 的核心编排层，包括 Firestore 并发锁定、迭代 AI Agent 编码循环、ESLint 静态分析和差异限制检查，构建了自动生成修复代码的基础设施。
    - **状态**: 打开
    - **链接**: https://github.com/google-gemini/gemini-cli/pull/28433

## 功能需求趋势

从今日的 Issues 和 PR 中，可以提炼出社区最关注的几个功能方向：

1.  **安全加固 (Security Hardening)**：社区和开发者对安全性的关注度极高。具体体现在：
    - **注入防御**：持续修复 shell 变量展开（`$VAR`）和命令注入漏洞。
    - **环境隔离**：要求在工作区和任务级别进行更严格的隔离（如 #28470, #27367）。
    - **策略管理**：期待转向更强大的策略语言（CUELang）来编写和执行安全规则（#19979）。
    - **输入验证**：希望在自定义 Skill 中支持正则表达式以增强输入验证和数据提取（#19259）。

2.  **Agent 工作流健壮性 (Agent Workflow Robustness)**：用户对 Agent 的自主性和可靠性提出了更高要求，修复方向集中在：
    - **会话恢复**：修复恢复会话丢失历史 Shell 命令的问题（#21066）。
    - **重试逻辑**：优化客户端 429 限流时的重试策略，避免死循环和 Token 浪费（#27187）。
    - **输出边界**：限制 Agent 执行 Shell 命令的输出大小，防止上下文溢出和 Token 燃烧（#28401）。
    - **死锁与等待**：修复命令执行后卡死在“等待输入”状态的问题（#25166）。

3.  **企业级与配置管理 (Enterprise & Configuration)**：
    - **更强大的策略语言**：从 TOML 迁移至 CUELang 以应对复杂策略（#19979）。
    - **精细化的遥测**：希望在工具调用遥测中添加 `skill_name` 维度，以便进行性能分析和容量规划（#18189, #28474）。
    - **自定义安全检查**：允许用户注册外部的安全检查器，以满足内部合规要求（#27185）。

4.  **平台稳定性与配额公平 (Platform Stability & Quota Fairness)**：
    - **配额问题凸显**：多个 Issue 反映了配额机制的不透明和计算错误（#27191, #27181）。
    - **生态系统迁移阵痛**：大量请求集中在保留旧版 CLI 工作流和 Google One 订阅权益，表明用户对新生态系统的配额和商业策略高度焦虑（#27314, #27356）。

## 开发者关注点

- **认证和配额是最大的痛点**：OAuth Token 静默失效（#21956）、认证回退导致 Agent 崩溃（#28472）、以及配额无故 100% 耗尽（#27191）是最令人沮丧的 Bug。开发者需要稳定、透明且可预测的认证和计费系统。
- **Agent 自动化的不可预测性**：Agent 在执行 Shell 命令时会遇到各种预期外的问题，如 `&&` 在老旧 PowerShell 上失效（#27097）、命令输出无限制地注入上下文（#28401）以及执行后卡死（#25166），这让无人值守的工作流变得不可靠。
- **从“被整合”到对未来的不确定性**：社区中存在一种强烈的“失去控制感”。开发者们不仅关心当前 Bug，更担忧项目长期走向（#27327）。他们抗拒被迫迁移到他们认为配额更差的 Antigravity 平台（#27314, #27356, #27265）。
- **Skill 开发体验的摩擦**：`/.venv` 等构建产物被自动扫描（#27205）和缺乏正则表达式支持（#19259）等细节问题，正在拖慢高级用户开发自定义 Skill 的体验。

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI 社区动态日报 (2026-07-22)

## 今日速览
- 发布 v1.0.74‑0，新增 `/model plan` 命令，可在计划模式下临时切换模型。
- MCP 生态持续成为社区焦点：OAuth 远程 MCP 服务器的刷新令牌失效问题、MCP 资源/订阅支持呼声高，同时“Loading 卡死”类问题集中爆发。
- 多个性能/稳定性 Bug 被标记为 `triage`，包括 `tgrep` 索引器 OOM、子进程僵尸堆积、CAPI 5 MB 限制未压缩等。

## 版本发布
**v1.0.74‑0**  
- **新增**：`/model plan`（或 `/model --plan`）命令，可在计划模式下临时切换模型（传入模型 ID、`off` 清除、或不带参数打开选择器）。离开计划模式后自动恢复会话模型。  
- **改进**：恢复搜索功能现在能忽略空白差异匹配会话标题。

## 社区热点 Issues（10 个最值得关注）

1. **#2282 – 无法连接 MCP 服务器**（已关闭，11 评论）  
   WinGet 安装后报错 `Failed to connect to MCP server 'github-mcp-server'`。虽然已关闭，但反映 Windows 下 MCP 连接稳定性的痛点。  
   [链接](https://github.com/github/copilot-cli/issues/2282)

2. **#1305 – 支持远程 OAuth MCP 服务器的 CIMD（动态客户端注册）**（26 👍，4 评论）  
   目前 OAuth 远程 MCP 需要预注册客户端，CIMD 可“即时”注册，简化配置。社区高赞需求。  
   [链接](https://github.com/github/copilot-cli/issues/1305)

3. **#4188 – Plan-mode 回归：屏蔽 shell 命令**（3 评论，2 👍）  
   最新版本中计划模式禁止执行 shell 命令（如 `gh`），破坏了原本用于丰富计划的工具调用，被社区视为严重回归。  
   [链接](https://github.com/github/copilot-cli/issues/4188)

4. **#2193 – `/fleet` 子代理默认模型配置**（14 👍，3 评论）  
   用户希望能在全局/项目级别为 `/fleet` 生成的子代理设定默认模型，避免每次在提示中重复指定。  
   [链接](https://github.com/github/copilot-cli/issues/2193)

5. **#4183 – 自动压缩未阻止 CAPI 5 MB 请求体限制**（5 👍，2 评论）  
   长会话中工具调用历史累积达到 5 MB 限制后，即使模型上下文未满，也无法继续调用 API。自动压缩不能解决“body 大小”问题。  
   [链接](https://github.com/github/copilot-cli/issues/4183)

6. **#4163 – copilot CLI 1.0.71 未收割子进程，僵尸进程堆积**（2 评论）  
   每个会话每分钟泄漏约 2 个僵尸进程，长时间运行后影响系统资源。  
   [链接](https://github.com/github/copilot-cli/issues/4163)

7. **#1518 – 支持 MCP resources 和 prompts**（14 👍，2 评论）  
   目前只支持 MCP 的 tools 原语，社区强烈要求支持 resources（资源读取）和 prompts（对话模板）以拓展自动化能力。  
   [链接](https://github.com/github/copilot-cli/issues/1518)

8. **#4012 – BYOK 模型“glm-5.2:cloud”不支持 `--reasoning-effort`**（17 👍，2 评论）  
   用户自定义 BYOK 配置时，尝试设置 `reasoning-effort max` 失败，社区反映该问题影响多种非标准模型。  
   [链接](https://github.com/github/copilot-cli/issues/4012)

9. **#2595 – 后台代理完成状态很快被清除**（2 评论）  
   后台 agent 完成后，`read_agent` 立即返回“not found”，导致无法获取结果。影响异步工作流。  
   [链接](https://github.com/github/copilot-cli/issues/2595)

10. **#4206 – 环境 footer 永远显示“Loading:”**（1 评论，2 👍）  
    在组织 MCP 策略下，内置 GitHub MCP 握手卡死，所有内容实际已加载，但 UI 一直显示 loading 状态，用户担心持续计费。  
    [链接](https://github.com/github/copilot-cli/issues/4206)

## 重要 PR 进展
过去 24 小时内仅有 1 个 PR 更新（#3163，标题为“ViewSonic monitor”，内容与项目无关，疑似垃圾 PR），因此暂无实质性的代码合并或重要功能 PR 需汇报。

## 功能需求趋势
- **MCP 全面支持**：资源读取（#1518）、资源订阅（#3073）、`tools/list_changed` 通知实时更新（#3125）、OAuth 刷新令牌自动续期（#4203）——社区期望 CLI 成为 MCP 一等公民。
- **BYOK 模型兼容性**：`reasoning-effort` 支持、`reasoning_content` 流式处理（#4196）——企业用户亟需自由选择模型的能力。
- **代理配置与管理**：全局默认子代理模型（#2193）、自定义代理的 `skill` 工具别名（#4209）、内联代理调用（#4208）、子代理信用额度分解（#4207）。
- **上下文与内存**：CAPI 5 MB 硬限制突破（#4183）、自动压缩策略优化、记忆写入失败修复（#4005）。
- **性能与稳定性**：`tgrep` 索引器 OOM（#3976）、子进程泄露（#4163）、`view` 工具误报路径不存在（#4202）。

## 开发者关注点
- **MCP 连接与配置**：Windows 下 MCP 服务器连接失败（#2282）、组织策略下注册表拒绝包含运行时头部（#4205）、OAuth 令牌过期后未尝试刷新（#4203）。
- **计划模式退化**：`plan-mode` 禁止 shell 命令（#4188），破坏依赖 `gh` 等工具的工作流，开发者称其“很遗憾的回归”。
- **BYOK 与第三方模型**：大量用户遇到“reasoning effort not supported”及流式 `reasoning_content` 导致的 5 次重试失败（#4196）。
- **终端兼容性**：tmux 下深色主题不可见（#4212）、取消聚焦时事件丢失（#4213）、远程 SSH 在 VS Code 中报 `o200k_base.tiktoken` 找不到（#4201）。
- **会话可靠性**：长时间会话因 CAPI 5 MB 限制卡死、环境状态栏“Loading”永不结束（#4206）、后台代理结果过早丢弃（#2595）。

</details>

<details>
<summary><strong>Kimi Code CLI</strong> — <a href="https://github.com/MoonshotAI/kimi-cli">MoonshotAI/kimi-cli</a></summary>

# Kimi Code CLI 社区动态日报 | 2026-07-22

## 📌 今日速览

过去24小时内无新版本发布，但社区报告了5个值得关注的Bug与兼容性问题。MCP工具名称/模式被Moonshot API拒绝（HTTP 400）是当日最严重的前沿问题，直接影响K3模型调用；与此同时，k2.5模型在Tool Calling和Goal模式下出现完全失效与无限循环的严重退化，开发者对模型行为稳定性呼声渐高。唯一合并进展来自Shell模式的子进程管道阻塞修复（PR #2530），有望缓解脱机命令导致的超时问题。

---

## 🐛 社区热点 Issues（共5条）

### 1. #2531 MCP工具名称与模式被Moonshot API拒绝（HTTP 400）
- **作者**: sbdsam
- **状态**: 开放 | 创建于2026-07-22，今天更新
- **链接**: [Issue #2531](https://github.com/MoonshotAI/kimi-cli/issues/2531)
- **重要性**: ⭐⭐⭐⭐⭐  
  **原因**: 使用kimi-cli 1.49.0 + K3模型时，客户端发送的MCP工具JSON Schema不符合Moonshot API的“flavored schema”要求（具体错误为`anyOf`中type定义位置错误）。这是API层协议合规性问题，会导致所有自定义工具调用失败，影响范围广。  
  **社区反应**: 尚无评论，但错误信息明确，开发者需要立即在客户端侧对工具Schema进行清洗/转换，否则无法正常使用MCP能力。

### 2. #2474 CLI界面异常抖动与重新渲染
- **作者**: yudichimiantiao
- **状态**: 开放 | 创建于2026-06-25，更新于2026-07-21
- **链接**: [Issue #2474](https://github.com/MoonshotAI/kimi-cli/issues/2474)
- **重要性**: ⭐⭐⭐⭐  
  **原因**: 在Linux x86_64环境下（kimi-cli 0.19.2，K2.7 Code Thinking模型），整个CLI界面持续抖动并从头重新渲染整个对话，严重影响使用体验。已持续近一个月仍未修复，社区给出2个👍。  
  **社区反应**: 作者希望优先修复渲染稳定性，但该问题可能与终端刷新机制或异步渲染调度有关，需要开发者回应。

### 3. #2529 键盘右侧数字键在输入框中无响应
- **作者**: woai3c
- **状态**: 开放 | 创建于2026-07-21，今天更新
- **链接**: [Issue #2529](https://github.com/MoonshotAI/kimi-cli/issues/2529)
- **重要性**: ⭐⭐⭐  
  **原因**: 在Windows平台下（kimi-cli 0.28.1，kimi3模型），键盘数字小键盘区域按键事件未被监听到，输入框无反应。初步判断是未绑定keyup/keydown事件或与终端输入处理冲突。  
  **社区反应**: 影响面有限（仅Windows+小键盘用户），但属于基础输入体验问题，易复现。

### 4. #2528 Shell模式下输出过长
- **作者**: wenli7363
- **状态**: 开放 | 创建于2026-07-21，今天更新
- **链接**: [Issue #2528](https://github.com/MoonshotAI/kimi-cli/issues/2528)
- **重要性**: ⭐⭐⭐  
  **原因**: 当在Shell模式下输入`!`执行命令时，输出结果过长（疑似包含了命令的完整stdout和stderr），占用大量终端空间，且缺乏分页或截断机制。  
  **社区反应**: 用户期望增加输出长度限制或滚动缓冲功能，属于Shell模式体验优化。

### 5. #2527 k2.5模型Tool Calling完全失效 + Goal模式无限循环
- **作者**: lesteryan
- **状态**: 开放 | 创建于2026-07-21，今天更新
- **链接**: [Issue #2527](https://github.com/MoonshotAI/kimi-cli/issues/2527)
- **重要性**: ⭐⭐⭐⭐⭐  
  **原因**: 使用k2.5模型时，任何工具调用（包括Bash）均返回“Tool not found”，且进入Goal模式后会无限循环调用退出。作者尝试了多种工具名称格式（`functions_Bash`, `functions_Bash_0`, JSON格式）全部失败。这是模型层面的严重退化，直接影响Agent工作流。  
  **社区反应**: 必现问题，尚无官方回应，但用户已经给出了详细复现步骤。若k2.5仍是主力模型，需要尽快修复。

---

## 🔧 重要 PR 进展（共1条）

### PR #2530 fix(shell): stop blocking until timeout when a detached child holds the pipes
- **作者**: ayaangazali
- **状态**: 开放 | 创建于2026-07-21，今天更新
- **链接**: [PR #2530](https://github.com/MoonshotAI/kimi-cli/pull/2530)
- **关联 Issue**: #2468（Shell模式下子进程管道阻塞导致超时）
- **内容**: 修复前，Shell命令执行时会等待stdout/stderr EOF后再检查退出码。如果命令中包含后台进程（如`some_daemon & echo done`），脱离子进程仍持有管道，导致父进程永远等待直到超时。修复后改为及时读取并检查退出码，不再阻塞等待EOF。  
- **重要性**: ⭐⭐⭐⭐  
  **评价**: 该PR直接解决了Shell模式中因后台进程导致的假死问题，对开发者日常使用CLI执行命令至关重要。代码改动集中在`_run_shell_command`的实现，逻辑清晰，但需要确保不破坏现有同步行为。

---

## 📈 功能需求趋势

基于过去24小时内的5条Issue与1条PR，提炼出以下社区最关注的方向：

| 方向 | 说明 | 相关Issue/PR |
|------|------|--------------|
| **API/Schema兼容性** | Moonshot API对工具Schema有特殊要求（`anyOf`中必须定义type），客户端需做清洗；此外k2.5模型Tool Calling完全失效，引发对模型版本间API一致性担忧。 | #2531, #2527 |
| **渲染与UI稳定性** | CLI界面抖动、重新渲染问题持续存在（#2474），且键盘事件缺失（#2529），表明终端交互层的健壮性需要加强。 | #2474, #2529 |
| **Shell模式体验** | 输出过长（#2528）和子进程管道阻塞（PR #2530）暴露了Shell模式下输出管理、进程生命周期控制的不足。 | #2528, #2530 |
| **模型行为退化** | k2.5模型在Tool Calling和Goal模式下的严重失败（#2527）属于功能性退化，可能是模型更新或参数调整导致的副作用。 | #2527 |
| **跨平台兼容** | #2474 (Linux)、#2529 (Windows) 表明不同操作系统上的终端行为差异需系统性测试。 | #2474, #2529 |

---

## 🧑‍💻 开发者关注点

1. **MCP工具Schema兼容性亟待官方指南**  
   开发者尝试使用自定义MCP工具时，直接遇到了Moonshot API的Schema校验拒绝，且错误信息不够直观。官方应尽快发布客户端侧Schema清洗规范或示例，避免用户逐一排查。

2. **k2.5模型稳定性下降**  
   多位用户报告k2.5模型在高阶功能（Tool Calling、Goal Mode）上完全不可用，而Model默认或推荐可能仍是k2.5。这导致用户不得不降级到其他模型（如K3），削弱了CLI的核心竞争力。

3. **Shell模式输出过长影响可读性**  
   用户希望CLI能提供类似`less`的分页功能或自动截断选项，而非直接输出全部内容。PR #2530虽然解决了阻塞问题，但输出长度控制仍是独立痛点。

4. **基础输入事件未完整覆盖**  
   右侧数字键盘无法输入是典型的keyCode/native key事件遗漏，反映出终端输入模块对不同键盘布局的测试不足。相比AI功能，此类基础体验问题更影响用户第一印象。

5. **旧版本兼容性沉默期**  
   #2474中0.19.2版本的抖动问题已持续近一个月，开发者对长期未修复感到失望。建议团队建立“高频Bug”快速响应通道，至少给出临时规避方案（如切换终端类型或降级版本）。

---

以上分析基于公开GitHub数据，旨在为技术开发者提供当日社区动态的清晰概览。如需进一步跟踪具体Issue或PR，请点击对应链接。

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

好的，作为专注于AI开发工具的技术分析师，我将根据您提供的GitHub数据，为您生成2026年7月22日的OpenCode社区动态日报。

---

# OpenCode 社区动态日报 | 2026-07-22

## 今日速览

今日社区动态的核心围绕**付费服务稳定性**和**UI/UX 迭代**展开。多个用户报告了 OpenCode Go 订阅模型集体返回“上游提供商请求被阻止”的错误，成为今日社区焦点。与此同时，社区对于**新旧布局切换**的讨论持续升温，开发者也提交了多个旨在优化布局和修复关键 Bug 的 PR。

## 社区热点 Issues

1.  **付费用户大面积报错：Go 订阅模型全部失效**
    *   **#38218**、**#38216**、**#38195**、**#38219**、**#37790**：多个用户声称在成功订阅 OpenCode Go 后，所有 Go 级别的模型均返回 `Request blocked by upstream provider` 或 `Insufficient balance` 错误，而免费模型可正常使用。此问题影响规模大，涉及桌面端和 Hermes 等多个客户端，社区反应激烈。
    *   **链接**: #38218, #38216, #38195, #38219, #37790

2.  **内存问题集中追踪：社区呼吁收集堆快照**
    *   **#20695**：“Memory Megathread” 已收集 119 条评论，是社区中最活跃的议题。项目成员明确要求用户不要依赖 LLM 猜测，而是提供具体的堆快照来帮助定位内存泄漏问题。
    *   **链接**: #20695

3.  **新旧布局之争：保留经典布局选项呼声高涨**
    *   **#37012**：用户 `darkine24th` 列举旧版布局的优势，如主窗口直达所有功能、支持工作区，强烈建议保留经典布局选项。该议题获得 27 个赞和 27 条评论，反映了社区对新 UI 改版的不同声音。
    *   **链接**: #37012

4.  **自动发现模型功能：需求强烈但暂未实装**
    *   **#6231**：该功能请求希望 OpenCode 能自动发现本地 OpenAI 兼容提供商（如 Ollama, LM Studio）的模型，避免手动配置。获得高达 182 个赞，是社区最渴望的功能之一，但长期处于开放状态。
    *   **链接**: #6231

5.  **自动压缩循环导致服务不可用**
    *   **#30680**：用户报告在全新空文件夹中启动 OpenCode 时，应用会立即进入自动压缩循环，消耗 Token 并最终停止响应。此 Bug 严重影响基本使用体验。
    *   **链接**: #30680

6.  **“no such column: name” 数据库错误**
    *   **#31119**：用户在更新至 v1.16.2 后遇到此错误，导致应用无法使用。这提示版本升级可能引入了 Schema 不兼容的问题。
    *   **链接**: #31119

7.  **Web 端新布局无法回退，且缺少工作区功能**
    *   **#37546**：用户反馈 Web 端升级后自动启用新布局，但没有任何 UI 可以切回旧版，且新布局完全不支持 Git Worktree（工作区）功能，导致工作流受阻。
    *   **链接**: #37546

8.  **现有 Web 配置无法获得布局过渡切换权**
    *   **#38124**：Web 端用户在过渡期内无法显示布局切换按钮，原因是 `layoutTransitionEligible` 仅在桌面端引导流程中初始化，造成了新旧版本用户的不公平体验。
    *   **链接**: #38124

9.  **Anthropic 原生提供商嵌套参数调用失败**
    *   **#34652**：使用 `todowrite` 等工具时，若 Anthropic 模型返回 JSON 字符串形式的数组参数，会触发 `SchemaError`，这是一个特定于供应商的集成 Bug。
    *   **链接**: #34652

10. **功能建议：增加模型管理 UI**
    *   **#38228**：用户提议增加模型管理界面，支持自定义排序、别名、收藏和默认模型设置，以改善多模型管理体验。
    *   **链接**: #38228

## 重要 PR 进展

1.  **修复会话自动压缩提醒 (#38067)**
    *   通过边缘触发而非扫描全量历史记录的方式，优化 `SessionReminders.apply` 功能，减少不必要的性能开销。
    *   **链接**: #38067

2.  **桌面端支持面板布局交换 (#34419)**
    *   实现了用户期待已久的功能：在“设置 -> 外观”中添加开关，允许将聊天面板和编辑器面板左右互换，直接回应了 #16349 需求。
    *   **链接**: #34419

3.  **TUI 终端增加侧边栏位置配置 (#18497)**
    *   为 TUI 用户提供 `sidebar_position` 配置选项，可将侧边栏移至左侧。
    *   **链接**: #18497

4.  **修复时钟偏差导致的响应循环 (#38213)**
    *   修复因客户端与服务器时钟不一致导致服务器错误响应的 Bug，解决了 #24476 和 #25270 两个历史问题。
    *   **链接**: #38213

5.  **支持自定义推理字段 (#38227)**
    *   新增 `reasoningField` 模型选项，支持自定义推理字段名，并规范化了 Models.dev 等提供商的推理控制。
    *   **链接**: #38227

6.  **原生 Windows 使用 Bun.serve 修复 HTTP 问题 (#38225)**
    *   修复了在 Windows 原生环境（不使用 WSL）下，`node.http` 绑定端口但不接受连接的问题，改用以 Bun 原生的方式启动 HTTP 服务。
    *   **链接**: #38225

7.  **修复 CLI 更新检查 ( #38223)**
    *   将 CLI 版本更新地址更改为 `update.opencode.ai`，并使用官方提供的 `npm` 制品端点，确保更新机制可靠性。
    *   **链接**: #38223

8.  **路由 MiniMax M3 模型的推理控制 (#38214)**
    *   针对 MiniMax M3 模型，为不同提供商（NVIDIA, Lilac, 原生等）设置正确的 `thinking_mode` 参数路由，修复了推理功能不兼容的问题。
    *   **链接**: #38214

9.  **新增 Solidity 文件类型支持 (#38200)**
    *   为智能合约开发者带来了 Solidity 语言的语法高亮支持。
    *   **链接**: #38200

10. **使工具进度仅实时可见 (#38217)**
    *   将正在运行的工具进度从持久化会话历史改为“实时替换快照”，减少了无效的会话数据，并优化了相同 Shell 输出的快照表现，提升了性能。
    *   **链接**: #38217

## 功能需求趋势

- **UI/UX 自定义与灵活性**: 社区对界面布局的个性化需求极其强烈，具体体现在保留经典布局、自由交换面板位置、自定义模型显示顺序和别名等方面，表明用户对工具的掌控感有很高要求。
- **付费服务稳定与透明**: 针对 OpenCode Go 订阅的问题集中爆发，用户对“付费后无法使用”的容忍度极低。这要求项目组必须优先解决上游提供商的连接稳定性和余额同步问题。
- **模型管理与发现**: 自动化发现本地模型 (#6231) 和提供强大的模型管理 UI (#38228) 是持续的呼声。随着模型增多，手动配置的缺陷愈发明显。
- **系统稳定性与性能**: “自动压缩循环”、“内存泄漏”、“100% CPU 占用”等性能问题始终是社区关注的焦点，直接影响用户体验。
- **跨平台兼容性**: 针对 Windows（WSL 与原生）、iOS（PWA 安全区域）、Linux（自定义标题栏）等不同平台的 Bug 修复 PR 和 Issue 增多，体现了社区对跨平台体验一致性的追求。

## 开发者关注点

- **付费服务可靠性是首要痛点**: 今日最核心的痛点是 OpenCode Go 订阅用户集体遇到的 `Request blocked by upstream provider` 错误。多个用户报告了相同问题，这极可能是服务端或认证机制的故障，而非个人设置问题。开发者应优先排查 Go 计划的 API 网关或上游提供商策略。
- **新旧布局过渡体验割裂**: 多位用户指出 Web 端在 UI 升级后缺乏回退机制，且功能不完整（缺少工作区），导致工作流被打断。开发者需要尽快为 Web 端提供与桌面端等价的布局切换能力，并补齐新布局缺少的核心功能。
- **内存与性能问题持续困扰**: “内存大观” (Memory Megathread) 和“自动压缩循环”等 Issue 表明，资源管理仍是 OpenCode 需要投入大量精力优化的方向。开发者正尝试引导用户通过提供堆快照来协助调试。
- **配置与自动化需求**: 用户不再满足于手动编辑 `opencode.json`，而是期望更智能的自动化（如自动发现模型）和更友好的 UI 管理。这对提升新用户上手体验至关重要。
- **对云服务依赖的争议**: OpenCode Go 的频繁报错，可能会让部分开发者重新审视对官方云服务的依赖，转向更稳定的本地模型。

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code 社区动态日报 | 2026-07-22

**数据来源**: [github.com/QwenLM/qwen-code](https://github.com/QwenLM/qwen-code)  
**统计时段**: 2026-07-21 ~ 2026-07-22（UTC+8）

---

## 1. 今日速览

- **正式版 v0.20.1 发布**，包含 autofix 标签驱动接管与绿色 no-op 修复，无已知 Breaking Change；同时发布了支持相对坐标的 `cua-driver-rs v0.7.3`。  
- **子代理模型突变**（#7156）等关键 Bug 已修复并合入，但 **OpenAI 兼容模型的 toolCall 兼容性**（#7316）和 **VS Code 连接失败**（#7056）仍为主要社区关注点。  
- 社区对 **web-shell 体验优化**（长会话渲染、文件预览、git 模式选择）和 **auto-memory 机制完善**（FileReadCache 注册、记忆召回遥测）的讨论热度较高。

---

## 2. 版本发布

### v0.20.1（正式版）
- **亮点**: autofix 标签驱动接管与释放；修复强制触发的绿色 no-op。
- **Breaking Change**: 无。
- **完整变更**: 参见 GitHub Release。  
  📎 [Release v0.20.1](https://github.com/QwenLM/qwen-code/releases/tag/v0.20.1)

### cua-driver-rs v0.7.3
- **平台**: macOS 已签名公证、Linux（x86_64 + arm64, glibc 2.31+）、Windows（x86_64 + arm64）
- **新能力**: 支持相对坐标（relative-coordinate fork）。  
  📎 [cua-driver-rs v0.7.3](https://github.com/QwenLM/qwen-code/releases/tag/cua-driver-rs-v0.7.3)

---

## 3. 社区热点 Issues（10 条）

### 🐛 严重 Bug
1. **[CLOSED] #7156** – 子代理执行时主 session 模型被静默切换，造成上下文溢出复发（11 条评论）。  
   影响所有使用 subagent 的用户，已由 PR #7119 的后续补充修复。  
    📎 [Issue #7156](https://github.com/QwenLM/qwen-code/issues/7156)

2. **[CLOSED] #7316** – OpenAI 兼容模型为可选参数返回空字符串，导致 subAgent 完全不可用（5 条评论）。  
   社区最快响应 issue，已关闭但影响面广。  
    📎 [Issue #7316](https://github.com/QwenLM/qwen-code/issues/7316)

3. **[OPEN] #7056** – VS Code Companion 扩展无法连接 Qwen Agent，ACP 进程异常退出（5 条评论）。  
   Windows 用户高频遭遇，status 标记为 need-information。  
    📎 [Issue #7056](https://github.com/QwenLM/qwen-code/issues/7056)

4. **[OPEN] #7332** – 对 thinking-only 模型（如 qwen3.8-max-preview）发送 `enable_thinking=false` 导致 400 错误（2 条评论）。  
   影响内部操作（上下文压缩、goal judge）。  
    📎 [Issue #7332](https://github.com/QwenLM/qwen-code/issues/7332)

### ⚙️ 核心功能增强/修复
5. **[OPEN] #7306** – 工具输出预算硬化、可观测性与 artifact 生命周期管理（4 条评论）。  
   phase1 已合入 #7323，后续仍有 phase2-4 讨论。  
    📎 [Issue #7306](https://github.com/QwenLM/qwen-code/issues/7306)

6. **[OPEN] #7287** – auto-memory MEMORY.md 内容加载后未注册 FileReadCache，首次更新被拒绝（3 条评论）。  
   自动记忆功能的关键遗漏，已有 PR #7468 准备修复。  
    📎 [Issue #7287](https://github.com/QwenLM/qwen-code/issues/7287)

7. **[OPEN] #7427** – web-shell artifact 面板自动刷新时频繁弹出 "Load artifacts failed" 错误（4 条评论）。  
   UI 稳定性和用户感知问题，欢迎 PR。  
    📎 [Issue #7427](https://github.com/QwenLM/qwen-code/issues/7427)

8. **[OPEN] #5540** – 允许恢复已完成的后台子代理（via send_message）（4 条评论）。  
   长期功能请求，涉及 session 恢复路径改进。  
    📎 [Issue #5540](https://github.com/QwenLM/qwen-code/issues/5540)

### 🐢 性能/体验优化
9. **[OPEN] #7404** – 启动时版本检查超时太短，加载长对话时必超时（3 条评论）。  
   与 #7049 同类问题，社区建议软化 UX。  
    📎 [Issue #7404](https://github.com/QwenLM/qwen-code/issues/7404)

10. **[OPEN] #7433** – 使用本地模型后 SDK 误报 `currentModel` 为 `qwen-oauth`（2 条评论）。  
    ACP 协议模型 reporting 逻辑缺陷。  
     📎 [Issue #7433](https://github.com/QwenLM/qwen-code/issues/7433)

---

## 4. 重要 PR 进展（10 条）

### 🚀 新功能
1. **[OPEN] #7471** – web-shell 添加 git 模式选择器，支持 Current branch、Worktree、Isolated worktree。  
    📎 [PR #7471](https://github.com/QwenLM/qwen-code/pull/7471)

2. **[OPEN] #7467** – web-shell review 面板支持 HTML/Markdown 渲染预览，沙箱隔离。  
    📎 [PR #7467](https://github.com/QwenLM/qwen-code/pull/7467)

3. **[OPEN] #7388** – daemon 添加显式频道交付机制，用于通知/任务终态路由。  
    📎 [PR #7388](https://github.com/QwenLM/qwen-code/pull/7388)

### ⚡ 性能/基础设施
4. **[OPEN] #7408** – 优化 web-shell 长会话渲染：限制 UI 块数、主动清理过期 SSE。  
    📎 [PR #7408](https://github.com/QwenLM/qwen-code/pull/7408)

5. **[OPEN] #7469** – 用智能 GitHub Actions 替换包级 CODEOWNERS，减少维护者审批压力。  
    📎 [PR #7469](https://github.com/QwenLM/qwen-code/pull/7469)

### 🔧 关键 Bug 修复
6. **[OPEN] #7468** – 修复 auto-memory 索引读取未注册 FileReadCache 的问题（针对 #7287）。  
    📎 [PR #7468](https://github.com/QwenLM/qwen-code/pull/7468)

7. **[OPEN] #7458** – 增强 SSE 游标跨 daemon 重启检测，保留 turn 归因并报告 compaction 失败。  
    📎 [PR #7458](https://github.com/QwenLM/qwen-code/pull/7458)

8. **[CLOSED] #7466** – web-shell 组件样式与宿主 CSS 隔离，防止样式污染。  
    📎 [PR #7466](https://github.com/QwenLM/qwen-code/pull/7466)

9. **[CLOSED] #7409** – 软化为启动更新检查失败时的 UX：从错误降级为警告，超时提升至5s。  
    📎 [PR #7409](https://github.com/QwenLM/qwen-code/pull/7409)

### 📊 可观测性与测试
10. **[OPEN] #7393** – 添加记忆召回投递遥测，追踪选中的记忆是否实际送达主模型。  
     📎 [PR #7393](https://github.com/QwenLM/qwen-code/pull/7393)

---

## 5. 功能需求趋势

从本周 Issues 和 PR 提炼的社区关注方向：

| 方向 | 代表 Issue/PR | 热度 |
|------|---------------|------|
| **子代理与后台自动化** | #5540（恢复子代理）、#7156（模型突变）、#7316（OpenAI 兼容） | 🔥🔥🔥 |
| **web-shell 体验增强** | #6700（workspace 选择器）、#6701（start-in 模式）、#7471（git 模式）、#7467（文件预览） | 🔥🔥🔥 |
| **自动记忆系统完善** | #7287（FileReadCache）、#7393（交付遥测）、#7468（修复） | 🔥🔥 |
| **模型兼容性** | #7332（thinking-only）、#7316（OpenAI toolCall） | 🔥🔥 |
| **性能与冷启动优化** | #7264（ACP 懒加载）、#7408（长会话渲染）、#7404（更新检查超时） | 🔥🔥 |
| **CI/CD 与开发者工具** | #7469（CODEOWNERS 智能路由）、#7445（E2E CI 失败监控） | 🔥 |
| **多平台安装与安全** | #7118（Windows 安装哈希）、#7139（Docker sandbox 路径）、#7301（token 刷新丢失） | 🔥 |

---

## 6. 开发者关注点

### 高频痛点
- **子代理模型突变**：修复已合入，但概念上子代理不应修改主 session 模型。
- **OpenAI 兼容模型适配**：toolCall 参数互斥问题导致 subAgent 完全无法使用，社区期待更健壮的 schema 校验。
- **web-shell token 丢失**：`--token` 启动后刷新页面提示无权限（#7301、#7398），多人反馈。
- **Windows 安装失败**：PowerShell 无法执行 `Get-FileHash`，建议改用 `--method npm`（#7118）。
- **自动记忆写入被拒**：模型按提示更新 MEMORY.md 但 `checkPriorRead()` 失败，开发者期待 PR #7468 尽快合入。

### 社区期待的功能
- **恢复已完成后台子代理**（#5540）：目前 `send_message` 到 `completed` 状态子代理直接报错。
- **自定义技能目录**（PR #7395）：与其他 agent 框架共享 skill 文件。
- **移动端 MCP 版本管理独立化**（#7462）：减轻 maintainer 审批负担。
- **更细粒度的可观测性**：工具输出预算（#7306）、记忆交付遥测（#7393）。

---

*以上分析基于 2026-07-22 发布的 GitHub 数据，选取标准为评论数、优先级、社区共鸣程度。*

</details>

---
*本日报由 [agents-radar](https://github.com/huang-yi-dae/agents-radar) 自动生成。*