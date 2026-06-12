# Environments

## Local

Status: scaffold verified

Commands:

```bash
corepack pnpm install
corepack pnpm verify:all
```

## Mantle Sepolia

Status: deployed (005B)

```text
RPC: https://rpc.sepolia.mantle.xyz
Chain ID: 5003
Symbol: MNT
Explorer: https://sepolia.mantlescan.xyz/
```

Deploy preparation (005A):

- Hardhat deploy script: `contracts/scripts/deploy.ts`
- Network config: `mantleSepolia` with `chainId: 5003` in `contracts/hardhat.config.ts`
- Local config template: `contracts/.env.example` (`.env` is gitignored)
- Deploy command (005B, after human approval): `corepack pnpm --filter @afr/contracts run deploy:mantleSepolia`

Contract address:

```text
0x69E07961d8c022B81c1c968ef7C1a3955E8D182b
```

## Public Demo

Status: planned

Demo URL:

```text
not deployed
```

