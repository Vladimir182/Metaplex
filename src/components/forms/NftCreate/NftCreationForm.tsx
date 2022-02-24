import { useMemo, FC, RefObject, useEffect, MutableRefObject } from "react";
import { Box, Textarea, VStack } from "@chakra-ui/react";
import { Controller, FormProvider, useForm } from "react-hook-form";

import { FileUpload } from "components/FileUpload";
import { FormField } from "components/FormField";
import { FileType } from "components/MediaTypeSelector";
import { TitledBlock } from "components/TitledBlock";

import { MaximumSupply } from "./MaximumSupply";

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
  formData?: Partial<IFormData> | null;
}

export const NftCreationForm: FC<NftCreationFormProps> = ({
  onSubmit,
  onUpdate,
  metadataCategory,
  refForm,
  refTriggerValidationFn,
  formData = null,
}) => {
  const PAGE_TEXT = {
    [FileType.IMAGE]: {
      label: "IMAGE",
      title: "Create new image Membership token",
      subtitle: [
        "We recommend an image of at least 800x800.",
        "You can upload a PNG, JPG, SVG, or an animated GIF under 10 MB.",
      ],
    },
    [FileType.VIDEO]: {
      label: "VIDEO",
      title: "Create new video Membership token",
      subtitle: [
        "We recommend an video of at least under 10 MB.",
        "You can upload a MP4.",
      ],
    },
  }[
    metadataCategory === FileType.IMAGE || metadataCategory === FileType.VIDEO
      ? metadataCategory
      : FileType.IMAGE
  ];

  const methods = useForm<IFormData>({
    mode: "onChange",
    defaultValues: formData ? formData : {},
  });
  const { handleSubmit, formState, watch } = methods;

  refTriggerValidationFn.current = () =>
    methods.trigger(["title", "file"], {
      shouldFocus: true,
    });

  useEffect(() => {
    const cancel = onUpdate
      ? watch((data) => {
          const isValid = !!data.title && !!data.file;
          // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-explicit-any
          onUpdate(data as any, isValid);
        })
      : undefined;
    return () => cancel?.unsubscribe();
  }, [formState]);

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
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-explicit-any
          ref={refForm as any}
        >
          <TitledBlock
            title={PAGE_TEXT.label}
            variant="lg"
            fontWeight={600}
            subtitle={PAGE_TEXT.subtitle}
          >
            <Controller
              name="file"
              rules={{ required: true }}
              render={({ field, fieldState }) => (
                <FileUpload
                  value={
                    formData?.file instanceof File ? formData.file : undefined
                  }
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

          <MaximumSupply
            id="supply"
            title="maximum supply"
            description="Maximum amount of tokens could be distributed"
          />

          {/* <FormField
            id="royalty"
            type="number"
            title="Royalty percentage"
            placeholder="0%"
            description="Suggested: 0%, 5%, 10%, 20%. Maximum is 50%."
          /> */}
        </VStack>
      </FormProvider>
    </Box>
  );
};
