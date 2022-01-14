import { FileType } from "components/MediaTypeSelector";
import { BoxProps } from "@chakra-ui/react";

export interface FileUploadProps extends BoxProps {
  type?: FileType;
  onFileChange: (data: string | File) => void;
  isInvalid?: boolean;
  value?: File | string;
  disabled?: boolean;
  variant?: "base" | "preview" | "logo-preview";
}
