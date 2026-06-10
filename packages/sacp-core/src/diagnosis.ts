import type { Diagnosis } from "./types";

const completionClaims = /\b(done|completed|fixed|tested|deployed|safe to proceed|ready to merge|all tests pass)\b/i;
const evidenceMarkers = /\b(test output|logs?|diff|commit|tx hash|screenshot|trace|evidence|proof|verified|passed:\s*\d+)\b/i;
const unsafeMemory = /\b(remember this permanently|long[- ]term memory|save to memory|promote.*memory|never ask again)\b/i;
const humanBoundary = /\b(mainnet|production|deploy|publish|wallet|funds?|private key|seed phrase|transfer|merge to main)\b/i;
const staleHandoff = /\b(stale|duplicate|same handoff|handoff)\b/i;
const ownerMarkers = /\b(owner|assignee|next owner|human|developer|agent)\b/i;

export function diagnoseAgentOutput(input: string): Diagnosis {
  const normalized = input.trim();

  if (!normalized) {
    throw new Error("Input is required");
  }

  if (unsafeMemory.test(normalized)) {
    return {
      statusCode: "BLOCKED_UNSAFE_MEMORY",
      riskLevel: "high",
      findings: ["Agent attempted to promote unsafe or unreviewed content into long-term memory."],
      evidenceSummary: "The output contains memory-promotion language that needs review before persistence.",
      requiredFix: "Remove or narrow the memory promotion and ask a human to approve any durable memory update.",
      nextOwner: "human",
      ruleIds: ["unsafe-memory-promotion"]
    };
  }

  if (staleHandoff.test(normalized) && !ownerMarkers.test(normalized)) {
    return {
      statusCode: "STALE_OR_DUPLICATE_HANDOFF",
      riskLevel: "medium",
      findings: ["The handoff appears stale, duplicate, or missing a clear next owner."],
      evidenceSummary: "The output mentions handoff-like work without enough ownership context.",
      requiredFix: "Add the current state, next owner, and exact action needed before another agent continues.",
      nextOwner: "developer",
      ruleIds: ["stale-or-duplicate-handoff"]
    };
  }

  if (humanBoundary.test(normalized)) {
    return {
      statusCode: "NEEDS_HUMAN_REVIEW",
      riskLevel: "high",
      findings: ["The output crosses a deployment, wallet, production, or security boundary."],
      evidenceSummary: "The claim touches an action that should be confirmed before users rely on it.",
      requiredFix: "Ask a human reviewer to approve the boundary-crossing action and attach stronger evidence.",
      nextOwner: "human",
      ruleIds: ["human-boundary-required"]
    };
  }

  if (completionClaims.test(normalized) && !evidenceMarkers.test(normalized)) {
    return {
      statusCode: "NEEDS_EVIDENCE",
      riskLevel: "medium",
      findings: ["Agent made a completion claim without enough supporting evidence."],
      evidenceSummary: "The output says work is complete, tested, fixed, or safe, but does not include verifiable evidence.",
      requiredFix: "Attach concrete evidence such as test output, logs, diffs, transaction hashes, or trace links.",
      nextOwner: "agent",
      ruleIds: ["unsupported-completion-claim", "missing-evidence"]
    };
  }

  return {
    statusCode: "PASS_WITH_EVIDENCE",
    riskLevel: evidenceMarkers.test(normalized) ? "low" : "medium",
    findings: evidenceMarkers.test(normalized)
      ? ["The output includes at least one evidence marker."]
      : ["No blocking risk was detected by the MVP rule set."],
    evidenceSummary: evidenceMarkers.test(normalized)
      ? "The output includes evidence-like markers that can support the agent claim."
      : "The MVP rule set did not detect an unsupported completion claim or unsafe boundary.",
    requiredFix: "No required fix for the MVP rule set.",
    nextOwner: "developer",
    ruleIds: evidenceMarkers.test(normalized) ? ["evidence-marker-present"] : ["no-blocking-rule-hit"]
  };
}

