import { FC, useEffect } from "react";
import { Flex, Heading, Text } from "@chakra-ui/react";

import { ArtImage } from "components/ArtPreview";
import { MetadataJson } from "@metaplex/js";
import { TitledBlock } from "components/TitledBlock";
import { useFileReader } from "hooks/useFileReader";

export const MintedStep: FC<{
  file: File | null;
  metadata: MetadataJson | null;
  maxSupply: number | null | undefined;
}> = ({ file, metadata, maxSupply }) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [sourceUrl, _, read] = useFileReader();

  useEffect(() => {
    if (file) {
      read(file);
    }
  }, [file]);
  return (
    <Flex direction="column" mb={10}>
      <Heading variant="h2">Minted</Heading>
      <Text mt={4} color="whiteAlpha.500" fontSize="lg" lineHeight="base">
        Congrats! You created a new NFT and added it to you profile. You can
        list it for instant sale if you’d like.
      </Text>

      {sourceUrl && (
        <ArtImage
          uri={sourceUrl}
          my={12}
          bgColor="whiteAlpha.50"
          borderRadius="xl"
        />
      )}

      <Heading variant="h3">{metadata?.name}</Heading>
      {metadata?.description && (
        <Text mt={4} color="whiteAlpha.500" fontSize="lg" lineHeight="base">
          {metadata.description}
        </Text>
      )}

      <TitledBlock title="Copies" variant="sm" mt={12}>
        <Text>{maxSupply ?? 0}</Text>
      </TitledBlock>

      <TitledBlock title="Royalty Percentage" variant="sm" mt={12}>
        <Text>
          {metadata?.seller_fee_basis_points
            ? `${metadata?.seller_fee_basis_points / 100}%`
            : "0%"}
        </Text>
      </TitledBlock>
    </Flex>
  );
};
