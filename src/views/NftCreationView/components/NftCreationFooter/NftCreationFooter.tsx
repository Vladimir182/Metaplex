import { FC, MutableRefObject, useCallback } from "react";
import { Button, HStack, VStack } from "@chakra-ui/react";
import { SolUsdDisplay } from "components/SolUsdDisplay";
import { TitledBlock } from "components/TitledBlock";
import { NewItemSidebarEnum } from "../NewItemSidebar";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "routes";
import { useToast } from "../../../../components/modals/Toast";
import { useStore } from "effector-react";
import { $errorsStore } from "../../../../components/forms/NftCreate/helper";
import { useCustomBreakpoints } from "../../../../hooks/useCustomBreakpoints";

interface INftCreationFooterProps {
  price?: number;
  dollarPrice?: number;
  step?: NewItemSidebarEnum;
  isFormValid: boolean;
  setStep(state: NewItemSidebarEnum): void;
  continueToMint?: (isActive: boolean) => Promise<void>;
  refTriggerValidationFn?: MutableRefObject<null | (() => void)>;
}

export const NftCreationFooter: FC<INftCreationFooterProps> = ({
  price,
  dollarPrice,
  step,
  isFormValid,
  setStep,
  continueToMint,
  refTriggerValidationFn,
}) => {
  const navigate = useNavigate();
  const toast = useToast();
  const data = useStore($errorsStore);
  const shouldEnableConfirmAndCreateButton = !!data?.errorMessage;
  const { xxlUp } = useCustomBreakpoints();

  const onContinueMinting = useCallback(
    async (isActive: boolean) => {
      try {
        if (continueToMint) {
          await continueToMint(isActive);
          setStep(NewItemSidebarEnum.CONGRATULATION);
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
      case NewItemSidebarEnum.MEDIA_TYPE:
        return {
          onClick: () => setStep(NewItemSidebarEnum.CREATE),
          children: "Select",
        };
      case NewItemSidebarEnum.CREATE:
        return {
          onClick: () =>
            isFormValid
              ? setStep(NewItemSidebarEnum.PREVIEW)
              : refTriggerValidationFn?.current?.(),
          children: "Preview",
          variant: isFormValid ? "primary" : "tertiary",
        };
      case NewItemSidebarEnum.PREVIEW:
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
      case NewItemSidebarEnum.MEDIA_TYPE:
        return {
          children: "Cancel",
          onClick: () => navigate(-1),
        };
      case NewItemSidebarEnum.CREATE: {
        return {
          children: "Back",
          onClick: () => setStep(NewItemSidebarEnum.MEDIA_TYPE),
        };
      }
      case NewItemSidebarEnum.PREVIEW:
        return {
          children: "Back",
          onClick: () => setStep(NewItemSidebarEnum.CREATE),
        };
      default:
        return {
          children: "Back to list of tokens",
          onClick: () => navigate(ROUTES.home()),
        };
    }
  };

  return (
    <HStack
      m="auto auto 0"
      sx={{
        boxSizing: "border-box",
        maxWidth: xxlUp ? "950px" : "100vw",
        width: "100%",
        justifyContent: "space-between",
        padding: 4,
      }}
      alignItems="flex-end"
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
        {!!(price || dollarPrice) && (
          <TitledBlock
            title="Creation Fee"
            variant="sm"
            bg="whiteAlpha.50"
            p={4}
            minW={200}
            borderRadius={12}
          >
            <SolUsdDisplay sol={price} usd={dollarPrice} />
          </TitledBlock>
        )}
        {step !== NewItemSidebarEnum.CONGRATULATION && (
          <Button
            isDisabled={shouldEnableConfirmAndCreateButton}
            {...getRButtonProps()}
            padding="16px 24px"
            alignSelf="flex-end"
            h="56px"
          />
        )}
      </VStack>
    </HStack>
  );
};
