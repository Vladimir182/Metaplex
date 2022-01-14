import { Badge, Button, ButtonProps } from "@chakra-ui/react";

import { MdOutlineNotifications } from "react-icons/md";
import { fontSizes } from "theme/typography";

interface Props extends ButtonProps {
  notifications?: number;
  onClick?: () => void;
}

export const MobileNotifications: React.FC<Props> = ({
  notifications,
  onClick,
  ...rest
}) => {
  return (
    <Button variant="ghost" onClick={onClick} px={3} {...rest}>
      <MdOutlineNotifications size={fontSizes["2xl"]} />
      {notifications && <Badge variant="solid">{notifications}</Badge>}
    </Button>
  );
};
