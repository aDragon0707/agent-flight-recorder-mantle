# Evidence: 009 Submission Package

Spec: `009-submission-package`
Branch: `feature/009-submission-package`
Recorded package commit: `109d855`
Date: 2026-06-14

> Note: `109d855` is the recorded judge-facing package hardening commit in
> `specs/status.json`. This evidence-sync commit records the final DoraHacks
> submission state after the human submitted the BUIDL for review.

## Summary

The final DoraHacks submission package is verified for review.

- DoraHacks BUIDL page is public: `https://dorahacks.io/buidl/43870`
- DoraHacks manage-submission page showed: `This submission is under review.`
- Track selected by the human operator: `AI DevTools`
- Demo video URL is public: `https://youtu.be/SfBEMzkSDUM`
- Live demo URL is public: `https://agent-flight-recorder-mantle.vercel.app`
- GitHub repository is public: `https://github.com/aDragon0707/agent-flight-recorder-mantle`
- Mantle Sepolia contract and anchor transaction links are included in the BUIDL description.

This verifies the submission package and the fact that the BUIDL has been sent
for organizer review. It does not claim prize selection, organizer approval, or
final judging outcome.

## Public Links

| Item | URL |
| --- | --- |
| DoraHacks BUIDL | `https://dorahacks.io/buidl/43870` |
| Demo video | `https://youtu.be/SfBEMzkSDUM` |
| Live demo | `https://agent-flight-recorder-mantle.vercel.app` |
| GitHub repo | `https://github.com/aDragon0707/agent-flight-recorder-mantle` |
| ReceiptAnchor contract | `https://sepolia.mantlescan.xyz/address/0x69E07961d8c022B81c1c968ef7C1a3955E8D182b` |
| Anchor transaction | `https://sepolia.mantlescan.xyz/tx/0x0aea4a4f414551d0f4d45685240285795f6f8b81c89976db572477f752b877cb` |

## Commands

```bash
Invoke-WebRequest -UseBasicParsing https://dorahacks.io/buidl/43870
Invoke-WebRequest -UseBasicParsing https://agent-flight-recorder-mantle.vercel.app
Invoke-WebRequest -UseBasicParsing https://github.com/aDragon0707/agent-flight-recorder-mantle
Invoke-WebRequest -UseBasicParsing https://youtu.be/SfBEMzkSDUM
Invoke-WebRequest -UseBasicParsing https://sepolia.mantlescan.xyz/address/0x69E07961d8c022B81c1c968ef7C1a3955E8D182b
Invoke-WebRequest -UseBasicParsing https://sepolia.mantlescan.xyz/tx/0x0aea4a4f414551d0f4d45685240285795f6f8b81c89976db572477f752b877cb
corepack pnpm progress
corepack pnpm verify:all
git status --short --branch
```

## Results

External link checks returned HTTP 200:

```text
DoraHacks BUIDL: status=200 Agent Flight Recorder=True SfBEMzkSDUM=True
Live demo: status=200 Agent Flight Recorder=True Mantle=True
GitHub repo: status=200 Agent Flight Recorder=True agent-flight-recorder-mantle=True
YouTube demo: status=200 SfBEMzkSDUM=True
Contract: status=200 contract address=True
Anchor tx: status=200 anchor tx hash=True
```

Human-confirmed DoraHacks manage-submission state:

```text
This submission is under review.
Track: AI DevTools
Need teammates: No
```

`corepack pnpm progress` and `corepack pnpm verify:all` were run after evidence
and ledger sync.

## Files Changed

- `README.md`
- `docs/evidence/009-submission-package.md`
- `docs/handoff.md`
- `docs/architecture.md`
- `docs/prd.md`
- `docs/project-acceptance.md`
- `docs/submission-checklist.md`
- `docs/submission-readiness-audit.md`
- `docs/environments.md`
- `specs/009-submission-package.md`
- `specs/status.json`
- `specs/task-board.md`

## Docs Synced

- README points judges to DoraHacks BUIDL, demo video, live demo, GitHub, contract, and anchor transaction.
- PRD implementation status marks demo video and DoraHacks BUIDL update complete.
- Architecture records verified spec `009-submission-package`.
- Project Acceptance marks Demo Video and DoraHacks Submission as verified with this evidence file.
- Handoff records the full 000-009 verified chain and no remaining implementation task in the current spec graph.
- Submission checklist and readiness audit now point to the final BUIDL and video URLs.

## Known Limits

- DoraHacks organizer review is still pending; the page says the submission is under review.
- The demo video is hosted externally on YouTube, not committed to this repository.
- The on-chain proof is on Mantle Sepolia testnet, not Mantle mainnet.
- No new wallet transaction, contract redeploy, backend, database, LLM API integration, or secret access was performed for this submission package.

## Next Task

No next implementation spec is defined in `specs/spec-graph.json`. Continue only if the human operator requests post-submission maintenance, organizer-response updates, or a release tag.
