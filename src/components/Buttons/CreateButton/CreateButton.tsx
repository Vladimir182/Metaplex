import { MdAdd } from "react-icons/md";
import { Button, ButtonProps } from "@chakra-ui/button";
import { fontSizes } from "theme/typography";

interface CreateButtonProps extends ButtonProps {
  currentView?: "grid" | "list";
}

export const CreateButton: React.FC<CreateButtonProps> = ({
  children,
  ...rest
}) => {
  return (
    <Button
      leftIcon={<MdAdd size={fontSizes["2xl"]} />}
      variant="primary"
      {...rest}
    >
      {children}
    </Button>
  );
};
