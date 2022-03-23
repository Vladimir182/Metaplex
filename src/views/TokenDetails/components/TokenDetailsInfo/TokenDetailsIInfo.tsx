import {
  Box,
  VStack,
  Heading,
  Flex,
  Text,
  chakra,
  useClipboard,
  Link,
} from "@chakra-ui/react";
import { CSSObject } from "@emotion/react";
import { MarketState } from "@metaplex-foundation/mpl-fixed-price-sale/dist/src/types";
import { FC } from "react";
import { IArt } from "state/artworks";
import { ArtworkListItemActions } from "views/HomePage/components/TokensList/components/ArtworkListItem/components/ArtworkListItemActions";
import { IArtworkSummary } from "views/TokenDetails/TokenDetails.state";
import { TitledField } from "./components/TitledField";
import { useSolToUsd } from "state/react/useCurrency";
import { truncateDecimals } from "utils/truncateDecimals";
import { CopyButton } from "./components/CopyButton";
import { getShortAddress, getSolExplorerLink } from "./utils";

interface ITokenDetailsInfoProps {
  artwork?: IArt;
  artworkSummary: IArtworkSummary | null;
}
export const TokenDetailsInfo: FC<ITokenDetailsInfoProps> = ({
  artworkSummary,
  artwork,
}) => {
  const fieldProps: { sx: CSSObject } = {
    sx: {
      flex: "0 0 calc(33%)",
      alignItems: "flex-start",
      padding: "0 24px",
    },
  };
  const {
    title,
    artist,
    description,
    total,
    owner,
    edition = 0,
    primarySaleAmount,
  } = artworkSummary || {};
  const { convert } = useSolToUsd();
  const isExhaustedMints =
    artwork && artwork.prints?.supply === artwork.prints?.maxSupply;

  const copyArtist = useClipboard(artist ?? "");
  const copyOwner = useClipboard(owner ?? "");

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
                <CopyButton clipboard={copyArtist} />
              </>
            )}
          </TitledField>
          <TitledField childProps={fieldProps} title="Owner">
            {owner && (
              <>
                <Link
                  textDecor="none"
                  color="whiteAlpha.900"
                  href={getSolExplorerLink(owner)}
                >
                  {getShortAddress(owner)}
                </Link>
                <CopyButton clipboard={copyOwner} />
              </>
            )}
          </TitledField>
          <TitledField childProps={fieldProps} title="Minted" noDivider>
            {`${edition}/${total || "Unlimited"}`}
          </TitledField>
          {!!primarySaleAmount && (
            <TitledField childProps={fieldProps} title="Primary Sale">
              <chakra.span>
                {`${truncateDecimals(primarySaleAmount, 5)} SOL `}
              </chakra.span>
              <chakra.span fontWeight="400" color="whiteAlpha.500">
                / {truncateDecimals(convert(primarySaleAmount), 2)}$
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
          <ArtworkListItemActions
            artwork={artwork}
            state={artwork.state || MarketState.Uninitialized}
            isExhaustedMints={isExhaustedMints}
            endDate={artwork.endDate}
          />
        )}
      </Box>
    </Flex>
  );
};
