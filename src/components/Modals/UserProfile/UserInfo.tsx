import { MdContentCopy, MdDone } from "react-icons/md";
import {
  Avatar,
  Button,
  Heading,
  HStack,
  useClipboard,
  VStack,
} from "@chakra-ui/react";
import { fontSizes } from "theme/typography";
import { getPersonName } from "utils/getPersonName";

import { PersonProps } from "components/DataDisplay/Person";

interface Props {
  user: PersonProps;
  variant?: "sidebar" | "profile-popover";
}

export const UserInfo: React.FC<Props> = ({
  user: { address, avatarUrl, name },
  variant = "sidebar",
}) => {
  const { hasCopied, onCopy } = useClipboard(address ?? "");

  return (
    <VStack px={6} py={2} spacing={4}>
      <Avatar size={variant === "sidebar" ? "2xl" : "md"} src={avatarUrl} />
      <HStack>
        <Heading variant={variant === "sidebar" ? "h4" : "h5"}>
          {getPersonName({ name, address })}
        </Heading>
        <Button
          onClick={address ? onCopy : undefined}
          variant="ghost"
          p={1}
          color="whiteAlpha.700"
        >
          {hasCopied ? (
            <MdDone size={fontSizes["2xl"]} />
          ) : (
            <MdContentCopy size={fontSizes["2xl"]} />
          )}
        </Button>
      </HStack>
    </VStack>
  );
};
