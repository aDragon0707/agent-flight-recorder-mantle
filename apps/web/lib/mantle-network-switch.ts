import { mantleSepoliaChainIdHex } from "./mantle-network";

export type EthereumNetworkSwitchProvider = {
  request(payload: {
    method: "wallet_switchEthereumChain";
    params: [{ chainId: typeof mantleSepoliaChainIdHex }];
  }): Promise<unknown>;
};

export type MantleNetworkSwitchStatus =
  | "idle"
  | "switching"
  | "switched"
  | "rejected"
  | "not_added"
  | "not_available"
  | "failed";

export type MantleNetworkSwitchResult = {
  status: Exclude<MantleNetworkSwitchStatus, "idle" | "switching">;
};

type WalletSwitchError = {
  code?: unknown;
};

export async function switchToMantleSepoliaNetwork(
  provider: EthereumNetworkSwitchProvider | null | undefined
): Promise<MantleNetworkSwitchResult> {
  if (!provider) {
    return { status: "not_available" };
  }

  try {
    await provider.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: mantleSepoliaChainIdHex }]
    });

    return { status: "switched" };
  } catch (error) {
    const code = (error as WalletSwitchError).code;

    if (code === 4001) {
      return { status: "rejected" };
    }

    if (code === 4902) {
      return { status: "not_added" };
    }

    return { status: "failed" };
  }
}
