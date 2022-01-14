import { MdCheck, MdOutlineAccountBalanceWallet } from "react-icons/md";

import { FC } from "react";
import { FlowStatus } from "components/modals/FlowStatus";
import { HaloedIcon } from "components/HaloedIcon";
import { fontSizes } from "theme/typography";

interface Props {
  name: string;
  price: number;
}

export const PurchaseSuccess: FC<Props> = ({ name, price }) => {
  return (
    <FlowStatus
      statusIcon={<HaloedIcon icon={MdCheck} />}
      title={`You bought ${name}!`}
      subtitle={`${price} SOL was withdrawn from your wallet and your NFT was added.`}
      noteIcon={
        <MdOutlineAccountBalanceWallet
          size={fontSizes["2xl"]}
          color="whiteAlpha.700"
        />
      }
      noteText="You may also have to approve the purchase in your wallet if you don't have “auto-approve” turned on."
    />
  );
};
