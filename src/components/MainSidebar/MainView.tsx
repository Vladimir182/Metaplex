import { BoxProps, Spacer, VStack } from "@chakra-ui/react";
import {
  MdGridView,
  MdList,
  MdNotificationsNone,
  MdOutlineShoppingCart,
  MdOutlineStorefront,
} from "react-icons/md";

import { Balance } from "./Balance";
import type { PersonProps } from "components/Person";
import { SidebarMenuItem } from "components/Sidebar/SidebarMenuItem";
import { UserInfo } from "./UserInfo";
import { useBalance } from "state/react/useBalance";
import { useCustomBreakpoints } from "hooks/useCustomBreakpoints";
import { useMemo } from "react";

export type TMenuTypes =
  | "resources"
  | "storefront"
  | "activity"
  | "items"
  | "listing";
interface Props extends BoxProps {
  user?: PersonProps | null;
  onOpen?(type: TMenuTypes): void;
}

export const MainView: React.FC<Props> = ({ user, onOpen, ...boxProps }) => {
  const { mdUp } = useCustomBreakpoints();
  const { balance } = useBalance();

  const createHandle = useMemo(() => {
    const cache: Partial<Record<TMenuTypes, () => void>> = {};
    return (type: TMenuTypes) => {
      if (!onOpen) {
        return undefined;
      }
      return cache[type] ?? (cache[type] = () => onOpen?.(type));
    };
  }, [onOpen]);

  return (
    <VStack spacing={4} w="100%" h="100%" {...boxProps}>
      {user && <UserInfo user={user} />}

      {/* menu */}
      <VStack spacing={0} w="100%">
        {!user && (
          <SidebarMenuItem
            onClick={createHandle("storefront")}
            icon={<MdOutlineStorefront />}
          >
            Storefront
          </SidebarMenuItem>
        )}
        <SidebarMenuItem
          onClick={createHandle("activity")}
          icon={<MdNotificationsNone />}
        >
          Activity
        </SidebarMenuItem>
        <SidebarMenuItem onClick={createHandle("items")} icon={<MdGridView />}>
          Items
        </SidebarMenuItem>
        <SidebarMenuItem
          onClick={createHandle("listing")}
          icon={<MdOutlineShoppingCart />}
        >
          Listing
        </SidebarMenuItem>
      </VStack>
      <Spacer />
      {!mdUp && (
        <SidebarMenuItem onClick={createHandle("resources")} icon={<MdList />}>
          Resources
        </SidebarMenuItem>
      )}
      {balance ? <Balance sol={balance.sol} /> : null}
    </VStack>
  );
};
