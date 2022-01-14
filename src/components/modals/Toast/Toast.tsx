import { FC } from "react";
import { ToastBody } from "./ToastBody";
import { ToastHeader } from "./ToastHeader";
import { VStack } from "@chakra-ui/react";

export interface ToastProps {
  title?: string;
  text?: string;
  onClose?: () => void;
}

export const Toast: FC<ToastProps> = ({
  title,
  text,
  onClose = () => {},
  children,
}) => (
  <VStack
    borderRadius="12px"
    p={4}
    m={4}
    spacing={3}
    align="stretch"
    bgColor="gray.700"
  >
    <ToastHeader title={title} onClose={onClose} />
    <ToastBody text={text}>{children}</ToastBody>
  </VStack>
);
