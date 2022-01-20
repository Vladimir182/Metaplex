import {
  WalletModalProvider,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import { CreateMessage } from "components/CreateMessage";

import { FC } from "react";

export const WalletNotConnected: FC = () => {
  return (
    <CreateMessage>
      <WalletModalProvider>
        <WalletMultiButton style={{ height: 56 }} />
      </WalletModalProvider>
    </CreateMessage>
  );
};
