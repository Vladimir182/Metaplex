import { useEffect } from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { ErrorBoundary } from "react-error-boundary";
import debug from "debug";

import { AppRoutes } from "routes/AppRoutes";
import { useToast } from "components/modals/Toast";
import { startStatusCheck, stopStatusCheck } from "state/connection";

import { WalletProvider } from "./contexts";
import { theme } from "./theme";

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
