import { Button, Circle, VStack } from "@chakra-ui/react";

import type { Cluster } from "@solana/web3.js";
import { TitledBlock } from "components/TitledBlock";
import { useCallback } from "react";

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
        {networks.map((network) => (
          <Button
            key={network}
            onClick={() => handleNetworkChange(network)}
            w="full"
            variant={network === currentNetwork ? "tertiary" : "ghost"}
            justifyContent="space-between"
          >
            {network}
            {network === currentNetwork && (
              <Circle size={1.5} bgColor="green.500" />
            )}
          </Button>
        ))}
      </VStack>
    </TitledBlock>
  );
};
