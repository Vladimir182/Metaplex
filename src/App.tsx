import { useEffect } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { ChakraProvider } from "@chakra-ui/react";
import debug from "debug";
import { AppRoutes } from "routes/AppRoutes";
import { startStatusCheck, stopStatusCheck } from "state/connection";

import { useToast } from "components/modals/Toast";

import { theme } from "./theme";
import { WalletProvider } from "./wallet";

const LOGErr = debug("error:App");

export const App = () => {
  const toast = useToast();

  const handleError = (error: Error) => {
    toast({ duration: 9000, title: error.name, text: error.message });
  };

  useEffect(() => {
    startStatusCheck();
    return () => stopStatusCheck();
  }, []);

  try {
    return (
      <ChakraProvider theme={theme}>
        <WalletProvider autoConnect>
          <ErrorBoundary onError={handleError} fallback={<div>Oh no</div>}>
            <AppRoutes />
          </ErrorBoundary>
        </WalletProvider>
      </ChakraProvider>
    );
  } catch (error) {
    LOGErr.log(error);
    return <>error</>;
  }
};
