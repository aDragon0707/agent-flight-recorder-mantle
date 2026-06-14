# Agent Execution Loop

本文档定义每个 `specs/xxx.md` 小任务的执行轮次。它不是新的状态源，只是执行纪律。

状态源仍然是：

```text
specs/status.json + specs/task-board.md + docs/evidence/ + docs/project-acceptance.md + corepack pnpm progress
```

## 目标

让每个 agent 都按同一套节奏推进任务：

- 不跳过 spec。
- 不跨到下一个任务。
- 不忘记 evidence。
- 不忘记 project acceptance。
- 不把 PRD 当任务流水账。

大白话：每次只做一小块，做完留证据，再进入下一块。

## Round 0: Preflight / 开工检查

必须执行：

```bash
git status --short --branch
corepack pnpm progress
```

必须读取：

- `AGENTS.md`
- `docs/agent-loop.md`
- `specs/status.json`
- `specs/task-board.md`
- 当前 spec 文件
- `docs/handoff.md`
- `docs/architecture.md`

必须确认：

- 当前不在 `main`。
- 工作区干净。
- `currentSpec` 与即将执行的任务一致。
- 当前任务的依赖已经 `verified`。

停止条件：

- 工作区不干净。
- 当前分支错误。
- `currentSpec` 错误。
- 当前 spec 文件不存在。
- `corepack pnpm progress` 显示证据缺失或状态不同步。

## Round 1: Start Task / 启动任务

技术说法：为当前 spec 建立独立 feature branch，并把任务状态推进到 `in_progress`。

大白话：开一个专门的小分支，只做这一件事。

必须执行：

```bash
git switch feature/project-scaffold
git switch -c feature/<spec-id>
```

必须同步：

- `specs/status.json`
- `specs/task-board.md`

状态变化：

```text
planned / 计划中 -> in_progress / 进行中
```

建议提交：

```bash
git commit -m "docs: start <task name>"
```

## Round 2: Red / 先写失败验证

技术说法：先写测试或最小验证，让当前缺失能力暴露出来。

大白话：先证明“现在还没有这个能力”，再写实现。

优先方式：

- 有测试框架时，先写测试。
- 没有测试框架时，写清楚人工或构建验证方式。

禁止：

- 先写一大坨实现再补证据。
- 为小任务引入过重测试框架。

## Round 3: Implement / 实现

技术说法：只实现当前 spec 的最小行为。

大白话：别顺手做下一步。

必须遵守：

- 只改当前 spec 允许的文件。
- 不扩大到下一个 spec。
- 不引入未批准依赖。
- 不提交 `.env`、private key、seed phrase、wallet password、API key。

建议提交：

```bash
git commit -m "feat: <task behavior>"
```

## Round 4: Verify / 验证

必须执行：

```bash
corepack pnpm progress
corepack pnpm verify:all
```

如果有局部测试，也必须执行，例如：

```bash
corepack pnpm --filter @afr/web test
```

停止条件：

- `verify:all` 失败。
- 一次集中修复后仍失败。
- 失败原因需要扩大任务范围。

## Round 5: Evidence Sync / 证据同步

技术说法：把实现结果写入机器状态、人类任务板、证据文件和总账本。

大白话：告诉未来的自己和评委，这一块做完了，证据在哪里。

必须同步：

- `specs/status.json`
- `specs/task-board.md`
- `docs/evidence/<spec-id>.md`
- `docs/handoff.md`
- `docs/architecture.md`
- `docs/project-acceptance.md`

状态变化：

```text
implemented / 已实现 -> verified / 已验证
```

PRD 规则：

- PRD 不做小任务流水账。
- 只有产品能力真正完成时才更新 PRD 勾选项。

Architecture 规则：

- 每个 `verified` spec id 必须出现在 `docs/architecture.md`。

Project Acceptance 规则：

- 每个 `verified` spec 对应模块必须在 `docs/project-acceptance.md` 中同步为 `verified`。
- evidence path 必须一致。

建议提交：

```bash
git commit -m "docs: verify <task name>"
```

## Round 6: Push / 推送

必须执行：

```bash
git status --short --branch
git push -u origin feature/<spec-id>
```

必须报告：

- 当前分支。
- 最新提交。
- `corepack pnpm verify:all` 结果。
- 远端分支是否已创建。
- 是否建议合并回 `feature/project-scaffold`。

禁止：

- 推送后自动开始下一任务。
- 未经确认合并到 `main`。

## Round 7: Merge Back / 合并回基线

小任务 verified 后，建议合并回基线：

```bash
git switch feature/project-scaffold
git merge --no-ff feature/<spec-id> -m "merge: integrate <task name>"
corepack pnpm progress
corepack pnpm verify:all
git push
```

合并后再从最新 `feature/project-scaffold` 开下一个任务分支。

大白话：每块砖砌好后先回到主施工线，再开始下一块。

## Human Decision Gate / 人类判断点

以下情况必须停下来问人：

- 钱包授权弹窗。
- 网络切换弹窗。
- 测试网交易。
- 合约部署。
- 公开 demo 部署。
- DoraHacks 页面提交。
- 任何需要私钥、助记词、钱包密码、API key 的操作。

以下情况通常不需要问人：

- 纯文档同步。
- 类型修复。
- 小范围 UI 状态显示。
- 不触发钱包授权的只读检测。

## Stop Rule

任何 agent 遇到以下情况必须停止：

- 任务范围扩展到下一个 spec。
- evidence 缺失但要标记 `verified`。
- `status.json`、中文任务板、project acceptance 不一致。
- 需要 secret。
- 需要真实外部发布或提交。
- `corepack pnpm verify:all` 失败且一次修复后仍失败。
