# OpenClaw 生态社区动态日报 2026-08-21

> 生成时间: 2026-08-21 02:30 (GMT+8) | 覆盖: OpenClaw + 12 个 peer 项目
> 本日报由 agents-radar 本地自动化生成，所有摘要/对比/撰写均由执行代理人工完成，未调用任何外部大模型 API。

- [OpenClaw](https://github.com/openclaw/openclaw)
- [NanoBot](https://github.com/HKUDS/nanobot)
- [Zeroclaw](https://github.com/zeroclaw-labs/zeroclaw)
- [PicoClaw](https://github.com/sipeed/picoclaw)
- [NanoClaw](https://github.com/nanocoai/nanoclaw)
- [NullClaw](https://github.com/nullclaw/nullclaw)
- [IronClaw](https://github.com/nearai/ironclaw)
- [LobsterAI](https://github.com/netease-youdao/LobsterAI)
- [TinyClaw](https://github.com/TinyAGI/tinyclaw)
- [CoPaw](https://github.com/agentscope-ai/CoPaw)
- [Moltis](https://github.com/moltis-org/moltis)
- [ZeptoClaw](https://github.com/qhkm/zeptoclaw)
- [EasyClaw](https://github.com/gaoyangz77/easyclaw)

---

## 跨生态对比

# OpenClaw 跨生态对比分析报告（2026-08-21）

## 1. 生态全景

OpenClaw 本体今日有 35 条 PR 更新、0 issue、0 release，主干聚焦**鉴权一致性、记忆/wiki 上下文治理、Control UI 与 HTTP 边界**；12 个 peer 中，NanoBot / Zeroclaw / IronClaw / CoPaw 贡献最活跃，NullClaw / TinyClaw / ZeptoClaw 完全静默。整体趋势从「单 agent 聊天」走向**多渠道（Telegram/Matrix/Slack/WhatsApp）+ 持久化记忆 + 自动化（automations/run-now）+ 企业级沙箱/鉴权**。

## 2. 各项目活跃度对比（近 24h）

| 项目 | Issues | PRs | Releases |
|------|--------|-----|----------|
| OpenClaw | 0 | 35 | — |
| NanoBot | 4 | 29 | — |
| Zeroclaw | 3 | 35 | — |
| PicoClaw | 0 | 3 | — |
| NanoClaw | 1 | 35 | — |
| NullClaw | 0 | 0 | — |
| IronClaw | 1 | 35 | v1.3.0 |
| LobsterAI | 2 | 7 | — |
| TinyClaw | 0 | 0 | — |
| CoPaw | 7 | 35 | v2.1.1-beta.1 |
| Moltis | 1 | 6 | 20260820.01 |
| ZeptoClaw | 0 | 0 | — |
| EasyClaw | 0 | 0 | v1.8.105~v1.8.101 |

## 3. 共同关注方向

- **多渠道接入与消息可靠性**：NanoBot（Telegram 贴纸回复 #5387、Matrix 错误日志 #5458、Slack 文件下载重定向 #5414）、NanoClaw（WhatsApp 媒体不可达 #2715、Slack agents #3421、Cursor SDK #3356）、Moltis（WhatsApp Markdown #1220、回复即寻址 #1217）。
- **记忆与上下文治理**：OpenClaw 防止超大 wiki 内容挤占上下文（#126779）、记忆导入失败暴露（#126738）；IronClaw AfterTurn 记忆策展（#7765）；CoPaw ReMe 记忆运行时看板（#6984）、PowerContext 长期记忆（#7080）。
- **自动化与企业级**：IronClaw 结构化 automations + 每用户沙箱代理（#7732/#7779）、可执行 run gate 通知（#7699）；CoPaw 自托管多用户 Hub（#7112）。
- **安全加固**：Moltis 修复 Vault 解锁/恢复缺失鉴权（#1216，CWE-306）、CoPaw master key 仅属主权限（#7119）。
- **上下文压缩与配额**：Zeroclaw 上下文压缩锚定模型窗口比（#9535）、运行时上下文耗尽终端提示（#9504）；NanoClaw token 用量（#3270）。

## 4. 差异化定位

- **OpenClaw**：生态中枢，主攻 Control UI / 鉴权 / 记忆 wiki / HTTP 边界，企业受管语境。
- **NanoBot**：渠道最广（Telegram/Matrix/Slack/WebUI），重渠道健壮性与网关日志。
- **Zeroclaw**：Rust 核心，RFC 驱动「更轻核心 + 外部集成」，上下文压缩与 telemetry 治理。
- **NanoClaw**：多 provider 接入（WhatsApp/Slack/Cursor/Codex），强调 token 用量与挂载。
- **IronClaw**：每用户沙箱 + 结构化 automations + 文档编辑 + Telegram 关联设备，企业/团队向。
- **LobsterAI**：cowork 文件卡片/分屏预览、设置面板搜索，体验向。
- **CoPaw (QwenPaw)**：记忆 ReMe、自托管 Hub、控制台性能，社区活跃度最高之一。
- **Moltis**：WhatsApp 为中心，重渠道安全（Vault 鉴权）。
- **EasyClaw (rivonclaw)**：高频小版本（每日多版），商务开发筛选等垂直功能。
- **PicoClaw / NullClaw / TinyClaw / ZeptoClaw**：低活跃或静默。

## 5. 趋势信号

- **静默项目需关注**：NullClaw / TinyClaw / ZeptoClaw 连续多日 0 动态，生态健康度分化。
- **自动化 becoming first-class**：IronClaw/CoPaw 的 automations/run-now/Hub 标志着 agent 从「对话」走向「可编排任务」。
- **安全从可选到必需**：Vault 鉴权缺失（CWE-306）、master key 权限、MCP 凭证保留成为高频修复。
- **记忆是跨项目主线**：从 OpenClaw wiki 到 IronClaw/CoPaw 记忆系统，持久化记忆是 2026 年 agent 框架的竞争焦点。

---

## 各项目详细动态

<details>
<summary><strong>OpenClaw</strong> — <a href="https://github.com/openclaw/openclaw">openclaw/openclaw</a></summary>

# OpenClaw 社区动态日报（2026-08-21）

## 今日速览
35 条 PR 更新，0 issue，无 release。重点：Codex 鉴权身份跨重启保持（#126777）、记忆 wiki 防止超大内容挤占上下文（#126779）、UI 内存导入失败暴露（#126738）、HTTP 聊天在 tools.profile 最小时仍发全量系统提示的修正（#126619）、Control UI 模型 thinking 级别自动补全（#123507）。

## 重要 PR（精选）
- #126777 fix(qa): 跨重启保持 Codex 鉴权身份
- #120301 fix(ui): Model Providers 用量卡片在 usage.status 失败后保持为空
- #122431 fix(media): 理解前先缩放图片
- #123507 fix(control-ui): 自动补全模型 thinking 级别
- #126779 fix(memory-wiki): 防止超大 wiki 内容挤占模型上下文
- #126738 fix(ui): 暴露 onboarding 记忆导入加载失败
- #120900 feat(ui): 审查安装策略警告
- #126619 fix: HTTP 聊天在 tools.profile 最小时仍发全量系统提示
- #126782 fix(qa-lab): HTTP 边界接受直消息别名
- #126783 fix(auth): 以规范共享鉴权所有权创建全新安装
- #125471 fix(models): Control UI 保留 Claude CLI OAuth
- #123535 fix(ui): 避免会话目录刷新风暴

</details>

<details>
<summary><strong>NanoBot</strong> — <a href="https://github.com/HKUDS/nanobot">HKUDS/nanobot</a></summary>

# NanoBot 社区动态日报（2026-08-21）

## 今日速览
4 issue、29 PR。渠道健壮性是主线：Telegram 贴纸回复、Matrix 错误日志、Slack 文件下载重定向、网关子进程输出冲刷。

## 社区热点 Issues
- #5444 Docker 内通过 OAuth 登录 OpenAI 失败
- #5425 支持 legacy socks:// 代理 URL（已关闭）
- #5454 流式 provider 中段 server_error 在内容已流出后跳过重试
- #5447 付费安全扫描 MCP 集成（nanobot + ScanPay x402）

## 重要 PR（精选）
- #5387 feat(telegram): 可复用贴纸回复
- #5379 fix(memory): 保留完整 consolidation 输入
- #5420 feat(webui): 回合可观测性与安全恢复
- #5458 fix(matrix): 插值错误日志上下文
- #5456 chore(deps): 移除 websocket-client，加 certifi
- #5414 fix(slack): 跨重定向校验文件下载
- #5413 fix(providers): 对抛错应用 fallback 策略
- #5412 fix(gateway): 冲刷后台子进程输出到日志
- #5339 fix(webui): 拒绝丢弃的临时聊天消息
- #5338 fix(mcp): 源失败保留凭证

</details>

<details>
<summary><strong>Zeroclaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# Zeroclaw 社区动态日报（2026-08-21）

## 今日速览
3 issue（均为 RFC/tracker）、35 PR。RFC 指向「更轻核心 + 外部集成」与运行时会话/传输适配器；工程侧聚焦 web_fetch 解压、ACP 转录持久化、上下文压缩锚定窗口比、telemetry 退役。

## 社区热点 Issues
- #9487 RFC: 运行时拥有的会话与传输表面适配器（21💬）
- #6165 RFC: 通过外部集成偏好更轻的 ZeroClaw 核心（18💬）
- #10118 [Tracker]: Rust anti-slop 策略债清理（16💬）

## 重要 PR（精选）
- #9283 fix(tools): web_fetch 响应 gzip/brotli/deflate 解压
- #9378 fix(acp): 持久化失败/取消的回合转录
- #9379 fix(runtime): 上下文 token 估算计入图片标记
- #9447 fix(anthropic): 分类不完整的终端响应
- #9451 refactor(observability)!: 退役休眠的 DORA telemetry
- #9504 fix(runtime): 上下文耗尽时终端提示
- #9535 feat(runtime): 上下文压缩锚定模型窗口比
- #9557 feat(providers): ProviderErrorKind 分类
- #9561 fix(personality): 渲染人格提示移除文件名标签

</details>

<details>
<summary><strong>NanoClaw</strong> — <a href="https://github.com/nanocoai/nanoclaw">nanocoai/nanoclaw</a></summary>

# NanoClaw 社区动态日报（2026-08-21）

## 今日速览
1 issue、35 PR。多渠道接入（WhatsApp/Slack/Cursor/Codex）与 token 用量是主线；#2715 报告 WhatsApp 入站媒体因挂载点不可达而无法被 agent 访问。

## 社区热点 Issues
- #2715 入站 WhatsApp 媒体（图片/文档/音频）agent 不可达，文件存到未挂载路径

## 重要 PR（精选）
- #3270 Feat/ncl token usage
- #3189 feat(skill): add-why — 解释某条消息发生了什么
- #3196 Fix/add mount readonly
- #3403 [main] fix(matrix): ESM patch 刷新时可执行
- #3402 [main] fix(codex): 交付 provider 生成的文件
- #3421 [channels] 宣布一键 Slack agents
- #3401 fix(whatsapp-cloud): skill payload 兼容 main
- #3356 feat(providers): Cursor Agent SDK payload
- #3355 feat(setup): /add-cursor agent provider skill
- #3420 fix(add-macos-statusbar): Swift 代码与 plist 标签 slug 感知
- #3419 fix(add-anydoc): 安装作用域 ncl、可移植 skill 测试

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# IronClaw 社区动态日报（2026-08-21）

## 今日速览
发布 v1.3.0（稳定晋升 1.3.0-rc.2）。每用户沙箱 + 结构化 automations + 文档编辑 + Telegram 关联设备是核心新增。1 issue（#7732 持久每用户沙箱 epic，8💬）。

## 版本发布
**[ironclaw-v1.3.0](https://github.com/nearai/ironclaw/releases/tag/ironclaw-v1.3.0)** — 修复 1.2 升级崩溃循环、Reborn 运行时镜像可选公钥 SSH；新增每用户模型偏好、结构化 automations（失败关闭预检）、文档编辑（.docx/.xlsx/.pptx 结构编辑 + HTML 渲染 PDF）、Telegram 关联设备。

## 社区热点 Issues
- #7732 Epic: 持久每用户沙箱 + iron-proxy；延迟循环执行器（8💬）

## 重要 PR（精选）
- #7765 feat(hooks): AfterTurn 生命周期点 + 记忆策展
- #7779 feat(sandbox): 用户沙箱出口经受管每用户代理
- #7491 feat(coding): omp core-tool 契约 + 引擎 + 基准臂
- #7777 refactor(webui): 移除重复 Settings/Extensions 标签
- #7763 refactor(subagent): 七份设计文档合并为一份 README
- #7766 fix(telegram): 分离 bot 配对与个人账户关联
- #7729 feat(automations): 跨触发域与 WebUI 的 run-now
- #7699 feat(notifications): 发布可执行的 run gate
- #7778 fix(lints): Rust 1.98 clippy 迁移

</details>

<details>
<summary><strong>LobsterAI</strong> — <a href="https://github.com/netease-youdao/LobsterAI">netease-youdao/LobsterAI</a></summary>

# LobsterAI 社区动态日报（2026-08-21）

## 今日速览
2 issue、7 PR。cowork 文件卡片/分屏预览、设置面板搜索、定时任务通知渠道修复是主线。

## 社区热点 Issues
- #1556 文档 bug：IM 机器人配置指南 404
- #1552 feat: AI 产物 Markdown 预览及文件卡片支持

## 重要 PR（精选）
- #1545 fix(agent): 更新当前 agent skills 时立即同步 activeSkillIds
- #1546 feat(engine-overlay): 引擎启动超时后显示取消启动与查看日志按钮
- #1547 fix(scheduledTask): 修复定时任务通知渠道选回"不通知"失败
- #1553 feat(cowork): Write 工具文件卡片及分屏预览面板
- #1555 fix: npm run dist:mac:x64 打包失败
- #1557 feat(settings): 设置面板侧栏支持搜索筛选分类
- #1560 fix: 修复 Agent 编辑后点击原 Agent 无法切回聊天界面

</details>

<details>
<summary><strong>CoPaw</strong> — <a href="https://github.com/agentscope-ai/CoPaw">agentscope-ai/CoPaw</a></summary>

# CoPaw (QwenPaw) 社区动态日报（2026-08-21）

## 今日速览
发布 v2.1.1-beta.1。7 issue、35 PR。记忆 ReMe 运行时看板、自托管多用户 Hub、控制台性能、统一工具面板是主线。

## 版本发布
**[v2.1.1-beta.1](https://github.com/agentscope-ai/QwenPaw/releases/tag/v2.1.1-beta.1)** — 编辑器标签溢出导航、provider 限流器日志级别、ReMe 运行时看板、插件渠道交互配置器、OneBot 入站媒体本地化、后台任务超时、插件重载工作区状态、历史消息 data-URL 图片渲染、DataPaw 原生运行时等。

## 社区热点 Issues
- #6921 常在「Now 2.1, 3.1, 3.2」类输出后无提示停止，需说"继续"才继续
- #7102 冻结超过 10 分钟
- #6643 任务产出物不要堆积在 media 目录，应按任务建目录
- #6826 对话中助手消息结束时间显示异常
- #6436 每消息自动模型路由
- #7110 含不可下载图片链接的上下文使整个会话不可用
- #7013 为 Chat 增加统一工具面板、Web 服务预览与交互式终端

## 重要 PR（精选）
- #7119 fix(security): master key 文件仅属主权限
- #7061 fix(video): OpenAI Responses API 交付工具结果视频
- #7175 fix(console): 恢复完整免费模型列表
- #7183 feat(skills): 工作区作用域常驻加载
- #7167 feat(creator): 对话门控视频分发、项目复制与重建、效果库扩展
- #7133 feat(memory): 更新 reme 0.4.1.8
- #7112 feat(hub): 自托管多用户 Hub（本地与 Docker 运行时）
- #7080 feat: 可选 PowerContext 可插拔长期记忆后端
- #7161 feat(console): 助手响应卡片加 artifacts
- #7176 perf(console): 长会话保持响应

</details>

<details>
<summary><strong>Moltis</strong> — <a href="https://github.com/moltis-org/moltis">moltis-org/moltis</a></summary>

# Moltis 社区动态日报（2026-08-21）

## 今日速览
发布 20260820.01。1 issue（Vault 解锁/恢复缺失鉴权，CWE-306）、6 PR。渠道安全与 WhatsApp 体验是主线。

## 版本发布
**[20260820.01](https://github.com/moltis-org/moltis/releases/tag/20260820.01)**

## 社区热点 Issues
- #1177 [Bug]: Vault 解锁/恢复端点缺失鉴权（CWE-306）

## 重要 PR（精选）
- #1220 fix(whatsapp): 出站消息渲染 Markdown
- #468 fix(plugins): Windows 上 shell hooks 用 cmd.exe
- #1218 fix(channels): 停止把 push name 硬编码为 "Moltis"
- #1219 fix(channels): 不可信回合工具上限可配置
- #1217 fix(whatsapp): 把对 bot 的回复视为寻址它
- #1216 fix(httpd): Vault 解锁与恢复要求鉴权

</details>

<details>
<summary><strong>EasyClaw</strong> — <a href="https://github.com/gaoyangz77/easyclaw">gaoyangz77/easyclaw (rivonclaw)</a></summary>

# EasyClaw (rivonclaw) 社区动态日报（2026-08-21）

## 今日速览
0 issue、0 PR，但连续发布 v1.8.101~v1.8.105（每日多版）。v1.8.105 支持按商务开发人员筛选达人 Agent 的待审核与全部工作。

## 版本发布
- [v1.8.105](https://github.com/gaoyangz77/rivonclaw/releases/tag/v1.8.105) — 按商务开发人员筛选达人 Agent 工作
- v1.8.104 / v1.8.103 / v1.8.102 / v1.8.101

</details>

<details>
<summary><strong>PicoClaw / NullClaw / TinyClaw / ZeptoClaw</strong></summary>

# 低活跃 / 静默项目（2026-08-21）

- **PicoClaw** (#3329 惰性 webhook_host/port 告警；#3316 routed-agent 上下文管理；#3315 私聊话题) — 3 PR，轻量更新。
- **NullClaw** — 0 issue / 0 PR / 0 release，完全静默。
- **TinyClaw** — 0 issue / 0 PR / 0 release，完全静默。
- **ZeptoClaw** — 0 issue / 0 PR / 0 release，完全静默。

这四个项目今日无社区动态，生态活跃度分化明显。

</details>

---

*本日报由 [agents-radar](https://github.com/huang-yi-dae/agents-radar) 自动生成，数据来自 GitHub 公开 API，由执行代理人工撰写，未调用外部大模型。*
