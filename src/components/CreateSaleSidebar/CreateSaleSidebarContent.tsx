import { BoxProps, Heading, Spacer } from "@chakra-ui/react";
import { FC, useCallback } from "react";

import { CreateSaleSidebarEnum } from "./types";
import { CreateSaleSidebarMenuItem } from "./CreateSaleSidebarMenuItem";
import { VStack } from "@chakra-ui/layout";
import { useNavigate } from "react-router-dom";
import { Commission } from "components/Commission/Commission";

export interface CreateSaleSidebarContentProps {
  state: CreateSaleSidebarEnum;
  setState(state: CreateSaleSidebarEnum): void;
  submit: (isActive: boolean) => Promise<void>;
  onCreate: () => Promise<void>;
  isFormReady: boolean;
}

export const CreateSaleSidebarContent: FC<
  CreateSaleSidebarContentProps & BoxProps
> = ({
  state,
  setState,
  submit,
  onCreate,
  isFormReady,
  children,
  ...boxProps
}) => {
  const navigate = useNavigate();

  const onSubmit = useCallback(
    async (isActive: boolean) => {
      if (submit) {
        await submit(isActive);
      }
      setState(CreateSaleSidebarEnum.PREVIEW);
    },
    [submit]
  );

  return (
    <VStack
      pb={8}
      spacing={2}
      h="full"
      w="full"
      {...boxProps}
      alignItems="stretch"
    >
      <Heading w="full" variant="h5" px={5} p={4}>
        List for Sale
      </Heading>

      <CreateSaleSidebarMenuItem
        step={1}
        isActive={state === CreateSaleSidebarEnum.CONFIGURE}
      >
        Configure Sale
      </CreateSaleSidebarMenuItem>

      <CreateSaleSidebarMenuItem
        step={2}
        isActive={state === CreateSaleSidebarEnum.PREVIEW}
      >
        Preview
      </CreateSaleSidebarMenuItem>

      <Spacer />

      {state === CreateSaleSidebarEnum.CONFIGURE && (
        <Commission
          isActive={isFormReady}
          onClick={onSubmit}
          onCancel={() => navigate(-1)}
          submitText="Next"
        />
      )}

      {state === CreateSaleSidebarEnum.PREVIEW && (
        <Commission
          isActive={isFormReady}
          onClick={onCreate}
          onCancel={() => setState(CreateSaleSidebarEnum.CONFIGURE)}
          submitText="List for sale"
        />
      )}

      {children}
    </VStack>
  );
};
