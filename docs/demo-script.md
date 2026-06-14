# Demo Script

Target length: 2-3 minutes.

## Title

```text
Agent Flight Recorder: No receipt, no trust.
```

## 0:00-0:20 Hook

Say:

```text
AI coding agents now say "done", "tested", and "deployed" all the time.
But a fluent claim is not evidence.
Agent Flight Recorder turns those claims into verifiable receipts anchored on Mantle.
```

Show:

- Public demo URL: `https://agent-flight-recorder-mantle.vercel.app`
- README first-screen links.

## 0:20-0:55 Agent Claim To SACP Receipt

Show:

1. Open the public demo.
2. Select the sample where an agent says the work is done without enough evidence.
3. Point at the SACP diagnosis: `NEEDS_HUMAN_REVIEW`, risk level, findings, required fix, next owner.
4. Point at the generated structured receipt.

Say:

```text
The app does not ask the user to blindly trust the agent.
It diagnoses the claim, creates a structured SACP receipt, and makes the boundary visible.
```

## 0:55-1:25 Receipt Hash

Show:

- The receipt hash in the Mantle Anchor panel.
- Explain that the full log remains off-chain.

Say:

```text
The raw agent log can stay private.
Only the deterministic receipt hash and minimal audit metadata need to be anchored on-chain.
```

## 1:25-2:00 Mantle Anchor

Show either:

- Already-recorded anchor transaction from README / evidence, or
- Live wallet flow if MetaMask is ready and on Mantle Sepolia.

Say:

```text
The user confirms the transaction in their own wallet.
No agent receives a private key. The agent cannot silently write to chain.
```

Use this transaction if avoiding a new live transaction:

```text
0x0aea4a4f414551d0f4d45685240285795f6f8b81c89976db572477f752b877cb
```

## 2:00-2:35 Explorer Proof

Show:

- Mantlescan transaction page.
- `ReceiptAnchored` event.
- Contract address.

Say:

```text
Anyone can verify that this receipt hash was anchored on Mantle.
That is the difference between an AI claim and an auditable agent record.
```

## 2:35-2:55 Close

Say:

```text
Agent Flight Recorder is an AI DevTools receipt layer for Codex, Claude Code, Cursor, and other coding agents.
Codex says "done." Agent Flight Recorder makes it prove it.
No receipt, no trust.
```

## Must Show On Screen

- Live demo URL.
- SACP diagnosis.
- SACP receipt.
- Receipt hash.
- Contract address.
- Mantlescan transaction link.

## Do Not Claim

- Do not claim a finished demo video until the file or URL exists.
- Do not claim ERC-8004 identity.
- Do not claim mainnet deployment.
- Do not claim autonomous LLM execution.
- Do not claim the agent controls a wallet.

