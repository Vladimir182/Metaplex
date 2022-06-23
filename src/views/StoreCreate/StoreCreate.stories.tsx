import { ComponentMeta, ComponentStory } from "@storybook/react";

import { StoreCreate } from "./StoreCreate";

export default {
  title: "Views/StoreCreate",
  component: StoreCreate,
  parameters: { layout: "fullscreen" },
} as ComponentMeta<typeof StoreCreate>;

export const Default: ComponentStory<typeof StoreCreate> = () => (
  <StoreCreate />
);
