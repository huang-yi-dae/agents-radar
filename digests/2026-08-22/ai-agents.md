# OpenClaw 生态社区动态日报 2026-08-22

> 生成时间: 2026-08-22 02:30 (GMT+8) | 覆盖: OpenClaw + 12 个 peer 项目
> 本日报由 agents-radar 本地自动化生成，所有摘要/对比/撰写均由执行代理人工完成，未调用任何外部大模型 API。

- [OpenClaw](https://github.com/openclaw/openclaw)
- [NanoBot](https://github.com/HKUDS/nanobot)
- [Zeroclaw](https://github.com/zeroclaw-labs/zeroclaw)
- [PicoClaw](https://github.com/sipeed/picoclaw)
- [NanoClaw](https://github.com/qwibitai/nanoclaw)
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

# OpenClaw 跨生态对比分析报告（2026-08-22）

## 1. 生态全景

OpenClaw 本体今日 41 条 issue、59 个 PR 更新，主干聚焦**会话目录刷新风暴治理、诊断恢复、安装策略告警、UI 决策回执**；12 个 peer 中，IronClaw（31 PR）、CoPaw（36 PR）、Zeroclaw（95 PR）、NanoClaw（14 PR）、LobsterAI（13 PR）、Moltis（6 PR）贡献活跃，**NullClaw / TinyClaw / ZeptoClaw 完全静默**，EasyClaw 仅有版本发布无 issue/PR。整体趋势从「单 agent 聊天」走向**多渠道 + 持久化记忆 + 自动化（automations/run-now）+ 企业级沙箱/鉴权**。

## 2. 各项目活跃度对比（近 24h）

| 项目 | Issues | PRs | Releases |
|------|--------|-----|----------|
| OpenClaw | 41 | 59 | v2026.8.1-beta.2（08-15） |
| NanoBot | 5 | 34 | v0.3.0（07-25） |
| Zeroclaw | 5 | 95 | v0.8.4（08-02） |
| PicoClaw | 1 | 4 | nightly（07-02） |
| NanoClaw | 1 | 14 | v2.2.0（08-13） |
| NullClaw | 0 | 1 | v2026.5.29 |
| IronClaw | 12 | 31 | ironclaw-v1.3.0（08-19） |
| LobsterAI | 2 | 13 | 2026.8.18 |
| TinyClaw | 0 | 0 | v0.0.20（03-26） |
| CoPaw | 34 | 36 | v2.1.1-beta.1（08-20） |
| Moltis | 2 | 6 | 20260820.01（08-20） |
| ZeptoClaw | 0 | 0 | v0.9.2（04-07） |
| EasyClaw | 0 | 0 | v1.8.109（08-21） |

## 3. 共同关注方向

- **多渠道接入与消息可靠性**：NanoBot（DingTalk 不观测/不排空后台任务 #5463、流式 provider 中段 server_error 跳过重试 #5454、Notion MCP 连接失败 #1168）；NanoClaw（send_card 文档承诺的回调按钮被 bridge 丢弃 #3426、Dial 短信+语音 #3041、Mattermost #3202）；Moltis（共享 Slack 频道工具失效 #1224、WhatsApp Markdown 渲染 #1220）。
- **记忆与上下文治理**：OpenClaw 会话目录刷新风暴治理（#123535，154💬）、诊断恢复重叠工具调用（#124025，46💬）；IronClaw 可插拔 memory over MCP（#7664）；CoPaw ReMeLightMemoryCard reranker 面板（#6399）、embedding 健康检查超时硬编码（#7156）；Zeroclaw 上下文压缩锚定模型窗口比（#9535）。
- **自动化与企业级**：IronClaw 从运行时证据派生 run 结果（#7650，45💬）、benchmark QA 预览（#7749，39💬）、omp core-tool 契约（#7491，37💬）、可插拔 memory（#7664）；CoPaw 每会话模型覆盖（#5992，9💬）；Moltis cron 尊重 heartbeat active_hours（#1208）。
- **安全与稳定性**：OpenClaw 安装策略告警确认（#116489，49💬）、typecheck 挂死修复（#123975，45💬）、SSH 沙箱不暂存入站媒体（#112160）；Moltis 修复 WhatsApp/沙箱镜像校验（#1222、#1220）；CoPaw MCP 后端重启无法自动恢复（#6524）。
- **开发者体验 / 设计系统**：IronClaw WebUI 设计系统（#7257，#7750 Storybook）；OpenClaw UI 决策回执说明（#126007）、新聊天 worktree 从干净默认启动（#126056）。

## 4. 差异化定位

- **OpenClaw**：生态中枢，主攻会话/目录治理、诊断恢复、安装策略与 UI 决策透明，企业受管语境。
- **NanoBot**：渠道广（Telegram/Matrix/Slack/WebUI），重 Dream 恢复游标与轨迹统一 provider 用量后端（#5479）。
- **Zeroclaw**：Rust 核心，RFC/ADR 驱动「更轻核心 + 外部集成」，wire protocol 一等公民（#8396）、canonical 沙箱策略 schema（#7821，20💬）。
- **NanoClaw**：多 provider 接入（Dial/WhatsApp/Mattermost/Matrix），强调模板创建 agent（#3396）与刷新安全的 ESM 补丁（#3403）。
- **IronClaw**：每用户沙箱 + 结构化 automations + 设计系统 + Telegram 关联，企业/团队向，CI 提速专题（T1-T4）。
- **LobsterAI**：cowork 文件卡片/分屏、设置面板搜索、i18n 硬编码修复，体验向。
- **CoPaw (QwenPaw)**：记忆 ReMe、自托管多用户、Volcengine Agent Plan & MiMo V2.5 provider（#6515），社区活跃度最高之一。
- **Moltis**：WhatsApp 为中心，重渠道安全（Vault/沙箱镜像校验）与 cron 调度。
- **EasyClaw (rivonclaw)**：高频小版本（每日多版 v1.8.109/108），商务开发筛选等垂直功能。
- **PicoClaw / NullClaw / TinyClaw / ZeptoClaw**：低活跃或静默。

## 5. 趋势信号

- **静默项目需关注**：NullClaw / TinyClaw / ZeptoClaw 连续多日 0 动态，EasyClaw 仅发版无交互，生态健康度分化明显。
- **自动化成为一等公民**：IronClaw/CoPaw 的 automations/run-now/Hub 标志 agent 从「对话」走向「可编排任务」。
- **安全与稳定性从可选到必需**：安装策略告警确认（CWE 类风险）、typecheck 挂死、MCP 重启恢复成为高频修复。
- **记忆是跨项目主线**：从 OpenClaw 会话治理到 IronClaw/CoPaw 记忆系统，持久化记忆仍是 2026 年 agent 框架竞争焦点。

---

## OpenClaw 详细动态

> 数据来源: [openclaw/openclaw](https://github.com/openclaw/openclaw) | 近 24h（issue 41 / PR 59）

### 热点 Issues
1. **#125626 Release validation: v2026.8.1-beta.2**（18💬，开放）— 新版发布校验跟踪。
2. **#124751 iOS app 在底部重复助手回复且不自动滚动到最新**（6💬，开放）— 移动端渲染。
3. **#113014 Webchat：原始 MEDIA: 指令泄漏到可见回复文本**（5💬，开放）— 指令注入可见化。
4. **#90243 feat(llm/google-vertex)：支持物理模型映射/别名以对接 Google Prior**（3💬，开放）— 模型路由。
5. **#124689 Model picker 仅对新会话生效；Ollama Cloud 请求登录**（4💬，开放）。
6. **#112160 SSH 沙箱不将入站媒体暂存到已有远程工作区**（4💬，开放）。
7. **#10944 Telegram 频道 parseMode 配置需求**（4💬，开放）。
8. **#126231 handler-timeout ingress 事件 attempts=0 静默丢消息**（3💬，已关闭）。
9. **#126813 排队的 peer 消息以 answer-expected 提示重唤 agent 且无确认**（3💬，开放）。
10. **#100911 Tasks 页面 / tasks.list 边界加固**（2💬，开放）。

### 重要 PR 进展（按讨论热度）
1. **#123535 fix(ui)：避免会话目录刷新风暴**（154💬，开放）
2. **#123979 fix(scripts)：build heap 忽略 systemd 内存预算而占满默认**（56💬，开放）
3. **#116489 feat(security)：安装策略告警需显式确认**（49💬，已关闭）
4. **#123975 fix(scripts)：tsgo 卡死时 typecheck 永久挂起**（45💬，开放）
5. **#124025 fix(diagnostics)：恢复过期重叠工具调用**（46💬，开放）
6. **#120900 feat(ui)：审查安装策略告警**（44💬，已关闭）
7. **#125815 fix(sessions)：保持 owner 分配稳定、回复可用**（38💬，开放）
8. **#126618 fix：Tool Search 目录/tools 用 tool_call 包裹原生 read/exec**（26💬，开放）
9. **#126007 feat(ui)：在 Activity 中解释决策回执**（25💬，开放）
10. **#126056 fix(ui)：新聊天 worktree 从干净默认启动**（21💬，开放）

---

## Peer 项目动态精选

### NanoBot（HKUDS/nanobot）— I5 / P34
- Issues：#5198 特定会话改模型需重配（已关闭）、#1168 Notion MCP 连接失败（已关闭）、#5441 单点恢复的工具错误永久阻塞（已关闭）、#5463 DingTalk 不观测/不排空后台任务（开放）、#5454 流式 provider 中段 server_error 跳过重试（已关闭）。
- PRs：#5442 fix(dream) 恢复游标、#5379 fix(memory) 保留完整合并输入（开放）、#5476 渲染 LaTeX 为 Unicode（已关闭）、#2063 Tauri 桌面端（已关闭）、#5455 重试 Codex server_error（已关闭）、#5479 feat(trajectory) 统一 provider 用量后端（开放）。

### Zeroclaw（zeroclaw-labs/zeroclaw）— I5 / P95
- Issues：#8396 RFC 使 wire protocol 成为 provider 构造一等公民（开放）、#8691 ADR 清单与已接受 RFC 决策记录（开放）、#10167 终端 agent 多路复用的 vendor-neutral 生命周期导出（开放）、#8288 SOP 里程碑 daemon 控制面 5/5（开放）、#10212 文档 switch 路由优先级（开放）。
- PRs：#8561 feat(channels/telegram) 多消息流式（33💬）、#7821 feat(security) canonical 沙箱策略 schema（20💬）、#9447 fix(anthropic) 分类不完整终端响应（19💬）、#9196 feat(mcp) 聚合预算预检 materialize 资源 blob（19💬）、#9772 feat(telegram) 共享群聊每用户会话开关（18💬）、#9535 feat(runtime) 上下文压缩锚定模型窗口比（17💬）。

### NanoClaw（qwibitai/nanoclaw）— I1 / P14
- Issue：#3426 send_card 文档承诺的回调按钮被 bridge 自 #2265 起丢弃。
- PRs：#3041 feat(channels) 新增 Dial 通道（SMS+AI 语音，已关闭）、#3202 新增 Mattermost 集成（已关闭）、#3050 Dial 通道选择器（已关闭）、#3396 feat 从模板在聊天中创建 agent（开放）、#3424 ci 测试 registry-backed skills（已关闭）、#3403 fix(matrix) 刷新安全 ESM 补丁（已关闭）。

### NullClaw（nullclaw/nullclaw）— I0 / P1
- PR：#990 feat(providers) 新增 Eden AI 作为 OpenAI 兼容网关（开放）。

### IronClaw（nearai/ironclaw）— I12 / P31
- Issues：#7801 CI 提速 T4 规范预检（开放）、#7799 T2 nextest 流水线（开放）、#7800 T3 PR/队列收敛（开放）、#7798 T1 setup-rust 复合（开放）、#7664 可插拔 memory over MCP（开放）、#7783 LLM 超时策略 finalization 无法测 TTFT（已关闭）。
- PRs：#7650 feat(automations) 从运行时证据派生 run 结果（45💬）、#7749 benchmark QA 预览触发（39💬）、#7491 feat(coding) omp core-tool 契约+引擎+benchmark（37💬）、#7456 fix(reborn) 持久存储 profile 无关（12💬）、#7257 docs(design-system) WebUI 设计系统（11💬）、#7750 chore(webui) 集成 Storybook+设计系统目录（10💬）。

### LobsterAI（netease-youdao/LobsterAI）— I2 / P13
- Issues：#1217 运行中偶发启动网关（已关闭）、#1223 CoworkPromptInput 硬编码中文标签导致英文提示词混入（已关闭）。
- PRs：#1218 重构定时任务排序（已关闭）、#1215 始终重建 chat handler（已关闭）、#1219 消除会话列表/详情无效重渲染（已关闭）、#1220 消除 recentChats 的 N+1 查询（已关闭）、#1224 修复 i18n 硬编码与 Escape 键（已关闭）、#1550 fix(scheduledTask) 投递模式「不通知」时去除 channel/to 字段（开放）。

### TinyClaw（TinyAGI/tinyclaw）— I0 / P0
- 无近 24h 动态（最新 v0.0.20，03-26）。

### CoPaw（agentscope-ai/CoPaw）— I34 / P36
- Issues：#6524 MCP 后端重启后客户端无法自动恢复（开放）、#6780 2.0.1 不使用时会卡死（已关闭）、#7016 工具调用 404（开放）、#7156 embedding 健康检查在已预热时仍超时且硬编码（开放）、#7206 v2.1.1-beta.1 /compact 因 pydantic ValidationError 失败（开放）、#7204 qwenpaw 如何增加自定义 tool（开放）。
- PRs：#5992 每会话模型覆盖（9💬）、#6515 feat(providers) 新增 Volcengine Agent Plan & MiMo V2.5（9💬）、#6845 保留 assistant 完成时间（已关闭）、#6581 ReMeLightMemoryCard reranker UI 面板（开放）、#6399 新增 reranker UI 配置（开放）、#6586 fix(mcp) 恢复过期 server 会话（已关闭）。

### Moltis（moltis-org/moltis）— I2 / P6
- Issues：#1224 共享 Slack 频道工具停止工作（开放）、#1223 heartbeat active_hours 对默认配置无效（开放）。
- PRs：#1220 渲染 WhatsApp 出站 Markdown（8💬，已关闭）、#1208 修复 cron 尊重 heartbeat active_hours（4💬，开放）、#468 Windows 用 cmd.exe 执行 shell hooks（开放）、#1226 定时输出投递到源聊天（开放）、#1225 改进 zh-TW 繁体中文（开放）、#1222 校验沙箱镜像请求（开放）。

### ZeptoClaw（qhkm/zeptoclaw）— I0 / P0
- 无近 24h 动态（最新 v0.9.2，04-07）。

### EasyClaw（gaoyangz77/easyclaw）— I0 / P0 / 发版 v1.8.109、v1.8.108（08-21）
- 今日仅发版，无 issue/PR 交互。

---

*本日报由 [agents-radar](https://github.com/huang-yi-dae/agents-radar) 自动生成，所有内容基于 GitHub 公开 API 实时抓取并由执行代理人工撰写，未调用任何外部大模型。*
