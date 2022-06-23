import { FC } from "react";

import { ResourcesList } from "components/Navbar/ResourcesList";
import { MobileSidebarHeader } from "components/Sidebar/DrawerSidebar/MobileSidebarHeader";

interface Props {
  onClose?: () => void;
}

export const ResourcesSidebarContent: FC<Props> = ({ onClose }) => (
  <>
    <MobileSidebarHeader
      secondaryView
      secondaryViewTitle="Resources"
      onExitSecondaryView={onClose}
    />
    <ResourcesList variant="sidebar" />
  </>
);
