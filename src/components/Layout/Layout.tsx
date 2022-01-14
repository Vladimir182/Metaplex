import { FC, ReactNode, useCallback, useState } from "react";

import { $user } from "state/wallet";
import { Flex } from "@chakra-ui/react";
import { LayoutContent } from ".";
import { Navbar } from "components/Navbar";
import { NavbarActions } from "components/Navbar/NavbarActions";
import { Sidebar } from "components/Sidebar";
import { useStore } from "effector-react";

export interface LayoutProps {
  narrow?: boolean;
  focused?: boolean;
  sidebarContent?: ReactNode;
  transparentNavbar?: boolean;
}

export const Layout: FC<LayoutProps> = ({
  narrow,
  focused,
  children,
  sidebarContent,
  transparentNavbar,
}) => {
  const user = useStore($user);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [atTop, setAtTop] = useState(true);

  const handleToggleSidebar = useCallback(
    () => setSidebarOpen((currentState) => !currentState),
    [setSidebarOpen]
  );

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
          <NavbarActions user={user} onToggleSidebar={handleToggleSidebar} />
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
        narrow={narrow}
        focused={focused}
        onScrollTrigger={handleScrollTrigger}
      >
        {children}
      </LayoutContent>
    </Flex>
  );
};
