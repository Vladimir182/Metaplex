import { Wallet } from "@metaplex/js";
import { WalletContextState } from "@solana/wallet-adapter-react";
import { createEvent, restore } from "effector";

type ConnectedWallet = WalletContextState &
  Wallet & {
    connected: true;
  };

export const walletChange = createEvent<WalletContextState | null>();
export const $walletContext = restore(walletChange, null);

export const $wallet = $walletContext.map((wallet) => {
  return isConnectedWallet(wallet) ? wallet : null;
});

export const $hasConnectedWallet = $wallet.map((wallet) => !!wallet);

export const $walletAddress = $wallet.map(
  (wallet) => wallet?.publicKey.toString() || null
);

export const $user = $walletAddress.map((address) =>
  address ? { address } : null
);

function isConnectedWallet(
  wallet: WalletContextState | ConnectedWallet | null
): wallet is ConnectedWallet {
  return Boolean(wallet?.connected && wallet?.publicKey);
}
