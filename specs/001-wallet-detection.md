# Spec 001: Wallet Detection

Status: planned

## Goal

Detect whether the browser exposes an injected EVM wallet provider.

## Scope

- Read `window.ethereum` from the web app runtime.
- Show a clear state for wallet detected or not detected.
- Keep the UI inside the existing three-column workbench.
- Add tests or verification steps that prove detection state is rendered.

## Non-goals

- No wallet connect request.
- No account address display.
- No network check.
- No network switch.
- No transaction.
- No Mantle contract call.

## Acceptance Commands

```bash
corepack pnpm lint
corepack pnpm typecheck
corepack pnpm test
corepack pnpm build
corepack pnpm verify:all
```

## Docs Sync Checklist

- [ ] `specs/status.json`
- [ ] `specs/task-board.md`
- [ ] `docs/evidence/001-wallet-detection.md`
- [ ] `docs/handoff.md`
- [ ] `docs/architecture.md` if wallet boundary changes

## Stop Conditions

- Wallet detection requires a private key, seed phrase, wallet password, or API key.
- The task expands into wallet connect or transaction flow.
- `corepack pnpm verify:all` fails after one focused repair attempt.
