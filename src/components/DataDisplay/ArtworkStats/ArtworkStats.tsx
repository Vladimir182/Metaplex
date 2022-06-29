import {
  HStack,
  StackDivider,
  StackProps,
  Text,
  VStack,
} from "@chakra-ui/layout";

interface Props extends StackProps {
  supply?: number;
  maxSupply?: number;
}

export const ArtworkStats: React.FC<Props> = ({
  supply,
  maxSupply,
  ...rest
}) => {
  return (
    <HStack
      width="20%"
      spacing={4}
      divider={<StackDivider borderColor="whiteAlpha.100" />}
      {...rest}
    >
      <VStack spacing={2} alignItems="start">
        <Text variant="label">MINTED</Text>
        <Text variant="subtitle">
          {supply} / {maxSupply || "Unlimited"}
        </Text>
      </VStack>
    </HStack>
  );
};
