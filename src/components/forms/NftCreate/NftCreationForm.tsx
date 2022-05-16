import React, {
  useMemo,
  FC,
  RefObject,
  MutableRefObject,
  useLayoutEffect,
} from "react";
import { Box, Textarea, VStack } from "@chakra-ui/react";
import {
  Controller,
  FormProvider,
  useFieldArray,
  useForm,
} from "react-hook-form";

import { FileUpload } from "components/FileUpload";
import { FormField } from "components/FormField";
import { FileType } from "components/MediaTypeSelector";
import { TitledBlock } from "components/TitledBlock";

import { MaximumSupply } from "./MaximumSupply";
import { PrimarySale } from "./PrimarySale";
import { SecondarySale } from "./SecondarySale";
import { AddressRow, calcAllErrors } from "./helper";
import { useStore } from "effector-react";
import { $user } from "state/wallet";
import { MAXIMUM_SUPPLY_DEFAULT } from "./SupplyType";

export interface FormData {
  preview: File | Record<string, never>;
  file: File | Record<string, never>;
  title: string;
  desc: string;
  supply: string;
  royalty: string;
  primaryRoyalties: Array<AddressRow>;
  secondaryRoyalties: Array<AddressRow>;
  attributes: Array<{ key: string; value: string }>;
  piecesInOneWallet: number;
}

export interface NftCreationFormProps {
  metadataCategory: FileType;
  onSubmit?(form: FormData): void;
  onUpdate?(form: Partial<FormData>, isValid: boolean): void;
  refForm?: RefObject<HTMLFormElement>;
  refTriggerValidationFn: MutableRefObject<(() => void) | null>;
  formData?: Partial<FormData> | null;
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

  const user = useStore($user);

  const methods = useForm<FormData>({
    mode: "onChange",
    defaultValues: {
      ...(formData || {}),
      primaryRoyalties: [
        { address: user?.address, verified: false, share: "100" },
      ],
      secondaryRoyalties: [
        { address: user?.address, verified: false, share: "100", total: "" },
      ],
      supply: formData?.supply ?? MAXIMUM_SUPPLY_DEFAULT,
    },
  });

  const { handleSubmit, formState, watch, control } = methods;

  const primaryRoyalties = useFieldArray({
    control,
    name: "primaryRoyalties",
  });

  const secondaryRoyalties = useFieldArray({
    control,
    name: "secondaryRoyalties",
  });

  refTriggerValidationFn.current = () =>
    methods.trigger(
      ["title", "file", "primaryRoyalties", "royalty", "secondaryRoyalties"],
      {
        shouldFocus: true,
      }
    );

  useLayoutEffect(() => {
    const cancel = onUpdate
      ? watch((data) => {
          const isPrimaryProportionError = calcAllErrors(data.primaryRoyalties);
          const isSecondaryProportionError = calcAllErrors(
            data.secondaryRoyalties
          );
          const isValid =
            !!data.title &&
            !!data.royalty &&
            !!data.file &&
            !isPrimaryProportionError?.errorMessage &&
            !isSecondaryProportionError?.errorMessage;
          //todo: need add type for data or guard
          onUpdate(data as FormData, isValid);
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
            defaultValue={formData?.supply}
          />

          <PrimarySale
            onRemove={primaryRoyalties.remove}
            onAddField={primaryRoyalties.append}
          />

          <SecondarySale
            onUpdate={secondaryRoyalties.update}
            onRemove={secondaryRoyalties.remove}
            onAddField={secondaryRoyalties.append}
          />
        </VStack>
      </FormProvider>
    </Box>
  );
};
