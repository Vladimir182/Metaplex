import { FC } from "react";
import { Flex, Text } from "@chakra-ui/react";
import { useSolToUsd } from "state/react/useSolToUsd";
import { truncateDecimals } from "utils/truncateDecimals";

import { TitledBlock } from "components/DataDisplay/TitledBlock";
import { SolanaIcon } from "components/Icons";

interface Props {
  sol?: number | null;
}

export const StartingPrice: FC<Props> = ({ sol = 0 }) => {
  const usd = useSolToUsd(sol);
  return (
    <TitledBlock
      title="Starting price"
      variant="xs"
      align="end"
      titleProps={{ textAlign: "right" }}
      subtitleProps={{ textAlign: "right" }}
    >
      <Flex align="center" mb={1}>
        <SolanaIcon boxSize="24px" />
        <Text variant="subtitle-bold">{truncateDecimals(sol, 5)} SOL</Text>
      </Flex>
      <Text variant="small">${truncateDecimals(usd, 2)}</Text>
    </TitledBlock>
  );
};
