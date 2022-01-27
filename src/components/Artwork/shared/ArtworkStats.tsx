import {
  HStack,
  StackDivider,
  StackProps,
  Text,
  VStack,
} from "@chakra-ui/layout";

import { ArtworkCardVariant } from "state/artworks";

interface Props extends StackProps {
  variant?: ArtworkCardVariant;
  supply?: number;
  maxSupply?: number;
}

export const ArtworkStats: React.FC<Props> = ({
  variant,
  supply,
  maxSupply,
  ...rest
}) => {
  const isSeller = variant === "onSale";

  return (
    <HStack
      width="20%"
      spacing={4}
      divider={<StackDivider borderColor="whiteAlpha.100" />}
      {...rest}
    >
      {!isSeller && (
        <VStack spacing={2} alignItems="start">
          <Text variant="label">MINTED</Text>
          <Text variant="subtitle">
            {supply} / {maxSupply || "Unlimited"}
          </Text>
        </VStack>
      )}
    </HStack>
  );
};
