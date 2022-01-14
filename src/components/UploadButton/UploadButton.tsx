import React, { useRef } from "react";
import { Button, ButtonProps } from "@chakra-ui/react";

const defaultAccept = ".png,.jpg,.gif,.mp4,.svg";
interface UploadButtonProps extends ButtonProps {
  onUpload: (files: FileList) => void;
  accept?: string;
}

export const UploadButton: React.FC<UploadButtonProps> = ({
  onUpload,
  accept = defaultAccept,
  children,
  ...buttonProps
}) => {
  const ref = useRef<HTMLInputElement>(null);

  return (
    <>
      <Button
        {...buttonProps}
        variant="tertiary"
        onClick={() => ref.current?.click()}
      >
        {children}
      </Button>
      <input
        ref={ref}
        multiple={false}
        onInput={() => ref.current?.files && onUpload(ref.current?.files)}
        accept={accept}
        hidden
        type="file"
      />
    </>
  );
};
