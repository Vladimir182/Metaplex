import { FC } from "react";
import { Divider, VStack, Text, Flex, HStack } from "@chakra-ui/react";

export const PreviewStepAddress: FC<{ second?: boolean }> = ({ second }) => (
  <>
    <Flex
      flexDirection="column"
      justifyContent="space-evenly"
      alignItems="center"
      w="100%"
      minH={209}
      bg="whiteAlpha.50"
      borderRadius={12}
    >
      <VStack w="90%" alignItems="flex-start">
        <Text variant="label-bold">Address 1</Text>
        <Text>CFVTbEuMCo9LPQEwaJHUgccBTgVc1hehwfMVSYHn8L2T</Text>
      </VStack>
      <Divider w="90%" borderColor="whiteAlpha.500" />
      <HStack
        sx={{ "& > div": { marginEndInline: "40%" } }}
        w="90%"
        alignItems="flex-start"
      >
        <VStack alignItems="flex-start">
          <Text variant="label-bold">proportion</Text>
          <Text>10%</Text>
        </VStack>
        {second && (
          <VStack alignItems="flex-start">
            <Text variant="label-bold">% of total</Text>
            <Text>2.5%</Text>
          </VStack>
        )}
      </HStack>
    </Flex>
  </>
);
