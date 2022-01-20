import { Button, Divider, Heading, Stack, Text } from "@chakra-ui/react";
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
import { StoreFormProps } from "./types";
import { useSolToUsd } from "state/react/useCurrency";

interface Props {
  onSubmit: SubmitHandler<StoreFormProps>;
  title: string;
  actionButtonName: string;
  disabled?: boolean;
}

export const StoreCreateForm: React.FC<Props> = ({
  onSubmit,
  title,
  actionButtonName,
  children,
  disabled,
}) => {
  const { mdUp } = useCustomBreakpoints();
  const user = useStore($user);
  const { convert } = useSolToUsd();
  const methods = useForm<StoreFormProps>({
    mode: "onChange",
  });

  const solPrice = 0.00192;
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
              options={{ required: true, maxLength: 40, disabled }}
            />

            <Divider />

            <WalletTransaction
              title="Creation Fee"
              sol={solPrice}
              usd={usdPrice ?? 0}
            >
              {user && (
                <Button
                  isDisabled={disabled || !methods.formState.isValid}
                  type="submit"
                  size="lg"
                  variant="primary"
                >
                  {actionButtonName}
                </Button>
              )}
              {!user && (
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
