import {
  Button,
  Divider,
  Heading,
  Stack,
  Text,
  Textarea,
} from "@chakra-ui/react";
import {
  WalletModalProvider,
  WalletMultiButton,
} from "components/smart/Wallet";
import { useStore } from "effector-react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { useCustomBreakpoints } from "hooks/useCustomBreakpoints";
import { $user } from "state/wallet";
import { FormField } from "components/FormField";
import { WalletTransaction } from "components/WalletTransaction";
import { FileUpload } from "components/FileUpload";
import { StoreFormProps } from "./types";
import { useEffect } from "react";
import { useSolToUsd } from "state/react/useCurrency";

interface Props {
  onSubmit: SubmitHandler<StoreFormProps>;
  defaultValues?: StoreFormProps;
  title: string;
  actionButtonName: string;
  disabled?: boolean;
}

export const StoreCreateForm: React.FC<Props> = ({
  onSubmit,
  title,
  defaultValues,
  actionButtonName,
  children,
  disabled,
}) => {
  const { mdUp } = useCustomBreakpoints();
  const user = useStore($user);
  const { convert } = useSolToUsd();
  const methods = useForm<StoreFormProps>({
    mode: "onChange",
    defaultValues,
  });

  useEffect(() => {
    if (defaultValues) {
      for (const [key, value] of Object.entries(defaultValues)) {
        methods.setValue(key as keyof typeof defaultValues, value as string);
      }
    }
  }, [defaultValues]);

  // TODO: calculate cost of creation store
  const solPrice = 0.01;
  const usdPrice = convert(solPrice);

  return (
    <>
      <Heading variant={mdUp ? "h2" : "h3"} mb={4}>
        {title}
      </Heading>
      <Text variant="body-large" color="whiteAlpha.500">
        {children}
      </Text>

      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <Stack spacing={8} mt={14}>
            <FormField
              id="name"
              title="Store Name"
              options={{ required: true, disabled }}
            />

            <FormField
              id="logoImg"
              title="Store Logo"
              description="PNG or JPEG. Max 100mb."
              options={{ disabled }}
              controlledInputFactory={({ field, fieldState }) => (
                <FileUpload
                  value={field.value ? (field.value as string) : undefined}
                  isInvalid={fieldState.invalid}
                  onFileChange={field.onChange}
                  disabled={disabled}
                  variant="logo-preview"
                />
              )}
            />

            <FormField
              id="coverImg"
              title="Store Cover Image"
              description={`We recomend an image of at least 900x400.\n You can upload a PNG, JPG, or an animated GIF under 10 MB.`}
              controlledInputFactory={({ field, fieldState }) => (
                <FileUpload
                  value={field.value ? (field.value as string) : undefined}
                  isInvalid={fieldState.invalid}
                  onFileChange={field.onChange}
                  disabled={disabled}
                  variant="preview"
                />
              )}
            />

            <FormField
              id="description"
              title="Store Description"
              description="Tell us a little bit about your store"
              options={{ disabled }}
              customInputFactory={(register) => <Textarea {...register} />}
            />

            <FormField
              id="link"
              title="External Link"
              description="Include your own webpage URL and we’ll automatically display it on this items page to provide additional details to your customers."
              options={{ disabled }}
              placeholder="http://yourwebpage.io"
            />

            <Divider />

            <WalletTransaction sol={solPrice} usd={usdPrice ?? 0}>
              {user != null ? (
                <Button
                  isDisabled={disabled || !methods.formState.isValid}
                  type="submit"
                  size="lg"
                  variant="primary"
                >
                  {actionButtonName}
                </Button>
              ) : (
                <WalletModalProvider>
                  <WalletMultiButton />
                </WalletModalProvider>
              )}
            </WalletTransaction>
          </Stack>
        </form>
      </FormProvider>
    </>
  );
};
