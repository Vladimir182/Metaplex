import { FC } from "react";
import { useParams } from "react-router-dom";
import { useStore } from "effector-react";

import { Layout } from "components/Layout";
import { InfiniteProgress } from "components/modals/InfiniteProgress";
import { ListingSuccess } from "components/modals/ListingSuccess";
import { ModalTemplate } from "components/modals/template";
import { TransactionFailure } from "components/modals/TransactionFailure";

import {
  CreateSaleSidebarContent,
  CreateSaleSidebarEnum,
} from "./components/CreateSaleSidebar";
import { Form } from "./components/Form";
import { PreviewStep } from "./components/PreviewStep";
import { createSaleFactory } from "./state";

export const CreateSaleView: FC = () => {
  const { itemId } = useParams();

  const model = createSaleFactory.createModel({
    itemId,
  });

  return (
    <createSaleFactory.Provider value={model}>
      <ViewContent />
    </createSaleFactory.Provider>
  );
};

export const ViewContent: FC = () => {
  const {
    $step,
    $progressMeta,
    artworkSummary,
    onCloseModal,
    $error,
    $createdSale,
  } = createSaleFactory.useModel();

  const shouldShowSuccessModal = useStore($createdSale);
  const transactionError = useStore($error);
  const step = useStore($step);
  const progressMeta = useStore($progressMeta);

  const shouldShowModal = Boolean(shouldShowSuccessModal || transactionError);

  return (
    <Layout narrow focused sidebarContent={<CreateSaleSidebarContent />}>
      {step === CreateSaleSidebarEnum.CONFIGURE && <Form />}
      {step === CreateSaleSidebarEnum.PREVIEW && <PreviewStep />}

      <InfiniteProgress
        isOpen={progressMeta.isOpen}
        title={progressMeta.title}
        subtitle={progressMeta.subtitle}
      />

      <ModalTemplate
        isOpen={shouldShowModal}
        onClose={onCloseModal}
        bodyProps={{ p: 0 }}
      >
        {transactionError && (
          <TransactionFailure
            bodyText={transactionError.message}
            onDismiss={onCloseModal}
          />
        )}
        {shouldShowSuccessModal && (
          <ListingSuccess img={artworkSummary?.img} my={16} />
        )}
      </ModalTemplate>
    </Layout>
  );
};
