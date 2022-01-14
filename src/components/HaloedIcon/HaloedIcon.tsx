import { BoxProps, Circle, Text } from "@chakra-ui/react";
import { ComponentType, FC } from "react";

import { fontSizes } from "theme/typography";

interface IconProps {
  size?: string | number | undefined;
}

export interface HaloedIconProps extends BoxProps {
  icon?: ComponentType<IconProps>;
  emoji?: string;
  variant?: "dialog-hero";
}

export const HaloedIcon: FC<HaloedIconProps> = ({
  icon: IconComponent,
  emoji,
  children,
  // variant = "dialog-hero",
  ...props
}) => {
  return (
    <Circle bg="whiteAlpha.100" size={16} {...props}>
      {IconComponent ? (
        <IconComponent size={fontSizes["2xl"]} />
      ) : (
        <Text fontSize={24}>{emoji || children}</Text>
      )}
    </Circle>
  );
};
