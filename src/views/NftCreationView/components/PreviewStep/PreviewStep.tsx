import { FC, useEffect } from "react";
import { VStack } from "@chakra-ui/react";
import { useFileReader } from "hooks/useFileReader";
import { FormData } from "views/NftCreationView/components/NftCreate";

import { ArtImage } from "components/DataDisplay/ArtImage";

import { PreviewSale } from "./components/PreviewSale";
import { PreviewStepField } from "./components/PreviewStepField";

interface IPrevieewBodyProps {
  formData: Partial<FormData> | null;
  file: File | null;
}

export const PreviewStep: FC<IPrevieewBodyProps> = ({ formData, file }) => {
  const { title, desc, supply, secondaryRoyalties, primaryRoyalties, royalty } =
    formData || {};
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [sourceUrl, _, read] = useFileReader();
  const supplyType = supply && parseInt(supply) > 0 ? "Limited" : "Unlimited";
  useEffect(() => {
    if (file) {
      read(file);
    }
  }, [file]);

  return (
    <>
      {sourceUrl && (
        <ArtImage
          uri={sourceUrl}
          mb={12}
          bgColor="whiteAlpha.50"
          borderRadius="xl"
        />
      )}
      <VStack spacing={6}>
        <VStack spacing={6} w="100%">
          <PreviewStepField title="Title" value={title} />
          <PreviewStepField title="Description" value={desc} />
          <PreviewStepField
            title="maximum supply"
            description="Maximum amount of tokens could be distributed"
            values={[supply, supplyType]}
          />
        </VStack>
        <VStack w="100%" spacing={12}>
          <PreviewSale type="primary" royalties={primaryRoyalties} />
          <PreviewSale
            type="secondary"
            royalty={royalty}
            royalties={secondaryRoyalties}
          />
        </VStack>
      </VStack>
    </>
  );
};
