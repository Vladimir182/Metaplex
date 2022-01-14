import { CloseButton, Flex, Image } from "@chakra-ui/react";

import { ConditionalWrapper } from "components/utility/ConditionalWrapper";
import { FC } from "react";
import { FileUploadProps } from ".";
import { useCustomBreakpoints } from "hooks/useCustomBreakpoints";

interface Props {
  variant: FileUploadProps["variant"];
  imgUrl: string | null;
  setImgUrl: (url: string | null) => void;
}

export const ImagePreview: FC<Props> = ({ variant, imgUrl, setImgUrl }) => {
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
          onClick={() => setImgUrl(null)}
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
              onClick={() => setImgUrl(null)}
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
