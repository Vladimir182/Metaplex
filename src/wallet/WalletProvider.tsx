import "./Wallet.css";

import { WalletAdapterNetwork, WalletError } from "@solana/wallet-adapter-base";
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
import { useToast } from "components/modals/Toast";
import { useEvent, useStoreMap } from "effector-react";
import { FC, useCallback, useEffect } from "react";
import { $network } from "state/connection";
import { walletChange } from "state/wallet";
import { getWalletErrorDescription } from "utils/getWalletErrorDescription";

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
  const toast = useToast();

  const wallets = useStoreMap($network, (network) => [
    getPhantomWallet(),
    getSlopeWallet(),
    getSolflareWallet(),
    getLedgerWallet(),
    getSolletWallet({ network: network as WalletAdapterNetwork }),
    getSolletExtensionWallet({ network: network as WalletAdapterNetwork }),
  ]);

  const onError = useCallback(
    (error: WalletError) => {
      toast({
        title: "Wallet error",
        description: getWalletErrorDescription(error),
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    },
    [toast]
  );

  return (
    <WalletProviderBase wallets={wallets} onError={onError} {...props}>
      <WalletModalProvider>
        <WalletCatcher>{children}</WalletCatcher>
      </WalletModalProvider>
    </WalletProviderBase>
  );
};
