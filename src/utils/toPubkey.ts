import { AnyPublicKey } from "@metaplex-foundation/mpl-core";
import { PublicKey } from "@solana/web3.js";

export function toPubkey(value: AnyPublicKey): PublicKey;
export function toPubkey(value?: AnyPublicKey): PublicKey | undefined;
export function toPubkey(value?: AnyPublicKey) {
  if (!value) return undefined;
  return typeof value === "string" ? new PublicKey(value) : value;
}
