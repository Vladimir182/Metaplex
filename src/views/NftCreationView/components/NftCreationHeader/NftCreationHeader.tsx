import React, { FC } from "react";
import { Box, Heading, VStack } from "@chakra-ui/react";
import { NftCreationSteps } from "views/NftCreationView/types";

import { NewItemStepper } from "../NewItemStepper";

import { getTextSelector } from "./utils";

interface INftCreationHeaderProps {
  step: NftCreationSteps;
}

export const NftCreationHeader: FC<INftCreationHeaderProps> = ({ step }) => {
  const PAGE_TEXT = getTextSelector(step);

  return (
    <VStack mb={12} spacing={12} alignItems="flex-start">
      <NewItemStepper activeStep={step} />
      {PAGE_TEXT.title && (
        <Box mb={10}>
          <Heading variant="label-bold">{PAGE_TEXT.title}</Heading>
        </Box>
      )}
    </VStack>
  );
};
