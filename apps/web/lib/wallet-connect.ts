export type EthereumRequestProvider = {
  request(payload: { method: "eth_requestAccounts" }): Promise<unknown>;
};

export type WalletConnectionResult =
  | {
      status: "connected";
      address: string;
      shortAddress: string;
    }
  | {
      status: "rejected" | "failed";
    };

type WalletError = {
  code?: unknown;
};

export function shortenAddress(address: string): string {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

export async function connectInjectedWallet(
  provider: EthereumRequestProvider
): Promise<WalletConnectionResult> {
  try {
    const accounts = await provider.request({ method: "eth_requestAccounts" });
    const address = Array.isArray(accounts) && typeof accounts[0] === "string" ? accounts[0] : "";

    if (!address) {
      return { status: "failed" };
    }

    return {
      status: "connected",
      address,
      shortAddress: shortenAddress(address)
    };
  } catch (error) {
    if ((error as WalletError).code === 4001) {
      return { status: "rejected" };
    }

    return { status: "failed" };
  }
}
