import React, { useCallback } from "react";
import { FiCopy } from "react-icons/fi";
import { MdDone } from "react-icons/md";
import { IconButton, IconButtonProps, useClipboard } from "@chakra-ui/react";

interface Props {
  text: string;
  ["aria-label"]?: string;
}

export const CopyButton: React.FC<
  Props & Omit<IconButtonProps, "aria-label">
> = ({
  onClick,
  text,
  variant = "tertiary",
  fontSize = "xl",
  "aria-label": ariaLabel = "Copy",
  ...props
}) => {
  const { onCopy, hasCopied } = useClipboard(text);

  const handleCopyClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      event.stopPropagation();
      onCopy();
      onClick && onClick(event);
    },
    [onCopy, onClick]
  );

  return (
    <IconButton
      onClick={handleCopyClick}
      icon={hasCopied ? <MdDone /> : <FiCopy />}
      aria-label={ariaLabel}
      variant={variant}
      fontSize={fontSize}
      {...props}
    />
  );
};
