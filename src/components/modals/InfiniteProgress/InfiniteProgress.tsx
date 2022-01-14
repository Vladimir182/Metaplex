import { Modal, ModalBody, ModalContent, ModalOverlay } from "@chakra-ui/react";
import { FC } from "react";

import { useCustomBreakpoints } from "hooks/useCustomBreakpoints";
import { LoaderComponent, LoaderProps } from "./LoaderComponent";

export interface Props extends LoaderProps {
  isOpen: boolean;
  onClose?: () => void;
}

export const InfiniteProgress: FC<Props> = ({
  isOpen,
  onClose = () => {},
  title,
  noteIcon,
  noteText,
  subtitle,
}) => {
  const { mdUp } = useCustomBreakpoints();

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
          <LoaderComponent {...{ title, noteIcon, noteText, subtitle }} />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
