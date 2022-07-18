import { FC, Fragment } from "react";
import { CircularProgress, Divider, Flex } from "@chakra-ui/react";

import { StepListItem } from "components/StepListItem";
import { Step } from "components/Stepper/Step";

export interface IProgressStep {
  title?: string;
  isActive?: boolean;
  isComplete?: boolean;
}

interface Props {
  steps?: IProgressStep[];
}

export const ProgressSteps: FC<Props> = ({ steps }) => {
  if (!steps) return null;

  return (
    <Flex direction="column" borderRadius="12px" overflow="hidden">
      {steps.map((step, index) => (
        <Fragment key={step.title || index}>
          {index !== 0 && <Divider />}
          <StepListItem
            icon={
              step.isActive ? (
                <CircularProgress
                  color="green.500"
                  trackColor="whiteAlpha.100"
                  size="24px"
                  isIndeterminate
                />
              ) : (
                <Step isComplete={step.isComplete} activeColor="green.500">
                  {index + 1}
                </Step>
              )
            }
            fontWeight={{ base: "normal", md: "bold" }}
            bgColor="gray.800"
            borderRadius={0}
            px={6}
          >
            {step.title}
          </StepListItem>
        </Fragment>
      ))}
    </Flex>
  );
};
