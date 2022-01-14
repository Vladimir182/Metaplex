import { Button } from "@chakra-ui/button";
import { Collapse } from "@chakra-ui/transition";
import { ConditionalWrapper } from "components/utility/ConditionalWrapper";
import { Divider, Flex } from "@chakra-ui/layout";
import { MdChevronRight } from "react-icons/md";
import { Box } from "@chakra-ui/react";

interface Props {
  expanded?: boolean;
  smUp?: boolean;
  primaryAction?: () => void;
  secondaryAction?: () => void;
}

export const ArtworkCardButtons: React.FC<Props> = ({
  expanded,
  smUp,
  primaryAction,
  secondaryAction,
}) => {
  const isAdmin = false;
  const isSeller = false;

  return (
    <ConditionalWrapper
      wrap={smUp}
      wrapper={(children) => (
        <Collapse
          in={expanded}
          transition={{
            enter: { height: { duration: 0.3 } },
            exit: { height: { duration: 0.2 } },
          }}
        >
          {children}
        </Collapse>
      )}
    >
      {isSeller ? (
        <Box>
          <Divider mb={4} />
          <Button variant="link" color="whiteAlpha.500">
            Cancel Listing
          </Button>
        </Box>
      ) : (
        <Flex justifyContent={"space-between"}>
          <Button
            onClick={secondaryAction}
            variant="tertiary"
            py={4}
            size="lg"
            flexGrow={1}
            fontSize="md"
          >
            {isAdmin ? "New Edition" : "Buy now"}
          </Button>
          <Button
            onClick={primaryAction}
            ml={4}
            variant={isAdmin ? "tertiary" : "solid"}
            rightIcon={isAdmin ? undefined : <MdChevronRight />}
            py={4}
            size="lg"
            flexGrow={1}
            flexBasis="50%"
            fontSize="md"
          >
            {isAdmin ? "Sell" : "Go to Sale"}
          </Button>
        </Flex>
      )}
    </ConditionalWrapper>
  );
};
