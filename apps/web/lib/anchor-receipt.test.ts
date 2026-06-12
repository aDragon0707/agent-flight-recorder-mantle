import { decodeFunctionData, keccak256, toBytes } from "viem";
import { describe, expect, it } from "vitest";
import {
  anchorReceiptWithInjectedProvider,
  buildAnchorReceiptTransaction,
  receiptAnchorAbi,
  type AnchorReceiptArgs
} from "./anchor-receipt";
import { receiptAnchorAddress } from "./chains";

const baseArgs: AnchorReceiptArgs = {
  from: "0x1234567890abcdef1234567890abcdef1234abcd",
  receiptHash: "0x" + "ab".repeat(32),
  statusCode: "PASS_WITH_EVIDENCE",
  agentId: "agent-flight-recorder-demo-agent",
  taskId: "demo-task"
};

describe("buildAnchorReceiptTransaction", () => {
  it("encodes an anchorReceipt call to the deployed contract", () => {
    const transaction = buildAnchorReceiptTransaction(baseArgs);

    expect(transaction.to).toBe(receiptAnchorAddress);
    expect(transaction.from).toBe(baseArgs.from);

    const decoded = decodeFunctionData({
      abi: receiptAnchorAbi,
      data: transaction.data
    });

    expect(decoded.functionName).toBe("anchorReceipt");
    expect(decoded.args[0]).toBe(baseArgs.receiptHash);
    expect(decoded.args[1]).toBe(baseArgs.statusCode);
    expect(decoded.args[2]).toBe(keccak256(toBytes(baseArgs.agentId)));
    expect(decoded.args[3]).toBe(keccak256(toBytes(baseArgs.taskId)));
  });

  it("derives agentIdHash and taskIdHash deterministically", () => {
    const first = buildAnchorReceiptTransaction(baseArgs);
    const second = buildAnchorReceiptTransaction(baseArgs);

    expect(first.data).toBe(second.data);

    const decoded = decodeFunctionData({ abi: receiptAnchorAbi, data: first.data });
    expect(decoded.args[2]).toBe(keccak256(toBytes(baseArgs.agentId)));
    expect(decoded.args[3]).toBe(keccak256(toBytes(baseArgs.taskId)));
  });
});

describe("anchorReceiptWithInjectedProvider", () => {
  it("returns anchored with the tx hash on a successful provider call", async () => {
    const txHash = "0x" + "cd".repeat(32);
    const calls: unknown[] = [];

    const result = await anchorReceiptWithInjectedProvider(
      {
        request: async (payload: unknown) => {
          calls.push(payload);
          return txHash;
        }
      },
      baseArgs
    );

    expect(result).toEqual({ status: "anchored", txHash });
    expect(calls).toHaveLength(1);
    const payload = calls[0] as {
      method: string;
      params: [{ from: string; to: string; data: string }];
    };
    expect(payload.method).toBe("eth_sendTransaction");
    expect(payload.params[0].from).toBe(baseArgs.from);
    expect(payload.params[0].to).toBe(receiptAnchorAddress);
  });

  it("returns rejected when the wallet returns code 4001", async () => {
    const rejection = Object.assign(new Error("User rejected the request"), { code: 4001 });

    const result = await anchorReceiptWithInjectedProvider(
      {
        request: async () => {
          throw rejection;
        }
      },
      baseArgs
    );

    expect(result).toEqual({ status: "rejected" });
  });

  it("returns failed for non-rejection wallet errors", async () => {
    const result = await anchorReceiptWithInjectedProvider(
      {
        request: async () => {
          throw new Error("Provider unavailable");
        }
      },
      baseArgs
    );

    expect(result).toEqual({ status: "failed" });
  });

  it("returns failed when the provider yields a malformed or missing tx hash", async () => {
    const missing = await anchorReceiptWithInjectedProvider(
      {
        request: async () => undefined
      },
      baseArgs
    );
    expect(missing).toEqual({ status: "failed" });

    const empty = await anchorReceiptWithInjectedProvider(
      {
        request: async () => ""
      },
      baseArgs
    );
    expect(empty).toEqual({ status: "failed" });
  });

  it("returns failed when no provider is available", async () => {
    const result = await anchorReceiptWithInjectedProvider(null, baseArgs);
    expect(result).toEqual({ status: "failed" });
  });
});
