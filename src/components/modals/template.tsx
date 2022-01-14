import { FC, ReactNode } from "react";
import {
  Modal,
  ModalBody,
  ModalBodyProps,
  ModalContent,
  ModalContentProps,
  ModalOverlay,
  ModalProps,
  useBreakpointValue,
} from "@chakra-ui/react";

interface Props extends ModalProps {
  header?: ReactNode;
  bodyProps?: ModalBodyProps;
  contentProps?: ModalContentProps;
}

export const ModalTemplate: FC<Props> = ({
  size,
  isCentered,
  header,
  bodyProps,
  contentProps,
  children,
  ...props
}) => {
  const mdUp = useBreakpointValue({ base: false, md: true });
  return (
    <Modal
      size={size ?? (mdUp ? "lg" : "full")}
      isCentered={isCentered ?? true}
      {...props}
    >
      <ModalOverlay />
      <ModalContent {...contentProps}>
        {header}
        <ModalBody display="flex" flexDirection="column" {...bodyProps}>
          {children}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
