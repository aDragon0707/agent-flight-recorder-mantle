# Spec 002: Wallet Connect

Status: planned

## Goal

Request explicit user authorization from an injected EVM wallet and display the connected public account in shortened form.

## Scope

- Add a `Connect wallet` button inside the existing Mantle Anchor panel.
- Call `ethereum.request({ method: "eth_requestAccounts" })` only after the user clicks the button.
- Show `Connecting...` while the request is pending.
- Show `Wallet connected` and a shortened address after success.
- Show `Connection rejected` when the wallet returns user rejection code `4001`.
- Show `Connection failed` for other connection errors.

## Non-goals

- No network check.
- No network switch.
- No transaction.
- No contract call.
- No address persistence.
- No `accountsChanged` listener.
- No `disconnect` listener.
- No automatic wallet authorization popup.

## Acceptance Commands

```bash
corepack pnpm progress
corepack pnpm --filter @afr/web test
corepack pnpm verify:all
```

## Docs Sync Checklist

- [ ] `specs/status.json`
- [ ] `specs/task-board.md`
- [ ] `docs/evidence/002-wallet-connect.md`
- [ ] `docs/handoff.md`
- [ ] `docs/architecture.md`
- [ ] `docs/project-acceptance.md`

## Stop Conditions

- The task requires `eth_chainId`.
- The task requires `wallet_switchEthereumChain`.
- The task requires `wallet_addEthereumChain`.
- The task requires `eth_sendTransaction`.
- The task requires `writeContract`.
- The task requires a `ReceiptAnchor` contract call.
- The task requires localStorage/sessionStorage persistence.
- The task requires a private key, seed phrase, wallet password, or API key.
