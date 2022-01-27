import {
  Button,
  HStack,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { ArtworkCardVariant } from "state/artworks";
import { MdMoreVert } from "react-icons/md";
import { fontSizes } from "theme/typography";
import { useCustomBreakpoints } from "hooks/useCustomBreakpoints";
import { ROUTES } from "routes";

interface Props {
  id: string;
  newEdition?: () => void;
  remove?: () => void;
  variant?: ArtworkCardVariant;
}

export const ArtworkListItemActions: React.FC<Props> = ({
  id,
  newEdition,
  remove,
  variant,
}) => {
  const { mdUp } = useCustomBreakpoints();
  const isSeller = variant === "onSale";

  if (mdUp) {
    return (
      <HStack
        spacing={2}
        className="buttons"
        alignSelf="stretch"
        alignItems="center"
        ml="auto"
      >
        {isSeller ? (
          <Button onClick={remove} height="unset" variant="tertiary">
            Cancel Listing
          </Button>
        ) : (
          <Button
            variant="tertiary"
            as={Link}
            to={ROUTES.createSale({ ":itemId": id })}
          >
            Sell Tokens
          </Button>
        )}
      </HStack>
    );
  }

  return (
    <Menu>
      <MenuButton
        as={Button}
        variant="tertiary"
        alignSelf="center"
        flexShrink={0}
        px={2}
        ml="auto !important"
      >
        <MdMoreVert size={fontSizes["2xl"]} />
      </MenuButton>
      <MenuList>
        {isSeller ? (
          <MenuItem onClick={remove}>Cancel Listing</MenuItem>
        ) : (
          <>
            <MenuItem onClick={newEdition}>New edition</MenuItem>
            <MenuItem as={Link} to={ROUTES.createSale({ ":itemId": id })}>
              Sell
            </MenuItem>
          </>
        )}
      </MenuList>
    </Menu>
  );
};
