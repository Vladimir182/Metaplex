import { Box, Center, Divider, Flex, Text, VStack } from "@chakra-ui/react";
import { DragAndDrop } from "components/DragAndDrop";
import { FileInput } from "components/FileInput";
import {
  FileType,
  FiletypeAcceptMap,
} from "components/MediaTypeSelector/FileType";
import { UploadButton } from "components/UploadButton";
import { useCustomBreakpoints } from "hooks/useCustomBreakpoints";
import { useFileReader } from "hooks/useFileReader";
import { useRef } from "react";
import { FileUploadProps } from "./FileUploadProps";
import { ImagePreview } from "./ImagePreview";

export const FileUploadWithPreview: React.FC<FileUploadProps> = ({
  onFileChange,
  isInvalid,
  variant = "preview",
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  type,
  value,
  disabled,
  ...props
}) => {
  const { mdUp } = useCustomBreakpoints();
  const [imgUrl, setImgUrl, read] = useFileReader(value);
  const fileRef = useRef<HTMLInputElement>(null);

  const dropHandler = (file: File) => {
    onFileChange(file);
    read(file);
  };

  const uploadHandler = (files: FileList) => {
    onFileChange(files[0]);
    read(files[0]);
  };

  const handleSubmitExternalLink = () => {
    const value = fileRef.current?.value;
    if (value) {
      onFileChange(value);
      setImgUrl(value);
    }
  };

  const background =
    imgUrl != null
      ? "linear-gradient(0deg, rgba(0, 0, 0, 0.35), rgba(0, 0, 0, 0.35))"
      : undefined;

  const isLogo = variant === "logo-preview";
  const desktopImageHeight = isLogo ? 216 : 520;

  return (
    <Box {...props}>
      <Box
        layerStyle={isInvalid ? "error" : undefined}
        bg="whiteAlpha.50"
        p={mdUp ? 8 : 4}
        borderRadius="2xl"
        pos="relative"
      >
        <DragAndDrop onFileUpload={dropHandler}>
          <Flex
            minH={mdUp ? desktopImageHeight : 216}
            maxH={isLogo ? desktopImageHeight : undefined}
            overflow={"hidden"}
            pos={"relative"}
            bg={isLogo ? undefined : background}
            borderRadius={"2xl"}
            align="stretch"
          >
            <Center
              role="group"
              pos={"absolute"}
              top={0}
              left={0}
              height={"full"}
              w={"full"}
              borderRadius="2xl"
            >
              <Flex direction="column" align="center">
                {imgUrl === null && (
                  <Text
                    textAlign="center"
                    fontSize="sm"
                    color="whiteAlpha.500"
                    mt={2}
                  >
                    {!isLogo && mdUp ? (
                      <>
                        Drag and drop your file here
                        <br />
                        or use the button to below.
                      </>
                    ) : (
                      "PNG or JPEG. Max 100mb."
                    )}
                  </Text>
                )}
                <UploadButton
                  onUpload={uploadHandler}
                  accept={FiletypeAcceptMap[FileType.IMAGE]}
                  size="xl"
                  mt={6}
                  disabled={disabled}
                  visibility={imgUrl === null ? undefined : "hidden"}
                  _groupHover={{ visibility: "visible" }}
                >
                  {imgUrl === null ? "Choose file" : "Replace file"}
                </UploadButton>
              </Flex>
            </Center>
            <ImagePreview
              imgUrl={imgUrl}
              setImgUrl={setImgUrl}
              variant={variant}
            />
          </Flex>
        </DragAndDrop>
        <Divider />
        <Box mt={8}>
          <VStack align="start">
            <Text fontSize="sm" fontWeight="bold" color="whiteAlpha.500">
              OR USE ABSOLUTE URL TO CONTENT
            </Text>
            <FileInput
              ref={fileRef}
              actionText="Submit"
              disabled={disabled}
              action={handleSubmitExternalLink}
              w="full"
            />
          </VStack>
        </Box>
      </Box>
    </Box>
  );
};
