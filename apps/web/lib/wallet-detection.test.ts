import { describe, expect, it } from "vitest";
import { detectInjectedWallet } from "./wallet-detection";

describe("detectInjectedWallet", () => {
  it("reports missing when no injected ethereum provider exists", () => {
    expect(detectInjectedWallet({})).toEqual({
      detected: false,
      label: "No injected wallet detected",
      providerCount: 0
    });
  });

  it("reports detected when window.ethereum is present", () => {
    expect(detectInjectedWallet({ ethereum: { isMetaMask: true } })).toEqual({
      detected: true,
      label: "Injected wallet detected",
      providerCount: 1
    });
  });

  it("counts provider arrays without requesting accounts or network changes", () => {
    expect(detectInjectedWallet({ ethereum: { providers: [{}, {}] } })).toEqual({
      detected: true,
      label: "Injected wallet detected",
      providerCount: 2
    });
  });
});
