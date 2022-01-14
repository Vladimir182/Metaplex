import { Circle, CircularProgress } from "@chakra-ui/react";

import { FC } from "react";
import { FlowStatus } from "components/modals/FlowStatus";
import { MdOutlineShoppingCart } from "react-icons/md";
import { fontSizes } from "theme/typography";

export const PurchaseQueue: FC = () => {
  return (
    <FlowStatus
      statusIcon={
        <Circle color="green.500" bg="whiteAlpha.100" size={16}>
          <MdOutlineShoppingCart size={fontSizes["2xl"]} />
          <CircularProgress
            position="absolute"
            color="green.500"
            trackColor="whiteAlpha.100"
            size="72px"
            value={40}
            thickness={4}
          />
        </Circle>
      }
      title="You're in line to buy."
      subtitle="Do not refresh this page or you will lose your place in line."
    />
  );
};
