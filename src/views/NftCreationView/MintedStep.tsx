import { FC, useEffect } from "react";
import { Flex, Heading, Text } from "@chakra-ui/react";

import { ArtImage } from "components/ArtPreview";
import { useFileReader } from "hooks/useFileReader";
import { FileType } from "components/MediaTypeSelector/FileType";

export const MintedStep: FC<{
  file: File | null;
  type: FileType;
}> = ({ file, type }) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [sourceUrl, _, read] = useFileReader();

  useEffect(() => {
    if (file) {
      read(file);
    }
  }, [file]);
  return (
    <Flex direction="column" mb={10}>
      <Heading variant="h2">Your membership token has been created!</Heading>
      <Text mt={4} color="whiteAlpha.500" fontSize="lg" lineHeight="base">
        Need Congrats! You created a new NFT and added it to you profile. You
        can list it for instant sale if you’d like..
      </Text>

      {sourceUrl && type === FileType.IMAGE && (
        <ArtImage
          uri={sourceUrl}
          my={12}
          bgColor="whiteAlpha.50"
          borderRadius="xl"
        />
      )}
      {sourceUrl && type === FileType.VIDEO && (
        <video
          style={{
            position: "relative",
            zIndex: -1,
            width: "100%",
          }}
          src={sourceUrl}
        />
      )}
    </Flex>
  );
};
