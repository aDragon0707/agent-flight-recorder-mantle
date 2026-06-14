# Handoff

## Current State

- Repository: `aDragon0707/agent-flight-recorder-mantle`
- Current branch: `feature/008-public-demo-deploy`
- Current verified spec: `008-public-demo-deploy`
- Current spec: `009-submission-package`
- Next spec: `009-submission-package`

## Completed

- PRD, engineering doc, and architecture doc.
- Private GitHub repository.
- Project scaffold.
- SACP core package.
- Web shell.
- ReceiptAnchor contract skeleton.
- Governance gate plan and ledgers.
- Wallet detection: web UI reads only injected `window.ethereum` presence and renders detected / not detected state.
- Wallet connect: web UI requests `eth_requestAccounts` only after the user clicks `Connect wallet`, then displays connected / rejected / failed states without persistence.
- Mantle network check: after wallet connection, web UI checks the current wallet chain only when the user clicks `Check network`, calls only `eth_chainId`, accepts `0x138b` case-insensitively, displays the current chain id, and reports wrong network without switching.
- Mantle network switch: when the wallet is connected and network check reports `wrong_network`, web UI shows `Switch to Mantle Sepolia` and calls only `wallet_switchEthereumChain` with chain id `0x138b`; it reports rejected / not added / failed states and never auto-adds the network.
- Contract deploy (005B): `ReceiptAnchor` deployed once to Mantle Sepolia (chainId 5003) at `0x69E07961d8c022B81c1c968ef7C1a3955E8D182b` (deploy tx `0x3b7be838fe7384cb37d5ea8dfb49c6ea2788c7766158999834473625fce6568f`). Verified; evidence in `docs/evidence/005-contract-deploy.md`.
- Anchor transaction (006): web UI adds an `Anchor receipt` action in the `Mantle Anchor` panel. `apps/web/lib/anchor-receipt.ts` builds the `anchorReceipt(receiptHash, statusCode, agentIdHash, taskIdHash)` calldata with viem (`encodeFunctionData`, `keccak256`, `toBytes`) and sends it via the injected provider `eth_sendTransaction`. A real Mantle Sepolia transaction was confirmed by the human wallet: `0x0aea4a4f414551d0f4d45685240285795f6f8b81c89976db572477f752b877cb`. The transaction targeted the deployed `ReceiptAnchor` contract and emitted `ReceiptAnchored`; evidence is in `docs/evidence/006-anchor-transaction.md`.
- Explorer verification (007): the 006 anchor transaction and its `ReceiptAnchored` event were independently verified via the public Mantle Sepolia RPC endpoint using `viem` from `@afr/web`. Receipt status `success`, `to` equals the deployed `ReceiptAnchor`, single `ReceiptAnchored` log, and all event fields match the 006 evidence. Canonical Mantlescan URL recorded. Read-only; no new transaction, no redeploy, no secret access. Evidence: `docs/evidence/007-explorer-verification.md`.
- Public demo deploy (008): the `apps/web` Next.js workbench is publicly deployed on Vercel at `https://agent-flight-recorder-mantle.vercel.app`. The Vercel project uses the repository root with `vercel.json` pointing the Next builder at `apps/web/package.json`, so the pnpm workspace dependency on `packages/sacp-core` resolves correctly. SSO deployment protection was disabled for this project so judges can open the demo without logging in. Evidence: `docs/evidence/008-public-demo-deploy.md`.

## Last Verified Commands

```bash
corepack pnpm progress
corepack pnpm verify:all
```

Latest governance dry-run checks:

- Dependency-order failure was rejected.
- Missing-evidence failure was rejected.
- Commit-mismatch failure was rejected.
- Forbidden staged file failure was rejected.
- Docs-sync missing failure was rejected.
- `001-wallet-detection` verified with evidence in `docs/evidence/001-wallet-detection.md`.
- `002-wallet-connect` verified with evidence in `docs/evidence/002-wallet-connect.md`.
- `003-mantle-network-check` verified with evidence in `docs/evidence/003-mantle-network-check.md`.
- `004-mantle-network-switch` verified with evidence in `docs/evidence/004-mantle-network-switch.md`.
- `005-contract-deploy` verified with evidence in `docs/evidence/005-contract-deploy.md`.
- `006-anchor-transaction` verified with evidence in `docs/evidence/006-anchor-transaction.md`.
- `007-explorer-verification` verified with evidence in `docs/evidence/007-explorer-verification.md`.
- `008-public-demo-deploy` verified with evidence in `docs/evidence/008-public-demo-deploy.md`.

## Known Limits

- Public demo deploy (008) is complete; `009-submission-package` is next.
- No demo video.
- DoraHacks submission package is not complete.

## Resume Instructions

Read these first:

1. `AGENTS.md`
2. `specs/status.json`
3. `specs/task-board.md`
4. `docs/agent-loop.md`
5. Current spec file under `specs/`
6. `docs/architecture.md`

Then run:

```bash
corepack pnpm progress
```

For `009-submission-package`, do not submit or publish the DoraHacks BUIDL page without human confirmation. Do not send another wallet transaction, do not redeploy, and do not read `contracts/.env`.
