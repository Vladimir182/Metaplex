import { ComponentMeta } from "@storybook/react";
import { $isStoreAdmin, $store } from "state/store";
import { store } from "state/store/store.mock";
import { createTemplateWithScope } from "utils/storybook";
import { HomePage } from "./HomePage";

export default {
  title: "Views/HomePage/Layout",
  component: HomePage,
  parameters: { layout: "fullscreen" },
} as ComponentMeta<typeof HomePage>;

export const Seller = createTemplateWithScope(HomePage, {
  values: [[$isStoreAdmin, true], [$store, store], [store.storeId]],
});
