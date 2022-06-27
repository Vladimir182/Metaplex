import { FC } from "react";
import {
  Box,
  chakra,
  Flex,
  Heading,
  Link,
  Text,
  useClipboard,
  VStack,
} from "@chakra-ui/react";
import { IArt } from "state/artworks";
import { useSolToUsd } from "state/react/useSolToUsd";
import { IFixedPrice } from "state/sales";
import { truncateDecimals } from "utils/truncateDecimals";
import { Actions } from "views/HomePage/components/TokensList/components/ListItem/components/Actions";

import { CopyButton } from "./components/CopyButton";
import { TitledField } from "./components/TitledField";
import { getShortAddress, getSolExplorerLink } from "./utils";

interface DetailsProps {
  artwork: IArt;
  sale?: IFixedPrice;
}
export const Details: FC<DetailsProps> = ({ artwork, sale }) => {
  const fieldProps = {
    flex: "0 0 calc(33%)",
    alignItems: "flex-start",
    padding: "0 24px",
  };

  const { earnings } = sale || {};
  const { title, description, ownerAddress, creators, prints } = artwork;
  const artist = creators[0]?.address;

  const usd = useSolToUsd(earnings);
  const isSoldOut =
    artwork && artwork.prints?.supply === artwork.prints?.maxSupply;

  const artistClipboard = useClipboard(artist ?? "");
  const ownerClipboard = useClipboard(ownerAddress ?? "");

  return (
    <Flex flex="1 0 49%" flexDir="column">
      <VStack
        boxSizing="border-box"
        maxW="650px"
        alignItems="flex-start"
        paddingTop={12}
      >
        <Heading paddingX={6} variant="h2">
          {title}
        </Heading>
        <Flex flexWrap="wrap" w="100%" alignItems="flex-start" paddingTop={12}>
          <TitledField childProps={fieldProps} title="Creator">
            {artist && (
              <>
                <Link
                  textDecor="none"
                  color="whiteAlpha.900"
                  href={getSolExplorerLink(artist)}
                >
                  {getShortAddress(artist)}
                </Link>
                <CopyButton clipboard={artistClipboard} />
              </>
            )}
          </TitledField>
          <TitledField childProps={fieldProps} title="Owner">
            {ownerAddress && (
              <>
                <Link
                  textDecor="none"
                  color="whiteAlpha.900"
                  href={getSolExplorerLink(ownerAddress)}
                >
                  {getShortAddress(ownerAddress)}
                </Link>
                <CopyButton clipboard={ownerClipboard} />
              </>
            )}
          </TitledField>
          <TitledField childProps={fieldProps} title="Minted" noDivider>
            {`${prints?.supply || 0}/${prints?.maxSupply || "Unlimited"}`}
          </TitledField>
          {earnings !== undefined && (
            <TitledField childProps={fieldProps} title="Primary Sale">
              <chakra.span>{`${truncateDecimals(
                earnings,
                5
              )} SOL `}</chakra.span>
              <chakra.span fontWeight="400" color="whiteAlpha.500">
                / {truncateDecimals(usd, 2)}$
              </chakra.span>
            </TitledField>
          )}
        </Flex>
        <VStack maxW="100%" paddingX={6} alignItems="flex-start">
          <Text variant="label">Description</Text>
          <Text maxW="100%">{description}</Text>
        </VStack>
      </VStack>
      <Box mt="auto" alignSelf="flex-end" paddingX={6} pb={6}>
        {artwork && (
          <Actions artwork={artwork} sale={sale} isSoldOut={isSoldOut} />
        )}
      </Box>
    </Flex>
  );
};
