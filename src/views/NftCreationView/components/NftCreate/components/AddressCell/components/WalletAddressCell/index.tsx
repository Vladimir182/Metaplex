import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { VStack } from "@chakra-ui/layout";
import { FormControl, Text } from "@chakra-ui/react";

import { WalletInput } from "components/Forms/WalletInput";

interface WalletAddressCellProps {
  id: string;
  cropSize?: number;
  title?: string;
  isOwner?: boolean;
  placeholder?: string;
  isDisabled?: boolean;
}

export const WalletAddressCell: React.FC<WalletAddressCellProps> = ({
  id,
  cropSize,
  title = "",
  isOwner,
  placeholder = "",
  isDisabled,
  ...props
}) => {
  const { control } = useFormContext();

  return (
    <FormControl id={id} {...props}>
      <VStack alignItems="flex-start">
        <Text fontSize={14} fontWeight={600} color="whiteAlpha.500">
          {title.toUpperCase()}
        </Text>
        <Controller
          name={id}
          rules={{
            required: true,
            minLength: 1,
          }}
          control={control}
          render={({ field: { ref, ...restField }, fieldState }) => (
            <WalletInput
              cropSize={cropSize}
              p={3}
              w="100%"
              isInvalid={fieldState.invalid}
              ref={ref}
              flexGrow={1}
              placeholder={placeholder}
              isOwner={isOwner}
              isDisabled={isDisabled}
              {...restField}
            />
          )}
        />
      </VStack>
    </FormControl>
  );
};
