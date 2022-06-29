import { FC, useCallback, useEffect, useRef } from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";
import {
  Box,
  Flex,
  Heading,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  NumberInput,
  NumberInputField,
  Text,
} from "@chakra-ui/react";
import { createSaleFactory } from "views/CreateSaleView/state";
import { MaximumSupply } from "views/NftCreationView/components/NftCreate/MaximumSupply";

import { ArtworkSummary } from "components/DataDisplay/ArtworkSummary";
import { DateTimePicker } from "components/Forms/DateTimePicker";
import { SolanaIcon } from "components/Icons";

import { FormState } from "./interface";

const MIN_COST = 0.00001;

export const Form: FC = () => {
  const {
    artworkSummary,
    formSubmit,
    formSubmitFx,
    setIsFormValid,
    triggerValidation,
  } = createSaleFactory.useModel();

  const methods = useForm<FormState>({
    mode: "onChange",
  });
  const { register, control, handleSubmit, formState, trigger } = methods;

  const minDate = useRef(new Date()).current;
  const maxMintsPerWallet =
    Number(artworkSummary?.total) - Number(artworkSummary?.edition);

  const handleValidation = useCallback(() => {
    trigger(["price", "startDate", "piecesInOneWallet"], {
      shouldFocus: true,
    });
  }, [trigger]);

  useEffect(() => {
    const handler = handleSubmit(formSubmit);
    formSubmitFx.use(() => handler());
  }, [formSubmit, formSubmitFx, methods, handleSubmit]);

  useEffect(() => {
    const unwatch = triggerValidation.watch(() => {
      handleValidation();
    });

    return () => {
      unwatch();
    };
  }, [triggerValidation]);

  useEffect(() => {
    setIsFormValid(formState.isValid);
  }, [formState.isValid]);

  return (
    <Box>
      <FormProvider {...methods}>
        <Box mb={10}>
          <Heading variant="h3">Configure sale</Heading>
        </Box>

        <Flex flexDir="column">
          <Heading textTransform="uppercase" fontSize="sm" variant="h5" mb={4}>
            Membership token copies
          </Heading>
          {artworkSummary && (
            <ArtworkSummary {...artworkSummary} w="full" mb={8} />
          )}

          <Heading textTransform="uppercase" fontSize="sm" variant="h5">
            Sell Price
          </Heading>
          <Text color="whiteAlpha.700" mb={4}>
            What price would you sell this for?
          </Text>
          <InputGroup mb={8}>
            <InputLeftElement
              pointerEvents="none"
              children={<SolanaIcon h="24px" w="24px" boxSize={9} p={1} />}
            />
            <InputRightElement
              pointerEvents="none"
              children={<Text>SOL</Text>}
            />
            <Controller
              control={control}
              render={({ field }) => (
                <NumberInput
                  step={MIN_COST}
                  min={MIN_COST}
                  onChange={field.onChange}
                  width="100%"
                >
                  <NumberInputField
                    id="price"
                    color="whiteAlpha.700"
                    bg="whiteAlpha.50"
                    pl={12}
                    placeholder="Price"
                    {...register("price", { required: true })}
                  />
                </NumberInput>
              )}
              name="price"
            />
          </InputGroup>

          <MaximumSupply
            id="piecesInOneWallet"
            title="mints per wallet"
            description="Number of tokens user can mint per 1 wallet"
            defaultValue="1"
            min={1}
            max={maxMintsPerWallet}
          />

          <Heading textTransform="uppercase" fontSize="sm" variant="h5" mt={10}>
            Start Date
          </Heading>
          <Text color="whiteAlpha.700" mb={4}>
            When would you like your sale to start?
          </Text>
          <InputGroup mb={12}>
            <Controller
              control={control}
              render={({ field }) => (
                <DateTimePicker
                  minDate={minDate}
                  onChange={field.onChange}
                  flexGrow={1}
                />
              )}
              name="startDate"
            />
          </InputGroup>
        </Flex>
      </FormProvider>
    </Box>
  );
};
