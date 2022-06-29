import React, { useCallback, useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { Box, Button, Flex, FormControl, Text } from "@chakra-ui/react";
import { AddressRow } from "views/NftCreationView";
import { FormData } from "views/NftCreationView/components/NftCreate/NftCreationForm";

import { FormField } from "components/Forms/FormField";
import { PinkTrashIcon } from "components/Icons/PinkTrashIcon";

import {
  calcAllErrors,
  calcProportionsSum,
  useUpdateCalculationsOnSecondary,
} from "./helper";

interface FormFieldProps {
  id: number;
  shouldShowDelete: boolean;
  onDelete?: (id: number) => void;
  isSecondary?: boolean;
  onUpdate?: (id: number, state: AddressRow) => void;
}

export const AddressCell: React.FC<FormFieldProps> = ({
  id,
  onDelete,
  isSecondary = false,
  onUpdate,
  shouldShowDelete,
}) => {
  const { getValues, setError, clearErrors } = useFormContext<FormData>();
  const { secondaryRoyalties, primaryRoyalties, royalty }: FormData =
    getValues();
  const baseId = `${
    isSecondary ? "secondaryRoyalties" : "primaryRoyalties"
  }.${id}`;
  const addressWidth = isSecondary
    ? "calc(45% - 56px)"
    : shouldShowDelete
    ? "calc(67% - 56px)"
    : "70%";

  const control = isSecondary ? secondaryRoyalties : primaryRoyalties;

  const proportionSum = calcProportionsSum(control, id);
  const maxValueForTotal = (100 - proportionSum) * Number(royalty) * 0.01;

  useUpdateCalculationsOnSecondary(onUpdate, secondaryRoyalties, royalty, id);

  const handleIconClick = useCallback(
    () => onDelete && onDelete(id),
    [onDelete, id]
  );

  const { errorMessage, isEmptyAddress } = calcAllErrors(control, id) || {};

  useEffect(() => {
    if (!!errorMessage) {
      setError(
        isSecondary ? "secondaryRoyalties" : "primaryRoyalties",
        {
          type: "custom",
          message: errorMessage,
        },
        {
          shouldFocus: true,
        }
      );
    } else {
      clearErrors(isSecondary ? "secondaryRoyalties" : "primaryRoyalties");
    }
  }, [errorMessage, control]);

  return (
    <FormControl marginTop={6}>
      <Flex justifyContent="space-between" alignItems="flex-end">
        <Box mr={2} minW={addressWidth}>
          <FormField
            showRequiredIndicator={false}
            options={{ required: true }}
            isError={!!errorMessage}
            id={`${baseId}.address`}
            title={`address ${id + 1}`}
            placeholder="Enter address"
          />
        </Box>
        <Box mr={2}>
          <FormField
            showRequiredIndicator={false}
            options={{ required: true }}
            isError={!!errorMessage && !isEmptyAddress}
            min={0}
            max={100 - proportionSum}
            type="number"
            id={`${baseId}.share`}
            title="proportion"
            placeholder="0%"
          />
        </Box>
        {isSecondary && (
          <Box mr={2}>
            <FormField
              isError={!!errorMessage && !isEmptyAddress}
              min={0}
              max={maxValueForTotal}
              type="number"
              id={`secondaryRoyalties.${id}.total`}
              title="% of total"
              placeholder="0%"
            />
          </Box>
        )}
        {shouldShowDelete && (
          <Button
            h={14}
            w={14}
            backgroundColor="gray.700"
            color="white"
            onClick={handleIconClick}
          >
            <PinkTrashIcon />
          </Button>
        )}
      </Flex>
      <Text color="pink.600" mt={2} fontSize={14}>
        {errorMessage}
      </Text>
    </FormControl>
  );
};
