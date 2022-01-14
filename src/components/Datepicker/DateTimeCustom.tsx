import React, { useMemo } from "react";
import { Button, Text } from "@chakra-ui/react";
import DatePicker from "react-datepicker";
import { DatePickerProps } from "./DatePickerProps";
import dayjs from "dayjs";

export const DateTimeCustom: React.FC<DatePickerProps> = ({
  date,
  dateChange,
}) => {
  const [displayTime, period] = useMemo(
    () => [dayjs(date).format("hh[:]mm"), date.getHours() > 12 ? "PM" : "AM"],
    [date]
  );

  return (
    <DatePicker
      selected={date}
      onChange={dateChange}
      showTimeSelect
      showTimeSelectOnly
      customInput={
        <Button
          w="full"
          fontSize="md"
          h="56px"
          size="lg"
          minW="142px"
          bg="whiteAlpha.50"
          variant="tertiary"
          justifyContent="flex-start"
        >
          {displayTime}
          <Text
            ml="35px"
            variant="body"
            color="whiteAlpha.700"
            fontWeight="normal"
          >
            {period}
          </Text>
        </Button>
      }
    />
  );
};
