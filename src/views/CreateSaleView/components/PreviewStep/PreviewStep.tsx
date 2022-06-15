import { FC } from "react";
import { Flex, Box, Heading, Divider, Text } from "@chakra-ui/react";

import { ArtworkSummary } from "components/Artwork/ArtworkSummary";
import { SolUsdDisplay } from "components/SolUsdDisplay/SolUsdDisplay";
import { createSaleFactory } from "views/CreateSaleView/state";

import { toNumber } from "utils/base";
import { useStore } from "effector-react";

export const PreviewStep: FC = () => {
  const { artworkSummary, $saleDetails } = createSaleFactory.useModel();

  const saleDetails = useStore($saleDetails);

  const price = toNumber(saleDetails?.price ?? "0");
  const startDate = saleDetails?.startDate;

  return (
    <Box>
      <Box mb={10}>
        <Heading variant="h3">Preview</Heading>
      </Box>

      <Flex flexDir="column">
        <Heading textTransform="uppercase" fontSize="sm" variant="h5" mb={10}>
          Membership token copies
        </Heading>
        {artworkSummary && (
          <ArtworkSummary {...artworkSummary} w="full" mb={8} />
        )}

        <Box>
          <Heading
            color="whiteAlpha.700"
            fontWeight="normal"
            textTransform="uppercase"
            fontSize="sm"
            variant="h5"
            mb="4"
          >
            Sell Price
          </Heading>
          <SolUsdDisplay sol={price} />
          <Divider mb="4" mt="4" borderColor="whiteAlpha.700" />
        </Box>

        <Box>
          <Heading
            color="whiteAlpha.700"
            fontWeight="normal"
            textTransform="uppercase"
            fontSize="sm"
            variant="h5"
            mb="4"
          >
            START DATE
          </Heading>
          <Text mb={4}>
            {startDate?.toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </Text>
          <Divider mb="4" mt="4" borderColor="whiteAlpha.700" />
        </Box>
      </Flex>
    </Box>
  );
};
