import "./spinner.css";

import { Box, BoxProps } from "@chakra-ui/layout";

interface Props extends BoxProps {
  darkBg?: boolean;
}

export const Spinner: React.FC<Props> = ({ darkBg, ...props }) => {
  return (
    <Box
      {...props}
      // TODO: replace this with a spinning SVG, remove bgColor hack
      className={`infinite-progress-spinner ${
        darkBg ? "spinner-dark-background" : "spinner-light-background"
      }`}
    />
  );
};
