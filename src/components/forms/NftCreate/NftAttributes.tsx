import React from "react";
import {
  Button,
  CloseButton,
  FormControl,
  FormLabel,
  HStack,
  Input,
  ListItem,
  UnorderedList,
} from "@chakra-ui/react";
import { MdAdd } from "react-icons/md";
import { useFieldArray, useFormContext } from "react-hook-form";

export const NftAttributes: React.FC = () => {
  const { register } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    name: "attributes", // unique name for your Field Array
  });

  return (
    <FormControl id="supply">
      <FormLabel>attributes</FormLabel>
      <UnorderedList
        my={fields.length === 0 ? 0 : 4}
        ml={0}
        listStyleType={"none"}
        spacing={4}
      >
        {fields.map((field, index) => (
          <ListItem key={field.id}>
            <HStack>
              <Input
                {...register(`attributes.${index}.key`)}
                placeholder="Key"
              />
              <Input
                {...register(`attributes.${index}.value`)}
                placeholder="Value"
              />
              <CloseButton onClick={() => remove(index)} />
            </HStack>
          </ListItem>
        ))}
      </UnorderedList>
      <Button
        onClick={() => append({ key: "", value: "" })}
        fontSize="md"
        lineHeight="base"
        aria-label="plus"
        variant="tertiary"
        leftIcon={<MdAdd />}
      >
        Add attribute
      </Button>
    </FormControl>
  );
};
