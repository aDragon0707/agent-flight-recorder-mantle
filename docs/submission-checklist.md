# DoraHacks Submission Checklist

## Submission Fields

Project name:

```text
Agent Flight Recorder
```

One-liner:

```text
Codex says "done." Agent Flight Recorder makes it prove it.
```

Track:

```text
AI DevTools
```

Short description:

```text
Agent Flight Recorder is a verifiable receipt layer for AI coding agents. It turns Codex / Claude Code / Cursor-style completion claims into structured SACP receipts, anchors receipt hashes on Mantle, and gives users a Mantlescan proof instead of another unverifiable "done" message.
```

Long description:

```text
AI agents are increasingly used for coding, deployment, wallet workflows, and task handoffs, but their completion claims are often hard to verify. Agent Flight Recorder converts messy agent output into a SACP diagnosis and structured receipt, generates a deterministic receipt hash, and anchors that hash on Mantle Sepolia through a user-confirmed wallet transaction. The raw agent log stays private and off-chain, while the receipt fingerprint becomes public and inspectable through Mantlescan.
```

## Links

| Field | Value |
| --- | --- |
| Live demo | `https://agent-flight-recorder-mantle.vercel.app` |
| GitHub repo | `https://github.com/aDragon0707/agent-flight-recorder-mantle` |
| Contract | `https://sepolia.mantlescan.xyz/address/0x69E07961d8c022B81c1c968ef7C1a3955E8D182b` |
| Anchor transaction | `https://sepolia.mantlescan.xyz/tx/0x0aea4a4f414551d0f4d45685240285795f6f8b81c89976db572477f752b877cb` |

## Technical Highlights

- SACP receipt generation for AI agent completion claims.
- Deterministic receipt hashing.
- Mantle Sepolia `ReceiptAnchor` smart contract.
- Real user-confirmed wallet transaction.
- Public explorer and RPC verification.
- Privacy-preserving architecture: full logs stay off-chain.
- Governance evidence: specs, task board, acceptance ledger, and `verify:all`.

## Demo Flow To Describe

```text
Agent output -> SACP diagnosis -> receipt -> receipt hash -> Mantle anchor -> explorer proof
```

## Final Human Checks Before Publishing

- [ ] Demo video URL exists.
- [ ] DoraHacks page includes live demo URL.
- [ ] DoraHacks page includes public GitHub repo.
- [ ] DoraHacks page includes contract address.
- [ ] DoraHacks page includes anchor transaction or explorer proof.
- [ ] Description does not claim ERC-8004, mainnet, autonomous LLM execution, or finished video unless those exist.
- [ ] Human confirms final publish / submit action.

## Known Limits To Be Honest About

- MVP uses rule-based SACP diagnosis, not a live LLM API.
- MVP is deployed on Mantle Sepolia, not Mantle mainnet.
- The user controls wallet confirmation; the agent does not receive private keys.
- Full receipt storage, IPFS, ERC-8004 identity, and reputation are future extensions.
