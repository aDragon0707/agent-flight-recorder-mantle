# Spec 009: Submission Package

Status: verified

## Goal

Prepare the final DoraHacks submission package so judges can review the repository, public demo, on-chain evidence, and project explanation from one place.

## Scope

- Record the public demo URL, GitHub repository, contract address, anchor transaction, and explorer links in the final submission materials.
- Prepare a concise demo script and submission checklist.
- Keep the final package aligned with README, Architecture, Project Acceptance, and evidence ledgers.

## Non-goals

- No new product feature.
- No new contract deployment.
- No new wallet transaction.
- No backend service, database, account system, or API integration.

## Acceptance Commands

```bash
corepack pnpm progress
corepack pnpm verify:all
```

## Verified Submission Links

- DoraHacks BUIDL: `https://dorahacks.io/buidl/43870`
- Demo video: `https://youtu.be/SfBEMzkSDUM`
- Live demo: `https://agent-flight-recorder-mantle.vercel.app`
- GitHub repo: `https://github.com/aDragon0707/agent-flight-recorder-mantle`
- ReceiptAnchor contract: `https://sepolia.mantlescan.xyz/address/0x69E07961d8c022B81c1c968ef7C1a3955E8D182b`
- Anchor transaction: `https://sepolia.mantlescan.xyz/tx/0x0aea4a4f414551d0f4d45685240285795f6f8b81c89976db572477f752b877cb`

## Stop Conditions

- The DoraHacks page requires a final publish action without human confirmation.
- Any step requires private keys, seed phrase, wallet password, API key, token, cookie, or session.
- The submission package would claim demo video, prize category, or external publication evidence that does not exist.
