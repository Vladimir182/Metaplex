import { Heading, VStack, Text } from "@chakra-ui/react";
import { FC } from "react";
import { PreviewStepAddress } from "./PreviewStepAddress";
import { PreviewStepField } from "./PreviewStepField";
import { getSaleText } from "./utils";

interface IPreviewSaleProps {
  type: "primary" | "secondary";
}

export const PreviewSale: FC<IPreviewSaleProps> = ({ type }) => {
  const text = getSaleText(type);

  return (
    <>
      <VStack spacing={6} w="100%" alignItems="flex-start">
        <VStack w="100%" alignItems="flex-start" spacing={4}>
          <Heading variant="subtitle-bold">{text.title}</Heading>
          <Text variant="small">{text.titleDesc}</Text>
        </VStack>
        {type === "secondary" && (
          <VStack w="100%" alignItems="flex-start" spacing={12}>
            <PreviewStepField
              title="% of Royalty of the total volume"
              value="10%"
            />
            <Text variant="small">
              Define who will get % of the secondary sale of tokens
            </Text>
          </VStack>
        )}
        <VStack w="100%" spacing={4} mt="1">
          <PreviewStepAddress second={type === "secondary"} />
          <PreviewStepAddress second={type === "secondary"} />
        </VStack>
      </VStack>
    </>
  );
};
