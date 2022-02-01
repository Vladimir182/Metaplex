import React from "react";
import { SidebarMenuItem } from "components/Sidebar/SidebarMenuItem";
import { Step } from "components/Step";
import { ButtonProps } from "@chakra-ui/button";

interface Props extends ButtonProps {
  step: number;
  isActive: boolean;
}

export const SidebarMenuItemWrapper: React.FC<Props> = ({
  step,
  isActive,
  onClick,
  children,
}) => {
  return (
    <SidebarMenuItem
      variant="step"
      onClick={onClick}
      isActive={isActive}
      icon={<Step isActive={isActive}>{step}</Step>}
      fontWeight={{ base: "normal", md: "bold" }}
    >
      {children}
    </SidebarMenuItem>
  );
};
