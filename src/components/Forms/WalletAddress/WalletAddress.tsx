import React from "react";
import {
  Avatar,
  AvatarProps,
  Box,
  FlexProps,
  HStack,
  Tag,
  Text,
  TextProps,
} from "@chakra-ui/react";
import { useShortAddress } from "hooks/useShortAddress";

import { CopyButton } from "components/Buttons/CopyButton";

interface Props extends FlexProps {
  address: string;
  cropSize?: number;
  noAvatar?: boolean;
  avatarSize?: AvatarProps["size"];
  isOwner?: boolean;
  enableCopying?: boolean;
  textProps?: TextProps;
  inline?: boolean;
}

// TODO: WalletAddress vs Person
export const WalletAddress: React.FC<Props> = ({
  avatarSize = "2xs",
  cropSize = 4,
  noAvatar,
  address,
  isOwner,
  enableCopying,
  textProps,
  inline = false,
  ...props
}) => {
  const shortAddress = useShortAddress(address, cropSize);

  return (
    <Box
      {...(inline && {
        display: "inline-block",
        ml: 1,
        color: "white",
      })}
      {...props}
    >
      <HStack spacing={2} alignItems="center">
        {!noAvatar && <Avatar size={avatarSize} />}
        <Text variant="body" {...textProps}>
          {shortAddress ?? address}
        </Text>
        {enableCopying && (
          <CopyButton text={address || ""} variant="link" size="xs" />
        )}
        {isOwner && (
          <Box pl={2}>
            <Tag variant="filled">You</Tag>
          </Box>
        )}
      </HStack>
    </Box>
  );
};
