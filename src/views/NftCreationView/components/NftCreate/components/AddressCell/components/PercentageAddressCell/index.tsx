import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { VStack } from "@chakra-ui/layout";
import { FormControl, Text } from "@chakra-ui/react";

import { PercentageInput } from "components/Forms/PercentageInput";

interface PercentageAddressCellProps {
  id: string;
  title?: string;
  max?: number;
  min?: number;
  isInvalid?: boolean;
}

export const PercentageAddressCell: React.FC<PercentageAddressCellProps> = ({
  id,
  title = "",
  max = 100,
  min = 0,
  isInvalid,
}) => {
  const { control } = useFormContext();

  return (
    <FormControl id={id} pos="relative">
      <VStack alignItems="flex-start">
        {title && (
          <Text fontSize={14} fontWeight={600} color="whiteAlpha.500">
            {title.toUpperCase()}
          </Text>
        )}

        <Controller
          control={control}
          defaultValue={10}
          name={id}
          render={({ field: { ref, ...restField } }) => (
            <PercentageInput
              isInvalid={isInvalid}
              {...restField}
              max={max}
              min={min}
              onBlur={() => {
                restField.onBlur();
              }}
              ref={ref}
              w="full"
            />
          )}
        />
      </VStack>
    </FormControl>
  );
};
