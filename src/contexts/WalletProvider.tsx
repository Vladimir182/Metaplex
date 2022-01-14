import { FC, useCallback, useEffect } from "react";
import { WalletAdapterNetwork, WalletError } from "@solana/wallet-adapter-base";
import {
  WalletProvider as WalletProviderBase,
  WalletProviderProps as WalletProviderBaseProps,
  useWallet,
} from "@solana/wallet-adapter-react";
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
import { WalletModalProvider } from "components/smart/Wallet";
import { getWalletErrorDescription } from "utils/getWalletErrorDescription";
import { useToast } from "components/modals/Toast";
import { walletChange } from "state/wallet";

export type WalletProviderProps = Partial<WalletProviderBaseProps>;

const WalletCatcher: FC = ({ children }) => {
  const wallet = useWallet();
  const setWallet = useEvent(walletChange);

  useEffect(() => {
    setWallet(wallet);
  }, [wallet]);

  return <>{children}</>;
};

export const WalletProvider: FC<WalletProviderProps> = ({
  wallets,
  onError,
  children,
  ...props
}) => {
  const toast = useToast();
  const walletList = useStoreMap($network, (network) => [
    getPhantomWallet(),
    getSlopeWallet(),
    getSolflareWallet(),
    getLedgerWallet(),
    getSolletWallet({ network: network as WalletAdapterNetwork }),
    getSolletExtensionWallet({ network: network as WalletAdapterNetwork }),
  ]);

  const onErrorLocal = useCallback(
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
    <WalletProviderBase
      wallets={wallets ?? walletList}
      onError={onError ?? onErrorLocal}
      {...props}
    >
      <WalletModalProvider>
        <WalletCatcher>{children}</WalletCatcher>
      </WalletModalProvider>
    </WalletProviderBase>
  );
};
