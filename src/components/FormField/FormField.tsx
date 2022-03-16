import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  NumberInput,
  NumberInputField,
  RequiredIndicator,
} from "@chakra-ui/react";
import {
  FieldValues,
  useFormContext,
  UseFormRegister,
  Controller,
  ControllerProps,
} from "react-hook-form";
import { RegisterOptions } from "react-hook-form/dist/types/validator";

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
  showRequiredIndicator = true,
  ...props
}) => {
  const {
    register,
    control,
    formState: { errors },
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

  return (
    <FormControl
      id={id}
      isRequired={options?.required != null}
      isInvalid={isInvalid}
    >
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
      ) : type === "number" ? (
        //https://codesandbox.io/s/chakra-ui-react-hook-form-hmgl1?file=/src/App.tsx:929-930
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
      ) : (
        <Input {...inputRegister} />
      )}
      {/* eslint-disable @typescript-eslint/no-unsafe-member-access */}
      {!!errors[id]?.message && (
        <FormErrorMessage color="pink.600">
          {errors[id]?.message}
        </FormErrorMessage>
      )}
    </FormControl>
  );
};
