import { ChakraProvider } from "@chakra-ui/react";
import { WalletProvider } from "./contexts";
import { theme } from "./theme";
import { AppRoutes } from "routes/AppRoutes";
import { ErrorBoundary } from "react-error-boundary";
import { useToast } from "components/modals/Toast";
import debug from "debug";
import { useEffect } from "react";
import { startStatusCheck, stopStatusCheck } from "state/connection";

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
