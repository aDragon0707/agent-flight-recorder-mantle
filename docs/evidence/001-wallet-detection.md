# Evidence: 001-wallet-detection

Spec: `001-wallet-detection`
Branch: `feature/001-wallet-detection`
Commit: `43483b3`
Date: 2026-06-11

## Scope

钱包检测只读取浏览器运行时的 injected provider：

- 读取 `window.ethereum`。
- 显示 detected / not detected 状态。
- 统计 `ethereum.providers` 数组长度，或在单 provider 时显示 `1`。
- 不调用 `ethereum.request`。
- 不请求账号授权。
- 不连接钱包。
- 不检查或切换网络。
- 不发起交易或合约调用。

## Commands

```bash
corepack pnpm progress
corepack pnpm verify:all
corepack pnpm --filter @afr/web test
corepack pnpm install
corepack pnpm --filter @afr/web test
corepack pnpm verify
corepack pnpm lint
corepack pnpm typecheck
corepack pnpm test
corepack pnpm build
corepack pnpm verify:all
corepack pnpm progress
```

## Results

- Baseline `corepack pnpm verify:all` passed before wallet code changes.
- RED test: `corepack pnpm --filter @afr/web test` first failed because `./wallet-detection` did not exist.
- Dependency link: `corepack pnpm install` linked `vitest` for `@afr/web`; no packages were downloaded.
- GREEN test: `@afr/web` wallet detection tests passed with 3 tests.
- Implementation verify: `corepack pnpm verify` passed after fixing TypeScript input narrowing.
- Final acceptance commands passed on this branch:
  - `corepack pnpm lint`
  - `corepack pnpm typecheck`
  - `corepack pnpm test`
  - `corepack pnpm build`
  - `corepack pnpm verify:all`

## Files Changed

- `apps/web/components/workbench.tsx`
- `apps/web/lib/wallet-detection.ts`
- `apps/web/lib/wallet-detection.test.ts`
- `apps/web/package.json`
- `pnpm-lock.yaml`
- `specs/status.json`
- `specs/task-board.md`
- `docs/evidence/001-wallet-detection.md`
- `docs/handoff.md`
- `docs/architecture.md`
- `docs/project-acceptance.md`

## Docs Synced

- `specs/status.json`
- `specs/task-board.md`
- `docs/evidence/001-wallet-detection.md`
- `docs/handoff.md`
- `docs/architecture.md`
- `docs/project-acceptance.md`

## Known Limits

- No wallet connection.
- No account address display.
- No network check.
- No network switch.
- No transaction.
- No Mantle contract call.

## Next Task

`002-wallet-connect` is still planned and requires explicit wallet authorization UX decisions before implementation.
