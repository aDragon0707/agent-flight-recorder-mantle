# Spec 006: Anchor Transaction

Status: implemented

## Goal

Write a receipt hash into the deployed `ReceiptAnchor` contract on Mantle Sepolia by calling `anchorReceipt`.

## Scope

- Send a real `anchorReceipt` transaction to the deployed contract `0x69E07961d8c022B81c1c968ef7C1a3955E8D182b`.
- Record the anchor transaction hash and the emitted `ReceiptAnchored` event.
- Keep anchor evidence for review.

## Non-goals

- No explorer event verification beyond recording the anchor transaction (that is `007-explorer-verification`).
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
- The task requires redeploying the contract.
