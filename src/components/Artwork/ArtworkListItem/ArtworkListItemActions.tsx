import { Button, HStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { ROUTES } from "routes";

interface Props {
  id: string;
}

export const ArtworkListItemActions: React.FC<Props> = ({ id }) => {
  return (
    <HStack
      spacing={2}
      className="buttons"
      alignSelf="stretch"
      alignItems="center"
      ml="auto"
    >
      <Button
        variant="tertiary"
        as={Link}
        to={ROUTES.createSale({ ":itemId": id })}
      >
        Sell Tokens
      </Button>
    </HStack>
  );
};
