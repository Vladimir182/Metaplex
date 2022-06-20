import { HStack } from "@chakra-ui/react";
import { PersonButton } from "components/buttons/PersonButton";
import { UserProfile } from "components/modals/UserProfile";
import { PersonProps } from "components/Person";
import { WalletMultiButton } from "components/smart/Wallet";
import { useEvent, useStore } from "effector-react";
import { useCustomBreakpoints } from "hooks/useCustomBreakpoints";

import { $network, networkChange, NETWORK_LIST } from "state/connection";
import { ResourcesMenu } from "../ResourcesMenu";
import { Hamburger } from "../Hamburger";
import { MobileNotifications } from "../MobileNotifications";
import { useBalance } from "state/react/useBalance";
import { useMemo } from "react";

export interface NavbarActionsProps {
  user?: (PersonProps & { notifications?: number }) | null;
  onToggleSidebar?: () => void;
}

export const NavbarActions: React.FC<NavbarActionsProps> = ({
  user,
  onToggleSidebar,
}) => {
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
      {mdUp && <ResourcesMenu />}
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
      {!mdUp && <MobileNotifications notifications={user?.notifications} />}
      {!mdUp && <Hamburger onClick={onToggleSidebar} />}
    </HStack>
  );
};
