import { LAMPORTS_PER_SOL } from "@solana/web3.js";

export function solToLamports(sol: number) {
  return Math.ceil(sol * LAMPORTS_PER_SOL);
}
