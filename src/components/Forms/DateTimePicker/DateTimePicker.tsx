import React, { useCallback, useEffect, useState } from "react";
import { Box, Stack, StyleProps } from "@chakra-ui/react";
import { useCustomBreakpoints } from "hooks/useCustomBreakpoints";

import { DatePickerCustom } from "./components/DatePickerCustom";
import { DateTimeCustom } from "./components/DateTimeCustom";

import "./DateTimePicker.css";

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
  const [time, setTime] = useState(new Date());

  const dateChangeHandler = (date: Date) => {
    const hour = time.getHours();
    const minute = time.getMinutes();
    const newDate = date.setHours(hour, minute);
    onChange(new Date(newDate));
    setDate(new Date(newDate));
  };

  const timeChangeHandler = useCallback(
    (time: Date) => {
      setTime(!time ? new Date() : time);
    },
    [time]
  );

  useEffect(() => dateChangeHandler(date), [time]);

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
          date={time}
          dateChange={timeChangeHandler}
        />
      </Box>
    </Stack>
  );
};
