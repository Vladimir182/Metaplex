import { FC, Fragment } from "react";
import { Divider, Flex, FlexProps, Text, VStack } from "@chakra-ui/react";

import { Step } from "./Step";

interface Props extends FlexProps {
  labels: string[];
  activeStep?: number;
}

export const Stepper: FC<Props> = ({ labels, activeStep = 0, ...props }) => {
  if (!labels.length) return null;
  return (
    <Flex align="end" mx={12} {...props}>
      {labels.map((label, index) => (
        <Fragment key={`${index}-${label}`}>
          {index !== 0 && (
            <Divider variant="dashed" borderColor="whiteAlpha.400" mb="11px" />
          )}
          <VStack width="24px" position="relative">
            <Text variant="label" whiteSpace="nowrap">
              {label}
            </Text>
            <Step
              size="24px"
              isActive={activeStep === index}
              isComplete={!!activeStep && activeStep > index}
              activeColor="green.500"
            >
              {index + 1}
            </Step>
          </VStack>
        </Fragment>
      ))}
    </Flex>
  );
};
