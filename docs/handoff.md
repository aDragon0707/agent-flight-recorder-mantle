# Handoff

## Current State

- Repository: `aDragon0707/agent-flight-recorder-mantle`
- Current branch: `feature/003-mantle-network-check`
- Current verified spec: `003-mantle-network-check`
- Next spec: `004-mantle-network-switch`

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

## Known Limits

- No real MetaMask wallet transaction.
- No network switch has been implemented.
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
5. `specs/004-mantle-network-switch.md` once it exists
6. `docs/architecture.md`

Then run:

```bash
corepack pnpm progress
```

Do not start `004-mantle-network-switch` until governance scripts pass and `003-mantle-network-check` has been merged back into `feature/project-scaffold`.

For `004-mantle-network-switch`, remember that `003-mantle-network-check` only checked network status. Any network switching must stay in the 004 branch and still avoid transactions, contract calls, private keys, seed phrases, wallet passwords, or API keys.
