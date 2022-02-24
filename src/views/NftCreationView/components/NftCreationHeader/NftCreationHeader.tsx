import React, { FC } from "react";
import { Box, Heading, Link, Text, VStack } from "@chakra-ui/react";
import { NewItemStepper } from "../NewItemStepper";
import { FileType } from "components/MediaTypeSelector";
import { NewItemSidebarEnum } from "../NewItemSidebar";
import { getTextSelector } from "./utils";

interface INftCreationHeaderProps {
  metadataCategory: FileType;
  step: NewItemSidebarEnum;
}

export const NftCreationHeader: FC<INftCreationHeaderProps> = ({
  metadataCategory,
  step,
}) => {
  const PAGE_TEXT = getTextSelector(step, metadataCategory);

  return (
    <VStack mb={12} spacing={12} alignItems="flex-start">
      <NewItemStepper activeStep={step} />
      {PAGE_TEXT.title && (
        <Box mb={10}>
          <Heading variant="label-bold">{PAGE_TEXT.title}</Heading>
          <Text mt={4} color="whiteAlpha.500" fontSize="sl">
            Need help? <Link href="#">Read our creators guide.</Link>
          </Text>
        </Box>
      )}
    </VStack>
  );
};
