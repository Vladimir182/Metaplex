import React, { useEffect, useState } from "react";
import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  NumberInput,
  NumberInputField,
  RequiredIndicator,
  Flex,
  Box,
  Button,
} from "@chakra-ui/react";
import {
  FieldValues,
  useFormContext,
  UseFormRegister,
  Controller,
  ControllerProps,
} from "react-hook-form";
import { RegisterOptions } from "react-hook-form/dist/types/validator";

import {
  SupplyType,
  SupplyTypesMap,
  MAXIMUM_SUPPLY_DEFAULT,
} from "./SupplyType";

interface FormFieldProps {
  id: string;
  title: string;
  placeholder?: string;
  description?: string | string[];
  options?: RegisterOptions;
  defaultValue?: string;
  min?: number;
  max?: number;
  customInputFactory?: (
    register: ReturnType<UseFormRegister<FieldValues>> & { placeholder: string }
  ) => React.ReactChild;
  controlledInputFactory?: ControllerProps["render"];
}

export const MaximumSupply: React.FC<FormFieldProps> = ({
  id,
  defaultValue = MAXIMUM_SUPPLY_DEFAULT,
  min = 1,
  max,
  title,
  placeholder = MAXIMUM_SUPPLY_DEFAULT,
  description,
  options,
}) => {
  const {
    control,
    formState: { errors },
    setValue,
  } = useFormContext();
  const [activeSupplyType, setActiveSupplyOption] = useState(
    SupplyType.LIMITED
  );

  const isInvalid = errors[id] != null;

  const descriptionString = Array.isArray(description)
    ? description.join("\n")
    : description;

  useEffect(() => {
    if (activeSupplyType === SupplyType.UNLIMITED) {
      setValue(id, "");
    }
    if (activeSupplyType === SupplyType.LIMITED) {
      setValue(id, defaultValue);
    }
  }, [activeSupplyType]);

  return (
    <FormControl
      id={id}
      isRequired={options?.required != null}
      isInvalid={isInvalid}
    >
      <Flex justifyContent="space-between">
        <Box>
          <FormLabel
            requiredIndicator={
              <RequiredIndicator>(required)</RequiredIndicator>
            }
            color="white"
          >
            {title}
          </FormLabel>

          {descriptionString && (
            <FormHelperText>{descriptionString}</FormHelperText>
          )}
        </Box>
        <Box p="1" marginBottom="4" borderRadius="xl" bg="gray.800">
          {SupplyTypesMap.map(({ value, label }) => (
            <Button
              size="sm"
              borderRadius="xl"
              key={value}
              onClick={() => setActiveSupplyOption(value)}
              variant={value === activeSupplyType ? "solid" : "ghost"}
              marginRight="5px"
              _last={{ marginRight: 0 }}
            >
              {label}
            </Button>
          ))}
        </Box>
      </Flex>
      <Controller
        control={control}
        name={id}
        defaultValue={defaultValue}
        rules={options}
        render={({ field: { ref, onChange, ...restField } }) => (
          <NumberInput
            {...restField}
            min={min}
            max={max}
            onChange={(value) => onChange(value || `${min}`)}
            isInvalid={isInvalid}
          >
            <NumberInputField
              disabled={activeSupplyType === 1}
              ref={ref}
              name={restField.name}
              placeholder={
                activeSupplyType === SupplyType.UNLIMITED
                  ? "Unlimited"
                  : placeholder
              }
            />
          </NumberInput>
        )}
      />
      {/* eslint-disable @typescript-eslint/no-unsafe-member-access */}
      <FormErrorMessage>{errors[id]?.message}</FormErrorMessage>
    </FormControl>
  );
};
