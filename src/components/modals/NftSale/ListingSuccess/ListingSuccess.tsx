import { Heading, StackProps, VStack } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/button";
import { Image } from "@chakra-ui/image";
import { MdOutlineLocalOffer } from "react-icons/md";

import { ArtworkBadge } from "components/Artwork/ArtworkBadge";
import { fontSizes } from "theme/typography";
import { Link } from "react-router-dom";
import { ROUTES } from "routes";

interface ListingSuccessProps extends StackProps {
  img?: string;
}

export const ListingSuccess: React.FC<ListingSuccessProps> = ({
  img,
  ...props
}) => {
  return (
    <VStack spacing={6} {...props} p="104px 48px 40px">
      <ArtworkBadge
        badgeContent={
          <MdOutlineLocalOffer size={fontSizes["2xl"]} color="black" />
        }
      >
        <Image w="120px" h="120px" src={img} my={2} />
      </ArtworkBadge>
      <Heading variant="h4">Your item is up for sale!</Heading>
      <Button variant="link" p="10px" as={Link} to={ROUTES.home()}>
        All items
      </Button>
    </VStack>
  );
};
