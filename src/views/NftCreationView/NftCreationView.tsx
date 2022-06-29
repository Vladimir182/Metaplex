import { FC, useEffect, useRef, useState } from "react";
import { useStore } from "effector-react";
import { NftCreationForm } from "views/NftCreationView/components/NftCreate";

import { Layout } from "components/Layout";
import { InfiniteProgress } from "components/Modals/InfiniteProgress";
import { useToast } from "components/Modals/Toast";

import { MintedStep } from "./components/MintedStep";
import { NftCreationFooter } from "./components/NftCreationFooter";
import { NftCreationHeader } from "./components/NftCreationHeader";
import { PreviewStep } from "./components/PreviewStep";
import { useLocalState } from "./NftCreationView.state";
import { NftCreationSteps } from "./types";

export const NftCreationView: FC = () => {
  const refForm = useRef<HTMLFormElement | null>(null);
  const {
    price,
    step,
    file,
    setStep,
    progressMeta,
    onUpdateForm,
    continueToMint,
    formData,
    error,
  } = useLocalState(refForm);
  const refTriggerValidationFn = useRef<null | (() => Promise<boolean>)>(null);
  const [isFormValid, setIsFormValid] = useState(false);

  const formError = useStore(error);
  const toast = useToast();

  useEffect(() => {
    if (formError?.error) {
      toast({
        title: formError.error.name,
        text: formError.error.message,
      });
    }
  }, [formError]);

  const content =
    step === NftCreationSteps.CREATE ? (
      <NftCreationForm
        onUpdate={(form, isValid) => {
          onUpdateForm(form);
          setIsFormValid(isValid);
        }}
        refForm={refForm}
        refTriggerValidationFn={refTriggerValidationFn}
        formData={formData}
      />
    ) : step === NftCreationSteps.PREVIEW ? (
      <PreviewStep formData={formData} file={file} />
    ) : step === NftCreationSteps.CONGRATULATION ? (
      <MintedStep file={file} />
    ) : null;

  return (
    <>
      <Layout narrow focused>
        <NftCreationHeader step={step} />
        {content}
        <InfiniteProgress
          isOpen={progressMeta.isOpen}
          title={progressMeta.title}
          subtitle={progressMeta.subtitle}
        />
      </Layout>
      <NftCreationFooter
        price={price}
        step={step}
        setStep={setStep}
        refTriggerValidationFn={refTriggerValidationFn}
        continueToMint={(isActive) => {
          isActive && refTriggerValidationFn.current?.();
          return continueToMint();
        }}
        isFormValid={isFormValid}
      />
    </>
  );
};
