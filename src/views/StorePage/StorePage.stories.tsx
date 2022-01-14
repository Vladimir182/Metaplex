import { ComponentMeta } from "@storybook/react";
import { $isStoreAdmin, $store, $walletStoreId } from "state/store";
import { store } from "state/store/store.mock";
import { createTemplateWithScope } from "utils/storybook";
import { StorePage } from ".";

export default {
  title: "Views/StorePage/Layout",
  component: StorePage,
  parameters: { layout: "fullscreen" },
} as ComponentMeta<typeof StorePage>;

export const Seller = createTemplateWithScope(StorePage, {
  values: [
    [$isStoreAdmin, true],
    [$store, store],
    [$walletStoreId, store.storeId],
  ],
});

export const Buyer = createTemplateWithScope(StorePage, {
  values: [
    [$isStoreAdmin, false],
    [$store, store],
    [$walletStoreId, "test"],
  ],
});
