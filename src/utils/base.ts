import { AnyPublicKey } from "@metaplex-foundation/mpl-core";

export function toNumber(s: string, def = 0): number {
  const val = parseFloat(s);
  if (Number.isNaN(val)) {
    return def;
  }
  return val;
}

export function key2String(key?: AnyPublicKey) {
  if (!key) return;
  if (typeof key === "string") return key;
  return key.toBase58();
}
