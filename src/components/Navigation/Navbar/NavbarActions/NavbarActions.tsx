import { useMemo } from "react";
import { HStack } from "@chakra-ui/react";
import { useEvent, useStore } from "effector-react";
import { useCustomBreakpoints } from "hooks/useCustomBreakpoints";
import { $network, NETWORK_LIST, networkChange } from "state/connection";
import { useBalance } from "state/react/useBalance";
import { WalletMultiButton } from "wallet";

import { PersonButton } from "components/Buttons/PersonButton";
import { PersonProps } from "components/DataDisplay/Person";
import { UserProfile } from "components/Modals/UserProfile";

export interface NavbarActionsProps {
  user?: (PersonProps & { notifications?: number }) | null;
}

export const NavbarActions: React.FC<NavbarActionsProps> = ({ user }) => {
  const { mdUp } = useCustomBreakpoints();
  const network = useStore($network);
  const refBalance = useBalance();
  const balance = useMemo(() => {
    return {
      sol: refBalance.balance?.sol,
    };
  }, [refBalance]);

  const setNetwork = useEvent(networkChange);

  return (
    <HStack>
      {mdUp &&
        (user ? (
          <UserProfile
            user={user}
            balance={balance}
            networks={NETWORK_LIST}
            currentNetwork={network}
            setNetwork={setNetwork}
          >
            <PersonButton {...user} variant="ghost" />
          </UserProfile>
        ) : (
          <WalletMultiButton />
        ))}
    </HStack>
  );
};
