# Handoff

## Current State

- Repository: `aDragon0707/agent-flight-recorder-mantle`
- Current branch: `feature/project-scaffold`
- Current verified spec: `000-scaffold`
- Next spec: `001-wallet-detection`

## Completed

- PRD, engineering doc, and architecture doc.
- Private GitHub repository.
- Project scaffold.
- SACP core package.
- Web shell.
- ReceiptAnchor contract skeleton.
- Governance gate plan and ledgers.

## Last Verified Commands

```bash
corepack pnpm verify:all
```

Latest governance dry-run checks:

- Dependency-order failure was rejected.
- Missing-evidence failure was rejected.
- Commit-mismatch failure was rejected.
- Forbidden staged file failure was rejected.
- Docs-sync missing failure was rejected.

## Known Limits

- No real MetaMask wallet transaction.
- No Mantle Sepolia contract deployment.
- No explorer verification.
- No public frontend deployment.
- No demo video.

## Resume Instructions

Read these first:

1. `AGENTS.md`
2. `specs/status.json`
3. `specs/task-board.md`
4. `specs/001-wallet-detection.md`
5. `docs/architecture.md`

Do not start wallet code until governance scripts pass.
