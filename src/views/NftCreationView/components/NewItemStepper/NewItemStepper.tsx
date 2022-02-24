import React, { FC } from "react";
import { Flex, Text } from "@chakra-ui/react";
import { Stepper } from "components/Stepper";
import { creationSteps } from "./data";
interface NewItemStepperProps {
  activeStep?: number;
}

export const NewItemStepper: FC<NewItemStepperProps> = ({ activeStep }) => {
  return (
    <Flex alignItems="center">
      <Text marginRight={1} variant="span" fontSize={16} fontWeight={"bold"}>
        New item:
      </Text>
      <Stepper labels={creationSteps} activeStep={activeStep} />
    </Flex>
  );
};
