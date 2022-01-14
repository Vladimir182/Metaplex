import { DrawerSidebar } from "./DrawerSidebar";
import React from "react";
import { StaticSidebar } from "./StaticSidebar";
import { useCustomBreakpoints } from "hooks/useCustomBreakpoints";
import { ResourcesSidebarContent } from "components/ResourcesSidebarContent";

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
