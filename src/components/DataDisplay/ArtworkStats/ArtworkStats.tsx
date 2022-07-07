import {
  HStack,
  StackDivider,
  StackProps,
  Text,
  VStack,
} from "@chakra-ui/layout";
import { IArt, IPrintNumbers } from "state/artworks";

import { SupplyDetails } from "../shared/SupplyDetails";

interface Props extends StackProps, IPrintNumbers {
  artwork?: IArt;
}

export const ArtworkStats: React.FC<Props> = ({ artwork }) => {
  return (
    <HStack
      width="20%"
      spacing={4}
      divider={<StackDivider borderColor="whiteAlpha.100" />}
    >
      <VStack spacing={2} alignItems="start">
        <Text variant="label">MINTED</Text>
        <Text variant="subtitle">
          <SupplyDetails {...artwork?.prints} />
        </Text>
      </VStack>
    </HStack>
  );
};
