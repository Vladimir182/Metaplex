import { FC, Fragment } from "react";
import { Divider, Flex, FlexProps, Text } from "@chakra-ui/react";

import { Step } from "./Step";

interface Props extends FlexProps {
  labels: string[];
  activeStep?: number;
}

export const Stepper: FC<Props> = ({ labels, activeStep = 0, ...props }) => {
  if (!labels.length) return null;
  return (
    <Flex sx={{ margin: 0 }} {...props}>
      {labels.map((label, index) => (
        <Fragment key={`${index}-${label}`}>
          {index !== 0 && (
            <Divider variant="dashed" borderColor="whiteAlpha.400" mb="11px" />
          )}
          <Flex
            sx={{ marginInline: "5%" }}
            alignItems="center"
            position="relative"
          >
            <Step
              size="24px"
              isActive={activeStep === index}
              isComplete={!!activeStep && activeStep > index}
              activeColor="green.500"
            >
              {index + 1}
            </Step>
            <Text sx={{ marginLeft: 2 }} fontWeight="bold" whiteSpace="nowrap">
              {label}
            </Text>
          </Flex>
        </Fragment>
      ))}
    </Flex>
  );
};
