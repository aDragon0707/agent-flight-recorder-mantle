# Spec 005: Contract Deploy

Status: planned

## Goal

Deploy `ReceiptAnchor` to Mantle Sepolia.

## Scope

- Deploy the existing `ReceiptAnchor` contract to Mantle Sepolia.
- Record the deployed contract address.
- Keep deployment evidence for review.

## Non-goals

- No frontend anchor transaction implementation.
- No receipt anchoring transaction.
- No explorer event verification beyond deployment evidence.
- No public demo deployment.
- No DoraHacks submission update.

## Acceptance Commands

```bash
corepack pnpm progress
corepack pnpm verify:all
```

## Stop Conditions

- The task requires committing a private key, seed phrase, wallet password, API key, token, cookie, or session.
- The task requires using a wallet or deployer account without explicit human approval.
- The task requires funds that are not available.
- The task requires changing frontend anchor transaction scope.
