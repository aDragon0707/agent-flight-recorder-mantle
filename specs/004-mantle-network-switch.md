# Spec 004: Mantle Network Switch

Status: planned

## Goal

Request the wallet to switch to Mantle Sepolia.

## Scope

- Only request a network switch after the user explicitly clicks.
- Use Mantle Sepolia chainId `0x138b`.
- Show success / rejected / failed states.

## Non-goals

- No transaction.
- No contract call.
- No contract deployment.
- No anchor receipt.
- No explorer verification.

## Acceptance Commands

```bash
corepack pnpm progress
corepack pnpm --filter @afr/web test
corepack pnpm verify:all
```

## Stop Conditions

- The task requires a private key, seed phrase, wallet password, or API key.
- The task requires a real transaction.
- The task requires a contract call.
- The task requires deployment.
