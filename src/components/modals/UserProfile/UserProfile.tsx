import {
  Box,
  Button,
  Divider,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  VStack,
} from "@chakra-ui/react";
import { NetworkSelector, NetworkSelectorProps } from "./NetworkSelector";

import { Balance } from "components/MainSidebar/Balance";
import { Link } from "react-router-dom";
import { PersonProps } from "components/Person";
import { SolUsdDisplay } from "components/SolUsdDisplay";
import { UserInfo } from "components/MainSidebar/UserInfo";
import { ROUTES } from "routes";

interface Props extends NetworkSelectorProps {
  user: PersonProps;
  balance?: React.ComponentProps<typeof SolUsdDisplay>;
  walletStoreId?: string | null;
  forceOpen?: boolean;
}

export const UserProfile: React.FC<Props> = ({
  children,
  user,
  networks,
  setNetwork,
  currentNetwork,
  balance,
  walletStoreId,
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
          <Button
            variant="link"
            w="full"
            color="whiteAlpha.700"
            as={Link}
            to="/profile"
          >
            View Profile
          </Button>
          {walletStoreId && (
            <Button
              variant="link"
              w="full"
              color="whiteAlpha.700"
              as={Link}
              to={ROUTES.admin({
                ":storeId": walletStoreId,
              })}
            >
              View Dashboard
            </Button>
          )}
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
