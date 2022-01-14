import { FC, useCallback, useState } from "react";

import { MainView, TMenuTypes } from "./MainView";
import { MobileSidebarHeader } from "components/Sidebar/DrawerSidebar/MobileSidebarHeader";
import { PersonProps } from "components/Person";
import { ResourcesList } from "components/Navbar/ResourcesList";

interface Props {
  user?: PersonProps | null;
}

export const MainSidebarContent: FC<Props> = ({ user }) => {
  const [isResourcesView, setIsResourcesView] = useState(false);

  const handleEnterResources = useCallback((state: TMenuTypes) => {
    if (state === "resources") {
      setIsResourcesView(true);
    }
  }, []);
  const handleExitResources = () => setIsResourcesView(false);

  return (
    <>
      <MobileSidebarHeader
        secondaryView={isResourcesView}
        secondaryViewTitle="Resources"
        onExitSecondaryView={handleExitResources}
      />
      {isResourcesView ? (
        <ResourcesList variant="sidebar" />
      ) : (
        <MainView onOpen={handleEnterResources} user={user} />
      )}
    </>
  );
};
