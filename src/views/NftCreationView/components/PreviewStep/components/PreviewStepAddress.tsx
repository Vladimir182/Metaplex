import { FC } from "react";
import { Divider, Flex, HStack, Text, VStack } from "@chakra-ui/react";

import { AddressRow } from "../../../interface";

export const PreviewStepAddress: FC<{
  second?: boolean;
  royalties: AddressRow[];
}> = ({ second, royalties }) => (
  <>
    {royalties.map((item, index) => (
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
          <Text variant="label-bold">Address {index + 1}</Text>
          <Text>{item.address}</Text>
        </VStack>
        <Divider w="90%" borderColor="whiteAlpha.500" />
        <HStack
          sx={{ "& > div": { marginEndInline: "40%" } }}
          w="90%"
          alignItems="flex-start"
        >
          <VStack alignItems="flex-start">
            <Text variant="label-bold">proportion</Text>
            <Text>{item.share}%</Text>
          </VStack>
          {second && (
            <VStack alignItems="flex-start">
              <Text variant="label-bold">% of total</Text>
              <Text>{item.total}%</Text>
            </VStack>
          )}
        </HStack>
      </Flex>
    ))}
  </>
);
