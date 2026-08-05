# OpenClaw 生态日报 2026-08-05

> Issues: 500 | PRs: 500 | 覆盖项目: 13 个 | 生成时间: 2026-08-05 03:32 UTC

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

⚠️ 摘要生成失败。

---

## 横向生态对比

# AI智能体与个人助手开源生态横向对比分析报告（2026-08-05）

## 1. 生态全景
当前个人AI助手/自主智能体开源生态呈现明显分化态势：头部通用Agent运行时项目聚焦协议兼容、安全边界、互操作性等核心基础设施能力演进，社区活跃度极高；垂直场景类项目进入稳定产品化迭代阶段，优先打磨场景适配性与用户体验；其余中小项目暂未披露公开动态，整体生态仍处于技术路线探索与落地能力补全的早期阶段。

## 2. 各项目活跃度对比
| 项目名称 | 24小时Issues更新数 | 24小时PR更新数 | 版本发布情况 | 健康度评估 |
| --- | --- | --- | --- | --- |
| OpenClaw | 无公开动态 | 无公开动态 | 无公开数据 | 待评估 |
| NanoBot | 无公开动态 | 无公开动态 | 无公开数据 | 待评估 |
| Zeroclaw | 42 | 50 | 无新版本 | 良好（高活跃，核心能力快速迭代） |
| PicoClaw | 无公开动态 | 无公开动态 | 无公开数据 | 待评估 |
| NanoClaw | 无公开动态 | 无公开动态 | 无公开数据 | 待评估 |
| NullClaw | 无公开动态 | 无公开动态 | 无公开数据 | 待评估 |
| IronClaw | 无公开动态 | 无公开动态 | 无公开数据 | 待评估 |
| LobsterAI | 无公开动态 | 无公开动态 | 无公开数据 | 待评估 |
| TinyClaw | 0 | 0 | 无 | 静默（待观察） |
| Moltis | 无公开动态 | 无公开动态 | 无公开数据 | 待评估 |
| CoPaw | 无公开动态 | 无公开动态 | 无公开数据 | 待评估 |
| ZeptoClaw | 0 | 0 | 无 | 静默（待观察） |
| EasyClaw | 0 | 0 | v1.8.86 | 稳定（成熟维护阶段） |

## 3. OpenClaw 在生态中的定位
因本次采集周期内OpenClaw无公开动态数据，结合同类项目特征推断：若作为核心参照项目，其定位通常为通用Agent运行时基础设施，技术路线偏向协议标准化与多客户端生态兼容，社区规模预期大于垂直场景类项目；当前同类项目中仅Zeroclaw保持高活跃度，二者可能存在技术路线重叠，核心差异需待OpenClaw公开动态后进一步对比。

## 4. 共同关注的技术方向
1. **Agent互操作性标准化**：涉及项目Zeroclaw，核心诉求包括落地A2A出站客户端能力、兼容OpenAI Chat Completions协议，目标是支持Open WebUI、LobeChat等主流客户端直接接入，降低Agent集成与推广门槛。
2. **Agent安全边界建设**：涉及项目Zeroclaw，核心诉求覆盖Webhook入站身份认证、Agent级数据权限隔离（知识图谱、会话工具）、Shell命令策略管控、工具路径安全校验等多维度能力，多个P0/P1级安全问题已进入修复流程，是当前社区共识性最高优先级方向。
3. **运行时稳定性优化**：涉及项目Zeroclaw，核心诉求包括Cron任务墙钟超时机制、历史修剪事件可观测性提升等，解决生产环境任务 hung、数据锁释放等稳定性问题。

## 5. 差异化定位分析
| 维度 | Zeroclaw | EasyClaw | 其余Claw系项目 |
| --- | --- | --- | --- |
| 功能侧重 | 通用Agent全链路能力：覆盖工具集成、协议兼容、安全治理、运行时优化等底层基础设施 | 垂直场景（TK Copilot达人营销）：聚焦销售洞察、订阅管理、工作流优化等场景化产品能力 | 暂未披露公开动态，定位未明确 |
| 目标用户 | 通用Agent开发者、企业级Agent部署团队 | 跨境/内容电商从业者、营销运营人员 | 待披露 |
| 技术架构 | 模块化开源架构，通过RFC公开征集社区意见迭代，核心能力逐步合入 | 桌面端+云端结合的SaaS化架构，迭代以产品功能优化为主，底层扩展性未公开 | 待披露 |

## 6. 社区热度与成熟度
1. **快速迭代层**：仅Zeroclaw，日Issue/PR更新量均超40条，RFC讨论热度高，多个核心能力PR与高危漏洞修复处于待合并状态，社区参与度与开发节奏均处于高位，处于核心能力快速演进期。
2. **质量巩固层**：EasyClaw，无新增Issue/PR，仅定期发布维护版本，聚焦现有功能优化与稳定性打磨，无重大架构调整，处于成熟产品化运营阶段。
3. **静默/未披露层**：其余11个Claw系项目本次无公开动态，暂无法判断活跃度，可能处于早期开发、私有迭代或维护静默期。

