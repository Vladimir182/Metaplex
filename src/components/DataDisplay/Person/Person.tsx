import { Avatar } from "@chakra-ui/avatar";
import { HStack, Text } from "@chakra-ui/react";
import { getPersonName } from "utils/getPersonName";

export interface PersonProps {
  address?: string;
  name?: string;
  avatarUrl?: string;
}

export const Person: React.FC<PersonProps> = ({ address, name, avatarUrl }) => (
  <HStack spacing={4}>
    <Avatar size="sm" src={avatarUrl} />
    <Text>{getPersonName({ name, address })}</Text>
  </HStack>
);
