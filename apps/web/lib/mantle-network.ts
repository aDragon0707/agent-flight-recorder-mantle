export const mantleSepoliaChainIdHex = "0x138b";

export type EthereumChainProvider = {
  request(payload: { method: "eth_chainId" }): Promise<unknown>;
};

export type MantleNetworkStatus =
  | "unchecked"
  | "checking"
  | "mantle_sepolia"
  | "wrong_network"
  | "not_available"
  | "failed";

export type MantleNetworkCheckResult = {
  status: Exclude<MantleNetworkStatus, "unchecked" | "checking">;
  chainId: string | null;
};

export async function checkMantleSepoliaNetwork(
  provider: EthereumChainProvider | null | undefined
): Promise<MantleNetworkCheckResult> {
  if (!provider) {
    return { status: "not_available", chainId: null };
  }

  try {
    const chainId = await provider.request({ method: "eth_chainId" });

    if (typeof chainId !== "string") {
      return { status: "failed", chainId: null };
    }

    return {
      status:
        chainId.toLowerCase() === mantleSepoliaChainIdHex ? "mantle_sepolia" : "wrong_network",
      chainId
    };
  } catch {
    return { status: "failed", chainId: null };
  }
}
