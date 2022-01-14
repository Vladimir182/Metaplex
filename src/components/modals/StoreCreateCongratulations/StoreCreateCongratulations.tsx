import { BoxProps, Text } from "@chakra-ui/react";

import { CreateButton } from "components/buttons/CreateButton";
import { FlowStatus } from "../FlowStatus";
import { HaloedIcon } from "components/HaloedIcon";
import { ROUTES } from "routes";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useStore } from "effector-react";
import { $isStoreAdmin } from "state/store";

interface Props extends BoxProps {
  storeName: string;
  storeId: string;
  onClose?: () => void;
}

export const StoreCreateCongratulations: React.FC<Props> = ({
  storeName,
  storeId,
  onClose,
  ...props
}) => {
  const navigate = useNavigate();
  const isAdmin = useStore($isStoreAdmin);
  if (!isAdmin) {
    return <>{null}</>;
  }

  return (
    <FlowStatus
      statusIcon={<HaloedIcon emoji="🎉" />}
      title="Congratulations"
      subtitle={
        <>
          <Text as="span" variant="body-large">
            {storeName}{" "}
          </Text>
          <Text as="span" variant="body-large" color="whiteAlpha.500">
            Storefront is live! Create a new item and list it for sale.
          </Text>
        </>
      }
      actions={
        <CreateButton
          onClick={() => {
            if (storeId) {
              onClose?.();
              navigate(
                ROUTES.createNft({
                  ":storeId": storeId,
                })
              );
            }
          }}
          variant="solid"
          size="lg"
        >
          {" "}
          Create New Item
        </CreateButton>
      }
      {...props}
    />
  );
};
