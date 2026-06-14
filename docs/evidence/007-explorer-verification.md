# Evidence: 007-explorer-verification

Spec: `007-explorer-verification`
Branch: `feature/007-explorer-verification`
Implementation Commit: `5baa5c1`
Date: 2026-06-12

> Note: This evidence references the in_progress start commit `5baa5c1` recorded in
> `specs/status.json` per the project's evidence-freshness convention. 007 is a
> documentation-and-verification task with no separate implementation commit between
> start and verify, so the start commit is the recorded commit and is cited here.

## Scope

Independently verify the 006 anchor transaction and its `ReceiptAnchored` event using public Mantle Sepolia data, then record explorer evidence so judges can inspect it quickly.

- Explorer URL recorded; transaction/event independently verified via public Mantle Sepolia RPC.
- No new anchor transaction was sent. No `eth_sendTransaction`, no wallet signing, no MetaMask interaction.
- No contract redeploy. No deployed-address change.
- No private key, seed phrase, wallet password, API key, token, cookie, session, or `contracts/.env` was read.
- 008 public demo deployment was not started.

## Transaction

- Network: Mantle Sepolia (chainId 5003)
- Contract address: `0x69E07961d8c022B81c1c968ef7C1a3955E8D182b`
- Anchor tx hash: `0x0aea4a4f414551d0f4d45685240285795f6f8b81c89976db572477f752b877cb`

Canonical explorer URL (Mantlescan):

```text
https://sepolia.mantlescan.xyz/tx/0x0aea4a4f414551d0f4d45685240285795f6f8b81c89976db572477f752b877cb
```

Contract on explorer:

```text
https://sepolia.mantlescan.xyz/address/0x69E07961d8c022B81c1c968ef7C1a3955E8D182b
```

## Verification Method

Independent read-only verification was performed against the public Mantle Sepolia RPC endpoint (`https://rpc.sepolia.mantle.xyz`) using the existing `viem` dependency in the `@afr/web` workspace. The script called `getTransactionReceipt` and decoded the single log with `decodeEventLog` against the `ReceiptAnchored` ABI. It did not read `contracts/.env`, did not send any transaction, and did not request wallet access.

## RPC Receipt Summary

```text
status: success
blockNumber: 39863248
from: 0x9a9812bf658220f4bbdce0e416f66808597df541
to: 0x69e07961d8c022b81c1c968ef7c1a3955e8d182b
gasUsed: 27160
logs: 1
contractMatch: true
```

## Decoded Event Field Comparison

Decoded `ReceiptAnchored` event vs. recorded 006 evidence:

| Field | 006 evidence | RPC-decoded (007) | Match |
| --- | --- | --- | --- |
| receiptHash | `0x0a2f2ac45c97bbaf9793360c371a3e83ca7278fbb864b339b84f9457a3deb60d` | `0x0a2f2ac45c97bbaf9793360c371a3e83ca7278fbb864b339b84f9457a3deb60d` | yes |
| agentIdHash | `0x1780b1149f3a9f3653d76ef64c4ffb3359ca89ce0c97a353f8b0e4ab6914835c` | `0x1780b1149f3a9f3653d76ef64c4ffb3359ca89ce0c97a353f8b0e4ab6914835c` | yes |
| taskIdHash | `0x61eee2b6a408aafa5a23908a5d37872b3ec677e608515d61edc0b05bdf0f6097` | `0x61eee2b6a408aafa5a23908a5d37872b3ec677e608515d61edc0b05bdf0f6097` | yes |
| statusCode | `NEEDS_HUMAN_REVIEW` | `NEEDS_HUMAN_REVIEW` | yes |
| submitter | `0x9a9812bf658220F4bbdCE0e416F66808597df541` | `0x9a9812bf658220F4bbdCE0e416F66808597df541` | yes |
| timestamp | `1781271169` | `1781271169` | yes |

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

- Transaction receipt status is `success`.
- Transaction `to` matches the deployed `ReceiptAnchor` contract `0x69E07961d8c022B81c1c968ef7C1a3955E8D182b`.
- Transaction emitted exactly one `ReceiptAnchored` event.
- All event fields (`receiptHash`, `agentIdHash`, `taskIdHash`, `statusCode`, `submitter`, `timestamp`) match the 006 evidence.
- Canonical Mantlescan explorer URL is recorded above for judge inspection.
- `corepack pnpm verify:all` passed after evidence and documentation sync.

## Files Changed

- `specs/status.json`
- `specs/task-board.md`
- `specs/007-explorer-verification.md`
- `specs/008-public-demo-deploy.md`
- `docs/evidence/007-explorer-verification.md`
- `docs/handoff.md`
- `docs/architecture.md`
- `docs/onchain-verification.md`
- `docs/project-acceptance.md`

## Docs Synced

- `specs/status.json`
- `specs/task-board.md`
- `docs/evidence/007-explorer-verification.md`
- `docs/handoff.md`
- `docs/architecture.md`
- `docs/onchain-verification.md`
- `docs/project-acceptance.md`

## Known Limits

- Verification was performed via public RPC, not via a captured Mantlescan UI screenshot; the canonical explorer URL is recorded for manual UI inspection.
- Public frontend deployment is not complete: `008-public-demo-deploy` is next.
- README and DoraHacks submission materials are not complete.
- This evidence verifies one sample anchor transaction, not a production receipt history system.

## Next Task

`008-public-demo-deploy` is next. Do not start it from this evidence-sync step.
