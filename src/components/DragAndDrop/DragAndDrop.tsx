import React, { useState } from "react";
import { Box, BoxProps } from "@chakra-ui/react";

interface Props extends BoxProps {
  onFileUpload: (file: File) => void;
}

export const DragAndDrop: React.FC<Props> = ({
  onFileUpload,
  children,
  ...props
}) => {
  const [dragover, setDragover] = useState(false);

  const dropHandler = (ev: React.DragEvent<HTMLDivElement>) => {
    ev.preventDefault();
    setDragover(false);

    if (ev.dataTransfer == null) {
      return;
    }

    const file = ev.dataTransfer.files[0];
    onFileUpload(file);
  };

  const dragEnterHandler = (ev: React.DragEvent<HTMLDivElement>) => {
    ev.preventDefault();
    setDragover(true);
  };

  const dragLeaveHandler = (ev: React.DragEvent<HTMLDivElement>) => {
    ev.preventDefault();
    setDragover(false);
  };

  const background = dragover
    ? "linear-gradient(0deg, rgba(0, 0, 0, 0.35), rgba(0, 0, 0, 0.35))"
    : undefined;

  return (
    <Box
      bg={background}
      onDrop={dropHandler}
      onDragOver={(e) => e.preventDefault()}
      onDragEnter={dragEnterHandler}
      onDragLeave={dragLeaveHandler}
      {...props}
    >
      {children}
    </Box>
  );
};
