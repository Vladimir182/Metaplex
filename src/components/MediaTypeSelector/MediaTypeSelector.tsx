import { FC, useMemo } from "react";
import { MdOutlineImage, MdOutlinePlayCircle } from "react-icons/md";
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
      video: () => onCategorySelect(FileType.VIDEO),
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
          accept="JPG, PNG, SVG, GIF"
          onClick={handlers.image}
        >
          <MdOutlineImage size={fontSizes["2xl"]} />
        </MediaTypeItem>
        <MediaTypeItem
          isActive={category === FileType.VIDEO}
          typeName="video"
          accept="MP4"
          onClick={handlers.video}
        >
          <MdOutlinePlayCircle size={fontSizes["2xl"]} />
        </MediaTypeItem>
      </VStack>
    </Box>
  );
};
