# Handoff

## Current State

- Repository: `aDragon0707/agent-flight-recorder-mantle`
- Current branch: `feature/project-scaffold`
- Current verified spec: `001-wallet-detection`
- Next spec: `002-wallet-connect`

## Completed

- PRD, engineering doc, and architecture doc.
- Private GitHub repository.
- Project scaffold.
- SACP core package.
- Web shell.
- ReceiptAnchor contract skeleton.
- Governance gate plan and ledgers.
- Wallet detection: web UI reads only injected `window.ethereum` presence and renders detected / not detected state.

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

## Known Limits

- No real MetaMask wallet transaction.
- No wallet connection request has been implemented.
- No account address is displayed or stored.
- No network check or network switch has been implemented.
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
5. `specs/002-wallet-connect.md`
6. `docs/architecture.md`

Then run:

```bash
corepack pnpm progress
```

Do not start wallet code until governance scripts pass.

For `002-wallet-connect`, keep the current boundary: wallet detection is read-only. Any account request must be implemented in the next spec and must use explicit user authorization.
