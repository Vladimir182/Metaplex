import { ModalCloseButton, ModalHeader } from "@chakra-ui/react";

import { HowToBuy } from "components/modals/HowToBuy";
import { ModalTemplate } from "components/modals/template";
import React from "react";
import { useCustomBreakpoints } from "hooks/useCustomBreakpoints";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  storeName: string;
}

export const HowToBuyModal: React.FC<Props> = ({
  isOpen,
  storeName,
  onClose,
}) => {
  const { lgUp } = useCustomBreakpoints();

  const header = (
    <ModalHeader pos="relative">
      Buying NFTs on {storeName}
      <ModalCloseButton top="50%" transform="translateY(-50%)" />
    </ModalHeader>
  );

  return (
    <ModalTemplate
      isOpen={isOpen}
      onClose={onClose}
      header={header}
      isCentered={lgUp ? true : false}
      bodyProps={{ p: 0 }}
      contentProps={{ maxW: "1248px" }}
    >
      <HowToBuy storeName={storeName} />
    </ModalTemplate>
  );
};
