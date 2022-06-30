import React, {
  FC,
  MutableRefObject,
  RefObject,
  useLayoutEffect,
  useMemo,
} from "react";
import {
  Controller,
  FormProvider,
  useFieldArray,
  useForm,
} from "react-hook-form";
import { Box, VStack } from "@chakra-ui/react";
import { useStore } from "effector-react";
import { $user } from "state/wallet";
import { FormData } from "views/NftCreationView";

import { TitledBlock } from "components/DataDisplay/TitledBlock";
import { FileUpload } from "components/Forms/FileUpload";
import { FormField } from "components/Forms/FormField";

import { calcAllErrors } from "./helper";
import { MaximumSupply } from "./MaximumSupply";
import { PrimarySale } from "./PrimarySale";
import { SecondarySale } from "./SecondarySale";
import { MAXIMUM_SUPPLY_DEFAULT } from "./SupplyType";

export interface NftCreationFormProps {
  onSubmit?(form: FormData): void;
  onUpdate?(form: Partial<FormData>, isValid: boolean): void;
  refForm?: RefObject<HTMLFormElement>;
  refTriggerValidationFn: MutableRefObject<(() => Promise<boolean>) | null>;
  formData?: Partial<FormData> | null;
}

export const NftCreationForm: FC<NftCreationFormProps> = ({
  onSubmit,
  onUpdate,
  refForm,
  refTriggerValidationFn,
  formData = null,
}) => {
  const PAGE_TEXT = {
    label: "IMAGE",
    title: "Create new image Membership token",
    subtitle: [
      "We recommend an image of at least 800x800.",
      "You can upload a PNG, JPG, SVG, or an animated GIF under 10 MB.",
    ],
  };

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
