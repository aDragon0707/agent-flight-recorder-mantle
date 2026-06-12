import { encodeFunctionData, keccak256, toBytes, type Hex } from "viem";
import { receiptAnchorAddress } from "./chains";

export const receiptAnchorAbi = [
  {
    type: "function",
    name: "anchorReceipt",
    stateMutability: "nonpayable",
    inputs: [
      { name: "receiptHash", type: "bytes32" },
      { name: "statusCode", type: "string" },
      { name: "agentIdHash", type: "bytes32" },
      { name: "taskIdHash", type: "bytes32" }
    ],
    outputs: []
  }
] as const;

export type EthereumSendTransactionProvider = {
  request(payload: {
    method: "eth_sendTransaction";
    params: [{ from: string; to: string; data: Hex }];
  }): Promise<unknown>;
};

export type AnchorReceiptStatus = "idle" | "anchoring" | "anchored" | "rejected" | "failed";

export type AnchorReceiptArgs = {
  from: string;
  receiptHash: string;
  statusCode: string;
  agentId: string;
  taskId: string;
};

export type AnchorReceiptTransaction = {
  to: typeof receiptAnchorAddress;
  from: string;
  data: Hex;
};

export type AnchorReceiptResult =
  | {
      status: "anchored";
      txHash: string;
    }
  | {
      status: "rejected" | "failed";
    };

type WalletError = {
  code?: unknown;
};

export function buildAnchorReceiptTransaction(args: AnchorReceiptArgs): AnchorReceiptTransaction {
  const agentIdHash = keccak256(toBytes(args.agentId));
  const taskIdHash = keccak256(toBytes(args.taskId));

  const data = encodeFunctionData({
    abi: receiptAnchorAbi,
    functionName: "anchorReceipt",
    args: [args.receiptHash as Hex, args.statusCode, agentIdHash, taskIdHash]
  });

  return {
    to: receiptAnchorAddress,
    from: args.from,
    data
  };
}

export async function anchorReceiptWithInjectedProvider(
  provider: EthereumSendTransactionProvider | null | undefined,
  args: AnchorReceiptArgs
): Promise<AnchorReceiptResult> {
  if (!provider) {
    return { status: "failed" };
  }

  const transaction = buildAnchorReceiptTransaction(args);

  try {
    const txHash = await provider.request({
      method: "eth_sendTransaction",
      params: [{ from: transaction.from, to: transaction.to, data: transaction.data }]
    });

    if (typeof txHash !== "string" || txHash.length === 0) {
      return { status: "failed" };
    }

    return { status: "anchored", txHash };
  } catch (error) {
    if ((error as WalletError).code === 4001) {
      return { status: "rejected" };
    }

    return { status: "failed" };
  }
}
