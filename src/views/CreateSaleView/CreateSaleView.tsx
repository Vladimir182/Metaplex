import { FC, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { Layout } from "components/Layout";

import { useLocalState } from "./CreateSaleView.state";
import { toNumber } from "utils/base";

import {
  CreateSaleSidebarContent,
  CreateSaleSidebarEnum,
} from "components/CreateSaleSidebar";
import { SaleCreationForm } from "components/forms/SaleCreate";

import { PreviewStep } from "./PreviewStep";

export const CreateSaleView: FC = () => {
  const refForm = useRef<HTMLFormElement | null>(null);
  const { itemId } = useParams();
  const { step, setStep, artworkSummary, preview, onSubmitForm, onSubmit } =
    useLocalState(refForm, itemId);
  const refTriggerValidationFn = useRef<null | (() => void)>(null);
  const [isFormValid, setIsFormValid] = useState(false);

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
        endDate={preview?.endDate}
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
          state={step}
          setState={setStep}
          isFormReady={isFormValid}
        />
      }
    >
      {content}
    </Layout>
  );
};
