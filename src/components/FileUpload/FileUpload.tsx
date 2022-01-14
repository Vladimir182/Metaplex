import { FileType } from "components/MediaTypeSelector";
import React from "react";
import { FileUploadProps } from "./FileUploadProps";
import { FileUploadSimple } from "./FileUploadSimple";
import { FileUploadWithPreview } from "./FileUploadWithPreview";

export const FileUpload: React.FC<FileUploadProps> = ({
  type = FileType.IMAGE,
  onFileChange,
  isInvalid,
  variant = "base",
  disabled,
  value,
}) => {
  return variant === "base" ? (
    <FileUploadSimple
      onFileChange={onFileChange}
      type={type}
      isInvalid={isInvalid}
      disabled={disabled}
    />
  ) : (
    <FileUploadWithPreview
      variant={variant}
      value={value}
      onFileChange={onFileChange}
      type={type}
      disabled={disabled}
      isInvalid={isInvalid}
    />
  );
};
