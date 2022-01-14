import { Button, Image, ModalCloseButton } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { FC } from "react";
import { FlowStatus } from "../FlowStatus";
import { ModalTemplate } from "../template";
import { ROUTES } from "routes";

interface Props {
  logoUri?: string;
  storeName: string;
  storeId: string;
  isOpen: boolean;
  onClose?: () => void;
}

export const StorefrontExists: FC<Props> = ({
  logoUri,
  storeId,
  storeName,
  isOpen,
  onClose,
}) => {
  return (
    <ModalTemplate
      header={<ModalCloseButton />}
      isOpen={isOpen}
      onClose={onClose ?? (() => {})}
    >
      <FlowStatus
        statusIcon={
          logoUri ? <Image src={logoUri} maxHeight={125} /> : undefined
        }
        title={`You created "${storeName}" Storefront.`}
        subtitle="A wallet can only create one Storefront."
        actions={
          <Button
            as={Link}
            variant="primary"
            h={14}
            to={ROUTES.store({
              ":storeId": storeId,
            })}
          >
            View my Storefront
          </Button>
        }
      />
    </ModalTemplate>
  );
};
