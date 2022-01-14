import { FC, useCallback } from "react";
import { ModalTemplate } from "components/modals/template";
import {
  InstantBuy,
  SaleReview,
  ArtworkSummaryProps,
  ListingSuccess,
} from "components/modals/NftSale";
import { useLocalState } from "./ListForSaleDialog.state";
import { ListForSaleDialogHeader } from "./ListForSaleDialogHeader";
import { WaitSdk } from "./WaitSdk";

interface Props {
  artworkSummary: ArtworkSummaryProps;
  isVisible: boolean;
  hideModal(): void;
  onSubmit?(price: number, endDate: Date): void;
}

export const ListForSaleDialog: FC<Props> = ({
  artworkSummary,
  isVisible,
  hideModal,
  onSubmit,
}) => {
  const { saleState, changeState, submitInstantBuy, goToSuccess } =
    useLocalState({
      onSubmit,
    });

  const onClose = useCallback(() => {
    hideModal();
    changeState({ type: "instant-buy" });
  }, [hideModal]);
  const body =
    saleState.type === "instant-buy" ? (
      <InstantBuy
        onSubmit={(price, endDate) => submitInstantBuy({ price, endDate })}
      />
    ) : saleState.type === "sale-review" ? (
      <SaleReview
        endDate={saleState.endDate}
        priceProps={saleState.price}
        artworkSummary={artworkSummary}
        onNext={goToSuccess}
      />
    ) : saleState.type === "success" ? (
      <ListingSuccess img={artworkSummary.img} my={16} />
    ) : saleState.type === "wait-sdk" ? (
      <WaitSdk />
    ) : null;

  const onBackHandler =
    saleState.type === "sale-review"
      ? () => changeState({ type: "instant-buy" })
      : undefined;

  const header = (
    <ListForSaleDialogHeader
      title={
        saleState.type === "instant-buy"
          ? "List for Sale"
          : saleState.type === "sale-review"
          ? "List item for sale"
          : undefined
      }
      onBack={onBackHandler}
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
      {body}
    </ModalTemplate>
  );
};
