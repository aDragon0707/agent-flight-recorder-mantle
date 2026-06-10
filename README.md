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

## Current Docs

- [PRD v0.1](docs/prd.md)
- [Engineering Workflow](docs/engineering.md)
- [Architecture v0.1](docs/architecture.md)

## Planned Repository Structure

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
  README.md
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

- Public demo URL.
- Deployed Mantle Sepolia contract address.
- Mantle Explorer transaction or contract link.
- Demo video, at least 2 minutes.
- Setup instructions.
- Architecture overview.
- Updated DoraHacks BUIDL page.

