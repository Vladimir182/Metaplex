import { FC, useRef } from "react";
import { useNavigate } from "react-router";
import { useStore } from "effector-react";
import { ROUTES } from "routes";
import { ENftProgress } from "sdk/createNft";
import { IArt } from "state/artworks";
import { NftCreationForm } from "views/NftCreationView/components/NftCreate";

import { Layout } from "components/Layout";
import { StepperProgress } from "components/Modals/StepperProgress";
import { ModalTemplate } from "components/Modals/template";
import { TransactionFailure } from "components/Modals/TransactionFailure";

import { MintedStep } from "./components/MintedStep";
import { NftCreationHeader } from "./components/NftCreationHeader";
import { PreviewStep } from "./components/PreviewStep";
import { getContent, useLocalState } from "./NftCreationView.state";
import { NftCreationSteps } from "./types";

export const NftCreationView: FC = () => {
  const navigate = useNavigate();
  const refForm = useRef<HTMLFormElement | null>(null);
  const {
    step,
    progressStep,
    file,
    contentUrl,
    setStep,
    progressMeta,
    onCloseModal,
    onFormSubmit,
    onMint,
    previewForm,
    error,
  } = useLocalState(refForm);

  const transactionError = useStore(error);
  const shouldShowModal = !!transactionError;
  const content =
    step === NftCreationSteps.CREATE ? (
      <NftCreationForm onSubmit={onFormSubmit} cancel={() => navigate(-1)} />
    ) : step === NftCreationSteps.PREVIEW ? (
      <PreviewStep
        previewForm={previewForm}
        onBack={() => setStep(NftCreationSteps.CREATE)}
        onMint={onMint}
      />
    ) : step === NftCreationSteps.CONGRATULATION ? (
      <MintedStep file={file} cancel={() => navigate(ROUTES.home())} />
    ) : null;

  return (
    <>
      <Layout narrow focused>
        <NftCreationHeader step={step} />
        {content}
        <StepperProgress
          isOpen={progressMeta.isOpen}
          artwork={
            {
              image: contentUrl,
              type: "Master",
              title: previewForm?.title,
              description: previewForm?.desc,
            } as IArt
          }
          getStepTitle={(key) => getContent(key).title}
          stepsEnum={ENftProgress}
          step={progressStep}
        />
        <ModalTemplate
          isOpen={shouldShowModal}
          onClose={onCloseModal}
          bodyProps={{ p: 0 }}
        >
          <TransactionFailure
            bodyText={transactionError?.error.message}
            onDismiss={onCloseModal}
          />
        </ModalTemplate>
      </Layout>
    </>
  );
};
