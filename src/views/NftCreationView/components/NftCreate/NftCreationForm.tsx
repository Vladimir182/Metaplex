import React, { FC, useMemo } from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { Flex } from "@chakra-ui/layout";
import { Box, Button, Divider, Heading, VStack } from "@chakra-ui/react";
import { useStore } from "effector-react";
import { $user } from "state/wallet";
import { FormData } from "views/NftCreationView";

import { TitledBlock } from "components/DataDisplay/TitledBlock";
import { FileUpload } from "components/Forms/FileUpload";
import { FormField } from "components/Forms/FormField";

import { CreatorsSplits } from "./components/CreatorsSplits";
import { MaximumSupply } from "./components/MaximumSupply";
import { useIsValid } from "./hooks/useIsValid";
import { MAXIMUM_SUPPLY_DEFAULT } from "./SupplyType";

export interface NftCreationFormProps {
  cancel: () => void;
  onSubmit?: (form: FormData) => void;
}

export const NftCreationForm: FC<NftCreationFormProps> = ({
  onSubmit,
  cancel,
}) => {
  const user = useStore($user);

  const methods = useForm<FormData>({
    mode: "onChange",
    defaultValues: {
      primaryRoyalties: [{ address: user?.address, share: 100, isOwner: true }],
      secondaryRoyalties: [
        { address: user?.address, share: 100, isOwner: true },
      ],
      supply: MAXIMUM_SUPPLY_DEFAULT,
    },
  });

  const { handleSubmit } = methods;

  const isValid = useIsValid({ methods });

  const onSubmitHandle = useMemo(() => {
    if (!onSubmit) {
      return;
    }
    /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
    return handleSubmit((data) => onSubmit(data));
  }, [handleSubmit, onSubmit]);

  return (
    <Box>
      <FormProvider {...methods}>
        <VStack
          as="form"
          spacing={12}
          align="stretch"
          onSubmit={onSubmitHandle}
          noValidate
        >
          <TitledBlock
            title="IMAGE"
            variant="lg"
            fontWeight={600}
            subtitle={[
              "We recommend an image of at least 800x800.",
              "You can upload a PNG, JPG, SVG, or an animated GIF under 10 MB.",
            ]}
          >
            <Controller
              name="file"
              rules={{ required: true }}
              render={({ field, fieldState }) => (
                <FileUpload
                  value={field.value as File | string}
                  isInvalid={fieldState.invalid}
                  onFileChange={field.onChange}
                />
              )}
            />
          </TitledBlock>

          <FormField
            id="title"
            title="title"
            placeholder="Title"
            options={{ required: "Title field is required", minLength: 1 }}
            maxLength={32}
          />

          <FormField
            id="desc"
            title="description"
            placeholder="e. g. “Share a little bit about your collectible."
            maxLength={240}
            type="textarea"
          />

          <MaximumSupply
            id="supply"
            title="maximum supply"
            description="Maximum amount of tokens could be distributed"
          />

          <Divider />
          <Heading>Primary sale profit distribution</Heading>

          <CreatorsSplits
            type="primaryRoyalties"
            text="Enter wallet addresses and percentages that primary sales will be distributed to"
          />

          <Divider />
          <Heading>Secondary sales royalties distribution</Heading>

          <FormField
            type="number"
            id="royalty"
            title="% of resale royalty"
            description="The percentage of all future sales creators will receive from secondary sales."
            options={{ required: true }}
          />

          <CreatorsSplits
            type="secondaryRoyalties"
            text="The percentage of profits automatically deposited into each recipient’s wallet."
          />

          <Divider mt={10} mb={8} />
          <Flex>
            <Button variant="tertiary" px={12} onClick={cancel}>
              Back
            </Button>
            <Button
              px={7}
              type="submit"
              variant="primary"
              ml="auto"
              disabled={!isValid}
            >
              Continue
            </Button>
          </Flex>
        </VStack>
      </FormProvider>
    </Box>
  );
};
