import React, { useState, useCallback, useEffect } from "react";

import { Flex, Heading, VStack } from "@chakra-ui/layout";
import { Image } from "@chakra-ui/image";
import { Button } from "@chakra-ui/button";

import { ModalTemplate } from "components/modals/template";

import { useLocalState } from "../../state";

export const ClaimSuccess: React.FC = () => {
  const {
    progress: { claimedImg },
  } = useLocalState();

  const [open, setOpen] = useState(!!claimedImg);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  useEffect(() => {
    setOpen(!!claimedImg);
  }, [claimedImg]);

  return (
    <ModalTemplate isOpen={open} onClose={handleClose} bodyProps={{ p: 0 }}>
      <VStack spacing={6} p="104px 48px 104px">
        <Image w="120px" h="120px" src={claimedImg} my={2} />
        <Heading variant="h4">Your item is Claimed!</Heading>
        <Flex direction="column">
          <Button onClick={handleClose} variant="primary" size="lg">
            Close
          </Button>
        </Flex>
      </VStack>
    </ModalTemplate>
  );
};
