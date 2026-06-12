# Evidence: 006-anchor-transaction

Spec: `006-anchor-transaction`
Branch: `feature/006-anchor-transaction`
Implementation Commit: `db0aa4a`
Date: 2026-06-12

## Scope

Send one real Mantle Sepolia transaction from the web UI to the deployed `ReceiptAnchor` contract by calling `anchorReceipt`.

- The transaction was initiated by the human in Chrome + MetaMask.
- The transaction used the deployed contract from `005-contract-deploy`.
- The transaction wrote only receipt hash metadata on-chain.
- No contract redeploy, no private log upload, no backend API, and no 007 explorer-verification task was started.

## Transaction

- Network: Mantle Sepolia (chainId 5003)
- Contract address: `0x69E07961d8c022B81c1c968ef7C1a3955E8D182b`
- Anchor tx hash: `0x0aea4a4f414551d0f4d45685240285795f6f8b81c89976db572477f752b877cb`
- Explorer link: https://sepolia.mantlescan.xyz/tx/0x0aea4a4f414551d0f4d45685240285795f6f8b81c89976db572477f752b877cb

## Event

Decoded `ReceiptAnchored` event:

```text
eventName: ReceiptAnchored
receiptHash: 0x0a2f2ac45c97bbaf9793360c371a3e83ca7278fbb864b339b84f9457a3deb60d
agentIdHash: 0x1780b1149f3a9f3653d76ef64c4ffb3359ca89ce0c97a353f8b0e4ab6914835c
taskIdHash: 0x61eee2b6a408aafa5a23908a5d37872b3ec677e608515d61edc0b05bdf0f6097
statusCode: NEEDS_HUMAN_REVIEW
submitter: 0x9a9812bf658220F4bbdCE0e416F66808597df541
timestamp: 1781271169
```

RPC receipt summary:

```text
status: success
blockNumber: 39863248
from: 0x9a9812bf658220f4bbdce0e416f66808597df541
to: 0x69e07961d8c022b81c1c968ef7c1a3955e8d182b
contractMatch: true
inputStarts: 0xa2858325
logs: 1
```

## Commands

```bash
corepack pnpm --filter @afr/web exec node --input-type=module -
corepack pnpm progress
corepack pnpm verify:all
git status --short --branch
git log --oneline -6
```

The RPC verification command used `viem` from the existing `@afr/web` workspace and the public Mantle Sepolia RPC endpoint. It did not read `contracts/.env`, private keys, seed phrases, wallet passwords, API keys, tokens, cookies, or sessions.

## Results

- Human wallet transaction succeeded on Mantle Sepolia.
- Transaction receipt status is `success`.
- Transaction `to` matches the deployed `ReceiptAnchor` contract.
- Transaction emitted one `ReceiptAnchored` event.
- Event fields were decoded and recorded above.
- `corepack pnpm verify:all` passed after evidence and documentation sync.

## Files Changed

- `specs/status.json`
- `specs/task-board.md`
- `specs/006-anchor-transaction.md`
- `specs/007-explorer-verification.md`
- `docs/evidence/006-anchor-transaction.md`
- `docs/handoff.md`
- `docs/architecture.md`
- `docs/onchain-verification.md`
- `docs/project-acceptance.md`

## Docs Synced

- `specs/status.json`
- `specs/task-board.md`
- `docs/evidence/006-anchor-transaction.md`
- `docs/handoff.md`
- `docs/architecture.md`
- `docs/onchain-verification.md`
- `docs/project-acceptance.md`

## Known Limits

- Explorer UI verification is the next task: `007-explorer-verification`.
- Public frontend deployment is not complete.
- README and DoraHacks submission materials are not complete.
- This evidence records one sample anchor transaction, not a production receipt history system.

## Next Task

`007-explorer-verification` is next. Do not start it from this evidence-sync step.
