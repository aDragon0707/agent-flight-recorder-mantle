import { keccak256, toBytes } from "viem";

export function hashReceipt(canonicalReceipt: string): `0x${string}` {
  return keccak256(toBytes(canonicalReceipt));
}

