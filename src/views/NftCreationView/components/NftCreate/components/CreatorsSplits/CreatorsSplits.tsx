import { FC } from "react";
import { useFieldArray } from "react-hook-form";
import { FormControl, FormHelperText, FormLabel } from "@chakra-ui/react";

import { CreateButton } from "components/Buttons/CreateButton";

import { AddressCell } from "../AddressCell";

interface CreatorsSplitsProps {
  type: "secondaryRoyalties" | "primaryRoyalties";
  title?: string;
  text?: string;
}

const MAX_CREATORS = 5;

export const CreatorsSplits: FC<CreatorsSplitsProps> = ({
  type,
  title = "CREATOR SPLITS",
  text,
}) => {
  const { fields, append, remove } = useFieldArray({
    name: type,
  });
  const totalLength = fields?.length;
  const isSecondary = type === "secondaryRoyalties";

  return (
    <FormControl id={type}>
      <FormLabel>{title?.toUpperCase()}</FormLabel>
      <FormHelperText>{text}</FormHelperText>

      {fields.map((field, index) => (
        <AddressCell
          key={field.id}
          id={index}
          shouldShowButton={totalLength > 1}
          onDelete={remove}
          isSecondary={isSecondary}
        />
      ))}

      <CreateButton
        w={156}
        title={
          totalLength >= MAX_CREATORS
            ? `Max ${MAX_CREATORS} creators are allowed`
            : "create"
        }
        mt={fields.length === 0 ? 0 : 4}
        isDisabled={totalLength >= MAX_CREATORS}
        onClick={() =>
          append({ address: "", share: 0, total: 0, isOwner: false })
        }
        variant="tertiary"
        fontSize="md"
      >
        Add Creator
      </CreateButton>
    </FormControl>
  );
};
