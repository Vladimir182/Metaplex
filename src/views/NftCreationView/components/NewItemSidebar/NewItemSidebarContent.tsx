import { BoxProps, Heading, Spacer } from "@chakra-ui/react";
import { FC, useCallback } from "react";
import { useToast } from "../../../../components/modals/Toast";
import { Commission } from "components/Commission/Commission";
import { ListForSale } from "./components/ListForSale";
import { NewItemSidebarEnum } from "./types";
import { SidebarMenuItemWrapper } from "components/Sidebar/SidebarMenuItemWrapper";
import { VStack } from "@chakra-ui/layout";

export interface NewItemSidebarContentProps {
  continueToMint?: (isActive: boolean) => Promise<void>;
  viewList(): void;
  state: NewItemSidebarEnum;
  price: number;
  isFormReady: boolean;
  dollarPrice: number;
  setState(state: NewItemSidebarEnum): void;
}

export const NewItemSidebarContent: FC<
  NewItemSidebarContentProps & BoxProps
> = ({
  continueToMint,
  viewList,
  state,
  setState,
  children,
  price,
  dollarPrice,
  isFormReady,
  ...boxProps
}) => {
  const toast = useToast();
  const onContinueMinting = useCallback(
    async (isActive: boolean) => {
      if (continueToMint) {
        try {
          await continueToMint(isActive);
          setState(NewItemSidebarEnum.PREVIEW);
        } catch (e) {
          toast({
            title: "Transaction Failed",
            text: "Your transaction rejected.",
            duration: 9000,
          });
        }
      }
    },
    [continueToMint]
  );

  const gotToMint = useCallback(() => {
    setState(NewItemSidebarEnum.CREATE);
  }, []);

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
        New Item
      </Heading>

      <SidebarMenuItemWrapper
        step={1}
        isActive={state === NewItemSidebarEnum.CREATE}
      >
        Create
      </SidebarMenuItemWrapper>

      <SidebarMenuItemWrapper
        step={2}
        isActive={state === NewItemSidebarEnum.PREVIEW}
      >
        Preview
      </SidebarMenuItemWrapper>

      <Spacer />

      {state === NewItemSidebarEnum.CREATE && (
        <Commission
          price={price}
          dollarPrice={dollarPrice}
          isActive={isFormReady}
          onClick={onContinueMinting}
          onCancel={gotToMint}
        />
      )}

      {state === NewItemSidebarEnum.PREVIEW && (
        <ListForSale viewList={viewList} />
      )}
      {children}
    </VStack>
  );
};
