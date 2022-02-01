import { useNavigate } from "react-router-dom";
import { NftCreationForm } from "components/forms/NftCreate";
import { Layout } from "components/Layout";
import { MediaTypeSelector } from "components/MediaTypeSelector";
import { InfiniteProgress } from "components/modals/InfiniteProgress";
import { useToast } from "components/modals/Toast";
import {
  NewItemSidebarContent,
  NewItemSidebarEnum,
} from "views/NftCreationView/components/NewItemSidebar";
import { useStore } from "effector-react";
import { FC, useEffect, useRef, useState } from "react";
import { ROUTES } from "routes";
import { MintedStep } from "./components/MintedStep";
import { useLocalState } from "./NftCreationView.state";

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
    onSubmitForm,
    onUpdateForm,
    continueToMint,
    error,
  } = useLocalState(refForm);
  const refTriggerValidationFn = useRef<null | (() => void)>(null);
  const [isFormValid, setIsFormValid] = useState(false);
  const navigate = useNavigate();

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
        onSubmit={onSubmitForm}
        onUpdate={(form, isValid) => {
          onUpdateForm(form);
          setIsFormValid(isValid);
        }}
        refForm={refForm}
        refTriggerValidationFn={refTriggerValidationFn}
        metadataCategory={category}
      />
    ) : step === NewItemSidebarEnum.PREVIEW ? (
      <MintedStep file={file} type={category} />
    ) : null;

  return (
    <Layout
      narrow
      focused
      sidebarContent={
        <NewItemSidebarContent
          price={price}
          dollarPrice={dollarPrice}
          state={step}
          setState={setStep}
          continueToMint={(isActive) => {
            isActive && refTriggerValidationFn.current?.();
            return continueToMint();
          }}
          viewList={() => navigate(ROUTES.home())}
          listForSale={() => {}}
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
    </Layout>
  );
};
