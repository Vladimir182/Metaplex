import { forwardRef } from "react";
import { MdErrorOutline } from "react-icons/md";
import {
  Box,
  NumberInput,
  NumberInputField,
  StyleProps,
} from "@chakra-ui/react";
import { colors } from "theme/colors";
import { fontSizes } from "theme/typography";

interface Props extends StyleProps {
  value: number;
  onChange: (value: number) => void;
  onBlur: () => void;
  name: string;
  isInvalid?: boolean;
  showIcon?: boolean;
  max?: number;
  min?: number;
}

export const PercentageInput = forwardRef<HTMLInputElement, Props>(
  (
    {
      value,
      onChange,
      name,
      onBlur,
      isInvalid,
      showIcon,
      max = 100,
      min = 0,
      ...props
    },
    ref
  ) => {
    return (
      <NumberInput
        {...props}
        pos="relative"
        isInvalid={isInvalid}
        value={value}
        onChange={(value) => {
          onChange(value !== "" ? Number.parseFloat(value) : 0);
        }}
        onBlur={onBlur}
        max={max}
        min={min}
        keepWithinRange
        format={(value) => (value !== "" ? value.toString() + "%" : "")}
      >
        <NumberInputField ref={ref} name={name} placeholder="proportion" />
        {showIcon && isInvalid && (
          <Box pos="absolute" right={4} top="50%" transform="translateY(-50%)">
            <MdErrorOutline
              size={fontSizes["2xl"]}
              fill={colors.pink[500]}
              cursor="pointer"
            />
          </Box>
        )}
      </NumberInput>
    );
  }
);
