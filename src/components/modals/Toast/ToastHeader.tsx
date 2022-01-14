import { Flex, Heading, IconButton } from "@chakra-ui/react";

import { FC } from "react";
import { MdOutlineClose } from "react-icons/md";
import { fontSizes } from "theme/typography";

interface Props {
  title?: string;
  onClose: () => void;
}

export const ToastHeader: FC<Props> = ({ title = "", onClose }) => (
  <Flex w="full" align="center" justify="space-between">
    <Heading variant="h5">{title}</Heading>
    <IconButton aria-label="Close" size="sm" variant="ghost" onClick={onClose}>
      <MdOutlineClose size={fontSizes["2xl"]} />
    </IconButton>
  </Flex>
);
