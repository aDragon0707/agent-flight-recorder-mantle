# Spec 008: Public Demo Deploy

Status: planned

## Goal

Deploy the `apps/web` frontend to a public host so DoraHacks judges can open the demo without a local install, and record the public demo URL.

## Scope

- Deploy the existing `apps/web` Next.js app to a public Next.js host (e.g. Vercel).
- Configure only public env (`NEXT_PUBLIC_*`); no secrets in the frontend.
- Record the public demo URL in README and project docs.

## Non-goals

- No new anchor transaction.
- No contract redeploy.
- No DoraHacks submission package (that is `009-submission-package`).
- No backend service, database, or account system.

## Acceptance Commands

```bash
corepack pnpm progress
corepack pnpm verify:all
```

## Stop Conditions

- Deployment requires a secret, private key, seed phrase, wallet password, API key, token, cookie, or session beyond an approved public deploy credential.
- The public host requires committing secrets into the repository.
- The deploy would change the deployed contract address or send an on-chain transaction.
