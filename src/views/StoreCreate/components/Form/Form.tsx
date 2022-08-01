import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { Button, Divider, Heading, Stack, Text } from "@chakra-ui/react";
import { useStore } from "effector-react";
import { useCustomBreakpoints } from "hooks/useCustomBreakpoints";
import { useBalance } from "state/react/useBalance";
import { $user } from "state/wallet";
import { WalletModalProvider, WalletMultiButton } from "wallet";

import { WalletTransaction } from "components/DataDisplay/WalletTransaction";
import { FormField } from "components/Forms/FormField";

import { StoreFormProps } from "./types";

interface Props {
  onSubmit: SubmitHandler<StoreFormProps>;
  title: string;
  actionButtonName: string;
  disabled?: boolean;
}

const CREATION_TRANSACTION_PRICE = 0.00192;

export const Form: React.FC<Props> = ({
  onSubmit,
  title,
  actionButtonName,
  children,
  disabled,
}) => {
  const { mdUp } = useCustomBreakpoints();
  const user = useStore($user);
  const methods = useForm<StoreFormProps>({
    mode: "onChange",
  });

  const { balance } = useBalance();

  const notValidBalance = CREATION_TRANSACTION_PRICE > (balance?.sol || 0);

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
              sol={CREATION_TRANSACTION_PRICE}
              walletBalance={balance?.sol}
            >
              {user && (
                <Button
                  isDisabled={
                    disabled || !methods.formState.isValid || notValidBalance
                  }
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
