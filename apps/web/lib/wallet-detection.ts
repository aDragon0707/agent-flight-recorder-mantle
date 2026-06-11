export type InjectedEthereumProvider = {
  providers?: unknown[];
} & Record<string, unknown>;

export type WalletDetectionHost = {
  ethereum?: unknown;
};

export type WalletDetectionState = {
  detected: boolean;
  label: "Injected wallet detected" | "No injected wallet detected";
  providerCount: number;
};

export function detectInjectedWallet(host: WalletDetectionHost): WalletDetectionState {
  const ethereum = host.ethereum as InjectedEthereumProvider | null | undefined;
  const providerCount = Array.isArray(ethereum?.providers) ? ethereum.providers.length : ethereum ? 1 : 0;
  const detected = providerCount > 0;

  return {
    detected,
    label: detected ? "Injected wallet detected" : "No injected wallet detected",
    providerCount
  };
}
