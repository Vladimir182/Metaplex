import { useMemo, FC, RefObject, useEffect, MutableRefObject } from "react";
import { Box, Heading, Link, Text, Textarea, VStack } from "@chakra-ui/react";
import { Controller, FormProvider, useForm } from "react-hook-form";

import { FileUpload } from "components/FileUpload";
import { FormField } from "components/FormField";
import { FileType } from "components/MediaTypeSelector";
import { TitledBlock } from "components/TitledBlock";

import { NftAttributes } from "./NftAttributes";

export interface IFormData {
  preview: File | Record<string, never>;
  file: File | Record<string, never>;
  title: string;
  desc: string;
  supply: string;
  royalty: string;
  attributes: Array<{ key: string; value: string }>;
}

export interface NftCreationFormProps {
  metadataCategory: FileType;
  onSubmit?(form: IFormData): void;
  onUpdate?(form: Partial<IFormData>, isValid: boolean): void;
  refForm?: RefObject<HTMLFormElement>;
  refTriggerValidationFn: MutableRefObject<(() => void) | null>;
}

export const NftCreationForm: FC<NftCreationFormProps> = ({
  onSubmit,
  onUpdate,
  metadataCategory,
  refForm,
  refTriggerValidationFn,
}) => {
  const methods = useForm<IFormData>({ mode: "onChange" });
  refTriggerValidationFn.current = () =>
    methods.trigger(["title", "file"], {
      shouldFocus: true,
    });

  useEffect(() => {
    const cancel = onUpdate
      ? methods.watch((data) => {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-explicit-any
          onUpdate(data as any, methods.formState.isValid);
        })
      : undefined;
    return () => cancel?.unsubscribe();
  }, [methods.formState.isValid]);

  const { handleSubmit } = methods;
  const onSubmitHandle = useMemo(() => {
    if (!onSubmit) {
      return;
    }
    /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
    return handleSubmit((data) => onSubmit(data));
  }, [handleSubmit, onSubmit]);
  return (
    <Box>
      <Box mb={10}>
        <Heading variant="h2">Create single collectible</Heading>
        <Text mt={4} color="whiteAlpha.500" fontSize="lg" lineHeight="base">
          Need help? <Link href="#">Read our creators guide.</Link>
        </Text>
      </Box>

      <FormProvider {...methods}>
        <VStack
          as="form"
          spacing={12}
          align="stretch"
          onSubmit={onSubmitHandle}
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-explicit-any
          ref={refForm as any}
        >
          <TitledBlock
            title="NFT Image (REQUIRED)"
            variant="lg"
            fontWeight={600}
            subtitle={[
              "We recommend an image of at least 600x600.",
              "You can upload a PNG, JPG, or an animated GIF under 10 MB.",
            ]}
          >
            <Controller
              name="file"
              rules={{ required: true }}
              render={({ field, fieldState }) => (
                <FileUpload
                  isInvalid={fieldState.invalid}
                  onFileChange={field.onChange}
                  type={metadataCategory}
                  variant="preview"
                />
              )}
            />
          </TitledBlock>

          <FormField
            id="title"
            title="title"
            placeholder="Title"
            options={{ required: "Title field is required", minLength: 1 }}
          />

          <FormField
            id="desc"
            title="description"
            placeholder="Share a little bit about your collectible."
            customInputFactory={(register) => <Textarea h={32} {...register} />}
          />

          <FormField
            id="supply"
            title="maximum supply"
            placeholder="0"
            type="number"
          />

          <NftAttributes />

          <FormField
            id="royalty"
            type="number"
            title="Royalty percentage"
            placeholder="0%"
            description="Suggested: 0%, 5%, 10%, 20%. Maximum is 50%."
          />
        </VStack>
      </FormProvider>
    </Box>
  );
};
