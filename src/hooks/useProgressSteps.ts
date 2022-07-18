import { useMemo } from "react";

import { IProgressStep } from "components/ProgressSteps";

interface ProgressStepsArguments {
  stepsEnum: Record<number | string, number | string>;
  currentStep: number | null;
  getStepTitle: (step: number) => string;
}

export const useProgressSteps = ({
  stepsEnum,
  currentStep,
  getStepTitle,
}: ProgressStepsArguments) => {
  const steps: IProgressStep[] = useMemo(() => {
    return Object.values(stepsEnum)
      .filter((step): step is number => typeof step === "number")
      .map((step) => ({
        title: getStepTitle(step),
        isActive: step === currentStep,
        isComplete: currentStep !== null && step < currentStep,
      }));
  }, [currentStep, getStepTitle, stepsEnum]);

  return steps;
};
