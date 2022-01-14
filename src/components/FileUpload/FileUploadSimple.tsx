import React, { useRef, useState } from "react";
import { FileUploadProps } from "./FileUploadProps";
import { HStack, Input, Tab, TabList, Tabs, VStack } from "@chakra-ui/react";
import { UploadButton } from "components/UploadButton";
import { FileType, FiletypeAcceptMap } from "components/MediaTypeSelector";
import { DragAndDrop } from "components/DragAndDrop";

export const FileUploadSimple: React.FC<FileUploadProps> = ({
  onFileChange,
  isInvalid,
  disabled,
  type = FileType.IMAGE,
}) => {
  const isLocalFileRef = useRef(false);
  const [url, setUrl] = useState("");
  const [tab, setTab] = useState(0);

  const dropHandler = (file: File) => {
    isLocalFileRef.current = true;
    setUrl(file.name);
    onFileChange(file);
  };

  const uploadHandler = (files: FileList) => {
    const file = files[0];

    isLocalFileRef.current = true;
    setUrl(file.name);
    onFileChange(file);
  };

  const changeHandler = (value: string) => {
    isLocalFileRef.current = false;
    setUrl(value);
    onFileChange(value);
  };

  return (
    <VStack
      layerStyle={isInvalid ? "error" : "base"}
      p={8}
      spacing={4}
      align="start"
    >
      <Tabs onChange={setTab} defaultIndex={0}>
        <TabList>
          <Tab>Upload a file</Tab>
          <Tab>Enter a URL</Tab>
        </TabList>
      </Tabs>
      <DragAndDrop onFileUpload={dropHandler} w="full">
        <HStack w="full" spacing={4}>
          <Input
            onClick={() => isLocalFileRef.current && setUrl("")}
            value={url}
            disabled={disabled}
            onChange={(e) => changeHandler(e.target.value)}
            bg="whiteAlpha.50"
            color="whiteAlpha.700"
            _placeholder={{ color: "whiteAlpha.700" }}
            placeholder="http://example.io/page/image.jpg"
          />
          {!tab && (
            <UploadButton
              h="56px"
              disabled={disabled}
              accept={FiletypeAcceptMap[type]}
              onUpload={uploadHandler}
            >
              Select File
            </UploadButton>
          )}
        </HStack>
      </DragAndDrop>
    </VStack>
  );
};
