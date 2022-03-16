import { Icon, StyleProps } from "@chakra-ui/react";

export const PlusIcon: React.FC<StyleProps> = (props) => (
  <Icon viewBox="0 0 16 16" {...props}>
    <path d="M14 8H8V14H6V8H0V6H6V0H8V6H14V8Z" fill="currentColor" />
  </Icon>
);
