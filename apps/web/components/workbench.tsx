"use client";

import {
  buildReceipt,
  canonicalizeReceipt,
  demoSamples,
  diagnoseAgentOutput,
  hashReceipt
} from "@afr/sacp-core";
import { useEffect, useMemo, useState } from "react";
import {
  anchorReceiptWithInjectedProvider,
  type AnchorReceiptStatus,
  type EthereumSendTransactionProvider
} from "@/lib/anchor-receipt";
import { mantleSepolia } from "@/lib/chains";
import {
  checkMantleSepoliaNetwork,
  type EthereumChainProvider,
  type MantleNetworkStatus
} from "@/lib/mantle-network";
import {
  switchToMantleSepoliaNetwork,
  type EthereumNetworkSwitchProvider,
  type MantleNetworkSwitchStatus
} from "@/lib/mantle-network-switch";
import {
  connectInjectedWallet,
  type EthereumRequestProvider,
  type WalletConnectionResult
} from "@/lib/wallet-connect";
import { detectInjectedWallet, type WalletDetectionState } from "@/lib/wallet-detection";

const createdAt = "2026-06-10T00:00:00.000Z";

type WalletConnectionViewState = WalletConnectionResult | { status: "idle" | "connecting" };

type MantleNetworkViewState = {
  status: MantleNetworkStatus;
  chainId: string | null;
};

type MantleNetworkSwitchViewState = {
  status: MantleNetworkSwitchStatus;
};

type AnchorReceiptViewState = {
  status: AnchorReceiptStatus;
  txHash: string | null;
};

function isEthereumRequestProvider(provider: unknown): provider is EthereumRequestProvider {
  return (
    typeof provider === "object" &&
    provider !== null &&
    "request" in provider &&
    typeof (provider as { request?: unknown }).request === "function"
  );
}

function isEthereumChainProvider(provider: unknown): provider is EthereumChainProvider {
  return (
    typeof provider === "object" &&
    provider !== null &&
    "request" in provider &&
    typeof (provider as { request?: unknown }).request === "function"
  );
}

function isEthereumNetworkSwitchProvider(provider: unknown): provider is EthereumNetworkSwitchProvider {
  return (
    typeof provider === "object" &&
    provider !== null &&
    "request" in provider &&
    typeof (provider as { request?: unknown }).request === "function"
  );
}

function isEthereumSendTransactionProvider(
  provider: unknown
): provider is EthereumSendTransactionProvider {
  return (
    typeof provider === "object" &&
    provider !== null &&
    "request" in provider &&
    typeof (provider as { request?: unknown }).request === "function"
  );
}

