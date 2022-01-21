import {
  Box,
  Divider,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  VStack,
} from "@chakra-ui/react";
import { NetworkSelector, NetworkSelectorProps } from "./NetworkSelector";

import { Balance } from "components/MainSidebar/Balance";
import { PersonProps } from "components/Person";
import { SolUsdDisplay } from "components/SolUsdDisplay";
import { UserInfo } from "components/MainSidebar/UserInfo";

interface Props extends NetworkSelectorProps {
  user: PersonProps;
  balance?: React.ComponentProps<typeof SolUsdDisplay>;
  forceOpen?: boolean;
}

export const UserProfile: React.FC<Props> = ({
  children,
  user,
  networks,
  setNetwork,
  currentNetwork,
  balance,
  forceOpen,
}) => {
  return (
    <Popover
      modifiers={[
        {
          name: "preventOverflow",
          options: {
            padding: 32,
          },
        },
      ]}
      isOpen={forceOpen}
    >
      <PopoverTrigger>
        <Box>{children}</Box>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverBody bgColor="gray.800" borderRadius="md" p={4}>
          <UserInfo user={user} variant="profile-popover" />
          <Divider my={4} />
          <VStack spacing={6}>
            {balance ? (
              <Balance sol={balance.sol} usd={balance.usd} p={0} />
            ) : null}

            <NetworkSelector
              networks={networks}
              currentNetwork={currentNetwork}
              setNetwork={setNetwork}
            />
          </VStack>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};
