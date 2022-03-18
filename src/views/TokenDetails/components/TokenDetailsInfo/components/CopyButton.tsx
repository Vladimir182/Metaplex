import React from "react";
import { Button } from "@chakra-ui/react";
import { MdContentCopy, MdDone } from "react-icons/md";
import { fontSizes } from "../../../../../theme/typography";

interface CopyButtonProps {
  clipboard: {
    onCopy?: () => void;
    hasCopied?: boolean;
    value?: string;
  };
}

export const CopyButton: React.FC<CopyButtonProps> = ({ clipboard }) => {
  const { value, onCopy, hasCopied } = clipboard;

  return (
    <Button
      ml={2}
      onClick={value ? onCopy : undefined}
      variant="ghost"
      p={1}
      color="whiteAlpha.700"
    >
      {hasCopied ? (
        <MdDone size={fontSizes["2xl"]} />
      ) : (
        <MdContentCopy size={fontSizes["2xl"]} />
      )}
    </Button>
  );
};
