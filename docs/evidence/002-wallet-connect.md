# Evidence: 002-wallet-connect

Spec: `002-wallet-connect`
Branch: `feature/002-wallet-connect`
Commit: `92b3d48`
Date: 2026-06-11

## Scope

钱包连接只在用户点击 `Connect wallet` 后请求 injected EVM wallet 授权：

- 调用 `ethereum.request({ method: "eth_requestAccounts" })`。
- 成功后显示 `Wallet connected` 和缩写地址。
- 连接中显示 `Connecting...`。
- 未检测到钱包时禁用按钮，并显示 `Install or enable an injected wallet to connect.`。
- 用户拒绝 `code === 4001` 时显示 `Wallet connection rejected. No account was connected.`。
- 其他错误或空账号返回时显示 `Wallet connection failed.`。

## Commands

```bash
git status --short --branch
git fetch origin
git switch feature/project-scaffold
git pull --ff-only
corepack pnpm progress
corepack pnpm verify:all
corepack pnpm --filter @afr/web test
corepack pnpm --filter @afr/web test
corepack pnpm verify:all
rg "eth_chainId|wallet_switchEthereumChain|wallet_addEthereumChain|eth_sendTransaction|writeContract|ReceiptAnchor|localStorage|sessionStorage|accountsChanged|disconnect" apps/web
corepack pnpm progress
corepack pnpm verify:all
```

## Results

- Preflight passed on `feature/project-scaffold`; HEAD was `1d000bc` and contained `1d000bc`.
- `corepack pnpm progress` showed `currentSpec` as `002-wallet-connect` and task status as planned before start.
- Round 1 `corepack pnpm verify:all` passed before wallet connect implementation.
- RED test: `corepack pnpm --filter @afr/web test` first failed because `./wallet-connect` did not exist.
- GREEN test: `@afr/web` tests passed with 2 test files and 8 tests.
- Implementation `corepack pnpm verify:all` passed after adding wallet connection code.
- Forbidden scan returned no matches in `apps/web`.
- Evidence sync `corepack pnpm progress` showed `002-wallet-connect` as verified and `003-mantle-network-check` as planned.
- Evidence sync `corepack pnpm verify:all` passed after updating status, task board, evidence, handoff, architecture, and project acceptance.

## Files Changed

- `apps/web/components/workbench.tsx`
- `apps/web/lib/wallet-connect.ts`
- `apps/web/lib/wallet-connect.test.ts`
- `specs/status.json`
- `specs/task-board.md`
- `docs/evidence/002-wallet-connect.md`
- `docs/handoff.md`
- `docs/architecture.md`
- `docs/project-acceptance.md`

## Docs Synced

- `specs/status.json`
- `specs/task-board.md`
- `docs/evidence/002-wallet-connect.md`
- `docs/handoff.md`
- `docs/architecture.md`
- `docs/project-acceptance.md`

## Known Limits

- No network check.
- No network switch.
- No transaction.
- No contract call.
- No address persistence.
- No `accountsChanged` listener.
- No `disconnect` listener.

## Next Task

`003-mantle-network-check` is next. Do not start it from this branch until `002-wallet-connect` is merged back into the baseline branch.
