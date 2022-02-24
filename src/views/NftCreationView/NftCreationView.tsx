import { NftCreationForm } from "components/forms/NftCreate";
import { Layout } from "components/Layout";
import { MediaTypeSelector } from "components/MediaTypeSelector";
import { InfiniteProgress } from "components/modals/InfiniteProgress";
import { useToast } from "components/modals/Toast";
import { NewItemSidebarEnum } from "views/NftCreationView/components/NewItemSidebar";
import { useStore } from "effector-react";
import { FC, useEffect, useRef, useState } from "react";
import { useLocalState } from "./NftCreationView.state";
import { PreviewStep } from "./components/PreviewStep";
import { NftCreationHeader } from "./components/NftCreationHeader";
import { NftCreationFooter } from "./components/NftCreationFooter";
import { MintedStep } from "./components/MintedStep";

export const NftCreationView: FC = () => {
  const refForm = useRef<HTMLFormElement | null>(null);
  const {
    price: { price, dollarPrice },
    step,
    file,
    category,
    setStep,
    progressMeta,
    onCategorySelect,
    onUpdateForm,
    continueToMint,
    formData,
    error,
  } = useLocalState(refForm);
  const refTriggerValidationFn = useRef<null | (() => void)>(null);
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
    step === NewItemSidebarEnum.MEDIA_TYPE ? (
      <MediaTypeSelector
        onCategorySelect={onCategorySelect}
        category={category}
      />
    ) : step === NewItemSidebarEnum.CREATE ? (
      <NftCreationForm
        onUpdate={(form, isValid) => {
          onUpdateForm(form);
          setIsFormValid(isValid);
        }}
        refForm={refForm}
        refTriggerValidationFn={refTriggerValidationFn}
        metadataCategory={category}
        formData={formData}
      />
    ) : step === NewItemSidebarEnum.PREVIEW ? (
      <PreviewStep formData={formData} file={file} type={category} />
    ) : step === NewItemSidebarEnum.CONGRATULATION ? (
      <MintedStep file={file} type={category} />
    ) : null;

  return (
    <>
      <Layout narrow focused>
        <NftCreationHeader metadataCategory={category} step={step} />
        {content}
        <InfiniteProgress
          isOpen={progressMeta.isOpen}
          title={progressMeta.title}
          subtitle={progressMeta.subtitle}
        />
      </Layout>
      <NftCreationFooter
        price={price}
        dollarPrice={dollarPrice}
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
