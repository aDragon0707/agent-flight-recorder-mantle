# Evidence: 000-scaffold

Spec: `000-scaffold`
Branch: `feature/project-scaffold`
Commit: `f558c1c`
Date: 2026-06-10

## Commands

```bash
corepack pnpm lint
corepack pnpm typecheck
corepack pnpm test
corepack pnpm build
```

## Results

All commands passed on the scaffold branch.

Summary:

- `@afr/sacp-core`: 4 tests passed.
- `@afr/contracts`: 2 tests passed.
- `@afr/web`: Next.js build passed.
- Secret scan found no real credential values.
- `longju-task.md` and `prize-breakdown.png` remained ignored.

## Manual Evidence

- GitHub branch: `feature/project-scaffold`
- Current status documented in `docs/prd.md`, `docs/architecture.md`, and `README.md`.

## Governance Gate Extension

Date: 2026-06-10

Commands:

```bash
corepack pnpm verify:all
```

Negative dry-run simulations:

- Dependency-order failure rejected by `verify-spec-graph.ps1`.
- Missing-evidence failure rejected by `verify-evidence-freshness.ps1`.
- Commit-mismatch failure rejected by `verify-evidence-freshness.ps1`.
- Forbidden staged file failure rejected by `verify-worktree-scope.ps1`.
- Docs-sync missing failure rejected by `verify-doc-sync.ps1`.

## Known Limits

- Real MetaMask wallet connection is not implemented.
- Mantle Sepolia deployment is not complete.
- Anchor transaction is not implemented.
- Public demo deployment is not complete.
- DoraHacks submission package is not complete.
