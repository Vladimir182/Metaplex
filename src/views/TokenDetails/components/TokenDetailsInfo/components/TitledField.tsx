import { FC } from "react";
import { Divider, StackProps, Text, VStack } from "@chakra-ui/react";

interface ITitledFieldProps {
  title?: string;
  noDivider?: boolean;
  childProps?: StackProps;
}

export const TitledField: FC<ITitledFieldProps> = (props) => {
  const { title, noDivider, childProps } = props;
  return (
    <VStack {...childProps} position="relative" spacing={2} mb={8}>
      <Text variant="label-bold">{title}</Text>
      <Text variant="body-bold">{props.children}</Text>
      {!noDivider && (
        <Divider
          orientation="vertical"
          h="100%"
          borderColor="whiteAlpha.900"
          position="absolute"
          right="0"
        />
      )}
    </VStack>
  );
};
