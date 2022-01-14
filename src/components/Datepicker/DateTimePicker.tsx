import "./DateTimePicker.css";

import { Box, Stack, StyleProps } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

import { DatePickerCustom } from "./DatePickerCustom";
import { DateTimeCustom } from "./DateTimeCustom";
import { useCustomBreakpoints } from "hooks/useCustomBreakpoints";

interface Props extends StyleProps {
  minDate: Date;
  onChange: (date: Date) => void;
}

export const DateTimePicker: React.FC<Props> = ({
  minDate,
  onChange,
  ...props
}) => {
  const { mdUp } = useCustomBreakpoints();
  const [date, setDate] = useState(new Date());

  const dateChangeHandler = (
    date: Date | [Date | null, Date | null] | null
  ) => {
    onChange(date as Date);
    setDate(date as Date);
  };

  useEffect(() => dateChangeHandler(date), []);

  return (
    <Stack
      direction={mdUp ? "row" : "column"}
      spacing={4}
      align="stretch"
      {...props}
    >
      <DatePickerCustom
        minDate={minDate}
        date={date}
        dateChange={dateChangeHandler}
      />
      <Box>
        <DateTimeCustom
          minDate={minDate}
          date={date}
          dateChange={dateChangeHandler}
        />
      </Box>
    </Stack>
  );
};
