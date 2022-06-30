import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  Controller,
  ControllerProps,
  FieldValues,
  useFormContext,
  UseFormRegister,
} from "react-hook-form";
import { RegisterOptions } from "react-hook-form/dist/types/validator";
import {
  Box,
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  HStack,
  Input,
  NumberInput,
  NumberInputField,
  RequiredIndicator,
  Text,
  Textarea,
} from "@chakra-ui/react";

interface FormFieldProps {
  id: string;
  title: string;
  placeholder?: string;
  description?: string | string[];
  options?: RegisterOptions;
  type?: string;
  defaultValue?: string;
  max?: number;
  min?: number;
  isError?: boolean;
  maxLength?: number;
  showRequiredIndicator?: boolean;
  customInputFactory?: (
    register: ReturnType<UseFormRegister<FieldValues>> & { placeholder: string }
  ) => React.ReactChild;
  controlledInputFactory?: ControllerProps["render"];
}

export const FormField: React.FC<FormFieldProps> = ({
  id,
  type = "text",
  defaultValue = "",
  title,
  placeholder = title,
  description,
  options,
  customInputFactory,
  controlledInputFactory,
  isError,
  maxLength,
  showRequiredIndicator = true,
  ...props
}) => {
  const [currentLength, setCurrentLength] = useState(0);

  const {
    register,
    control,
    formState: { errors },
    getValues,
  } = useFormContext();

  const isInvalid = errors[id] != null || isError;

  const inputRegister = {
    ...register(id, options),
    placeholder,
    type,
    defaultValue,
    isInvalid,
  };

  const descriptionString = Array.isArray(description)
    ? description.join("\n")
    : description;

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
      const input = e.target.value;

      setCurrentLength(input.length);

      inputRegister.onChange(e);
    },
    [inputRegister]
  );

  useEffect(() => {
    const currentValue = (getValues(id) as string) ?? "";
    setCurrentLength(currentValue.length);
  }, [getValues, id]);

  const input = useMemo(() => {
    switch (type) {
      case "number":
        return (
          <Controller
            control={control}
            name={id}
            defaultValue={defaultValue}
            rules={options}
            render={({ field: { ref, ...restField } }) => (
              <NumberInput {...restField} {...props} isInvalid={isInvalid}>
                <NumberInputField
                  ref={ref}
                  name={restField.name}
                  placeholder={placeholder}
                  border={isInvalid ? "2px solid" : "none"}
                />
              </NumberInput>
            )}
          />
        );
      case "textarea":
        return (
          <Textarea
            {...inputRegister}
            {...props}
            maxLength={maxLength}
            onChange={handleChange}
          />
        );
      default:
        return (
          <Input
            {...inputRegister}
            maxLength={maxLength}
            onChange={handleChange}
          />
        );
    }
  }, [type]);

  return (
    <FormControl
      id={id}
      isRequired={options?.required != null}
      isInvalid={isInvalid}
    >
      <Flex flexDir="column">
        <HStack alignItems="flex-start">
          <Box flexGrow={1}>
            <FormLabel
              requiredIndicator={
                <RequiredIndicator>
                  {showRequiredIndicator ? "(required)" : " "}
                </RequiredIndicator>
              }
              color="white"
            >
              {title}
            </FormLabel>

            {descriptionString && (
              <FormHelperText>{descriptionString}</FormHelperText>
            )}
          </Box>
          {maxLength && (
            <Text
              variant="subtitle"
              color={currentLength <= maxLength ? "whiteAlpha.500" : "#d83aeb"}
            >
              {currentLength} / {maxLength}
            </Text>
          )}
        </HStack>
        {customInputFactory ? (
          customInputFactory(inputRegister)
        ) : controlledInputFactory ? (
          <Controller
            control={control}
            name={id}
            defaultValue={defaultValue}
            rules={options}
            render={controlledInputFactory}
          />
        ) : (
          input
        )}
        {/* eslint-disable @typescript-eslint/no-unsafe-member-access */}
        {!!errors[id]?.message && (
          <FormErrorMessage color="pink.600">
            {errors[id]?.message}
          </FormErrorMessage>
        )}
      </Flex>
    </FormControl>
  );
};
