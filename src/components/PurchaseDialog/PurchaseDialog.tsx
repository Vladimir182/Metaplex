import { FC, useCallback } from "react";
import { ModalTemplate } from "components/modals/template";
import { useLocalState } from "./PurchaseDialog.state";
import { ListForSaleDialogHeader } from "components/ListForSaleDialog/ListForSaleDialogHeader";
import { Listing } from "state/listing";
import { PurchaseConfirm } from "components/modals/PurchaseNft/PurchaseConfirm";
import { useSolToUsd } from "state/react/useCurrency";
import { PurchaseQueue } from "components/modals/PurchaseNft/PurchaseQueue";
import { PurchaseSuccess } from "components/modals/PurchaseNft/PurchaseSuccess";
import { SoldOut } from "components/modals/PurchaseNft/SoldOut";

interface Props {
  listing: Listing;
  isVisible: boolean;
  hideModal(): void;
  onSubmit?(price: number, endDate: Date): void;
}

export const PurchaseDialog: FC<Props> = ({
  listing,
  isVisible,
  hideModal,
  onSubmit,
}) => {
  const { convert } = useSolToUsd();
  const { state, proceedPurchase } = useLocalState({
    onSubmit,
    listing,
  });

  const onClose = useCallback(() => {
    hideModal();
  }, [hideModal]);

  const header = (
    <ListForSaleDialogHeader
      title={state === "confirm" ? "Confirm Purchase" : undefined}
      onClose={onClose}
    />
  );

  return (
    <ModalTemplate
      header={header}
      isOpen={isVisible}
      onClose={onClose}
      bodyProps={{ p: 0 }}
    >
      {state === "confirm" ? (
        <PurchaseConfirm
          image={listing.artwork.image}
          title={listing.artwork.title}
          artist={listing.artwork.creators[0]}
          price={listing.price}
          dollarPrice={convert(listing.price)}
          onConfirm={proceedPurchase}
          onCancel={onClose}
        />
      ) : state === "queue" ? (
        <PurchaseQueue />
      ) : state === "success" ? (
        <PurchaseSuccess name={listing.artwork.title} price={listing.price} />
      ) : state === "sold-out" ? (
        <SoldOut />
      ) : null}
    </ModalTemplate>
  );
};
