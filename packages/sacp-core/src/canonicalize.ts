import type { SACPReceipt } from "./types";

function sortValue(value: unknown): unknown {
  if (Array.isArray(value)) {
    return value.map(sortValue);
  }

  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value)
        .sort(([left], [right]) => left.localeCompare(right))
        .map(([key, nested]) => [key, sortValue(nested)])
    );
  }

  return value;
}

export function canonicalizeReceipt(receipt: SACPReceipt): string {
  return JSON.stringify(sortValue(receipt));
}

