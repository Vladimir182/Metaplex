import { FC, useEffect } from "react";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import {
  useWallet,
  WalletProvider as WalletProviderBase,
  WalletProviderProps as WalletProviderBaseProps,
} from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import {
  getLedgerWallet,
  getPhantomWallet,
  getSlopeWallet,
  getSolflareWallet,
  getSolletExtensionWallet,
  getSolletWallet,
} from "@solana/wallet-adapter-wallets";
import { useEvent, useStoreMap } from "effector-react";
import { $network } from "state/connection";
import { walletChange } from "state/wallet";

export {
  WalletModalProvider,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";

import "./Wallet.css";

export type WalletProviderProps = Partial<WalletProviderBaseProps>;

const WalletCatcher: FC = ({ children }) => {
  const wallet = useWallet();
  const setWallet = useEvent(walletChange);

  useEffect(() => {
    setWallet(wallet);
  }, [setWallet, wallet]);

  return <>{children}</>;
};

export const WalletProvider: FC<WalletProviderProps> = ({
  children,
  ...props
}) => {
  const wallets = useStoreMap($network, (network) => [
    getPhantomWallet(),
    getSlopeWallet(),
    getSolflareWallet(),
    getLedgerWallet(),
    getSolletWallet({ network: network as WalletAdapterNetwork }),
    getSolletExtensionWallet({ network: network as WalletAdapterNetwork }),
  ]);

  return (
    <WalletProviderBase wallets={wallets} {...props}>
      <WalletModalProvider>
        <WalletCatcher>{children}</WalletCatcher>
      </WalletModalProvider>
    </WalletProviderBase>
  );
};
