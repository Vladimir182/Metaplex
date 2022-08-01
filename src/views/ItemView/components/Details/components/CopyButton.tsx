import React from "react";
import { MdContentCopy, MdDone } from "react-icons/md";
import { Button } from "@chakra-ui/react";

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
      size="sm"
      ml={2}
      onClick={value ? onCopy : undefined}
      variant="ghost"
      p={0}
      color="whiteAlpha.700"
    >
      {hasCopied ? (
        <MdDone size={fontSizes["lg"]} />
      ) : (
        <MdContentCopy size={fontSizes["lg"]} />
      )}
    </Button>
  );
};
