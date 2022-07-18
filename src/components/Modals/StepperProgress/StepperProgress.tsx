import { FC, ReactNode } from "react";
import {
  Divider,
  Flex,
  FlexProps,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  VStack,
} from "@chakra-ui/react";
import { useCustomBreakpoints } from "hooks/useCustomBreakpoints";
import { IArt } from "state/artworks";

import { ModalFootnote } from "components/Modals/ModalFootnote";
import { ProgressSteps } from "components/ProgressSteps";

import { useProgressSteps } from "../../../hooks/useProgressSteps";

import { ArtworkListItemHeader } from "./ArtworkListItemHeader";
import { StartingPrice } from "./StartingPrice";

interface Props extends FlexProps {
  artwork: IArt | null;
  isOpen: boolean;
  getStepTitle: (step: number | null) => string;
  onClose?: () => void;
  stepsEnum: Record<number | string, number | string>;
  step: number | null;
  noteIcon?: ReactNode;
  noteText?: ReactNode;
  showPrice?: boolean;
}

export const StepperProgress: FC<Props> = ({
  isOpen,
  onClose = () => {},
  artwork,
  noteIcon,
  noteText,
  stepsEnum,
  step,
  getStepTitle,
  showPrice = false,
  ...props
}) => {
  const { mdUp } = useCustomBreakpoints();
  const steps = useProgressSteps({
    stepsEnum,
    currentStep: step,
    getStepTitle,
  });

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size={mdUp ? "lg" : "full"}
      isCentered
      closeOnEsc={false}
      closeOnOverlayClick={false}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalBody py={6} display="flex" flexDirection="column">
          <Flex
            direction="column"
            flexGrow={1}
            bgColor="gray.700"
            borderRadius="xl"
            p={6}
            pt={4}
            {...props}
          >
            <VStack spacing={4} mb={6} align="stretch">
              <Flex justify="space-between" align="center">
                <ArtworkListItemHeader artwork={artwork} />
                {showPrice && <StartingPrice />}
              </Flex>

              <Divider />

              <ProgressSteps steps={steps} />
            </VStack>
            <ModalFootnote icon={noteIcon} text={noteText} />
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
