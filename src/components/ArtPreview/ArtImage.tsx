import { useState } from "react";
import { Image } from "@chakra-ui/image";
import { Flex, FlexProps } from "@chakra-ui/layout";
import {
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
} from "@chakra-ui/modal";

import { Fab } from "components/buttons/Fab";
import { ExpandIcon } from "components/Icons";

interface Props extends FlexProps {
  uri: string;
}

export const ArtImage: React.FC<Props> = ({ uri, ...props }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);

  return (
    <Flex
      align="center"
      justify="center"
      flexGrow={1}
      position="relative"
      {...props}
    >
      <Image maxW="md" maxH="md" src={uri} onClick={handleOpen} />
      <Fab onClick={handleOpen} position="absolute" left={6} bottom={6}>
        <ExpandIcon w="20px" h="20px" />
      </Fab>
      <Modal isOpen={open} onClose={handleClose} isCentered size="6xl">
        <ModalOverlay />
        <ModalContent onClick={handleClose} backgroundColor="unset">
          <Image maxW="100vw" maxH="100vh" objectFit="contain" src={uri} />
          <ModalCloseButton />
        </ModalContent>
      </Modal>
    </Flex>
  );
};
