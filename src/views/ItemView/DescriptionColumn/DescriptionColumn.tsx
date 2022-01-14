import { Button, Heading, HStack, Tag, VStack } from "@chakra-ui/react";

import { Details } from "./Details";
import { Person } from "components/Person";
import { Stats } from "./Stats";
import { TitledBlock } from "components/TitledBlock";
import { WalletTransaction } from "components/WalletTransaction";
import { useCustomBreakpoints } from "hooks/useCustomBreakpoints";
import { StackDivider } from "@chakra-ui/layout";

type Statistics = React.ComponentProps<typeof Stats>;
type Artist = React.ComponentProps<typeof Person> & { id: number | string };

interface DescriptionColumnProps {
  title: string;
  stats: Statistics;
  details: string;
  artists: Artist | Artist[];
  tags: string[];
  walletTransaction: React.ComponentProps<typeof WalletTransaction>;
  variant: "sell" | "buy";
}

export const DescriptionColumn: React.FC<DescriptionColumnProps> = ({
  title,
  stats,
  details,
  artists,
  variant = "sell",
  tags,
  walletTransaction,
  children,
}) => {
  const { mdUp } = useCustomBreakpoints();

  const isForSell = variant === "sell";
  const artistsArray = Array.isArray(artists) ? artists : [artists];

  return (
    <VStack divider={mdUp ? <StackDivider /> : undefined} spacing={8}>
      {children}
      <VStack
        align="flex-start"
        overflowY="auto"
        spacing={12}
        maxWidth={mdUp ? 480 : "100%"}
        pt={isForSell ? (mdUp ? 4 : 6) : mdUp ? "72px" : 6}
        pb={12}
        height="100%"
        position="relative"
      >
        <Heading variant="h2">{title}</Heading>
        <Stats {...stats} />

        {!mdUp && !isForSell && (
          <WalletTransaction
            {...walletTransaction}
            alignSelf="stretch"
            alignItems="stretch"
            bottom={0}
          >
            <Button variant="primary" flexGrow={1} w="full">
              Buy now
            </Button>
          </WalletTransaction>
        )}

        <Details>{details}</Details>
        <TitledBlock title="Artists">
          {artistsArray.map((artist) => (
            <Person key={artist.id} {...artist} />
          ))}
        </TitledBlock>
        {tags.length > 0 && (
          <TitledBlock title="View on">
            <HStack>
              {tags.map((tag) => (
                <Tag key={tag}>{tag}</Tag>
              ))}
            </HStack>
          </TitledBlock>
        )}

        {mdUp && !isForSell && (
          <WalletTransaction
            {...walletTransaction}
            alignSelf="stretch"
            position="sticky"
            bottom={0}
          >
            <Button variant="primary">Buy now</Button>
          </WalletTransaction>
        )}
      </VStack>
    </VStack>
  );
};
