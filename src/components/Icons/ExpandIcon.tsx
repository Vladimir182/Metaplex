import { Icon, StyleProps } from "@chakra-ui/react";

export const ExpandIcon: React.FC<StyleProps> = (props) => (
  <Icon viewBox="0 0 20 20" {...props}>
    <path
      stroke="currentColor"
      strokeWidth="2px"
      strokeLinecap="round"
      strokeLinejoin="round"
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12.222 3.333h4.445m0 0v4.444m0-4.444-5.185 5.185M3.333 16.667 8.52 11.48m-5.186 5.186h4.445m-4.445 0v-4.445"
    />
  </Icon>
);
