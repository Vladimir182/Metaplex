import { FC, useEffect } from "react";
import { ArtImage } from "components/ArtPreview";
import { useFileReader } from "hooks/useFileReader";
import { PreviewStepField } from "./components/PreviewStepField";
import { FormData } from "components/forms/NftCreate";
import { FileType } from "components/MediaTypeSelector";
import { VStack } from "@chakra-ui/react";
import { PreviewSale } from "./components/PreviewSale";

interface IPrevieewBodyProps {
  formData: Partial<FormData> | null;
  file: File | null;
  type: FileType;
}

export const PreviewStep: FC<IPrevieewBodyProps> = ({
  formData,
  file,
  type,
}) => {
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
      {sourceUrl && type === FileType.IMAGE && (
        <ArtImage
          uri={sourceUrl}
          mb={12}
          bgColor="whiteAlpha.50"
          borderRadius="xl"
        />
      )}
      {sourceUrl && type === FileType.VIDEO && (
        <video
          style={{
            position: "relative",
            zIndex: -1,
            width: "100%",
          }}
          src={sourceUrl}
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
