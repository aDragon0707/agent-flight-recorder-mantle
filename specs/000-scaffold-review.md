# Spec 000: Project Scaffold Review

Status: verified

## Goal

Verify that the project scaffold exists and can install, lint, typecheck, test, and build.

## Non-goals

- No wallet transaction.
- No Mantle deployment.
- No public demo deployment.
- No DoraHacks submission update.

## Acceptance Commands

```bash
corepack pnpm lint
corepack pnpm typecheck
corepack pnpm test
corepack pnpm build
```

## Docs Sync Checklist

- [x] `docs/prd.md`
- [x] `docs/architecture.md`
- [x] `README.md`
- [x] `specs/status.json`
- [x] `specs/task-board.md`

## Review Receipt

- Branch: `feature/project-scaffold`
- Commit: `f558c1c`
- Evidence: `docs/evidence/000-scaffold.md`
- Known limits: wallet, anchor transaction, contract deployment, public demo, and DoraHacks submission are not implemented.
- Next task: `001-wallet-detection`

