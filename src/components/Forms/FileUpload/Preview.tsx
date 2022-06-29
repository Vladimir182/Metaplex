import { FC } from "react";
import { CloseButton, Flex, Image } from "@chakra-ui/react";
import { useCustomBreakpoints } from "hooks/useCustomBreakpoints";

import { ConditionalWrapper } from "./components/ConditionalWrapper";
import { FileUploadProps } from "./interface";

interface Props {
  variant: FileUploadProps["variant"];
  imgUrl: string | null;
  onClear: () => void;
}

export const Preview: FC<Props> = ({ variant, imgUrl, onClear }) => {
  const { mdUp } = useCustomBreakpoints();

  if (!imgUrl) return null;

  const background =
    imgUrl != null
      ? "linear-gradient(0deg, rgba(0, 0, 0, 0.35), rgba(0, 0, 0, 0.35))"
      : undefined;

  const isLogo = variant === "logo-preview";
  const desktopImageHeight = isLogo ? 216 : 520;

  return (
    <>
      {!isLogo && (
        <CloseButton
          pos="absolute"
          top={4}
          right={4}
          onClick={onClear}
          hidden={imgUrl == null}
        />
      )}
      <ConditionalWrapper
        wrap={isLogo}
        wrapper={(wrapperChildren) => (
          <Flex
            maxW={mdUp ? desktopImageHeight : undefined}
            borderRadius={"2xl"}
            bg={background}
            overflow="hidden"
            pos={"relative"}
            align="center"
          >
            {wrapperChildren}
            <CloseButton
              pos="absolute"
              top={4}
              right={4}
              onClick={onClear}
              hidden={imgUrl == null}
            />
          </Flex>
        )}
      >
        <Image
          pos="relative"
          zIndex={-1}
          width="full"
          objectFit="cover"
          src={imgUrl}
        />
      </ConditionalWrapper>
    </>
  );
};
