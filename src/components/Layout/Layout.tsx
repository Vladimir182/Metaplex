import { FC, ReactNode, useCallback, useState } from "react";
import { Flex } from "@chakra-ui/react";
import { useStore } from "effector-react";
import { $user } from "state/wallet";

import { Navbar } from "components/Navigation/Navbar";
import { NavbarActions } from "components/Navigation/Navbar/NavbarActions";
import { Sidebar } from "components/Navigation/Sidebar";

import { LayoutContent } from ".";

export interface LayoutProps {
  narrow?: boolean;
  focused?: boolean;
  sidebarContent?: ReactNode;
  transparentNavbar?: boolean;
  fullHeight?: boolean;
  noPadding?: boolean;
}

export const Layout: FC<LayoutProps> = ({
  narrow,
  focused,
  children,
  sidebarContent,
  transparentNavbar,
  fullHeight,
  noPadding,
}) => {
  const user = useStore($user);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [atTop, setAtTop] = useState(true);

  const handleCloseSidebar = useCallback(
    () => setSidebarOpen(false),
    [setSidebarOpen]
  );

  const handleScrollTrigger = useCallback(
    (value: boolean) => setAtTop(!value),
    [setAtTop]
  );

  return (
    <Flex>
      {!focused && (
        <Navbar
          transparent={transparentNavbar && atTop}
          backgroundBlur={transparentNavbar}
          top={0}
          right={0}
          left="auto"
          position="fixed"
          zIndex="sticky"
        >
          <NavbarActions user={user} />
        </Navbar>
      )}

      <Sidebar
        isOpen={sidebarOpen}
        onClose={handleCloseSidebar}
        focused={focused}
      >
        {sidebarContent}
      </Sidebar>

      <LayoutContent
        fullHeight={fullHeight}
        noPadding={noPadding}
        narrow={narrow}
        focused={focused}
        onScrollTrigger={handleScrollTrigger}
      >
        {children}
      </LayoutContent>
    </Flex>
  );
};
