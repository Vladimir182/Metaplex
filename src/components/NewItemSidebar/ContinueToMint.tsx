import React from "react";
import { Button } from "@chakra-ui/react";

interface Props {
  continueMint?: () => void;
  cancel?: () => void;
}

export const ContinueToMint: React.FC<Props> = ({ continueMint, cancel }) => {
  return (
    <>
      <Button variant="primary" size="lg" w="full" onClick={continueMint}>
        Continue to Minting
      </Button>
      <Button variant="ghost" size="lg" w="full" onClick={cancel}>
        Cancel
      </Button>
    </>
  );
};
