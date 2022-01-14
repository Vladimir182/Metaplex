import { Divider, MenuDivider, MenuItem } from "@chakra-ui/react";

import { SidebarMenuItem } from "components/Sidebar/SidebarMenuItem";

interface Props {
  variant?: "menu" | "sidebar";
}

export const ResourcesList: React.FC<Props> = ({ variant }) => {
  if (variant === "sidebar") {
    return (
      <>
        <SidebarMenuItem variant="secondary">Learn</SidebarMenuItem>
        <SidebarMenuItem variant="secondary">
          The Metaplex Protocol
        </SidebarMenuItem>
        <SidebarMenuItem variant="secondary">Getting Started</SidebarMenuItem>
        <SidebarMenuItem variant="secondary">FAQs</SidebarMenuItem>
        <SidebarMenuItem variant="secondary">Blog</SidebarMenuItem>
        <Divider />
        <SidebarMenuItem variant="secondary">Developers</SidebarMenuItem>
        <SidebarMenuItem variant="secondary">Github</SidebarMenuItem>
      </>
    );
  }

  return (
    <>
      <MenuItem>Learn</MenuItem>
      <MenuItem>The Metaplex Protocol</MenuItem>
      <MenuItem>Getting Started</MenuItem>
      <MenuItem>FAQs</MenuItem>
      <MenuItem>Blog</MenuItem>
      <MenuDivider />
      <MenuItem>Developers</MenuItem>
      <MenuItem>Github</MenuItem>
    </>
  );
};
