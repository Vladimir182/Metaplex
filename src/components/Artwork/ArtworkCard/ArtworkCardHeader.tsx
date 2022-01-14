import React from "react";
import { Avatar, Flex, Text, FlexProps } from "@chakra-ui/react";
import { Tag } from "@chakra-ui/tag";

interface Props extends FlexProps {
  img?: string;
  name: string;
}

export const ArtworkCardHeader: React.FC<Props> = ({ img, name, ...rest }) => {
  return (
    <Flex alignItems="center" {...rest}>
      <Avatar size="sm" mr={2} src={img} />
      <Text variant="subtitle">{name}</Text>
      <Tag ml={"auto"}>
        <Text variant="subtitle" fontWeight={"normal"}>
          1 of 1
        </Text>
      </Tag>
    </Flex>
  );
};
