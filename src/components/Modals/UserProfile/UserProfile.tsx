import {
  Box,
  Divider,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  VStack,
} from "@chakra-ui/react";

import { PersonProps } from "components/DataDisplay/Person";
import { SolUsd } from "components/DataDisplay/SolUsd";
import { Balance } from "components/Modals/UserProfile/Balance";
import { UserInfo } from "components/Modals/UserProfile/UserInfo";

import {
  NetworkSelector,
  NetworkSelectorProps,
} from "./components/NetworkSelector";

interface Props extends NetworkSelectorProps {
  user: PersonProps;
  balance?: React.ComponentProps<typeof SolUsd>;
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
            {balance ? <Balance sol={balance.sol} p={0} /> : null}

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
