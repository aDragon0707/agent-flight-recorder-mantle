export type StatusCode =
  | "PASS_WITH_EVIDENCE"
  | "NEEDS_EVIDENCE"
  | "NEEDS_HUMAN_REVIEW"
  | "BLOCKED_UNSAFE_MEMORY"
  | "STALE_OR_DUPLICATE_HANDOFF";

export type RiskLevel = "low" | "medium" | "high";

export type NextOwner = "agent" | "human" | "developer";

export type Diagnosis = {
  statusCode: StatusCode;
  riskLevel: RiskLevel;
  findings: string[];
  evidenceSummary: string;
  requiredFix: string;
  nextOwner: NextOwner;
  ruleIds: string[];
};

export type SACPReceipt = {
  protocol: "SACP";
  version: "0.1";
  receiptId: string;
  agentId: string;
  taskId: string;
  statusCode: StatusCode;
  riskLevel: RiskLevel;
  evidenceSummary: string;
  findings: string[];
  requiredFix: string;
  nextOwner: NextOwner;
  sourceDigest: string;
  createdAt: string;
};

export type BuildReceiptInput = {
  source: string;
  diagnosis: Diagnosis;
  agentId?: string;
  taskId?: string;
  receiptId?: string;
  createdAt?: string;
};

