# Spec 009: Submission Package

Status: planned

## Goal

Prepare the final DoraHacks submission package so judges can review the repository, public demo, on-chain evidence, and project explanation from one place.

## Scope

- Record the public demo URL, GitHub repository, contract address, anchor transaction, and explorer links in the final submission materials.
- Prepare a concise demo script and submission checklist.
- Keep the final package aligned with README, Architecture, Project Acceptance, and evidence ledgers.

## Non-goals

- No new product feature.
- No new contract deployment.
- No new wallet transaction.
- No backend service, database, account system, or API integration.

## Acceptance Commands

```bash
corepack pnpm progress
corepack pnpm verify:all
```

## Stop Conditions

- The DoraHacks page requires a final publish action without human confirmation.
- Any step requires private keys, seed phrase, wallet password, API key, token, cookie, or session.
- The submission package would claim demo video, prize category, or external publication evidence that does not exist.
