import React from "react";
import { Icon, StyleProps } from "@chakra-ui/react";

export const RepeatIcon: React.FC<StyleProps> = (props) => {
  return (
    <Icon viewBox="0 0 24 24" fill="none" {...props}>
      <path
        d="m17 1 4 4-4 4"
        stroke="#fff"
        strokeOpacity={0.5}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3 11V9a4 4 0 0 1 4-4h14M7 23l-4-4 4-4"
        stroke="#fff"
        strokeOpacity={0.5}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M21 13v2a4 4 0 0 1-4 4H3"
        stroke="#fff"
        strokeOpacity={0.5}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Icon>
  );
};
