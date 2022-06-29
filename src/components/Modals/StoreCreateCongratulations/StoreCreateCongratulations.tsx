import React from "react";
import { useNavigate } from "react-router-dom";
import { BoxProps, Text } from "@chakra-ui/react";
import { ROUTES } from "routes";

import { CreateButton } from "components/Buttons/CreateButton";
import { HaloedIcon } from "components/Icons/HaloedIcon";

import { FlowStatus } from "../FlowStatus";

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
