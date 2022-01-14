import {
  useToast as useOriginalToast,
  UseToastOptions,
} from "@chakra-ui/react";
import { WalletMultiButton } from "components/smart/Wallet";
import { Toast, ToastProps } from "./Toast";

export const useToast = () => {
  const originalToast = useOriginalToast();

  const toast = (
    options: ToastProps & UseToastOptions & { showConnect?: boolean }
  ) => {
    const children = options.showConnect ? <WalletMultiButton /> : undefined;

    originalToast({
      ...options,
      position: "top-right",
      render: ({ onClose }) => (
        <Toast {...options} children={children} onClose={onClose} />
      ),
    });
  };
  return toast;
};
