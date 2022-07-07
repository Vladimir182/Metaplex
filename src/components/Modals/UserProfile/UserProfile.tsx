import {
  Box,
  BoxProps,
  Divider,
  forwardRef,
  Popover,
  PopoverBody,
  PopoverContent,
  useDisclosure,
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
}

export const UserProfile: React.FC<Props> = ({
  children,
  user,
  networks,
  setNetwork,
  currentNetwork,
  balance,
}) => {
  const { isOpen, onToggle, onClose } = useDisclosure();

  const ButtonUserProfile = forwardRef<BoxProps, "div">((props, ref) => (
    <Box onClick={onToggle} ref={ref} {...props}>
      {children}
    </Box>
  ));

  return (
    <Popover isOpen={isOpen} onClose={onClose}>
      <ButtonUserProfile />
      <PopoverContent
        top={0}
        right={0}
        left="auto"
        position="fixed"
        mt="3.7rem"
        mr="1.6rem"
      >
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
