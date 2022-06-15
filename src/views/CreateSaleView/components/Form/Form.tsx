import { useEffect, useRef, useCallback, FC } from "react";
import {
  Flex,
  Box,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Text,
} from "@chakra-ui/react";
import { Controller, useForm, FormProvider } from "react-hook-form";

import { ArtworkSummary } from "components/Artwork/ArtworkSummary";
import { SolanaIcon } from "components/Icons";
import { DateTimePicker } from "components/Datepicker/DateTimePicker";
import { MaximumSupply } from "components/forms/NftCreate/MaximumSupply";

import { createSaleFactory } from "views/CreateSaleView/state";

import { FormState } from "./interface";

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
            <Input
              id="price"
              type="number"
              color="whiteAlpha.700"
              bg="whiteAlpha.50"
              pl={12}
              placeholder="Price"
              {...register("price", { required: true })}
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