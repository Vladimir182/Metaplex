import React from "react";
import DatePicker from "react-datepicker";
import { Input } from "@chakra-ui/react";

import { DatePickerProps } from "./DatePickerProps";

export const DateTimeCustom: React.FC<DatePickerProps> = ({
  date,
  dateChange,
}) => (
  <DatePicker
    selected={date}
    onChange={dateChange}
    showTimeSelect
    showTimeSelectOnly
    dateFormat="h:mm aa"
    customInput={
      <Input
        w="full"
        fontSize="md"
        h="56px"
        size="lg"
        minW="142px"
        bg="whiteAlpha.50"
        justifyContent="flex-start"
      />
    }
  />
);
