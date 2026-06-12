# Spec 007: Explorer Verification

Status: in_progress

## Goal

Verify the 006 anchor transaction and `ReceiptAnchored` event through Mantle Explorer, then make the explorer evidence easy for judges to inspect.

## Scope

- Verify the anchor transaction link on Mantlescan.
- Confirm the transaction targets the deployed `ReceiptAnchor` contract.
- Confirm the transaction succeeded.
- Confirm the `ReceiptAnchored` event fields are visible or independently decodable.
- Record explorer verification evidence for review.

## Non-goals

- No new anchor transaction.
- No contract redeploy.
- No public demo deployment.
- No DoraHacks submission update.

## Acceptance Commands

```bash
corepack pnpm progress
corepack pnpm verify:all
```

## Stop Conditions

- The explorer cannot load and no independent RPC verification can be recorded.
- The transaction does not target the deployed `ReceiptAnchor` contract.
- The transaction failed or the `ReceiptAnchored` event is missing.
- The task requires a private key, seed phrase, wallet password, API key, token, cookie, or session.
