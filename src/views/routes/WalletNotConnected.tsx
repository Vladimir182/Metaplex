import { FC } from "react";
import {
  WalletModalProvider,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";

import { CreateMessage } from "components/Others/CreateMessage";

export const WalletNotConnected: FC = () => {
  return (
    <CreateMessage>
      <WalletModalProvider>
        <WalletMultiButton style={{ height: 56 }} />
      </WalletModalProvider>
    </CreateMessage>
  );
};
