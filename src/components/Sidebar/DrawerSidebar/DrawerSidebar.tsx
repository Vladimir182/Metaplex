import { Drawer, DrawerContent, DrawerOverlay } from "@chakra-ui/react";

interface Props {
  isOpen: boolean;
  onClose?: () => void;
}

export const DrawerSidebar: React.FC<Props> = ({
  isOpen,
  onClose = () => {},
  children,
}) => {
  return (
    <Drawer
      isOpen={isOpen}
      placement="left"
      onClose={onClose}
      size="full"
      useInert
      preserveScrollBarGap
    >
      <DrawerOverlay />
      <DrawerContent bgColor="gray.600" overflowY="auto">
        {children}
      </DrawerContent>
    </Drawer>
  );
};
