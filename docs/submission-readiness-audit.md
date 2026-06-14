# Submission Readiness Audit

Date: 2026-06-14

## Executive Summary

Agent Flight Recorder has a real end-to-end MVP: public demo, public GitHub repository, Mantle Sepolia contract, real anchor transaction, and explorer/RPC evidence.

The main gap is not core functionality. The gap is judge-facing packaging. Strong competing projects explain themselves in one sentence on the first screen: AI treasury, DeFi terminal, on-chain AI audit agent, or guarded AI trading wallet. Agent Flight Recorder must be framed just as directly:

```text
Codex says "done." Agent Flight Recorder makes it prove it.
```

Recommended submission framing:

```text
An AI DevTools receipt layer for Codex / Claude Code / Cursor-style agents.
It turns agent completion claims into SACP receipts and anchors receipt hashes on Mantle.
```

## Public Entry Checks

| Entry | Result | Notes |
| --- | --- | --- |
| Live demo | HTTP 200 | `https://agent-flight-recorder-mantle.vercel.app` |
| GitHub repo | HTTP 200 / public | `https://github.com/aDragon0707/agent-flight-recorder-mantle` |
| Contract explorer | HTTP 200 | `ReceiptAnchor` on Mantle Sepolia |
| Anchor transaction | HTTP 200 | Sample `ReceiptAnchored` tx on Mantle Sepolia |

## Competitor Snapshot

| Project | First-screen positioning | Relative strength | Risk to us |
| --- | --- | --- | --- |
| Mensa | AI treasury that proves itself | Mainnet, multiple verified contracts, AI vs human tournament, strong product polish | Very high |
| Mantlic | AI DeFi terminal | Clear terminal metaphor, DeFi action, ERC-8004 framing, multiple on-chain artifacts | High |
| Conatus | On-chain AI audit agent for Mantle | Same DevTools neighborhood, strong audit-agent story, ERC-8004 identity, IPFS/on-chain proof | Very high |
| Agentic Wallet | Human vs AI trading wallet | Metrics-heavy dashboard, benchmark framing, guardrails, test reports | High |
| Agent Flight Recorder | AI agent receipt layer | Clean trust problem, real anchor tx, simple evidence chain, privacy-preserving design | Medium if not packaged; stronger if framed well |

## Where We Are Strong

- Real Mantle Sepolia contract and real `anchorReceipt` transaction.
- Public explorer link and public RPC verification evidence.
- Clear AI DevTools problem: AI agents make completion claims without durable evidence.
- Privacy-preserving architecture: raw logs stay off-chain; only receipt hash and minimal metadata go on-chain.
- Strong engineering governance: specs, task board, evidence ledgers, and `verify:all`.
- Safe wallet boundary: no agent controls private keys; user confirms wallet actions.

## Where We Look Weak

- README previously read like a scaffold history instead of a submission landing page.
- The demo first screen said "MVP scaffold", which undercut the real deployed/on-chain work.
- The architecture docs were correct but too inward-facing.
- The product did not say "Codex / Claude Code / Cursor" early enough, even though that is the strongest AI DevTools framing.
- No demo video yet.
- No ERC-8004 identity or agent reputation, unlike several competitors.

## Submission Message

Use this short version wherever space is tight:

```text
Agent Flight Recorder is a verifiable receipt layer for AI coding agents.
When Codex, Claude Code, or Cursor says "done", the app turns that claim into a SACP receipt, hashes it, anchors the hash on Mantle, and gives the user a Mantlescan proof.
```

Use this longer version for DoraHacks:

```text
AI agents are increasingly trusted with coding, deployment, wallet workflows, and handoffs, but their "done" claims are often unverifiable. Agent Flight Recorder converts those claims into structured SACP receipts, generates a deterministic receipt hash, and anchors that hash on Mantle Sepolia through a user-confirmed wallet transaction. The raw agent log stays private and off-chain, while the proof that the receipt existed becomes public and inspectable through Mantlescan.
```

## Judge Demo Script Summary

1. Show an AI agent claim: "Done. Tested. Safe to proceed."
2. Show why that is not enough: no evidence, no boundary, no durable proof.
3. Generate a SACP diagnosis and receipt.
4. Show the canonical receipt hash.
5. Show the Mantle anchor transaction and explorer proof.
6. Close with: "No receipt, no trust."

## Readiness Score

| Area | Score | Notes |
| --- | --- | --- |
| Core technical loop | 8/10 | Real receipt, hash, contract, transaction, explorer proof. |
| Mantle integration | 7/10 | Real on-chain anchor, but Sepolia only and no ERC-8004 identity. |
| AI DevTools fit | 8/10 | Strong if framed as Codex/Claude Code receipt layer. |
| Demo polish | 6/10 | Functional, but less dramatic than competitors. |
| Submission packaging | 5/10 before 009A, 8/10 after hardening | README and script are the biggest lever. |

## Next Actions

- Keep the core product stable; do not add risky LLM API integration before submission.
- Use the hardened README as the primary judge-facing surface.
- Record a 2-3 minute video that shows the full receipt-to-Mantle proof path.
- Submit only after the human confirms the final DoraHacks BUIDL page.
