import { BoxProps, Heading, Spacer } from "@chakra-ui/react";
import { FC, useCallback } from "react";

import { Commission } from "components/Commission/Commission";
import { ContinueToMint } from "./components/ContinueToMint";
import { ListForSale } from "./components/ListForSale";
import { NewItemSidebarEnum } from "./types";
import { SidebarMenuItemWrapper } from "components/Sidebar/SidebarMenuItemWrapper";
import { VStack } from "@chakra-ui/layout";
import { useNavigate } from "react-router-dom";

export interface NewItemSidebarContentProps {
  continueToMint?: (isActive: boolean) => Promise<void>;
  viewList(): void;
  listForSale?: () => void;
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
  listForSale,
  state,
  setState,
  children,
  price,
  dollarPrice,
  isFormReady,
  ...boxProps
}) => {
  const navigate = useNavigate();

  const onContinueMinting = useCallback(
    async (isActive: boolean) => {
      if (continueToMint) {
        await continueToMint(isActive);
      }
      setState(NewItemSidebarEnum.PREVIEW);
    },
    [continueToMint]
  );

  const goToMediaType = useCallback(() => {
    setState(NewItemSidebarEnum.MEDIA_TYPE);
  }, []);
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
        isActive={state === NewItemSidebarEnum.MEDIA_TYPE}
      >
        Media type
      </SidebarMenuItemWrapper>

      <SidebarMenuItemWrapper
        step={2}
        isActive={state === NewItemSidebarEnum.CREATE}
      >
        Create
      </SidebarMenuItemWrapper>

      <SidebarMenuItemWrapper
        step={3}
        isActive={state === NewItemSidebarEnum.PREVIEW}
      >
        Preview
      </SidebarMenuItemWrapper>

      <Spacer />

      {state === NewItemSidebarEnum.MEDIA_TYPE && (
        <ContinueToMint continueMint={gotToMint} cancel={() => navigate(-1)} />
      )}
      {state === NewItemSidebarEnum.CREATE && (
        <Commission
          price={price}
          dollarPrice={dollarPrice}
          isActive={isFormReady}
          onClick={onContinueMinting}
          onCancel={goToMediaType}
        />
      )}

      {state === NewItemSidebarEnum.PREVIEW && (
        <ListForSale listForSale={listForSale} viewList={viewList} />
      )}
      {children}
    </VStack>
  );
};
