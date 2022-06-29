import { FC, MutableRefObject, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Flex, VStack } from "@chakra-ui/react";
import { useStore } from "effector-react";
import { useCustomBreakpoints } from "hooks/useCustomBreakpoints";
import { ROUTES } from "routes";
import { NftCreationSteps } from "views/NftCreationView/types";

import { SolUsd } from "components/DataDisplay/SolUsd";
import { TitledBlock } from "components/DataDisplay/TitledBlock";
import { getPadding } from "components/Layout/utils";
import { useToast } from "components/Modals/Toast";

import { $errorsStore } from "../NftCreate/helper";

interface INftCreationFooterProps {
  price?: number;
  step?: NftCreationSteps;
  isFormValid: boolean;
  noPadding?: boolean;
  setStep(state: NftCreationSteps): void;
  continueToMint?: (isActive: boolean) => Promise<void>;
  refTriggerValidationFn?: MutableRefObject<null | (() => void)>;
}

export const NftCreationFooter: FC<INftCreationFooterProps> = ({
  price,
  step,
  isFormValid,
  noPadding = false,
  setStep,
  continueToMint,
  refTriggerValidationFn,
}) => {
  const navigate = useNavigate();
  const toast = useToast();
  const data = useStore($errorsStore);
  const shouldEnableConfirmAndCreateButton = !!data?.errorMessage;
  const { mdUp } = useCustomBreakpoints();
  const paddingValue = getPadding(mdUp, noPadding);

  const onContinueMinting = useCallback(
    async (isActive: boolean) => {
      try {
        if (continueToMint) {
          await continueToMint(isActive);
          setStep(NftCreationSteps.CONGRATULATION);
        }
      } catch {
        toast({
          title: "Transaction Failed",
          text: "Your transaction rejected.",
          duration: 9000,
        });
      }
    },
    [continueToMint]
  );

  const getRButtonProps = () => {
    switch (step) {
      case NftCreationSteps.CREATE:
        return {
          onClick: () =>
            isFormValid
              ? setStep(NftCreationSteps.PREVIEW)
              : refTriggerValidationFn?.current?.(),
          children: "Preview",
          variant: isFormValid ? "primary" : "tertiary",
        };
      case NftCreationSteps.PREVIEW:
        return {
          onClick: () => onContinueMinting(isFormValid),
          children: "Confirm and Publish",
          variant: "primary",
        };
      default:
        return {};
    }
  };

  const getLButtonProps = () => {
    switch (step) {
      case NftCreationSteps.CREATE: {
        return {
          children: "Back",
          onClick: () => navigate(-1),
        };
      }
      case NftCreationSteps.PREVIEW:
        return {
          children: "Back",
          onClick: () => setStep(NftCreationSteps.CREATE),
        };
      default:
        return {
          children: "Back to list of tokens",
          onClick: () => navigate(ROUTES.home()),
        };
    }
  };

  return (
    <Flex
      sx={{
        boxSizing: "border-box",
        maxW: "3xl",
        width: "100%",
        justifyContent: "space-between",
      }}
      p={paddingValue}
      marginX="auto"
    >
      <Button
        {...getLButtonProps()}
        bgColor="gray.700"
        h="56px"
        padding="16px 24px"
        alignSelf="flex-end"
        variant="ghost"
      />
      <VStack alignItems="flex-end" spacing={6}>
        {!!price && (
          <TitledBlock
            title="Creation Fee"
            variant="sm"
            bg="whiteAlpha.50"
            p={4}
            minW={200}
            borderRadius={12}
          >
            <SolUsd sol={price} />
          </TitledBlock>
        )}
        {step !== NftCreationSteps.CONGRATULATION && (
          <Button
            isDisabled={shouldEnableConfirmAndCreateButton}
            {...getRButtonProps()}
            padding="16px 24px"
            alignSelf="flex-end"
            h="56px"
          />
        )}
      </VStack>
    </Flex>
  );
};
