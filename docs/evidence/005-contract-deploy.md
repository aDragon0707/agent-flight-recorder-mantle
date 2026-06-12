# Evidence: 005-contract-deploy

Spec: `005-contract-deploy`
Branch: `feature/005-contract-deploy`
Implementation Commit: `dfa5bef`
Date: 2026-06-12

## Scope

Deploy the existing `ReceiptAnchor` contract once to Mantle Sepolia (chainId 5003) under explicit human approval, then record public deployment evidence.

- Single real deployment transaction (005B), authorized by the human.
- Deploys the no-arg `ReceiptAnchor` contract via `contracts/scripts/deploy.ts` on network `mantleSepolia`.
- Records contract address, deploy transaction hash, and Mantlescan links.
- No `anchorReceipt` call, no frontend transaction, no public demo deploy.

## Deployment

- Network: `mantleSepolia` (chainId 5003)
- Contract address: `0x69E07961d8c022B81c1c968ef7C1a3955E8D182b`
- Deploy tx hash: `0x3b7be838fe7384cb37d5ea8dfb49c6ea2788c7766158999834473625fce6568f`
- Address link: https://sepolia.mantlescan.xyz/address/0x69E07961d8c022B81c1c968ef7C1a3955E8D182b
- Tx link: https://sepolia.mantlescan.xyz/tx/0x3b7be838fe7384cb37d5ea8dfb49c6ea2788c7766158999834473625fce6568f

## Commands

```bash
git status --short --branch
git branch --show-current
corepack pnpm progress
git check-ignore -v contracts/.env
# PowerShell: Test-Path contracts/.env
git push -u origin feature/005-contract-deploy
corepack pnpm --filter @afr/contracts test
corepack pnpm --filter @afr/contracts build
corepack pnpm --filter @afr/contracts run deploy:mantleSepolia
corepack pnpm progress
corepack pnpm verify:all
git status --short --branch
git log --oneline -5
```

## Results

- Preflight passed: branch `feature/005-contract-deploy`, working tree clean, `currentSpec` `005-contract-deploy` with 005 `in_progress`, `contracts/.env` exists and is gitignored (`.gitignore:17`).
- Branch pushed to origin successfully before deployment.
- `corepack pnpm --filter @afr/contracts test`: 2 passing (ReceiptAnchor).
- `corepack pnpm --filter @afr/contracts build`: compiled, nothing to recompile.
- `corepack pnpm --filter @afr/contracts run deploy:mantleSepolia`: succeeded once on `mantleSepolia`, address and deploy tx hash captured above.
- `corepack pnpm verify:all`: passed (lint, typecheck, test, build, graph, evidence, secrets, scope, docs, acceptance).
- `corepack pnpm progress`: 005 verified, current task `006-anchor-transaction`.

## Files Changed

- `specs/status.json`
- `specs/task-board.md`
- `specs/006-anchor-transaction.md`
- `docs/environments.md`
- `docs/onchain-verification.md`
- `docs/evidence/005-contract-deploy.md`
- `docs/handoff.md`
- `docs/architecture.md`
- `docs/project-acceptance.md`

## Docs Synced

- `specs/status.json`
- `specs/task-board.md`
- `docs/environments.md`
- `docs/onchain-verification.md`
- `docs/evidence/005-contract-deploy.md`
- `docs/handoff.md`
- `docs/architecture.md`
- `docs/project-acceptance.md`

## Known Limits

- No 006 anchor transaction.
- No `anchorReceipt` call.
- No frontend `writeContract`.
- No public demo deploy.
- Source verification (`verify:mantleSepolia`) was not run and is not a blocking step.
- Anchor / event explorer verification belongs to `007-explorer-verification`; only the deploy address/tx explorer links are recorded here.

## Next Task

`006-anchor-transaction` is next. Do not start it from this branch.
