import { CreateButton } from "components/buttons/CreateButton";
import { useCustomBreakpoints } from "hooks/useCustomBreakpoints";
import { FC, ComponentProps } from "react";

type Props = ComponentProps<typeof CreateButton>;

export const ArtworkGridCreateButton: FC<Props> = ({ children, ...props }) => {
  const { smUp } = useCustomBreakpoints();
  if (smUp) {
    return (
      <CreateButton ml={4} {...props}>
        {children}
      </CreateButton>
    );
  } else {
    return (
      <CreateButton w="100%" h={16} mb={6} {...props}>
        {" "}
        {children}
      </CreateButton>
    );
  }
};
