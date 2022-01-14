import { IconButton, ModalCloseButton, ModalHeader } from "@chakra-ui/react";

import { FC } from "react";
import { MdArrowBack } from "react-icons/md";
import { fontSizes } from "theme/typography";

interface Props {
  title?: string;
  onClose?(): void;
  onBack?(): void;
}

export const ListForSaleDialogHeader: FC<Props> = ({
  title,
  onClose,
  onBack,
}) => {
  const isPrimary = !onBack;

  return (
    <ModalHeader
      display="flex"
      justifyContent={isPrimary ? "flex-start" : "center"}
    >
      {title}
      {isPrimary ? (
        <ModalCloseButton top={title ? "unset" : 3} onClick={onClose} />
      ) : (
        <IconButton
          aria-label="Back"
          onClick={onBack}
          variant="ghost"
          position="absolute"
          left={4}
          size="sm"
        >
          <MdArrowBack size={fontSizes["2xl"]} />
        </IconButton>
      )}
    </ModalHeader>
  );
};
