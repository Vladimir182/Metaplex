import { FC, useMemo } from "react";
import { Md3DRotation, MdCheck, MdMusicNote } from "react-icons/md";
import { MediaTypeItem } from "./MediaTypeItem";
import { FileType } from "./FileType";
import { VStack } from "@chakra-ui/layout";
import { fontSizes } from "theme/typography";
import { Box, Heading } from "@chakra-ui/react";

interface Props {
  onCategorySelect: (category: FileType) => void;
  category: FileType;
}

export const MediaTypeSelector: FC<Props> = ({
  onCategorySelect,
  category,
}) => {
  const handlers = useMemo(() => {
    return {
      image: () => onCategorySelect(FileType.IMAGE),
      video: undefined, // () => onCategorySelect(FileType.VIDEO),
      audio: undefined, //() => onCategorySelect(FileType.AUDIO),
      vr: undefined, //() => onCategorySelect(FileType.VR),
    };
  }, [onCategorySelect]);

  return (
    <Box>
      <Heading mb={12} variant="h3">
        Select a media type
      </Heading>
      <VStack spacing={4} alignItems="stretch">
        <MediaTypeItem
          isActive={category === FileType.IMAGE}
          typeName="Image"
          accept="JPG, PNG, GIF"
          onClick={handlers.image}
        >
          <MdCheck size={fontSizes["2xl"]} />
        </MediaTypeItem>
        <MediaTypeItem
          isActive={category === FileType.VIDEO}
          typeName="video"
          accept="MP4, MOV"
          onClick={handlers.video}
          disabled
        >
          <MdCheck size={fontSizes["2xl"]} />
        </MediaTypeItem>

        <MediaTypeItem
          isActive={category === FileType.AUDIO}
          typeName="Audio"
          accept="MP3, WAV, FLAC"
          onClick={handlers.audio}
          disabled
        >
          <MdMusicNote size={fontSizes["2xl"]} />
        </MediaTypeItem>

        <MediaTypeItem
          isActive={category === FileType.VR}
          typeName="AR/3D"
          accept="GLB"
          onClick={handlers.vr}
          disabled
        >
          <Md3DRotation size={fontSizes["2xl"]} />
        </MediaTypeItem>
      </VStack>
    </Box>
  );
};
