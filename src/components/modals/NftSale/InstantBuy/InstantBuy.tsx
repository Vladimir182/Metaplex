import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Text,
} from "@chakra-ui/react";
import { Controller, useForm } from "react-hook-form";
import React, { useRef } from "react";

import { DateTimePicker } from "components/Datepicker/DateTimePicker";
import { SolanaIcon } from "components/Icons";
import { toNumber } from "utils/base";

interface IForm {
  price: string;
  date: Date;
}

interface InstantBuyProps {
  onSubmit: (price: number, endDate: Date) => void;
  minDate?: Date;
}

export const InstantBuy: React.FC<InstantBuyProps> = ({
  onSubmit,
  minDate: date,
}) => {
  const { register, handleSubmit, formState, control } = useForm<IForm>({
    mode: "onChange",
  });
  const minDate = useRef(date ?? new Date()).current;

  return (
    <Flex
      as="form"
      flexDir="column"
      borderRadius="xl"
      bg="whiteAlpha.50"
      p={6}
      onSubmit={handleSubmit((data) =>
        onSubmit(toNumber(data.price), data.date)
      )}
    >
      <Heading variant="h5">Instant Buy Price</Heading>
      <Text color="whiteAlpha.700" mb={4}>
        What price would you sell this for?
      </Text>
      <InputGroup mb={8}>
        <InputLeftElement
          pointerEvents="none"
          children={<SolanaIcon h="24px" w="24px" boxSize={9} p={1} />}
        />
        <InputRightElement pointerEvents="none" children={<Text>SOL</Text>} />
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

      <Heading variant="h5">End Date</Heading>
      <Text color="whiteAlpha.700" mb={4}>
        When would you like your sale to end?
      </Text>
      <InputGroup>
        <Controller
          control={control}
          render={({ field }) => (
            <DateTimePicker
              minDate={minDate}
              onChange={field.onChange}
              flexGrow={1}
            />
          )}
          name="date"
        />
      </InputGroup>

      <Box height="44px" />

      <Button
        type="submit"
        alignSelf="end"
        mt="auto"
        w="134px"
        size="lg"
        variant="primary"
        isDisabled={!formState.isValid}
      >
        Next
      </Button>
    </Flex>
  );
};
