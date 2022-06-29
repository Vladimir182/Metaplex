import { FC, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { VStack } from "@chakra-ui/layout";
import { BoxProps, Heading, Spacer } from "@chakra-ui/react";
import { useStore } from "effector-react";
import { createSaleFactory } from "views/CreateSaleView/state";

import { Commission } from "components/DataDisplay/Commission";
import { SidebarMenuItemWrapper } from "components/Navigation/Sidebar/SidebarMenuItemWrapper";

import { CreateSaleSidebarEnum } from "./types";

export const CreateSaleSidebarContent: FC<BoxProps> = ({
  children,
  ...boxProps
}) => {
  const { $isFormValid, $step, setStep, triggerValidation, reviewSubmit } =
    createSaleFactory.useModel();

  const step = useStore($step);
  const isFormValid = useStore($isFormValid);
  const navigate = useNavigate();

  const handleSubmit = useCallback(() => {
    if (!isFormValid) {
      return triggerValidation();
    }
    setStep(CreateSaleSidebarEnum.PREVIEW);
  }, [isFormValid]);

  return (
    <VStack
      pb={8}
      spacing={2}
      h="full"
      w="full"
      {...boxProps}
      alignItems="stretch"
    >
      <Heading w="full" variant="h5" px={5} p={4}>
        List for Sale
      </Heading>

      <SidebarMenuItemWrapper
        step={CreateSaleSidebarEnum.CONFIGURE + 1}
        isActive={step === CreateSaleSidebarEnum.CONFIGURE}
      >
        Configure Sale
      </SidebarMenuItemWrapper>

      <SidebarMenuItemWrapper
        step={CreateSaleSidebarEnum.PREVIEW + 1}
        isActive={step === CreateSaleSidebarEnum.PREVIEW}
      >
        Preview
      </SidebarMenuItemWrapper>

      <Spacer />

      {step === CreateSaleSidebarEnum.CONFIGURE && (
        <Commission
          isActive={isFormValid}
          onClick={handleSubmit}
          onCancel={() => navigate(-1)}
          submitText="Next"
        />
      )}

      {step === CreateSaleSidebarEnum.PREVIEW && (
        <Commission
          isActive={isFormValid}
          onClick={() => reviewSubmit()}
          onCancel={() => setStep(CreateSaleSidebarEnum.CONFIGURE)}
          submitText="List for sale"
        />
      )}

      {children}
    </VStack>
  );
};