## 7. 值得关注的趋势信号
1. **Agent安全能力成为生产落地刚需**：Zeroclaw将Webhook认证、Agent数据隔离、工具安全校验等列为P0/P1级优先级，反映出行业对Agent生产环境落地的安全合规需求已从可选变为必选项，开发者需将安全边界设计纳入Agent核心架构而非事后补全。
2. **协议兼容优先于底层重构**：Zeroclaw优先推进OpenAI协议兼容、A2A互操作性，而非完全自研协议，反映出当前生态优先降低接入门槛、复用现有客户端生态的务实路线，对中小开发者而言优先兼容主流协议可显著降低推广与用户教育成本。
3. **垂直场景Agent进入商业化落地期**：EasyClaw聚焦达人营销场景的持续迭代，说明通用Agent基础设施之外，垂直场景的Agent产品已从技术验证走向商业化落地，后续场景化能力打磨、与行业工作流的深度结合将成为差异化竞争核心。

---

## 同赛道项目详细报告

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

⚠️ 摘要生成失败。

</details>

<details>
<summary><strong>Zeroclaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# Zeroclaw 项目动态日报（2026-08-05）
## 1. 今日速览
2026-08-05 Zeroclaw项目保持极高活跃度，过去24小时共收到42条Issue更新、50条PR更新，无新版本发布。项目当前聚焦架构RFC讨论、高危安全漏洞修复与核心运行时优化，待合并PR中有48条处于评审阶段，整体开发节奏稳健。社区对Agent安全边界、协议兼容性、运行时稳定性等议题讨论热度较高，多个P0/P1级安全问题已进入修复流程，项目健康度良好。

## 2. 版本发布
无新版本发布。

