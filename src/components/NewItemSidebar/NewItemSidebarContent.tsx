import { BoxProps, Heading, Spacer } from "@chakra-ui/react";
import { FC, useCallback } from "react";

import { Commission } from "components/Commission/Commission";
import { ContinueToMint } from "./ContinueToMint";
import { ListForSale } from "components/ListForSale";
import { NewItemSidebarEnum } from "./types";
import { NewItemSidebarMenuItem } from "./NewItemSidebarMenuItem";
import { VStack } from "@chakra-ui/layout";
import { useNavigate } from "react-router-dom";

export interface NewItemSidebarContentProps {
  continueToMint?: (isActive: boolean) => Promise<void>;
  viewInProfile(): void;
  embed(): void;
  listForSale(): void;
  state: NewItemSidebarEnum;
  price: number;
  isFormReady: boolean;
  dollarPrice: number;
  setState(state: NewItemSidebarEnum): void;
}

export const NewItemSidebarContent: FC<NewItemSidebarContentProps & BoxProps> =
  ({
    continueToMint,
    viewInProfile,
    embed,
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
        setState(NewItemSidebarEnum.Sales);
      },
      [continueToMint]
    );

    const goToMediaType = useCallback(() => {
      setState(NewItemSidebarEnum.MEDIA_TYPE);
    }, []);
    const gotToMint = useCallback(() => {
      setState(NewItemSidebarEnum.MINT);
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

        <NewItemSidebarMenuItem
          step={1}
          isActive={state === NewItemSidebarEnum.MEDIA_TYPE}
        >
          Media type
        </NewItemSidebarMenuItem>

        <NewItemSidebarMenuItem
          step={2}
          isActive={state === NewItemSidebarEnum.MINT}
        >
          Mint
        </NewItemSidebarMenuItem>

        <NewItemSidebarMenuItem
          step={3}
          isActive={state === NewItemSidebarEnum.Sales}
        >
          Sales
        </NewItemSidebarMenuItem>

        <Spacer />

        {state === NewItemSidebarEnum.MEDIA_TYPE && (
          <ContinueToMint
            continueMint={gotToMint}
            cancel={() => navigate(-1)}
          />
        )}
        {state === NewItemSidebarEnum.MINT && (
          <Commission
            price={price}
            dollarPrice={dollarPrice}
            isActive={isFormReady}
            onClick={onContinueMinting}
            onCancel={goToMediaType}
          />
        )}

        {state === NewItemSidebarEnum.Sales && (
          <ListForSale
            listForSale={listForSale}
            viewInProfile={viewInProfile}
            embed={embed}
          />
        )}
        {children}
      </VStack>
    );
  };
