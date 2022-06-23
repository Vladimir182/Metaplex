import { FC } from "react";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { useEvent } from "effector-react";
import { networkChange } from "state/connection";
import { useBalance } from "state/react/useBalance";
import { truncateDecimals } from "utils/truncateDecimals";

import { WalletMultiButton } from ".";

export default {
  title: "Compound/Smart/Wallet",
  parameters: { layout: "fullscreen" },
  component: WalletMultiButton,
} as ComponentMeta<typeof WalletMultiButton>;

const Balance: FC = () => {
  const { balance } = useBalance();

  return balance === null ? (
    <div>Loading balance</div>
  ) : (
    <div>Balance {truncateDecimals(balance.sol, 2)} SOL</div>
  );
};

export const Default: ComponentStory<typeof WalletMultiButton> = () => {
  const setNetwork = useEvent(networkChange);
  setNetwork(WalletAdapterNetwork.Devnet);
  return (
    <>
      <WalletMultiButton />
      <Balance />
    </>
  );
};
