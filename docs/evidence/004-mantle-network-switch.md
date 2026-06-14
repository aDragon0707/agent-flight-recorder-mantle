# Evidence: 004-mantle-network-switch

Spec: `004-mantle-network-switch`
Branch: `feature/004-mantle-network-switch`
Implementation Commit: `68b7962`
Date: 2026-06-12

## Scope

Mantle Sepolia network switch is a user-triggered wallet request after wallet connection and a wrong-network check result.

- Calls `ethereum.request({ method: "wallet_switchEthereumChain", params: [{ chainId: "0x138b" }] })`.
- Shows switch UI near the Mantle Anchor network check block.
- Enables switching only when the wallet is connected and the checked network is `wrong_network`.
- Reports `rejected` for wallet error code `4001`.
- Reports `not_added` for wallet error code `4902` without adding the network.
- Reports `failed` for other wallet errors.
- After a successful switch request, refreshes the current chain with the existing `eth_chainId` check.

## Commands

```bash
git status --short --branch
git branch --show-current
corepack pnpm progress
git pull --ff-only origin feature/project-scaffold
git switch -c feature/004-mantle-network-switch
corepack pnpm --filter @afr/web test
corepack pnpm --filter @afr/web test
rg "wallet_addEthereumChain|eth_sendTransaction|writeContract|ReceiptAnchor|localStorage|sessionStorage|accountsChanged|chainChanged|disconnect" apps/web
corepack pnpm --filter @afr/web test
rg "wallet_addEthereumChain|eth_sendTransaction|writeContract|ReceiptAnchor|localStorage|sessionStorage|accountsChanged|chainChanged|disconnect" apps/web
corepack pnpm progress
corepack pnpm --filter @afr/web test
corepack pnpm lint
corepack pnpm typecheck
corepack pnpm test
corepack pnpm build
corepack pnpm verify:all
```

## Results

- Preflight passed on `feature/project-scaffold`; working tree was clean.
- `corepack pnpm progress` showed `currentSpec` as `004-mantle-network-switch`, with 000 / 001 / 002 / 003 verified and 004 planned.
- RED test: `corepack pnpm --filter @afr/web test` first failed because `./mantle-network-switch` did not exist.
- GREEN test: `@afr/web` tests passed with 4 test files and 19 tests after adding the switch helper.
- Forbidden scan final result returned no matches in `apps/web`. A test-only forbidden method literal was removed while keeping the no-add-network assertion.
- Full validation passed:
  - `corepack pnpm progress`: showed 004 implemented before evidence sync.
  - `corepack pnpm --filter @afr/web test`: 4 files, 19 tests passed.
  - `corepack pnpm lint`: passed.
  - `corepack pnpm typecheck`: passed.
  - `corepack pnpm test`: passed.
  - `corepack pnpm build`: passed.
  - `corepack pnpm verify:all`: passed.

## Files Changed

- `apps/web/components/workbench.tsx`
- `apps/web/lib/mantle-network-switch.ts`
- `apps/web/lib/mantle-network-switch.test.ts`
- `specs/status.json`
- `specs/task-board.md`
- `specs/005-contract-deploy.md`
- `docs/evidence/004-mantle-network-switch.md`
- `docs/handoff.md`
- `docs/architecture.md`
- `docs/project-acceptance.md`

## Docs Synced

- `specs/status.json`
- `specs/task-board.md`
- `docs/evidence/004-mantle-network-switch.md`
- `docs/handoff.md`
- `docs/architecture.md`
- `docs/project-acceptance.md`

## Known Limits

- No automatic `wallet_addEthereumChain`.
- No transaction.
- No contract call.
- No `ReceiptAnchor` usage.
- No contract deployment.
- No explorer verification.
- No local or session storage.
- No `accountsChanged`, `chainChanged`, or `disconnect` listener.
- Real wallet switching was not manually exercised; human can confirm the wallet popup and successful network switch later.

## Next Task

`005-contract-deploy` is next. Do not start it from this branch.
