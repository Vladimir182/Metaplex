import { Button, Menu, MenuButton, MenuList } from "@chakra-ui/react";

import { ResourcesList } from "./ResourcesList";

export const ResourcesMenu: React.FC = () => {
  return (
    <Menu gutter={16} autoSelect={false}>
      <MenuButton as={Button} variant="ghost">
        Resources
      </MenuButton>
      <MenuList>
        <ResourcesList />
      </MenuList>
    </Menu>
  );
};