## 3. 项目进展
今日共有2条PR完成合并/关闭，未在本次展示的活跃PR列表中，无公开变更细节。当前处于待合并状态的重要PR包括：
- [PR #9324](https://github.com/zeroclaw-labs/zeroclaw/pull/9324)：完成A2A出站客户端第一阶段实现，新增4个a2a_*工具与共享v1.0 wire模型，推进Agent间互操作性；
- [PR #9320](https://github.com/zeroclaw-labs/zeroclaw/pull/9320)：为Cron任务增加墙钟超时机制，解决任务 hung 住后数据库锁无法释放的问题；
- [PR #9362](https://github.com/zeroclaw-labs/zeroclaw/pull/9362)：修复浏览器工具截图功能的任意文件写入漏洞，符合工作区策略校验要求；
- [PR #9713](https://github.com/zeroclaw-labs/zeroclaw/pull/9713)：暴露历史修剪事件的Token统计信息，提升运行时可观测性；
- [PR #9743](https://github.com/zeroclaw-labs/zeroclaw/pull/9743)：为OpenAI兼容提供商实现模型多模态能力解析，修正视觉能力误报问题。

## 4. 社区热点
今日讨论最活跃的均为RFC类架构/安全提案，评论数TOP3如下：
1. [Issue #8303](https://github.com/zeroclaw-labs/zeroclaw/issues/8303)（16评论）：Goal mode v1 RFC，提出bounded前台Matrix工作模式，解决Agent跨多轮执行持久目标的控制面问题，已获1个👍；
2. [Issue #8603](https://github.com/zeroclaw-labs/zeroclaw/issues/8603)（16评论）：ZeroClaw Chat Completions profile RFC，旨在让ZeroClaw兼容OpenAI Chat Completions协议，支持Open WebUI、LobeChat等主流客户端直接接入，社区对协议兼容性需求强烈；
3. [Issue #7155](https://github.com/zeroclaw-labs/zeroclaw/issues/7155)（14评论）：高危Shell命令确认策略RFC，提出类似Claude Code的allow/ask/deny命令策略，8月5日刚完成第三版修订，聚焦shell策略的规范范围。
其他高热度议题包括统一附件架构（[#9488](https://github.com/zeroclaw-labs/zeroclaw/issues/9488)，13评论）、会话持久化合约（[#9600](https://github.com/zeroclaw-labs/zeroclaw/issues/9600)，4评论）等，核心诉求均为完善Agent安全边界与运行时能力。

## 5. Bug 与稳定性
按严重程度排列如下：
1. 【P0/S0 数据丢失/安全风险】[Issue #9565](https://github.com/zeroclaw-labs/zeroclaw/issues/9565)：网关Webhook处理器未做认证，WhatsApp Cloud、Linq、WATI三个渠道的入站Webhook未验证调用方身份，攻击者可伪造消息注入Agent，目前处于修复中，暂无公开修复PR；
2. 【P1/S0 数据丢失/安全风险】[Issue #9647](https://github.com/zeroclaw-labs/zeroclaw/issues/9647)：知识图谱无Agent归属，全局共享的知识图谱未做Agent级权限隔离，任意Agent可读写其他Agent的数据，已标记为accepted状态；
3. 【P1/S0 数据丢失/安全风险】[Issue #9646](https://github.com/zeroclaw-labs/zeroclaw/issues/9646)：会话/频道工具无Agent归属，sessions_list/history/send、discord_search等工具未校验操作目标的Agent所有权，存在跨Agent数据泄露风险，已标记为accepted状态；
4. 【P1/高风险】[Issue #9362](https://github.com/zeroclaw-labs/zeroclaw/issues/9362)/[PR #9362](https://github.com/zeroclaw-labs/zeroclaw/pull/9362)：浏览器工具截图路径穿越，screenshot功能未校验输出路径，可写入工作区外的任意文件，修复PR待合并；
5. 【P1/高风险】[Issue #9320](https://github.com/zeroclaw-labs/zeroclaw/issues/9320)/[PR #9320](https://github.com/zeroclaw-labs/zeroclaw/pull/9320)：Cron任务无超时机制，Agent任务 hung 后会导致数据库锁无法释放，修复PR待合并；
6. 【P1/高风险】[Issue #941

</details>

<details>
<summary><strong>PicoClaw</strong> — <a href="https://github.com/sipeed/picoclaw">sipeed/picoclaw</a></summary>

⚠️ 摘要生成失败。

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/qwibitai/nanoclaw">qwibitai/nanoclaw</a></summary>

⚠️ 摘要生成失败。

</details>

<details>
<summary><strong>NullClaw</strong> — <a href="https://github.com/nullclaw/nullclaw">nullclaw/nullclaw</a></summary>

⚠️ 摘要生成失败。

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

⚠️ 摘要生成失败。

</details>

<details>
<summary><strong>LobsterAI</strong> — <a href="https://github.com/netease-youdao/LobsterAI">netease-youdao/LobsterAI</a></summary>

⚠️ 摘要生成失败。

</details>

<details>
<summary><strong>TinyClaw</strong> — <a href="https://github.com/TinyAGI/tinyclaw">TinyAGI/tinyclaw</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>Moltis</strong> — <a href="https://github.com/moltis-org/moltis">moltis-org/moltis</a></summary>

⚠️ 摘要生成失败。

</details>

<details>
<summary><strong>CoPaw</strong> — <a href="https://github.com/agentscope-ai/CoPaw">agentscope-ai/CoPaw</a></summary>

⚠️ 摘要生成失败。

</details>

<details>
<summary><strong>ZeptoClaw</strong> — <a href="https://github.com/qhkm/zeptoclaw">qhkm/zeptoclaw</a></summary>

过去24小时无活动。

</details>

<details>
<summary><strong>EasyClaw</strong> — <a href="https://github.com/gaoyangz77/easyclaw">gaoyangz77/easyclaw</a></summary>

# EasyClaw 项目动态日报（2026-08-05）
---
## 1. 今日速览
过去24小时EasyClaw项目无新开/活跃Issues、无PR更新，整体社区活跃度较低；仅发布1个迭代版本v1.8.86，核心功能优化仍在持续推进，项目处于稳定的维护迭代状态。

## 2. 版本发布
本次发布新版本**v1.8.86（TK Copilot v1.8.86）**，版本地址：https://github.com/gaoyangz77/easyclaw/releases/tag/v1.8.86
### 更新内容
- 功能优化：优化达人模型选择、预估销售洞察及对比工作流，优化桌面端云端订阅与冷启动恢复能力
- 安装说明：macOS平台安装指引部分内容未完全披露，可参考上述 Releases 页面查看完整说明
无公开的破坏性变更及迁移注意事项。

## 3. 项目进展
过去24小时无合并或关闭的PR，项目功能推进完全依托本次版本发布的迭代优化，无额外的代码合并贡献，整体进度符合常规维护节奏。
PR列表：https://github.com/gaoyangz77/easyclaw/pulls

## 4. 社区热点
过去24小时无新增或活跃的Issues、PR，社区无集中讨论的热点内容。
Issues列表：https://github.com/gaoyangz77/easyclaw/issues

## 5. Bug 与稳定性
过去24小时无新报告的Bug、崩溃或回归问题，项目稳定性暂无新增风险。

## 6. 功能请求与路线图信号
过去24小时无用户提交的新功能需求，暂无明确可纳入下一版本的路线图信号。

## 7. 用户反馈摘要
过去24小时无公开的用户反馈内容，无法提炼相关痛点、使用场景或满意度信息。

## 8. 待处理积压
当前项目公开的Issues、PR均为0，无长期未响应的重要待办事项。
Issues积压：https://github.com/gaoyangz77/easyclaw/issues
PR积压：https://github.com/gaoyangz77/easyclaw/pulls

</details>

---
*本日报由 [agents-radar](https://github.com/huang-yi-dae/agents-radar) 自动生成。*