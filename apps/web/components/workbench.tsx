"use client";

import {
  buildReceipt,
  canonicalizeReceipt,
  demoSamples,
  diagnoseAgentOutput,
  hashReceipt
} from "@afr/sacp-core";
import { useMemo, useState } from "react";

const createdAt = "2026-06-10T00:00:00.000Z";

export function Workbench() {
  const [sampleId, setSampleId] = useState(demoSamples[0].id);
  const sample = demoSamples.find((item) => item.id === sampleId) ?? demoSamples[0];
  const [input, setInput] = useState(sample.input);

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
              <p className="font-medium">Wallet anchor placeholder</p>
              <p className="mt-2 leading-6 text-ink/70">
                The scaffold reserves the Mantle anchor panel. Real MetaMask transaction wiring comes
                after the core, web, and contract packages are stable.
              </p>
            </div>
            <dl className="grid gap-2 text-xs">
              <div className="flex justify-between gap-3">
                <dt className="text-ink/50">Network</dt>
                <dd>Mantle Sepolia</dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt className="text-ink/50">Chain ID</dt>
                <dd>5003</dd>
              </div>
            </dl>
          </div>
        </section>
      </section>
    </main>
  );
}

