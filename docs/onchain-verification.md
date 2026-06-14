# On-chain Verification

Status: verified (007)

Deployment note (005B):

- `ReceiptAnchor` was deployed once to Mantle Sepolia (chainId 5003) under human approval.
- The contract address / deployment transaction / explorer fields below reflect that real deployment.
- A sample `anchorReceipt` call was submitted in 006 and recorded below. The anchor transaction and its `ReceiptAnchored` event were independently verified via public RPC in 007.

## Contract

Contract name:

```text
ReceiptAnchor
```

Contract address:

```text
0x69E07961d8c022B81c1c968ef7C1a3955E8D182b
```

Deployment transaction:

```text
0x3b7be838fe7384cb37d5ea8dfb49c6ea2788c7766158999834473625fce6568f
```

Explorer link:

```text
https://sepolia.mantlescan.xyz/address/0x69E07961d8c022B81c1c968ef7C1a3955E8D182b
https://sepolia.mantlescan.xyz/tx/0x3b7be838fe7384cb37d5ea8dfb49c6ea2788c7766158999834473625fce6568f
```

## Sample Anchor

Receipt hash:

```text
0x0a2f2ac45c97bbaf9793360c371a3e83ca7278fbb864b339b84f9457a3deb60d
```

Anchor transaction:

```text
0x0aea4a4f414551d0f4d45685240285795f6f8b81c89976db572477f752b877cb
```

Explorer link:

```text
https://sepolia.mantlescan.xyz/tx/0x0aea4a4f414551d0f4d45685240285795f6f8b81c89976db572477f752b877cb
```

Decoded event:

```text
eventName: ReceiptAnchored
agentIdHash: 0x1780b1149f3a9f3653d76ef64c4ffb3359ca89ce0c97a353f8b0e4ab6914835c
taskIdHash: 0x61eee2b6a408aafa5a23908a5d37872b3ec677e608515d61edc0b05bdf0f6097
statusCode: NEEDS_HUMAN_REVIEW
submitter: 0x9a9812bf658220F4bbdCE0e416F66808597df541
```

## Explorer Verification (007)

Independently verified via the public Mantle Sepolia RPC endpoint (`https://rpc.sepolia.mantle.xyz`) using `viem` from the `@afr/web` workspace. Read-only; no new transaction, no redeploy, no secret access. Evidence: `docs/evidence/007-explorer-verification.md`.

Confirmed:

- Receipt `status` is `success` (blockNumber 39863248, gasUsed 27160).
- Transaction `to` equals the deployed `ReceiptAnchor` contract `0x69E07961d8c022B81c1c968ef7C1a3955E8D182b`.
- The transaction emitted exactly one `ReceiptAnchored` event.
- `receiptHash`, `agentIdHash`, `taskIdHash`, `statusCode`, `submitter`, and `timestamp` all match the recorded values above.

Canonical explorer URL for judge inspection:

```text
https://sepolia.mantlescan.xyz/tx/0x0aea4a4f414551d0f4d45685240285795f6f8b81c89976db572477f752b877cb
```

