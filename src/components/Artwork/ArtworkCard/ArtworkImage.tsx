import { Collapse } from "@chakra-ui/transition";
import { ConditionalWrapper } from "components/utility/ConditionalWrapper";
import { Image } from "@chakra-ui/image";
import { customSize } from "global-const/customSize";

interface Props {
  expanded?: boolean;
  imgUrl: string;
  smUp?: boolean;
}

export const ArtworkImage: React.FC<Props> = ({ expanded, imgUrl, smUp }) => {
  return (
    <ConditionalWrapper
      wrap={smUp}
      wrapper={(children) => (
        <Collapse
          in={!expanded}
          startingHeight={256}
          endingHeight={280}
          transition={{
            enter: { height: { duration: 0.2 } },
            exit: { height: { duration: 0.3 } },
          }}
        >
          {children}
        </Collapse>
      )}
    >
      <Image
        w="100%"
        h="100%"
        maxH={customSize.artwork.image.maxH}
        src={imgUrl}
        objectFit="contain"
      />
    </ConditionalWrapper>
  );
};
