import React from "react";
import { Box, Flex, Heading, Text, Button } from "@chakra-ui/react";

import { AddressCell } from "./AddressCell";
import { PlusIcon } from "components/Icons/PlusIcon";
import { AddressRow, calcProportionsSum } from "./helper";
import { useFormContext } from "react-hook-form";
import { FormData } from "./NftCreationForm";

interface FormFieldProps {
  onRemove: (id: number) => void;
  onAddField: (state: AddressRow) => void;
  onUpdate?: (id: number, state: AddressRow) => void;
}

export const PrimarySale: React.FC<FormFieldProps> = ({
  onRemove,
  onAddField,
}) => {
  const { getValues } = useFormContext<FormData>();
  const primaryRoyalties = getValues("primaryRoyalties");
  const shouldShowDelete = primaryRoyalties.length > 1;

  const proportionSum = calcProportionsSum(primaryRoyalties);
  const undistributed = proportionSum > 100 ? 0 : 100 - proportionSum;

  return (
    <Flex direction="column">
      <Box>
        <Heading variant="h4">Primary Sale</Heading>
        <Flex justifyContent="space-between" alignItems="flex-end">
          <Text mt={4} color="whiteAlpha.500" fontSize={14}>
            Define who will get % of the initial sale of tokens
          </Text>
          <Text display="flex" color="whiteAlpha.500" fontSize={14}>
            Undistributed part of royalties
            <Text ml={1} fontWeight={600} color="whiteAlpha.900">
              {undistributed}%
            </Text>
          </Text>
        </Flex>
      </Box>
      {primaryRoyalties?.map((item, idx) => (
        <AddressCell
          key={idx}
          id={idx}
          onDelete={onRemove}
          shouldShowDelete={shouldShowDelete}
        />
      ))}
      <Button
        mt={4}
        w={156}
        onClick={() => onAddField({ address: "", verified: false, share: "0" })}
      >
        Add Address <PlusIcon ml={2} />
      </Button>
    </Flex>
  );
};