export function Workbench() {
  const [sampleId, setSampleId] = useState(demoSamples[0].id);
  const sample = demoSamples.find((item) => item.id === sampleId) ?? demoSamples[0];
  const [input, setInput] = useState(sample.input);
  const [walletDetection, setWalletDetection] = useState<WalletDetectionState>(() =>
    detectInjectedWallet({})
  );
  const [walletConnection, setWalletConnection] = useState<WalletConnectionViewState>({
    status: "idle"
  });
  const [mantleNetwork, setMantleNetwork] = useState<MantleNetworkViewState>({
    status: "unchecked",
    chainId: null
  });
  const [mantleNetworkSwitch, setMantleNetworkSwitch] =
    useState<MantleNetworkSwitchViewState>({
      status: "idle"
    });
  const [anchorState, setAnchorState] = useState<AnchorReceiptViewState>({
    status: "idle",
    txHash: null
  });

  const result = useMemo(() => {
    try {
      const diagnosis = diagnoseAgentOutput(input);
      const receipt = buildReceipt({
        source: input,
        diagnosis,
        taskId: sample.id,
        createdAt
      });
      const canonical = canonicalizeReceipt(receipt);
      const receiptHash = hashReceipt(canonical);

      return { diagnosis, receipt, receiptHash, error: null };
    } catch (error) {
      return {
        diagnosis: null,
        receipt: null,
        receiptHash: null,
        error: error instanceof Error ? error.message : "Unknown diagnosis error"
      };
    }
  }, [input, sample.id]);

  function selectSample(nextId: string) {
    const nextSample = demoSamples.find((item) => item.id === nextId) ?? demoSamples[0];
    setSampleId(nextSample.id);
    setInput(nextSample.input);
  }

  async function connectWallet() {
    const host = window as unknown as { ethereum?: unknown };

    if (!walletDetection.detected || !isEthereumRequestProvider(host.ethereum)) {
      setWalletConnection({ status: "failed" });
      return;
    }

    setWalletConnection({ status: "connecting" });
    setWalletConnection(await connectInjectedWallet(host.ethereum));
    setMantleNetwork({ status: "unchecked", chainId: null });
    setMantleNetworkSwitch({ status: "idle" });
    setAnchorState({ status: "idle", txHash: null });
  }

  async function checkNetwork() {
    const host = window as unknown as { ethereum?: unknown };
    setMantleNetworkSwitch({ status: "idle" });

    if (!isEthereumChainProvider(host.ethereum)) {
      setMantleNetwork({ status: "not_available", chainId: null });
      return;
    }

    setMantleNetwork({ status: "checking", chainId: null });
    setMantleNetwork(await checkMantleSepoliaNetwork(host.ethereum));
  }

  async function switchNetwork() {
    const host = window as unknown as { ethereum?: unknown };

    if (!isEthereumNetworkSwitchProvider(host.ethereum)) {
      setMantleNetworkSwitch({ status: "not_available" });
      return;
    }

    setMantleNetworkSwitch({ status: "switching" });
    const switchResult = await switchToMantleSepoliaNetwork(host.ethereum);
    setMantleNetworkSwitch(switchResult);

    if (switchResult.status === "switched" && isEthereumChainProvider(host.ethereum)) {
      setMantleNetwork({ status: "checking", chainId: null });
      setMantleNetwork(await checkMantleSepoliaNetwork(host.ethereum));
    }
  }

  async function anchorReceipt() {
    const host = window as unknown as { ethereum?: unknown };

    if (
      !result.receipt ||
      !result.receiptHash ||
      walletConnection.status !== "connected" ||
      mantleNetwork.status !== "mantle_sepolia"
    ) {
      return;
    }

    if (!isEthereumSendTransactionProvider(host.ethereum)) {
      setAnchorState({ status: "failed", txHash: null });
      return;
    }

    setAnchorState({ status: "anchoring", txHash: null });
    const anchorResult = await anchorReceiptWithInjectedProvider(host.ethereum, {
      from: walletConnection.address,
      receiptHash: result.receiptHash,
      statusCode: result.receipt.statusCode,
      agentId: result.receipt.agentId,
      taskId: result.receipt.taskId
    });

    setAnchorState({
      status: anchorResult.status,
      txHash: anchorResult.status === "anchored" ? anchorResult.txHash : null
    });
  }

  const switchDisabled =
    walletConnection.status !== "connected" ||
    mantleNetwork.status !== "wrong_network" ||
    mantleNetworkSwitch.status === "switching";
  const switchButtonLabel =
    mantleNetworkSwitch.status === "switching"
      ? "Switching..."
      : mantleNetwork.status === "mantle_sepolia"
        ? "Already on Mantle Sepolia"
        : "Switch to Mantle Sepolia";
  const switchStatusLabel =
    walletConnection.status !== "connected"
      ? "Connect wallet before switching networks."
      : mantleNetwork.status === "unchecked"
        ? "Check network before switching."
        : mantleNetwork.status === "mantle_sepolia"
          ? "Already on Mantle Sepolia."
          : mantleNetworkSwitch.status === "switching"
            ? "Switching..."
            : mantleNetworkSwitch.status === "switched"
              ? "Network switch request succeeded. Current network was refreshed."
              : mantleNetworkSwitch.status === "rejected"
                ? "Network switch rejected."
                : mantleNetworkSwitch.status === "not_added"
                  ? "Mantle Sepolia is not added in this wallet."
                  : mantleNetworkSwitch.status === "not_available"
                    ? "Injected wallet provider is not available."
                    : mantleNetworkSwitch.status === "failed"
                      ? "Network switch failed."
                      : mantleNetwork.status === "wrong_network"
                        ? "Ready to request Mantle Sepolia."
                        : "Check network before switching.";

  const anchorDisabled =
    !result.receiptHash ||
    !result.receipt ||
    walletConnection.status !== "connected" ||
    mantleNetwork.status !== "mantle_sepolia" ||
    anchorState.status === "anchoring";
  const anchorButtonLabel =
    anchorState.status === "anchoring" ? "Anchoring..." : "Anchor receipt";
  const anchorStatusLabel =
    anchorState.status === "anchored"
      ? "Receipt anchored on Mantle Sepolia."
      : anchorState.status === "anchoring"
        ? "Anchoring... confirm the transaction in your wallet."
        : anchorState.status === "rejected"
          ? "Anchor transaction rejected."
          : anchorState.status === "failed"
            ? "Anchor transaction failed."
            : !result.receiptHash || !result.receipt
              ? "Generate a receipt before anchoring."
              : walletConnection.status !== "connected"
                ? "Connect wallet before anchoring."
                : mantleNetwork.status !== "mantle_sepolia"
                  ? "Switch to Mantle Sepolia before anchoring."
                  : "Ready to anchor the receipt hash.";

  useEffect(() => {
    const host = window as unknown as { ethereum?: unknown };
    setWalletDetection(detectInjectedWallet({ ethereum: host.ethereum }));
  }, []);

  const connectedAddress =
    walletConnection.status === "connected" ? walletConnection.address : null;

  useEffect(() => {
    // Clear any stale anchor result when the current anchor target changes:
    // a different receipt hash, a different connected wallet, or leaving Mantle Sepolia.
    setAnchorState({ status: "idle", txHash: null });
  }, [result.receiptHash, connectedAddress, mantleNetwork.status]);

  return (
    <main className="min-h-screen px-5 py-6 md:px-8">
      <header className="mx-auto mb-6 max-w-7xl">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-signal">
          Agent Flight Recorder
        </p>
        <h1 className="mt-2 max-w-3xl text-3xl font-semibold leading-tight md:text-5xl">
          Turn agent claims into auditable SACP receipts.
        </h1>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-ink/70 md:text-base">
          MVP scaffold for a DoraHacks demo: diagnose messy agent output, build a receipt, hash it, and
          prepare the Mantle anchor flow.
        </p>
      </header>

      <section className="mx-auto grid max-w-7xl gap-4 lg:grid-cols-[1.05fr_1.1fr_0.85fr]">
        <section className="rounded border border-line bg-paper p-4">
          <div className="mb-3 flex items-center justify-between gap-3">
            <h2 className="text-sm font-semibold">Agent Output</h2>
            <select
              className="rounded border border-line bg-paper px-2 py-1 text-xs"
              value={sampleId}
              onChange={(event) => selectSample(event.target.value)}
            >
              {demoSamples.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.title}
                </option>
              ))}
            </select>
          </div>
          <textarea
            className="min-h-[420px] w-full resize-none rounded border border-line bg-[#fbfbf8] p-3 text-sm leading-6 outline-none focus:border-signal"
            value={input}
            onChange={(event) => setInput(event.target.value)}
          />
        </section>

        <section className="rounded border border-line bg-paper p-4">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-sm font-semibold">SACP Diagnosis / Receipt</h2>
            <span className="rounded-full border border-line px-2 py-1 text-xs">
              {result.diagnosis?.statusCode ?? "ERROR"}
            </span>
          </div>

          {result.error ? (
            <p className="rounded border border-danger/40 bg-danger/10 p-3 text-sm text-danger">
              {result.error}
            </p>
          ) : (
            <div className="space-y-4">
              <div>
                <p className="text-xs font-semibold uppercase text-ink/50">Evidence summary</p>
                <p className="mt-1 text-sm leading-6">{result.diagnosis?.evidenceSummary}</p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase text-ink/50">Required fix</p>
                <p className="mt-1 text-sm leading-6">{result.diagnosis?.requiredFix}</p>
              </div>
              <pre className="max-h-[290px] overflow-auto rounded border border-line bg-[#fbfbf8] p-3 text-xs leading-5">
                {JSON.stringify(result.receipt, null, 2)}
              </pre>
            </div>
          )}
        </section>

        <section className="rounded border border-line bg-paper p-4">
          <h2 className="mb-3 text-sm font-semibold">Mantle Anchor</h2>
          <div className="space-y-4 text-sm">
            <div>
              <p className="text-xs font-semibold uppercase text-ink/50">Receipt hash</p>
              <p className="mt-1 break-all rounded border border-line bg-[#fbfbf8] p-3 text-xs leading-5">
                {result.receiptHash ?? "Generate a receipt first"}
              </p>
            </div>
            <div className="rounded border border-line bg-[#fbfbf8] p-3">
              <div className="flex items-center justify-between gap-3">
                <p className="font-medium">Wallet detection</p>
                <span
                  className={
                    walletDetection.detected
                      ? "rounded-full border border-signal/40 bg-signal/10 px-2 py-1 text-xs text-signal"
                      : "rounded-full border border-danger/40 bg-danger/10 px-2 py-1 text-xs text-danger"
                  }
                >
                  {walletDetection.detected ? "Detected" : "Not detected"}
                </span>
              </div>
              <p className="mt-2 leading-6 text-ink/70">
                {walletDetection.label}. Detection only reads the injected provider from the browser
                runtime.
              </p>
              <p className="mt-2 text-xs text-ink/50">Providers: {walletDetection.providerCount}</p>
            </div>
            <div className="rounded border border-line bg-[#fbfbf8] p-3">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="font-medium">
                    {walletConnection.status === "connected"
                      ? "Wallet connected"
                      : "Wallet connection"}
                  </p>
                  <p className="mt-1 text-xs text-ink/60">
                    {!walletDetection.detected
                      ? "Install or enable an injected wallet to connect."
                      : walletConnection.status === "connected"
                        ? walletConnection.shortAddress
                        : walletConnection.status === "rejected"
                          ? "Wallet connection rejected. No account was connected."
                          : walletConnection.status === "failed"
                            ? "Wallet connection failed."
                            : "Ready"}
                  </p>
                </div>
                <button
                  className="rounded border border-signal bg-signal px-3 py-2 text-xs font-semibold text-white disabled:cursor-not-allowed disabled:border-line disabled:bg-ink/10 disabled:text-ink/40"
                  disabled={!walletDetection.detected || walletConnection.status === "connecting"}
                  type="button"
                  onClick={connectWallet}
                >
                  {walletConnection.status === "connecting" ? "Connecting..." : "Connect wallet"}
                </button>
              </div>
            </div>
            <div className="rounded border border-line bg-[#fbfbf8] p-3">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="font-medium">Network check</p>
                  <p className="mt-1 text-xs text-ink/60">
                    {mantleNetwork.status === "unchecked"
                      ? "Not checked"
                      : mantleNetwork.status === "checking"
                        ? "Checking current wallet network..."
                        : mantleNetwork.status === "mantle_sepolia"
                          ? "Mantle Sepolia verified."
                          : mantleNetwork.status === "wrong_network"
                            ? "Wrong network. Mantle Sepolia is required."
                            : mantleNetwork.status === "not_available"
                              ? "Injected wallet provider is not available."
                              : "Network check failed."}
                  </p>
                </div>
                <button
                  className="rounded border border-signal bg-signal px-3 py-2 text-xs font-semibold text-white disabled:cursor-not-allowed disabled:border-line disabled:bg-ink/10 disabled:text-ink/40"
                  disabled={
                    walletConnection.status !== "connected" || mantleNetwork.status === "checking"
                  }
                  type="button"
                  onClick={checkNetwork}
                >
                  {mantleNetwork.status === "checking" ? "Checking..." : "Check network"}
                </button>
              </div>
              <dl className="mt-3 grid gap-2 text-xs">
                <div className="flex justify-between gap-3">
                  <dt className="text-ink/50">Required network</dt>
                  <dd>Mantle Sepolia</dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt className="text-ink/50">Required chain ID</dt>
                  <dd>5003 / 0x138b</dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt className="text-ink/50">Current chain ID</dt>
                  <dd>{mantleNetwork.chainId ?? "Not checked"}</dd>
                </div>
              </dl>
              <div className="mt-3 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-3">
                <p className="text-xs text-ink/60">{switchStatusLabel}</p>
                <button
                  className="rounded border border-signal bg-signal px-3 py-2 text-xs font-semibold text-white disabled:cursor-not-allowed disabled:border-line disabled:bg-ink/10 disabled:text-ink/40"
                  disabled={switchDisabled}
                  type="button"
                  onClick={switchNetwork}
                >
                  {switchButtonLabel}
                </button>
              </div>
            </div>
            <div className="rounded border border-line bg-[#fbfbf8] p-3">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="font-medium">Anchor receipt</p>
                  <p className="mt-1 text-xs text-ink/60">{anchorStatusLabel}</p>
                </div>
                <button
                  className="rounded border border-signal bg-signal px-3 py-2 text-xs font-semibold text-white disabled:cursor-not-allowed disabled:border-line disabled:bg-ink/10 disabled:text-ink/40"
                  disabled={anchorDisabled}
                  type="button"
                  onClick={anchorReceipt}
                >
                  {anchorButtonLabel}
                </button>
              </div>
              {anchorState.status === "anchored" && anchorState.txHash ? (
                <dl className="mt-3 grid gap-2 border-t border-line pt-3 text-xs">
                  <div className="flex justify-between gap-3">
                    <dt className="text-ink/50">Transaction hash</dt>
                    <dd className="break-all text-right">{anchorState.txHash}</dd>
                  </div>
                  <div className="flex justify-between gap-3">
                    <dt className="text-ink/50">Explorer</dt>
                    <dd>
                      <a
                        className="break-all text-right text-signal underline"
                        href={`${mantleSepolia.explorerUrl}/tx/${anchorState.txHash}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View on Mantlescan
                      </a>
                    </dd>
                  </div>
                </dl>
              ) : null}
            </div>
          </div>
        </section>
      </section>
    </main>
  );
}
