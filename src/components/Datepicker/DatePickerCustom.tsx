import React, { useMemo } from "react";
import DatePicker from "react-datepicker";
import { Button, Flex, HStack, Text } from "@chakra-ui/react";
import { MdChevronLeft, MdChevronRight, MdExpandMore } from "react-icons/md";
import dayjs from "dayjs";
import { DatePickerProps } from "./DatePickerProps";

export const DatePickerCustom: React.FC<DatePickerProps> = ({
  dateChange,
  date,
  minDate,
}) => {
  const displayDate = useMemo(
    () => dayjs(date).format("MMMM DD[,] YYYY"),
    [date]
  );

  return (
    <DatePicker
      minDate={minDate}
      selected={date}
      onChange={dateChange}
      customInput={
        <Button
          w="full"
          fontSize="md"
          h="56px"
          size="lg"
          justifyContent="space-between"
          bg="whiteAlpha.50"
          variant="tertiary"
          rightIcon={<MdExpandMore />}
        >
          {displayDate}
        </Button>
      }
      renderCustomHeader={({
        date,
        increaseMonth,
        decreaseMonth,
        nextMonthButtonDisabled,
        prevMonthButtonDisabled,
      }) => (
        <Flex p={2} alignItems="center">
          <Text textAlign="left" variant="small-bold" color="whiteAlpha.500">
            {dayjs(date).format("MMMM YYYY")}
          </Text>

          <HStack ml="auto" spacing={0}>
            <Button
              variant="none"
              p={0}
              size="xs"
              isDisabled={prevMonthButtonDisabled}
              onClick={decreaseMonth}
            >
              <MdChevronLeft
                color={prevMonthButtonDisabled ? "gray" : "white"}
                size={20}
              />
            </Button>
            <Button
              variant="none"
              p={0}
              size="xs"
              isDisabled={nextMonthButtonDisabled}
              onClick={increaseMonth}
            >
              <MdChevronRight
                color={nextMonthButtonDisabled ? "gray" : "white"}
                size={20}
              />
            </Button>
          </HStack>
        </Flex>
      )}
    />
  );
};
