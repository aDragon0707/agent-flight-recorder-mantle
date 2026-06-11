# Spec 003: Mantle Network Check

Status: planned

## Goal

检查已连接钱包当前是否处于 Mantle Sepolia。

## Scope

- 只读取当前 chain id。
- 只展示是否为 Mantle Sepolia。
- 不切换网络。
- 不发交易。
- 不调用合约。

## Non-goals

- No `wallet_switchEthereumChain`.
- No `wallet_addEthereumChain`.
- No `eth_sendTransaction`.
- No `writeContract`.
- No `ReceiptAnchor` call.

## Acceptance Commands

```bash
corepack pnpm progress
corepack pnpm --filter @afr/web test
corepack pnpm verify:all
```

## Docs Sync Checklist

- [ ] `specs/status.json`
- [ ] `specs/task-board.md`
- [ ] `docs/evidence/003-mantle-network-check.md`
- [ ] `docs/handoff.md`
- [ ] `docs/architecture.md`
- [ ] `docs/project-acceptance.md`

## Stop Conditions

- The task requires network switching.
- The task requires a transaction.
- The task requires a contract call.
- The task requires address persistence.
- The task requires a private key, seed phrase, wallet password, or API key.
