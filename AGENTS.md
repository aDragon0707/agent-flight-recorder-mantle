# Agent Flight Recorder Agent Rules

Default language for project work is Chinese. Keep code identifiers, commands, paths, API names, and error strings in English.

## Required Reading Before Any Task

Before changing files, read:

- `specs/status.json`
- `specs/task-board.md`
- The current spec file under `specs/`
- `docs/handoff.md`
- `docs/architecture.md`

## Hard Rules

- Never develop directly on `main`.
- Every feature task must have a spec entry.
- Every verified task must have an evidence file.
- Every verified task must update `specs/status.json` and `specs/task-board.md`.
- Every completed block must update the affected project docs.
- Run `corepack pnpm progress` and `corepack pnpm verify:all` before claiming a task is complete.
- Do not commit `.env`, private keys, seed phrases, wallet passwords, API keys, cookies, tokens, or sessions.
- Do not commit `longju-task.md`, `prize-breakdown.png`, `node_modules`, `.next`, `dist`, `artifacts`, `cache`, `typechain-types`, or `*.tsbuildinfo`.

## Status Rules

Allowed status values:

- `planned`
- `in_progress`
- `implemented`
- `verified`
- `blocked`

Allowed transitions:

- `planned -> in_progress`
- `in_progress -> implemented`
- `implemented -> verified`
- `planned -> blocked`
- `in_progress -> blocked`
- `implemented -> blocked`

Forbidden transitions:

- `planned -> verified`
- `blocked -> verified`

## Review Receipt Requirement

Every verified task must have:

- Branch
- Commit
- Commands run
- Command results
- Files changed
- Docs synced
- Known limits
- Next task

## Human Progress View

Use `corepack pnpm progress` when resuming work, before handing off to a new window, and before reporting task completion. The output is a Chinese human-readable view of:

- Current branch
- Current spec
- Task chain
- Technical explanation
- Plain-language explanation
- Evidence status
- Human decision points
- Project acceptance ledger
