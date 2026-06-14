# 任务板

| 编号 | 任务 | 板块 | 状态 | 分支 | 证据 | 文档同步 |
| --- | --- | --- | --- | --- | --- | --- |
| 000-scaffold | 项目骨架 | 基础 | 已验证 | `feature/project-scaffold` | `docs/evidence/000-scaffold.md` | PRD、架构、README |
| 001-wallet-detection | 钱包检测 | 钱包 | 已验证 | `feature/001-wallet-detection` | `docs/evidence/001-wallet-detection.md` | status、task-board、evidence、handoff、architecture、project-acceptance |
| 002-wallet-connect | 钱包连接 | 钱包 | 已验证 | `feature/002-wallet-connect` | `docs/evidence/002-wallet-connect.md` | status、task-board、evidence、handoff、architecture、project-acceptance |
| 003-mantle-network-check | Mantle Sepolia 网络检查 | 钱包 | 已验证 | `feature/003-mantle-network-check` | `docs/evidence/003-mantle-network-check.md` | status、task-board、evidence、handoff、architecture、project-acceptance |
| 004-mantle-network-switch | Mantle Sepolia 网络切换 | 钱包 | 已验证 | `feature/004-mantle-network-switch` | `docs/evidence/004-mantle-network-switch.md` | status、task-board、evidence、handoff、architecture、project-acceptance |
| 005-contract-deploy | ReceiptAnchor 合约部署 | 合约 | 已验证 | `feature/005-contract-deploy` | `docs/evidence/005-contract-deploy.md` | status、task-board、environments、onchain-verification、evidence、handoff、architecture、project-acceptance |
| 006-anchor-transaction | 上链锚定交易 | 上链 | 已验证 | `feature/006-anchor-transaction` | `docs/evidence/006-anchor-transaction.md` | status、task-board、evidence、handoff、architecture、onchain-verification、project-acceptance |
| 007-explorer-verification | 浏览器验证 | 上链 | 已验证 | `feature/007-explorer-verification` | `docs/evidence/007-explorer-verification.md` | status、task-board、evidence、handoff、architecture、onchain-verification、project-acceptance |
| 008-public-demo-deploy | 公开 demo 部署 | 提交 | 进行中 | `feature/008-public-demo-deploy` | - | status、task-board、spec |
| 009-submission-package | DoraHacks 提交材料 | 提交 | 计划中 | `feature/009-submission-package` | - | - |

## 规则

`status.json` 是机器可读状态源。本任务板是人工阅读视图，必须与 `status.json` 保持一致。

状态映射：

- `计划中` = `planned`
- `进行中` = `in_progress`
- `已实现` = `implemented`
- `已验证` = `verified`
- `已阻塞` = `blocked`
