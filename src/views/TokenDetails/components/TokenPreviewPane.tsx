import { FC, useState } from "react";
import {
  Box,
  Image,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  VStack,
} from "@chakra-ui/react";
import { Fab } from "components/buttons/Fab";
import { ExpandIcon } from "components/Icons";

interface IPreviewPaneProps {
  sourceUrl?: string;
}

export const PreviePane: FC<IPreviewPaneProps> = ({ sourceUrl }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);

  return (
    <VStack
      flex="1 0 50%"
      borderRight="1px solid"
      borderColor="whiteAlpha.100"
      position="relative"
    >
      <Box maxW="500px" pt="116px">
        <Image maxW="md" maxH="md" src={sourceUrl} onClick={handleOpen} />
      </Box>
      <Fab onClick={handleOpen} position="absolute" left={6} bottom="50%">
        <ExpandIcon w="20px" h="20px" />
      </Fab>
      <Modal isOpen={open} onClose={handleClose} isCentered size="6xl">
        <ModalOverlay />
        <ModalContent onClick={handleClose} backgroundColor="unset">
          <Image
            maxW="100vw"
            maxH="100vh"
            objectFit="contain"
            src={sourceUrl}
          />
          <ModalCloseButton />
        </ModalContent>
      </Modal>
    </VStack>
  );
};
