import { keccak256, toBytes } from "viem";
import type { BuildReceiptInput, SACPReceipt } from "./types";

function digest(value: string): `0x${string}` {
  return keccak256(toBytes(value));
}

export function buildReceipt(input: BuildReceiptInput): SACPReceipt {
  const agentId = input.agentId ?? "agent-flight-recorder-demo-agent";
  const taskId = input.taskId ?? "demo-task";
  const sourceDigest = digest(input.source);
  const receiptId = input.receiptId ?? `sacp-${sourceDigest.slice(2, 14)}`;

  return {
    protocol: "SACP",
    version: "0.1",
    receiptId,
    agentId,
    taskId,
    statusCode: input.diagnosis.statusCode,
    riskLevel: input.diagnosis.riskLevel,
    evidenceSummary: input.diagnosis.evidenceSummary,
    findings: input.diagnosis.findings,
    requiredFix: input.diagnosis.requiredFix,
    nextOwner: input.diagnosis.nextOwner,
    sourceDigest,
    createdAt: input.createdAt ?? new Date().toISOString()
  };
}

