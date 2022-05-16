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
import { FormData } from "./NftCreationForm";

interface FormFieldProps {
  id: keyof FormData;
  title: string;
  placeholder?: string;
  description?: string | string[];
  options?: RegisterOptions;
  defaultValue?: string;
  min?: number;
  max?: number;
  defaultActiveType?: SupplyType;
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
    getValues,
  } = useFormContext<FormData>();
  const supply: string = getValues("supply") ?? "";
  const defaultVal = !Boolean(defaultValue)
    ? MAXIMUM_SUPPLY_DEFAULT
    : defaultValue;

  const [activeSupplyType, setActiveSupplyOption] = useState(
    supply === "" ? SupplyType.UNLIMITED : SupplyType.LIMITED
  );

  const isInvalid = errors[id as "supply"] != null;

  const descriptionString = Array.isArray(description)
    ? description.join("\n")
    : description;

  useEffect(() => {
    if (activeSupplyType === SupplyType.UNLIMITED) {
      setValue(id, "");
    }
    if (activeSupplyType === SupplyType.LIMITED) {
      setValue(id, defaultVal);
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
        defaultValue={defaultVal}
        rules={options}
        render={({ field: { ref, onChange, ...restField } }) => (
          <NumberInput
            {...restField}
            value={
              activeSupplyType === SupplyType.UNLIMITED
                ? ""
                : restField.value !== ""
                ? parseInt(restField.value as string)
                : defaultVal
            }
            min={min}
            max={max}
            onChange={(value: string) => onChange(value || `${defaultVal}`)}
            isInvalid={isInvalid}
          >
            <NumberInputField
              disabled={activeSupplyType === SupplyType.UNLIMITED}
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
      <FormErrorMessage>{errors[id as "supply"]?.message}</FormErrorMessage>
    </FormControl>
  );
};
