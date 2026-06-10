import { describe, expect, it } from "vitest";
import {
  buildReceipt,
  canonicalizeReceipt,
  demoSamples,
  diagnoseAgentOutput,
  hashReceipt
} from "../src";

const createdAt = "2026-06-10T00:00:00.000Z";

describe("sacp-core", () => {
  it("rejects empty input", () => {
    expect(() => diagnoseAgentOutput("   ")).toThrow("Input is required");
  });

  it("diagnoses all demo samples and builds receipts", () => {
    for (const sample of demoSamples) {
      const diagnosis = diagnoseAgentOutput(sample.input);
      const receipt = buildReceipt({
        source: sample.input,
        diagnosis,
        taskId: sample.id,
        createdAt
      });

      expect(receipt.protocol).toBe("SACP");
      expect(receipt.version).toBe("0.1");
      expect(receipt.findings.length).toBeGreaterThan(0);
      expect(receipt.sourceDigest).toMatch(/^0x[a-fA-F0-9]{64}$/);
    }
  });

  it("produces a stable hash for the same receipt", () => {
    const sample = demoSamples[0];
    const diagnosis = diagnoseAgentOutput(sample.input);
    const receipt = buildReceipt({
      source: sample.input,
      diagnosis,
      taskId: sample.id,
      createdAt
    });

    const firstHash = hashReceipt(canonicalizeReceipt(receipt));
    const secondHash = hashReceipt(canonicalizeReceipt(receipt));

    expect(firstHash).toBe(secondHash);
    expect(firstHash).toMatch(/^0x[a-fA-F0-9]{64}$/);
  });

  it("produces different hashes for different receipts", () => {
    const receipts = demoSamples.slice(0, 2).map((sample) => {
      const diagnosis = diagnoseAgentOutput(sample.input);
      return buildReceipt({
        source: sample.input,
        diagnosis,
        taskId: sample.id,
        createdAt
      });
    });

    expect(hashReceipt(canonicalizeReceipt(receipts[0]))).not.toBe(
      hashReceipt(canonicalizeReceipt(receipts[1]))
    );
  });
});

