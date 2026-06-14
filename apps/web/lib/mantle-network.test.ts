import { describe, expect, it } from "vitest";
import { checkMantleSepoliaNetwork } from "./mantle-network";

describe("checkMantleSepoliaNetwork", () => {
  it("reports Mantle Sepolia for chain id 0x138b", async () => {
    const result = await checkMantleSepoliaNetwork({
      request: async (payload) => {
        expect(payload).toEqual({ method: "eth_chainId" });
        return "0x138b";
      }
    });

    expect(result).toEqual({ status: "mantle_sepolia", chainId: "0x138b" });
  });

  it("accepts uppercase hex characters in the Mantle Sepolia chain id", async () => {
    const result = await checkMantleSepoliaNetwork({
      request: async () => "0x138B"
    });

    expect(result).toEqual({ status: "mantle_sepolia", chainId: "0x138B" });
  });

  it("reports wrong_network for a different chain id", async () => {
    const result = await checkMantleSepoliaNetwork({
      request: async () => "0x1"
    });

    expect(result).toEqual({ status: "wrong_network", chainId: "0x1" });
  });

  it("reports not_available when the provider is missing", async () => {
    await expect(checkMantleSepoliaNetwork(undefined)).resolves.toEqual({
      status: "not_available",
      chainId: null
    });
  });

  it("reports failed when the provider request fails", async () => {
    const result = await checkMantleSepoliaNetwork({
      request: async () => {
        throw new Error("request failed");
      }
    });

    expect(result).toEqual({ status: "failed", chainId: null });
  });

  it("reports failed when the provider returns a non-string chain id", async () => {
    const result = await checkMantleSepoliaNetwork({
      request: async () => 5003
    });

    expect(result).toEqual({ status: "failed", chainId: null });
  });
});
