import React, { Children } from "react";
import { useCustomBreakpoints } from "hooks/useCustomBreakpoints";

import { DrawerSidebar } from "./DrawerSidebar";
import { StaticSidebar } from "./StaticSidebar";

export interface SidebarProps {
  isOpen?: boolean;
  focused?: boolean;
  onClose?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  isOpen = false,
  focused,
  onClose,
  children,
}) => {
  const { mdUp } = useCustomBreakpoints();

  if (mdUp && children) {
    return <StaticSidebar focused={focused}>{children}</StaticSidebar>;
  }

  return (
    <DrawerSidebar isOpen={isOpen} onClose={onClose}>
      {Children}
    </DrawerSidebar>
  );
};
