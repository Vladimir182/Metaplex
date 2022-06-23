import React, { useEffect, useRef } from "react";
import { Button, ButtonProps } from "@chakra-ui/react";

const defaultAccept = ".png,.jpg,.gif,.mp4,.svg";
interface UploadButtonProps extends ButtonProps {
  onUpload: (files: FileList) => void;
  accept?: string;
  imgUrl?: string | null;
}

export const UploadButton: React.FC<UploadButtonProps> = ({
  onUpload,
  accept = defaultAccept,
  imgUrl,
  children,
  ...buttonProps
}) => {
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (imgUrl === null && ref.current) {
      ref.current.value = "";
    }
  }, [imgUrl]);

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
