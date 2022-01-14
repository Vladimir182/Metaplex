import { Button, ButtonProps } from "@chakra-ui/button";

import { MdMenu } from "react-icons/md";

export const Hamburger: React.FC<ButtonProps> = (props) => {
  return (
    <Button variant="ghost" px={3} {...props}>
      <MdMenu size={24} />
    </Button>
  );
};
