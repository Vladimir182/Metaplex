import { FC } from "react";
import { FlowStatus } from "components/modals/FlowStatus";
import { HaloedIcon } from "components/HaloedIcon";
import { MdOutlineThumbDown } from "react-icons/md";

export const SoldOut: FC = () => {
  return (
    <FlowStatus
      statusIcon={<HaloedIcon icon={MdOutlineThumbDown} />}
      title="Looks like we sold out."
      subtitle="Unfortunately this NFT sold out before we could complete your purchase. No funds have been transferred."
    />
  );
};
