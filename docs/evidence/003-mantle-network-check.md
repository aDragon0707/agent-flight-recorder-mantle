# Evidence: 003-mantle-network-check

Spec: `003-mantle-network-check`
Branch: `feature/003-mantle-network-check`
Commit: `d586111`
Date: 2026-06-12

## Scope

Mantle Sepolia network check is a read-only wallet check after the wallet is connected.

- Calls only `ethereum.request({ method: "eth_chainId" })`.
- Accepts Mantle Sepolia chain id `0x138b` case-insensitively, including `0x138B`.
- Reports the current chain id for UI display.
- Shows `Wrong network. Mantle Sepolia is required.` for non-Mantle Sepolia networks.
- Does not switch networks.
- Does not send transactions.
- Does not call contracts.
- Does not persist chain id or wallet state.
- Does not register wallet event listeners.

## Commands

```bash
git status --short --branch
git branch --show-current
corepack pnpm progress
git pull --ff-only origin feature/project-scaffold
git switch -c feature/003-mantle-network-check
corepack pnpm --filter @afr/web test
corepack pnpm --filter @afr/web test
rg "wallet_switchEthereumChain|wallet_addEthereumChain|eth_sendTransaction|writeContract|ReceiptAnchor|localStorage|sessionStorage|accountsChanged|chainChanged|disconnect" apps/web
corepack pnpm progress
corepack pnpm --filter @afr/web test
corepack pnpm lint
corepack pnpm typecheck
corepack pnpm test
corepack pnpm build
corepack pnpm verify:all
corepack pnpm --filter @afr/web build
corepack pnpm verify:all
corepack pnpm progress
corepack pnpm verify:all
```

## Results

- Preflight passed on `feature/project-scaffold`; working tree was clean.
- `corepack pnpm progress` showed `currentSpec` as `003-mantle-network-check`, with 000 / 001 / 002 verified and 003 planned.
- RED test: `corepack pnpm --filter @afr/web test` first failed because `./mantle-network` did not exist.
- GREEN test: `@afr/web` tests passed with 3 test files and 14 tests after adding the read-only network check.
- Forbidden scan returned no matches in `apps/web`.
- Full validation passed:
  - `corepack pnpm --filter @afr/web test`: 3 files, 14 tests passed.
  - `corepack pnpm lint`: passed.
  - `corepack pnpm typecheck`: passed.
  - `corepack pnpm test`: passed.
  - `corepack pnpm build`: passed after rerunning once; the first run hit a transient Next.js worker/module output issue and did not require source changes.
  - `corepack pnpm verify:all`: passed after rerunning once; the first run hit a transient Next.js build worker exit and did not require source changes.

## Files Changed

- `apps/web/components/workbench.tsx`
- `apps/web/lib/mantle-network.ts`
- `apps/web/lib/mantle-network.test.ts`
- `specs/004-mantle-network-switch.md`
- `specs/status.json`
- `specs/task-board.md`
- `docs/evidence/003-mantle-network-check.md`
- `docs/handoff.md`
- `docs/architecture.md`
- `docs/project-acceptance.md`

## Docs Synced

- `specs/status.json`
- `specs/task-board.md`
- `docs/evidence/003-mantle-network-check.md`
- `docs/handoff.md`
- `docs/architecture.md`
- `docs/project-acceptance.md`

## Known Limits

- No network switching.
- No transaction.
- No contract call.
- No `ReceiptAnchor` usage.
- No local or session storage.
- No `accountsChanged`, `chainChanged`, or `disconnect` listener.
- Browser wallet interaction was not manually exercised in MetaMask during this task.

## Next Task

`004-mantle-network-switch` is next. Do not start it from this branch and do not request network switching as part of 003.
