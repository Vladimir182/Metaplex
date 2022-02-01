import { FC, useRef, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Layout } from "components/Layout";
import { InfiniteProgress } from "components/modals/InfiniteProgress";
import { ListingSuccess } from "components/modals/ListingSuccess";
import { TransactionFailure } from "components/modals/TransactionFailure";
import { ModalTemplate } from "components/modals/template";

import { useLocalState } from "./CreateSaleView.state";
import { toNumber } from "utils/base";

import { useStore } from "effector-react";
import {
  CreateSaleSidebarContent,
  CreateSaleSidebarEnum,
} from "views/CreateSaleView/components/CreateSaleSidebar";
import { SaleCreationForm } from "components/forms/SaleCreate";

import { PreviewStep } from "./components/PreviewStep";

export const CreateSaleView: FC = () => {
  const refForm = useRef<HTMLFormElement | null>(null);
  const { itemId } = useParams();
  const {
    step,
    setStep,
    artworkSummary,
    preview,
    onSubmitForm,
    onSubmit,
    onCreateSale,
    progressMeta,
    error,
    resetError: resetFormError,
    shouldSuccess,
  } = useLocalState(refForm, itemId);
  const refTriggerValidationFn = useRef<null | (() => void)>(null);
  const [isFormValid, setIsFormValid] = useState(false);
  const formError = useStore(error);

  const [open, setOpen] = useState(!!formError || shouldSuccess);
  const handleClose = () => {
    setOpen(false);
    resetFormError();
  };

  useEffect(() => {
    setOpen(!!formError || shouldSuccess);
  }, [formError, shouldSuccess]);

  const content =
    step === CreateSaleSidebarEnum.CONFIGURE && artworkSummary ? (
      <SaleCreationForm
        artworkSummary={artworkSummary}
        onSubmit={onSubmitForm}
        onUpdate={(isValid) => {
          setIsFormValid(isValid);
        }}
        refForm={refForm}
        refTriggerValidationFn={refTriggerValidationFn}
      />
    ) : step === CreateSaleSidebarEnum.PREVIEW && artworkSummary ? (
      <PreviewStep
        artworkSummary={artworkSummary}
        price={toNumber(preview?.price ?? "0")}
        startDate={preview?.startDate}
      />
    ) : null;

  return (
    <Layout
      narrow
      focused
      sidebarContent={
        <CreateSaleSidebarContent
          submit={(isActive) => {
            isActive && refTriggerValidationFn.current?.();
            return onSubmit();
          }}
          onCreate={onCreateSale}
          state={step}
          setState={setStep}
          isFormReady={isFormValid}
        />
      }
    >
      {content}

      <InfiniteProgress
        isOpen={progressMeta.isOpen}
        title={progressMeta.title}
        subtitle={progressMeta.subtitle}
      />
      <ModalTemplate isOpen={open} onClose={handleClose} bodyProps={{ p: 0 }}>
        {formError ? (
          <TransactionFailure onDismiss={handleClose} />
        ) : (
          <ListingSuccess img={artworkSummary?.img} my={16} />
        )}
      </ModalTemplate>
    </Layout>
  );
};
