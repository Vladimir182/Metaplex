import { Heading, StackProps, VStack } from "@chakra-ui/layout";

import { ArtworkBadge } from "components/Artwork/ArtworkBadge";
import { Button } from "@chakra-ui/button";
import { Image } from "@chakra-ui/image";
import { MdOutlineLocalOffer } from "react-icons/md";
import { fontSizes } from "theme/typography";

interface ListingSuccessProps extends StackProps {
  img?: string;
}

export const ListingSuccess: React.FC<ListingSuccessProps> = ({
  img,
  ...props
}) => {
  return (
    <VStack spacing="14px" {...props}>
      <ArtworkBadge
        badgeContent={<MdOutlineLocalOffer size={fontSizes["2xl"]} />}
      >
        <Image w="120px" h="120px" src={img} my={2} />
      </ArtworkBadge>
      <Heading variant="h4">Your NFT is up for sale!</Heading>
      <Button variant="primary" size="lg">
        View in marketplace
      </Button>
      <Button variant="link" p="10px">
        Back to profile
      </Button>
    </VStack>
  );
};
