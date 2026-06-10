# Project Scaffold Tasks

## 1. Goal

在 `feature/project-scaffold` 分支建立最小可验证 monorepo，让 `Agent Flight Recorder` 具备可安装、可测试、可 build 的工程骨架。

本阶段不交付完整产品，只交付工程底座。

## 2. Boundaries

必须包含：

- root workspace config。
- `apps/web` 可 build。
- `packages/sacp-core` 可 test/build。
- `contracts` 可 test。
- README 更新。
- `.env.example` 只包含 public placeholder。

必须排除：

- 真实 Mantle 部署。
- 真实 wallet transaction。
- 后端 API。
- 数据库。
- OpenAI API。
- IPFS。
- mainnet。
- UI 精修。
- Claude Code 并行任务。
- Draft PR。

## 3. Tasks

### Task 1: Root Workspace

文件：

- `package.json`
- `pnpm-workspace.yaml`
- `tsconfig.base.json`
- `pnpm-lock.yaml`

验收：

```bash
pnpm install
pnpm --version
```

### Task 2: SACP Core

文件：

- `packages/sacp-core/package.json`
- `packages/sacp-core/tsconfig.json`
- `packages/sacp-core/src/*`
- `packages/sacp-core/test/*`

最小接口：

```ts
diagnoseAgentOutput(input: string): Diagnosis
buildReceipt(input: BuildReceiptInput): SACPReceipt
canonicalizeReceipt(receipt: SACPReceipt): string
hashReceipt(canonicalReceipt: string): `0x${string}`
```

验收：

```bash
pnpm --filter @afr/sacp-core test
pnpm --filter @afr/sacp-core build
```

### Task 3: Web Shell

文件：

- `apps/web/package.json`
- `apps/web/app/*`
- `apps/web/components/*`
- `apps/web/lib/*`

要求：

- Next.js App Router。
- TypeScript。
- Tailwind CSS。
- 三列 shell：Agent Output、SACP Diagnosis / Receipt、Mantle Anchor。
- 不实现真实 wallet transaction。

验收：

```bash
pnpm --filter @afr/web build
```

### Task 4: Contracts

文件：

- `contracts/package.json`
- `contracts/hardhat.config.ts`
- `contracts/contracts/ReceiptAnchor.sol`
- `contracts/test/ReceiptAnchor.test.ts`

要求：

- zero `receiptHash` revert。
- success emits `ReceiptAnchored`。
- 不部署。
- 不写真实私钥。

验收：

```bash
pnpm --filter @afr/contracts test
```

### Task 5: README And Full Verification

文件：

- `README.md`

验收：

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm build
git status --short --branch --ignored
```

## 4. Stop Conditions

遇到以下情况停止并报告：

- `pnpm` 无法通过 Corepack 激活。
- `pnpm install` 依赖冲突，重试一次仍失败。
- Next.js build 因模板或依赖版本不可恢复失败。
- Hardhat 测试因版本兼容问题无法在一次调整内修复。
- secret scan 命中真实 credential。
- `git status` 显示将要提交 `longju-task.md` 或 `prize-breakdown.png`。
- 任何步骤需要私钥、seed phrase、钱包密码或 API key。

## 5. Final Acceptance

- 当前分支是 `feature/project-scaffold`。
- root `pnpm install` 成功。
- `pnpm test` 成功。
- `pnpm build` 成功。
- `apps/web` 能 build。
- `packages/sacp-core` 有测试。
- `contracts` 有测试。
- README 写清当前 scaffold 状态。
- `.env.example` 只包含 public placeholder。
- `.env` 未提交。
- `longju-task.md` 和 `prize-breakdown.png` 仍被忽略。

