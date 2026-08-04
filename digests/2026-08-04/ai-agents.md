# OpenClaw 生态日报 2026-08-04

> Issues: 500 | PRs: 500 | 覆盖项目: 13 个 | 生成时间: 2026-08-04 08:59 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [NanoBot](https://github.com/HKUDS/nanobot)
- [Zeroclaw](https://github.com/zeroclaw-labs/zeroclaw)
- [PicoClaw](https://github.com/sipeed/picoclaw)
- [NanoClaw](https://github.com/qwibitai/nanoclaw)
- [NullClaw](https://github.com/nullclaw/nullclaw)
- [IronClaw](https://github.com/nearai/ironclaw)
- [LobsterAI](https://github.com/netease-youdao/LobsterAI)
- [TinyClaw](https://github.com/TinyAGI/tinyclaw)
- [Moltis](https://github.com/moltis-org/moltis)
- [CoPaw](https://github.com/agentscope-ai/CoPaw)
- [ZeptoClaw](https://github.com/qhkm/zeptoclaw)
- [EasyClaw](https://github.com/gaoyangz77/easyclaw)

---

## OpenClaw 项目深度报告

[LLM fallback] openai returned an empty response.

---

## 横向生态对比

# 个人 AI 助手/自主智能体开源生态横向对比分析报告（2026-08-04）
## 1. 生态全景
当前个人AI助手/自主智能体开源生态整体处于功能补全与体验打磨的成熟过渡阶段，Claw系列产品形成了通用底座+细分场景的差异化布局，MCP生态集成、长会话稳定性、渠道适配是当前社区共识性优化方向，多数项目迭代节奏平稳，少数项目存在核心阻塞问题未解决，整体生态成熟度持续提升。

## 2. 各项目活跃度对比
| 项目名称 | 今日Issue更新/新增数 | 今日PR更新/新增数 | 新版本发布情况 | 健康度评估 |
| --- | --- | --- | --- | --- |
| OpenClaw | 无公开数据 | 无公开数据 | 无 | 待观察 |
| NanoBot | 无公开数据 | 无公开数据 | 无 | 待观察 |
| Zeroclaw | 无公开数据 | 无公开数据 | 无 | 待观察 |
| PicoClaw | 8条更新 | 6条更新 | 无 | 良好 |
| NanoClaw | 1条更新 | 8条更新（5条已合并） | 无 | 良好 |
| NullClaw | 1条（历史Issue活跃） | 0 | 无 | 偏低 |
| IronClaw | 无公开数据 | 无公开数据 | 无 | 待观察 |
| LobsterAI | 无公开数据 | 无公开数据 | 无 | 待观察 |
| TinyClaw | 0 | 0 | 无 | 平稳 |
| Moltis | 0 | 1条（待合并） | 无 | 良好 |
| CoPaw | 无公开数据 | 无公开数据 | 无 | 待观察 |
| ZeptoClaw | 0 | 0 | 无 | 平稳 |
| EasyClaw | 0 | 0 | v1.8.86 | 良好 |

## 3. OpenClaw 在生态中的定位
作为Claw系列核心参照项目，OpenClaw定位为通用型AI智能体底座框架，相比同系列细分场景产品，其优势在于无特定场景/硬件限制，技术路线主打全链路模块化设计，支持多LLM接入、多渠道适配、MCP生态扩展，预期社区规模为Claw系列最大，覆盖开发者、个人用户、企业用户等多类群体；而PicoClaw主打端侧轻量部署、Nano

---

## 同赛道项目详细报告

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

[LLM fallback] openai returned an empty response.

</details>

<details>
<summary><strong>Zeroclaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

[LLM fallback] openai returned an empty response.

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

# PicoClaw 项目动态日报（2026-08-04）

## 1. 今日速览
今日PicoClaw项目无新版本发布，过去24小时共记录8条Issue更新、6条PR更新，整体活跃度处于中等水平。当前项目工作重心集中在Web UI体验优化、路由上下文管理修复、多语言支持完善等方向，3条待合并PR均属于功能补全或体验优化类，无高风险架构变更，项目整体健康度良好，推进平稳。

## 2. 版本发布
无新版本发布。

## 3. 项目进展
今日共3条PR完成合并/关闭，覆盖多语言、LLM提供商兼容性、路由稳定性三个方向，无破坏性变更：
- PR #3273（已合并）：落实了社区提出的日语本地化需求，完成WebUI和启动器的全量日语翻译，新增`ja`语言选项及dayjs日语locale支持，完善了项目的多语言覆盖能力。
- PR #3267（已合并）：修复了antigravity LLM提供商的token刷新scope错误问题，解决了该提供商下认证过期后无法自动续期的问题，提升了小众LLM提供商的兼容性。
- PR #3202（已合并）：修复了`NormalizeAgentID`/`NormalizeAccountID`函数的边界case问题，修正了ID归一化时未严格 stripping 首尾下划线的逻辑，提升了路由规则匹配的可靠性。
相关链接：
https://github.com/sipeed/picoclaw/pull/3273
https://github.com/sipeed/picoclaw/pull/3267
https://github.com/sipeed/picoclaw/pull/3202

## 4. 社区热点
当前社区讨论热度集中在两类核心体验问题与两个渠道/路由优化需求：
- 高关注Issue：Issue #3281（Web UI长历史输入卡顿，👍1，3条评论）、Issue #3269（MCP连接失败导致agent挂起，👍1，2条评论），均为影响核心使用流程的Bug，是当前用户反馈最集中的痛点。
- 高关注PR：PR #3315（Telegram私聊话题支持）、PR #3316（路由代理上下文管理修复），分别对应Telegram渠道场景优化和路由规则下的会话记忆问题，与近期社区提出的渠道适配、路由体验需求高度契合。
背后诉求分析：用户对PicoClaw的核心交互稳定性（Web UI、MCP集成）、长会话下的上下文管理能力、小众渠道（如Telegram论坛模式）的适配有明确需求，当前社区讨论均围绕提升日常使用的基础体验展开。
相关链接

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

# NanoClaw 项目 2026-08-04 动态日报
## 1. 今日速览
2026-08-04 NanoClaw 项目整体处于中等活跃的稳定性迭代阶段，过去24小时共收到1条 Issue 更新、8条 PR 更新，其中5条 PR 已合并/关闭，3条待合并，无新版本发布。今日工作重点聚焦于核心功能 bug 修复、运行环境安全加固以及多代理场景体验优化，项目整体健康度良好，无重大线上故障报告。社区贡献者提交了3条聚焦会话稳定性的修复 PR，待核心团队评审后即可合并，预计将显著提升多群组、长周期场景下的使用可靠性。

## 2. 版本发布
无新版本发布。

## 3. 项目进展
今日共有5条重要 PR 完成合并/关闭，推进了核心功能修复与运维体验优化：
- PR #3154（已关闭，core-team 提交）：修复 agent-runner 模块的定时任务时间渲染逻辑，以任务的有效调度时间 `process_after` 作为渲染基准，同时保留创建时间作为旧数据回退方案，新增任务级的 `current_time` 字段包含星期信息，解决了定时任务时间显示不准确的问题。链接：https://github.com/nanocoai/nanoclaw/pull/3154
- PR #3182（已关闭，core-team 提交）：将 agent 运行镜像重锁定至安全加固版本 `hardened-2026-08-02`，更新基础镜像补全安全补丁，镜像体积从 611MB 提升至 621MB，上游 AI 核心内容版本保持一致，提升了运行环境的安全性。链接：https://github.com/nanocoai/nanoclaw/pull/3182
- PR #3180（已关闭，core-team 提交）： surfaced 安全镜像迁移的操作提示，让用户在更新镜像时能感知到变更内容，降低运维侧的认知成本。链接：https://github.com/nanocoai/nanoclaw/pull/3180
- PR #3137（已关闭，core-team 提交）：修复多代理场景的参与度一致性问题，新增群组代理的自服务接线控制能力，支持代理自查接线配置并请求更新参与策略，同时增加对 JavaScript 参与正则的有效性校验，解决了群组代理无法自主调整响应规则的问题。链接：https://github.com/nanocoai/n

</details>

<details>
<summary><strong>NullClaw</strong> — <a href="https://github.com/nullclaw/nullclaw">nullclaw/nullclaw</a></summary>

# NullClaw 项目 2026-08-04 动态日报
## 1. 今日速览
2026年8月4日，NullClaw项目过去24小时整体活跃度偏低，无新版本发布、无PR更新，仅1条历史Issue处于活跃讨论状态。项目当前无新功能推进，核心阻塞问题为已持续近3个月的调度器权限异常bug，社区未出现新的需求或问题反馈，项目整体处于平稳维护但无实质进展的状态。

## 2. 版本发布
今日无新版本发布。

## 3. 项目进展
今日无合并或关闭的Pull Request，项目功能迭代、bug修复无新进展，整体开发推进度处于停滞状态。

## 4. 社区热点
今日唯一活跃讨论为Issue #915《[bug] Problem with scheduler unauthorized》（链接：https://github.com/nullclaw/nullclaw/issues/915），该Issue创建于2026年5月15日，过去24小时仍有更新，累计获得1个👍、4条评论，是当前社区讨论热度最高的话题。背后诉求为本地部署用户急需修复调度器权限问题，恢复NullClaw在Telegram等场景的定时调度功能可用性。

## 5. Bug 与稳定性
今日无新增Bug报告，仅历史Bug #915仍处于未解决状态：该问题影响NullClaw调度模块的正常使用，表现为LLM普通调用、常规工具调用均正常，但调度器在Telegram等场景完全失效，严重程度为中高，暂无对应的修复PR提交。

## 6. 功能请求与路线图信号
今日无新功能请求提交，暂无明确的下一版本功能规划信号。

## 7. 用户反馈摘要
从Issue #915的讨论中可提炼出典型用户场景：用户在Ubuntu环境下本地部署NullClaw，搭配同网络Ollama服务、qwen3:27b模型及RTX 3090显卡，整体LLM及工具调用功能正常，仅调度模块因权限问题完全不可用，用户已尝试排查但未找到有效临时解决方案，对该问题的修复需求迫切。

## 8. 待处理积压
Issue #915已持续活跃近3个月，是当前项目中积压时间最长、用户关注度最高的未解决问题，建议维护者优先排查调度模块的权限校验链路，修复该问题以提升本地部署场景的核心功能可用性。

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

[LLM fallback] openai returned an empty response.

</details>

<details>
<summary><strong>LobsterAI</strong> — <a href="https://github.com/netease-youdao/LobsterAI">netease-youdao/LobsterAI</a></summary>

[LLM fallback] openai returned an empty response.

</details>

<details>
<summary><strong>TinyClaw</strong> — <a href="https://github.com/TinyAGI/tinyclaw">TinyAGI/tinyclaw</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>Moltis</strong> — <a href="https://github.com/moltis-org/moltis">moltis-org/moltis</a></summary>

# Moltis 项目动态日报（2026-08-04）

---

### 1. 今日速览
今日Moltis项目整体活跃度较低，过去24小时无新开或关闭的Issue，仅1条待合并PR处于活跃状态，无新版本发布，项目当前处于常规功能迭代的维护阶段。

---

### 2. 版本发布
无新版本发布。

---

### 3. 项目进展
当前唯一活跃的PR为#1183，由贡献者penso提交，创建于2026-08-02，最近更新于2026-08-03，目前处于待合并状态。该PR核心内容是新增MCP托管仓库bundle能力，支持MCP服务器的发现、预览、安装、更新、回滚、移除全生命周期管理，同时兼容HTTPS凭据、固定托管SSH传输、vault生命周期集成、导入仓库托管的MCP配置，还可简化Web端 onboarding 流程。该功能若合并将大幅完善项目对MCP生态的托管管理能力，推进AI助手工具集成的便捷性。
链接：https://github.com/moltis-org/moltis/pull/1183

---

### 4. 社区热点
今日社区唯一活跃讨论对象为PR #1183，该提案聚焦MCP服务的托管管理能力补齐，响应了当前AI助手领域集成、管理MCP工具的普遍需求，符合项目生态扩展的路线方向。
链接：https://github.com/moltis-org/moltis/pull/1183

---

### 5. Bug 与稳定性
过去24小时无新提交的Issue，未报告新的Bug、崩溃或功能回归问题，项目稳定性暂无异常。

---

### 6. 功能请求与路线图信号
目前无新提交的功能请求Issue，待合并PR #1183 的MCP托管仓库功能若通过评审合并，将大概率纳入下一版本更新内容，进一步丰富项目MCP生态支持能力。

---

### 7. 用户反馈摘要
过去24小时无新的Issue评论，无公开的用户痛点、使用场景或满意度反馈内容。

---

### 8. 待处理积压
当前无公开的长期未响应的重要Issue或PR，需持续关注后续社区提交的待处理内容。

</details>

<details>
<summary><strong>CoPaw</strong> — <a href="https://github.com/agentscope-ai/CoPaw">agentscope-ai/CoPaw</a></summary>

[LLM fallback] openai returned an empty response.

</details>

<details>
<summary><strong>ZeptoClaw</strong> — <a href="https://github.com/qhkm/zeptoclaw">qhkm/zeptoclaw</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>EasyClaw</strong> — <a href="https://github.com/gaoyangz77/easyclaw">gaoyangz77/easyclaw</a></summary>

# EasyClaw 项目日报（2026-08-04）

## 今日速览
EasyClaw项目今日整体维护状态稳定，过去24小时无新的社区互动（Issue、PR均无更新），维护者完成了v1.8.86版本的正式发布，版本迭代节奏正常；当前项目无待处理的社区反馈与代码合入积压，整体健康度良好。

## 版本发布
本次发布新版本 **v1.8.86（TK Copilot v1.8.86）**，版本链接：https://github.com/gaoyangz77/easyclaw/releases/tag/v1.8.86
### 更新内容
- 功能优化：优化达人模型选择逻辑、预估销售洞察展示效果及对比工作流交互体验
- 稳定性优化：优化桌面端云端订阅同步能力，修复冷启动恢复流程的异常问题
### 变更说明
本次更新未标注破坏性变更，无强制迁移要求。
### 注意事项
1. 若用户此前遇到桌面端订阅同步失败、冷启动加载缓慢的问题，可升级至该版本验证修复效果；
2. macOS用户若安装后出现“RivonClaw is damaged”的提示，需前往系统设置-隐私与安全性中允许该应用运行。

## 项目进展
过去24小时无合并或关闭的Pull Request，无新的代码功能合入或缺陷修复提交，项目无实质性的代码层面进展，仅完成版本打包发布。

## 社区热点
过去24小时无新开或活跃的Issue、Pull Request，社区无讨论热度较高的内容，无相关诉求可分析。

## Bug 与稳定性
过去24小时无用户提交的新Bug报告、崩溃反馈或版本回归问题，项目当前无新增稳定性风险。

## 功能请求与路线图信号
过去24小时无用户提交的新功能需求，无相关Pull Request支撑，暂无明确的下一版本功能规划信号。

## 用户反馈摘要
过去24小时无新的用户评论与反馈，无真实用户痛点、使用场景或满意度评价可提炼。

## 待处理积压
当前项目无公开的长期未响应的Issue或Pull Request，积压队列为空，无需额外提醒维护者关注。

</details>

---
*本日报由 [agents-radar](https://github.com/huang-yi-dae/agents-radar) 自动生成。*