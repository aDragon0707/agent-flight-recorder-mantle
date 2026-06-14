# Agent Flight Recorder

Agent Flight Recorder makes AI agent work auditable by turning messy outputs into SACP receipts and anchoring receipt hashes on Mantle.

```text
messy agent output
-> SACP rule-based diagnosis
-> structured SACP receipt
-> canonical receipt hash
-> Mantle Sepolia anchor
-> explorer verification
```

## Why This Exists

AI agents often say "done", "tested", or "safe to proceed" without giving users enough evidence to trust the claim.

Agent Flight Recorder converts those claims into structured SACP receipts, then writes only the receipt hash and minimal audit metadata to Mantle Sepolia. The original agent log stays off-chain, while the receipt fingerprint becomes publicly verifiable.

Core principle:

```text
No receipt, no trust.
```

## Hackathon Scope

This repository is for DoraHacks The Turing Test Hackathon 2026.

Primary track:

```text
AI DevTools
```

MVP goal:

- Public frontend demo.
- Rule-based SACP diagnosis.
- Structured receipt generation.
- Stable receipt hash.
- Mantle Sepolia `ReceiptAnchor` contract.
- Wallet-based anchor transaction.
- Mantle Explorer verification link.

## Public Demo

Public demo URL:

```text
https://agent-flight-recorder-mantle.vercel.app
```

Verified on-chain evidence:

```text
ReceiptAnchor contract:
https://sepolia.mantlescan.xyz/address/0x69E07961d8c022B81c1c968ef7C1a3955E8D182b

Sample anchor transaction:
https://sepolia.mantlescan.xyz/tx/0x0aea4a4f414551d0f4d45685240285795f6f8b81c89976db572477f752b877cb
```

Demo flow:

```text
1. Open the public demo URL.
2. Select or paste messy agent output.
3. Generate a SACP diagnosis and receipt hash.
4. Connect MetaMask on Mantle Sepolia.
5. Anchor the receipt hash to ReceiptAnchor.
6. Open the Mantle Explorer link to verify the transaction and event.
```

## Current Status

This repository has moved beyond scaffold stage into a public demo MVP. The scaffold stage remains recorded in the governance evidence for audit continuity.

Implemented:

- Planning docs.
- Monorepo workspace.
- `packages/sacp-core` TypeScript package.
- `apps/web` Next.js workbench.
- `contracts` Hardhat ReceiptAnchor project.
- Governance gates: specs, task board, evidence ledger, verify scripts, CI, and PR template.
- MetaMask wallet detection and connection.
- Mantle Sepolia network check and switch.
- ReceiptAnchor deployment on Mantle Sepolia.
- Wallet-based anchor transaction.
- Public RPC / Mantle Explorer verification.
- Public Vercel demo deployment.

Not implemented yet:

- Demo video.
- DoraHacks final submission package.

## Current Docs

- [PRD v0.1](docs/prd.md)
- [Engineering Workflow](docs/engineering.md)
- [Architecture v0.1](docs/architecture.md)
- [Agent Execution Loop](docs/agent-loop.md)
- [Project Scaffold Tasks](docs/project-scaffold-tasks.md)
- [Task Board](specs/task-board.md)
- [Project Acceptance Ledger](docs/project-acceptance.md)
- [Handoff](docs/handoff.md)

## Repository Structure

```text
agent-flight-recorder-mantle/
  apps/
    web/
      Next.js + TypeScript frontend
  packages/
    sacp-core/
      diagnosis, receipt, canonicalization, hashing
  contracts/
    ReceiptAnchor.sol
    Hardhat deploy and verify scripts
  docs/
    prd.md
    engineering.md
    architecture.md
    demo-script.md
    submission-checklist.md
  specs/
    spec-graph.json
    status.json
    task-board.md
    000-scaffold-review.md
    001-wallet-detection.md
  README.md
```

## Local Development

This project uses `pnpm` through Corepack.

On Windows, if `pnpm` is not globally available, use `corepack pnpm`:

```powershell
corepack prepare pnpm@10 --activate
corepack pnpm install
corepack pnpm test
corepack pnpm build
```

When `pnpm` is available as a shell command:

```bash
pnpm install
pnpm test
pnpm build
```

Useful commands:

```bash
pnpm dev
pnpm lint
pnpm typecheck
pnpm test
pnpm build
pnpm --filter @afr/sacp-core test
pnpm --filter @afr/web build
pnpm --filter @afr/contracts test
```

Governance checks:

```bash
corepack pnpm verify:all
corepack pnpm verify:graph
corepack pnpm verify:evidence
corepack pnpm verify:secrets
corepack pnpm verify:scope
corepack pnpm verify:docs
```

Before starting a new task, read:

```text
AGENTS.md
specs/status.json
specs/task-board.md
docs/handoff.md
```

## Technology Decisions

- Frontend: `Next.js App Router + TypeScript + Tailwind CSS`
- Web3: `wagmi + viem`
- Core package: browser-safe TypeScript
- Smart contract: `Solidity + Hardhat`
- Network: `Mantle Sepolia`
- Package manager: `pnpm workspace`

Mantle Sepolia:

```text
RPC: https://rpc.sepolia.mantle.xyz
Chain ID: 5003
Symbol: MNT
Explorer: https://sepolia.mantlescan.xyz/
ReceiptAnchor: 0x69E07961d8c022B81c1c968ef7C1a3955E8D182b
Deploy tx: 0x3b7be838fe7384cb37d5ea8dfb49c6ea2788c7766158999834473625fce6568f
Sample anchor tx: 0x0aea4a4f414551d0f4d45685240285795f6f8b81c89976db572477f752b877cb
```

## Security Boundary

The MVP does not store private agent logs on-chain.

On-chain data is limited to:

- `receiptHash`
- `statusCode`
- `agentIdHash`
- `taskIdHash`
- `submitter`
- `timestamp`

Never commit:

- wallet private keys
- seed phrases
- wallet passwords
- API keys
- cookies, tokens, or sessions

## Submission Checklist

Before DoraHacks submission, this repo should include:

- Public demo URL: `https://agent-flight-recorder-mantle.vercel.app`.
- Deployed Mantle Sepolia contract address: `0x69E07961d8c022B81c1c968ef7C1a3955E8D182b`.
- Mantle Explorer transaction or contract link.
- Demo video, at least 2 minutes.
- Setup instructions.
- Architecture overview.
- Updated DoraHacks BUIDL page.
