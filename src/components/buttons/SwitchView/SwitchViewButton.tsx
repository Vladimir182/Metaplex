import { Button, ButtonProps, Tooltip } from "@chakra-ui/react";
import { ConditionalWrapper } from "components/utility/ConditionalWrapper";
import { MdDashboard, MdGridOn, MdList, MdListAlt } from "react-icons/md";

import { fontSizes } from "theme/typography";

interface Props extends ButtonProps {
  currentView?: "grid" | "list";
  variant?: "desktop" | "mobile";
  useTooltip?: boolean;
}

export const SwitchViewButton: React.FC<Props> = ({
  currentView = "grid",
  variant = "desktop",
  useTooltip,
  ...rest
}) => {
  const isGrid = currentView === "grid";

  // Desktop
  if (variant === "desktop") {
    return (
      <Button
        leftIcon={
          isGrid ? (
            <MdListAlt size={fontSizes["2xl"]} />
          ) : (
            <MdGridOn size={fontSizes["2xl"]} />
          )
        }
        variant="tertiary"
        {...rest}
      >
        {isGrid ? "View as list" : "View as grid"}
      </Button>
    );
  }

  // Mobile
  return (
    <ConditionalWrapper
      wrap={useTooltip}
      wrapper={(children) => (
        <Tooltip
          label={isGrid ? "View as list" : "View as grid"}
          openDelay={500}
        >
          {children}
        </Tooltip>
      )}
    >
      <Button variant="tertiary" {...rest}>
        {isGrid ? (
          <MdList size={fontSizes["2xl"]} />
        ) : (
          <MdDashboard size={fontSizes["2xl"]} />
        )}
      </Button>
    </ConditionalWrapper>
  );
};
