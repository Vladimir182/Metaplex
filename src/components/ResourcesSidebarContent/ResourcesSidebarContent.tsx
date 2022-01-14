import { ResourcesList } from "components/Navbar/ResourcesList";
import { MobileSidebarHeader } from "components/Sidebar/DrawerSidebar/MobileSidebarHeader";
import { FC } from "react";

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
