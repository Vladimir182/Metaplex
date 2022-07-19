import { FC, useEffect } from "react";
import { Button, Divider, Flex, VStack } from "@chakra-ui/react";
import { useFileReader } from "hooks/useFileReader";
import { FormData } from "views/NftCreationView";

import { ArtImage } from "components/DataDisplay/ArtImage";

import { PreviewSale } from "./components/PreviewSale";
import { PreviewStepField } from "./components/PreviewStepField";

interface IPrevieewBodyProps {
  previewForm: Partial<FormData> | null;
  onBack: () => void;
  onMint: () => void;
}

export const PreviewStep: FC<IPrevieewBodyProps> = ({
  previewForm,
  onBack,
  onMint,
}) => {
  const {
    file,
    title,
    desc,
    supply,
    secondaryRoyalties,
    primaryRoyalties,
    royalty,
  } = previewForm || {};
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
          {desc && <PreviewStepField title="Description" value={desc} />}
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

      <Divider mt={10} mb={8} />

      <Flex>
        <Button variant="tertiary" px={12} onClick={onBack}>
          Back
        </Button>
        <Button
          px={7}
          type="submit"
          variant="primary"
          ml="auto"
          onClick={onMint}
        >
          Create NFT
        </Button>
      </Flex>
    </>
  );
};
