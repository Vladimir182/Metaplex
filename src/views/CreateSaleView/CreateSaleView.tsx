import { FC } from "react";
import { useParams } from "react-router-dom";
import { useStore } from "effector-react";
import { ETransactionProgress } from "enums/transactionProgress";
import { IArt } from "state/artworks";

import { Layout } from "components/Layout";
import { ListingSuccess } from "components/Modals/ListingSuccess";
import { StepperProgress } from "components/Modals/StepperProgress";
import { ModalTemplate } from "components/Modals/template";
import { TransactionFailure } from "components/Modals/TransactionFailure";

import {
  CreateSaleSidebarContent,
  CreateSaleSidebarEnum,
} from "./components/CreateSaleSidebar";
import { Form } from "./components/Form";
import { PreviewStep } from "./components/PreviewStep";
import { getContent } from "./utils/getContent";
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
    $progress,
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
  const progressStep = useStore($progress.$node);

  const shouldShowModal = Boolean(shouldShowSuccessModal || transactionError);

  return (
    <Layout narrow focused sidebarContent={<CreateSaleSidebarContent />}>
      {step === CreateSaleSidebarEnum.CONFIGURE && <Form />}
      {step === CreateSaleSidebarEnum.PREVIEW && <PreviewStep />}

      <StepperProgress
        isOpen={progressMeta.isOpen}
        artwork={
          {
            image: artworkSummary?.img,
            type: "Master",
            title: artworkSummary?.title,
          } as IArt
        }
        getStepTitle={(key) => getContent(key).title}
        stepsEnum={ETransactionProgress}
        step={progressStep}
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
