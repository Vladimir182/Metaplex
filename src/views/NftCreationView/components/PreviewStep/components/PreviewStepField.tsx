import { FC } from "react";
import { Divider, Flex, Text, VStack } from "@chakra-ui/react";

interface IPreviewStepFieldProps {
  title?: string;
  value?: string;
  values?: Array<string | undefined>;
  description?: string;
}

export const PreviewStepField: FC<IPreviewStepFieldProps> = (props) => {
  const { title, description, value, values } = props;
  return (
    <VStack w="100%" spacing={4} alignItems="flex-start">
      <VStack spacing={1} alignItems="flex-start">
        <Text variant="label-bold" textTransform="uppercase">
          {title}
        </Text>
        {description && <Text variant="small-transparent">{description}</Text>}
      </VStack>
      <Flex justifyContent="space-between" w="100%">
        {value && <Text variant="body-bold">{value}</Text>}
        {values &&
          values.map((value, i) => (
            <Text key={i} variant="body-bold">
              {value}
            </Text>
          ))}
      </Flex>
      <Divider borderColor="white" />
    </VStack>
  );
};
