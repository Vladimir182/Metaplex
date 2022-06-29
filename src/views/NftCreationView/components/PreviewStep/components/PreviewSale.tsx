import { FC } from "react";
import { Heading, Text, VStack } from "@chakra-ui/react";
import { AddressRow } from "views/NftCreationView";

import { PreviewStepAddress } from "./PreviewStepAddress";
import { PreviewStepField } from "./PreviewStepField";
import { getSaleText } from "./utils";

interface IPreviewSaleProps {
  type: "primary" | "secondary";
  royalties?: AddressRow[];
  royalty?: string;
}

export const PreviewSale: FC<IPreviewSaleProps> = ({
  type,
  royalties,
  royalty,
}) => {
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
              value={`${royalty || 0}%`}
            />
            <Text variant="small">
              Define who will get % of the secondary sale of tokens
            </Text>
          </VStack>
        )}
        <VStack w="100%" spacing={4} mt="1">
          {royalties && (
            <PreviewStepAddress
              royalties={royalties}
              second={type === "secondary"}
            />
          )}
        </VStack>
      </VStack>
    </>
  );
};
