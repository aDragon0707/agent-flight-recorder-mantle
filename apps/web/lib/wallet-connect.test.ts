import { describe, expect, it } from "vitest";
import { connectInjectedWallet, shortenAddress } from "./wallet-connect";

describe("connectInjectedWallet", () => {
  it("requests accounts and returns the first connected address", async () => {
    const address = "0x1234567890abcdef1234567890abcdef1234abcd";
    const calls: unknown[] = [];

    const result = await connectInjectedWallet({
      request: async (payload: unknown) => {
        calls.push(payload);
        return [address];
      }
    });

    expect(calls).toEqual([{ method: "eth_requestAccounts" }]);
    expect(result).toEqual({
      status: "connected",
      address,
      shortAddress: "0x1234...abcd"
    });
  });

  it("shortens addresses for compact display", () => {
    expect(shortenAddress("0x1234567890abcdef1234567890abcdef1234abcd")).toBe(
      "0x1234...abcd"
    );
  });

  it("reports user rejection when the wallet returns code 4001", async () => {
    const rejection = Object.assign(new Error("User rejected the request"), { code: 4001 });

    const result = await connectInjectedWallet({
      request: async () => {
        throw rejection;
      }
    });

    expect(result).toEqual({ status: "rejected" });
  });

  it("reports failed for non-rejection wallet errors", async () => {
    const result = await connectInjectedWallet({
      request: async () => {
        throw new Error("Provider unavailable");
      }
    });

    expect(result).toEqual({ status: "failed" });
  });

  it("reports failed when the wallet returns no accounts", async () => {
    const result = await connectInjectedWallet({
      request: async () => []
    });

    expect(result).toEqual({ status: "failed" });
  });
});
