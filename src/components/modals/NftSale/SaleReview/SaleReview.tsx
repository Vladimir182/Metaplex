import { Button } from "@chakra-ui/react";
import { Divider, Flex, Heading, Text, VStack } from "@chakra-ui/layout";

import { ArtworkSummary } from "components/Artwork/ArtworkSummary";
import { SolUsdDisplay } from "components/SolUsdDisplay/SolUsdDisplay";
import { TitledBlock } from "components/TitledBlock";
import advancedFormat from "dayjs/plugin/advancedFormat";
import dayjs from "dayjs";
import { useCustomBreakpoints } from "hooks/useCustomBreakpoints";

dayjs.extend(advancedFormat);

export type ArtworkSummaryProps = React.ComponentProps<typeof ArtworkSummary>;
type PriceProps = React.ComponentProps<typeof SolUsdDisplay>;

interface SaleReviewProps {
  artworkSummary: ArtworkSummaryProps;
  priceProps: PriceProps;
  endDate: string | Date;
  onNext?(): void;
}

export const SaleReview: React.FC<SaleReviewProps> = ({
  artworkSummary,
  priceProps,
  endDate,
  onNext,
}) => {
  const { mdUp } = useCustomBreakpoints();

  return (
    <VStack
      align="start"
      spacing={6}
      padding={6}
      borderRadius="xl"
      bgColor="whiteAlpha.50"
    >
      <Heading variant={mdUp ? "h5" : "button"}>Review your listing</Heading>
      <TitledBlock title="NFT" variant="sm" alignSelf="stretch">
        <ArtworkSummary {...artworkSummary} w="full" />
      </TitledBlock>
      <TitledBlock title="Instant buy price" variant="sm">
        <SolUsdDisplay {...priceProps} />
      </TitledBlock>
      <Divider />
      <TitledBlock title="End date" variant="sm">
        <Flex direction="column">
          <Text variant="button">
            {dayjs(endDate).format("dddd, MMMM Do YYYY")}
          </Text>
          <Text variant="body">{dayjs(endDate).format("h:mm A")}</Text>
        </Flex>
      </TitledBlock>

      <Button
        alignSelf="end"
        mt="44px"
        w="134px"
        size="lg"
        variant="primary"
        onClick={onNext}
      >
        Next
      </Button>
    </VStack>
  );
};
