import { Collapse } from "@chakra-ui/transition";
import { ConditionalWrapper } from "components/utility/ConditionalWrapper";
import { Text } from "@chakra-ui/layout";

interface Props {
  expanded?: boolean;
  type?: string;
  smUp?: boolean;
}

export const ArtworkSubtitle: React.FC<Props> = ({ expanded, type, smUp }) => {
  return (
    <ConditionalWrapper
      wrap={smUp}
      wrapper={(children) => (
        <Collapse
          in={!expanded}
          transition={{
            enter: { height: { duration: 0.2 } },
            exit: { height: { duration: 0.3 } },
          }}
        >
          {children}
        </Collapse>
      )}
    >
      <Text variant="body" textTransform="capitalize">
        {type}
      </Text>
    </ConditionalWrapper>
  );
};
