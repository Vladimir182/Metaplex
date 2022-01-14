import { WalletError } from "@solana/wallet-adapter-base";

export function getWalletErrorDescription(error: WalletError) {
  const description = error.message
    ? `${error.name}: ${error.message}`
    : error.name;

  return description || "An unknown wallet error has occurred.";
}
