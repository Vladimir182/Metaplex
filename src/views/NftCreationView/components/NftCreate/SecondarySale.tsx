import React from "react";
import { useFormContext } from "react-hook-form";
import { Box, Button, Flex, Heading, Text } from "@chakra-ui/react";
import { AddressRow } from "views/NftCreationView";

import { FormField } from "components/Forms/FormField";
import { PlusIcon } from "components/Icons/PlusIcon";

import { AddressCell } from "./AddressCell";
import { calcProportionsSum } from "./helper";
import { FormData } from "./NftCreationForm";

interface FormFieldProps {
  onAddField: (state: AddressRow) => void;
  onRemove: (id: number) => void;
  onUpdate?: (id: number, state: AddressRow) => void;
}

export const SecondarySale: React.FC<FormFieldProps> = ({
  onAddField,
  onRemove,
  onUpdate,
}) => {
  const { getValues } = useFormContext<FormData>();
  const secondaryRoyalties = getValues("secondaryRoyalties");
  const shouldShowDelete = secondaryRoyalties.length > 1;

  const proportionSum = calcProportionsSum(secondaryRoyalties);
  const undistributed = proportionSum > 100 ? 0 : 100 - proportionSum;

  return (
    <Flex direction="column" mt={6}>
      <Box mb={6}>
        <Heading variant="h4">Secondary Sale</Heading>
        <Text mt={4} color="whiteAlpha.500" fontSize={14}>
          Define % of Royalty on secondary sale
        </Text>
      </Box>
      <FormField
        showRequiredIndicator={false}
        options={{ required: true }}
        max={100}
        min={0}
        type="number"
        id="royalty"
        title="% of Royalty of the total volume"
        placeholder="0%"
      />
      <Flex justifyContent="space-between" alignItems="flex-end">
        <Text mt={4} color="whiteAlpha.500" fontSize={14}>
          Define who will get % of the secondary sale of tokens
        </Text>
        <Text display="flex" color="whiteAlpha.500" fontSize={14}>
          Undistributed part of royalties
          <Text ml={1} fontWeight={600} color="whiteAlpha.900">
            {undistributed}%
          </Text>
        </Text>
      </Flex>
      {secondaryRoyalties?.map((item, idx) => (
        <AddressCell
          isSecondary
          key={idx}
          id={idx}
          onUpdate={onUpdate}
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
