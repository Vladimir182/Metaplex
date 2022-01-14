import { Text } from "@chakra-ui/layout";
import { TitledBlock } from "components/TitledBlock";

export const Details: React.FC = ({ children }) => {
  return (
    <TitledBlock title="Details">
      <Text variant="body" align="left" whiteSpace="pre-wrap">
        {children}
      </Text>
    </TitledBlock>
  );
};
