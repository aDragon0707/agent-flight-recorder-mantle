# Handoff

## Current State

- Repository: `aDragon0707/agent-flight-recorder-mantle`
- Current branch: `feature/005-contract-deploy`
- Current verified spec: `004-mantle-network-switch`
- Current spec: `005-contract-deploy`
- Next spec: `006-anchor-transaction`

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
- Contract deploy (005B): `ReceiptAnchor` deployed once to Mantle Sepolia (chainId 5003) at `0x69E07961d8c022B81c1c968ef7C1a3955E8D182b` (deploy tx `0x3b7be838fe7384cb37d5ea8dfb49c6ea2788c7766158999834473625fce6568f`). Deployment succeeded; evidence sync is the next step.

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

## Known Limits

- No real MetaMask wallet transaction.
- Real wallet network switching was not manually exercised in MetaMask during automated verification.
- No wallet address is persisted; the connected address is held only in client state for display.
- No Mantle Sepolia contract deployment.
- No explorer verification.
- No public frontend deployment.
- No demo video.

## Resume Instructions

Read these first:

1. `AGENTS.md`
2. `specs/status.json`
3. `specs/task-board.md`
4. `docs/agent-loop.md`
5. `specs/005-contract-deploy.md` once it exists
6. `docs/architecture.md`

Then run:

```bash
corepack pnpm progress
```

Do not start `005-contract-deploy` until governance scripts pass and `004-mantle-network-switch` has been merged back into `feature/project-scaffold`.

For `005-contract-deploy`, remember that 004 only requested wallet network switching. Any deployment must stay in the 005 branch and requires explicit human approval for wallet/deployer use, test funds, and any secret-dependent step.
