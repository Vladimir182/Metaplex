import { BoxProps, Text } from "@chakra-ui/react";

import { CreateButton } from "components/buttons/CreateButton";
import { FlowStatus } from "../FlowStatus";
import { HaloedIcon } from "components/HaloedIcon";
import { ROUTES } from "routes";
import React from "react";
import { useNavigate } from "react-router-dom";

interface Props extends BoxProps {
  onClose?: () => void;
}

export const StoreCreateCongratulations: React.FC<Props> = ({
  onClose,
  ...props
}) => {
  const navigate = useNavigate();

  return (
    <FlowStatus
      statusIcon={<HaloedIcon emoji="🎉" />}
      title="Congratulations"
      subtitle={
        <>
          <Text
            as="span"
            variant="body-large"
            color="whiteAlpha.500"
            textAlign="center"
          >
            Management console is live! Create a Marketplace and list your
            tokens for sale.
          </Text>
        </>
      }
      actions={
        <CreateButton
          onClick={() => {
            onClose?.();
            navigate(ROUTES.createNft());
          }}
          variant="solid"
          size="lg"
        >
          {" "}
          Create New Membership Token
        </CreateButton>
      }
      {...props}
    />
  );
};
