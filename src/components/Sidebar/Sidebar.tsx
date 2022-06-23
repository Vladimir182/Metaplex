import React from "react";
import { useCustomBreakpoints } from "hooks/useCustomBreakpoints";

import { ResourcesSidebarContent } from "components/ResourcesSidebarContent";

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
      {children || <ResourcesSidebarContent onClose={onClose} />}
    </DrawerSidebar>
  );
};
