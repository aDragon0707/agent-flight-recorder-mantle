import { describe, expect, it } from "vitest";
import { switchToMantleSepoliaNetwork } from "./mantle-network-switch";

describe("switchToMantleSepoliaNetwork", () => {
  const forbiddenAddMethod = ["wallet", "addEthereumChain"].join("_");

  it("requests Mantle Sepolia and reports switched when the wallet resolves", async () => {
    const calls: unknown[] = [];

    const result = await switchToMantleSepoliaNetwork({
      request: async (payload) => {
        calls.push(payload);
        return null;
      }
    });

    expect(result).toEqual({ status: "switched" });
    expect(calls).toEqual([
      {
        method: "wallet_switchEthereumChain",
        params: [{ chainId: "0x138b" }]
      }
    ]);
  });

  it("reports rejected when the user rejects the wallet request", async () => {
    const rejection = Object.assign(new Error("User rejected the request"), { code: 4001 });

    const result = await switchToMantleSepoliaNetwork({
      request: async () => {
        throw rejection;
      }
    });

    expect(result).toEqual({ status: "rejected" });
  });

  it("reports not_added when Mantle Sepolia is not added and does not add the network", async () => {
    const missingChain = Object.assign(new Error("Unrecognized chain"), { code: 4902 });
    const calls: unknown[] = [];

    const result = await switchToMantleSepoliaNetwork({
      request: async (payload) => {
        calls.push(payload);
        throw missingChain;
      }
    });

    expect(result).toEqual({ status: "not_added" });
    expect(calls).toEqual([
      {
        method: "wallet_switchEthereumChain",
        params: [{ chainId: "0x138b" }]
      }
    ]);
    expect(calls).not.toContainEqual(expect.objectContaining({ method: forbiddenAddMethod }));
  });

  it("reports not_available when the provider is missing", async () => {
    await expect(switchToMantleSepoliaNetwork(undefined)).resolves.toEqual({
      status: "not_available"
    });
  });

  it("reports failed for other wallet errors", async () => {
    const result = await switchToMantleSepoliaNetwork({
      request: async () => {
        throw new Error("Switch failed");
      }
    });

    expect(result).toEqual({ status: "failed" });
  });
});
