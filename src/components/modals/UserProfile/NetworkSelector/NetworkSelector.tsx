import { useCallback } from "react";
import { Button, Circle, Text, VStack } from "@chakra-ui/react";
import type { Cluster } from "@solana/web3.js";
import { useStore } from "effector-react";
import { $networkStatus } from "state/connection";

import { TitledBlock } from "components/TitledBlock";

import { ConnectionStatus } from "./utils/getNetworksStatus";
export interface NetworkSelectorProps {
  networks: Cluster[];
  currentNetwork: Cluster;
  setNetwork(network: Cluster): void;
}

export const NetworkSelector: React.FC<NetworkSelectorProps> = ({
  networks,
  currentNetwork,
  setNetwork,
}) => {
  const networkStatus = useStore($networkStatus);
  const handleNetworkChange = useCallback(
    (network: Cluster) => {
      setNetwork(network);
      // Reload the page, forward user selection to the URL querystring.
      // The app will be re-initialized with the correct network
      // (which will also be saved to local storage for future visits)
      // for all its lifecycle.
      window.location.reload();
    },
    [setNetwork, networks]
  );

  return (
    <TitledBlock title="Network" w="full">
      <VStack>
        {networks.map((network) => {
          const currNetwork = networkStatus?.find(
            (net) => net.network === network
          );
          const status: { text: string; color: string } =
            ConnectionStatus.stable === currNetwork?.status
              ? { color: "green.300", text: "Stable" }
              : { color: "red.300", text: "Unstable" };

          return (
            <Button
              key={network}
              onClick={() => handleNetworkChange(network)}
              w="full"
              variant={network === currentNetwork ? "tertiary" : "ghost"}
              justifyContent="space-between"
            >
              {network}
              <Text color={status.color} marginLeft="auto" paddingEnd="1">
                {status.text}
              </Text>
              {network === currentNetwork && (
                <Circle size={1.5} bgColor="green.500" />
              )}
            </Button>
          );
        })}
      </VStack>
    </TitledBlock>
  );
};
