import React, { useCallback, useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { MdHelpOutline } from "react-icons/md";
import {
  Box,
  CloseButton,
  FormControl,
  HStack,
  IconButton,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useCustomBreakpoints } from "hooks/useCustomBreakpoints";
import { FormData } from "views/NftCreationView";
import {
  calcAllErrors,
  setErrors,
} from "views/NftCreationView/components/NftCreate/utils";

import { PercentageAddressCell } from "./components/PercentageAddressCell";
import { WalletAddressCell } from "./components/WalletAddressCell";
import { useUpdateTotal } from "./hooks/useUpdateTotal";
import { calcProportionsSum } from "./utils";

interface AddressCellProps {
  id: number;
  shouldShowButton?: boolean;
  onDelete?: (id: number) => void;
  isSecondary?: boolean;
}

export const AddressCell: React.FC<AddressCellProps> = ({
  id,
  onDelete,
  isSecondary = false,
  shouldShowButton,
}) => {
  const { watch, setError, clearErrors, setValue } = useFormContext<FormData>();
  const [primaryRoyalties, secondaryRoyalties, royalty] = watch([
    "primaryRoyalties",
    "secondaryRoyalties",
    "royalty",
  ]);

  const baseId = `${
    isSecondary ? "secondaryRoyalties" : "primaryRoyalties"
  }.${id}`;
  const addressWidth = isSecondary
    ? "calc(50% - 56px)"
    : shouldShowButton
    ? "calc(70% - 56px)"
    : "70%";

  const control = isSecondary ? secondaryRoyalties : primaryRoyalties;
  const proportionSum = calcProportionsSum(control, id);

  const walletTitle = !id ? "wallet address" : `address ${id + 1}`;
  const maxValueForTotal = (100 - proportionSum) * Number(royalty) * 0.01;

  const { mdUp } = useCustomBreakpoints();

  useUpdateTotal({
    onUpdate: setValue,
    secondaryRoyalties,
    royalty,
    id,
  });

  const handleIconClick = useCallback(
    () => onDelete && onDelete(id),
    [onDelete, id]
  );

  const errors = calcAllErrors(control, id) || {};

  useEffect(() => {
    setErrors(errors);
    if (errors.errorMessage) {
      setError(
        isSecondary ? "secondaryRoyalties" : "primaryRoyalties",
        {
          type: "custom",
          message: errors.errorMessage,
        },
        {
          shouldFocus: true,
        }
      );
    } else {
      clearErrors(isSecondary ? "secondaryRoyalties" : "primaryRoyalties");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errors.errorMessage, control]);

  const isOwner = control[id]?.isOwner;

  return (
    <FormControl marginTop={6}>
      <Stack direction={mdUp ? "row" : "column"}>
        <Box minW={addressWidth}>
          <WalletAddressCell
            id={`${baseId}.address`}
            title={walletTitle}
            placeholder="Enter wallet address"
          />
        </Box>

        <HStack alignItems="flex-end">
          <PercentageAddressCell
            id={`${baseId}.share`}
            title={mdUp || isSecondary ? "percentage" : undefined}
            max={100 - proportionSum}
            min={0}
            isInvalid={errors.isSumError}
          />

          {isSecondary && (
            <PercentageAddressCell
              id={`${baseId}.total`}
              title="% of total"
              max={maxValueForTotal}
              min={0}
            />
          )}

          {shouldShowButton &&
            (!isOwner ? (
              <CloseButton
                size="lg"
                variant="forms"
                onClick={handleIconClick}
              />
            ) : (
              <IconButton
                flex="0 0 56px"
                fontSize="xl"
                size="lg"
                variant="ghost"
                aria-label="help"
                icon={<MdHelpOutline />}
              />
            ))}
        </HStack>
      </Stack>

      <Text color="pink.600" mt={2} fontSize={14}>
        {errors.errorMessage}
      </Text>
    </FormControl>
  );
};
