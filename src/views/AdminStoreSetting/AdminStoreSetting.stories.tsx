import { ComponentMeta, ComponentStory } from "@storybook/react";
import { AdminStoreSetting } from "./AdminStoreSetting";

export default {
  title: "Views/AdminStoreSetting",
  component: AdminStoreSetting,
} as ComponentMeta<typeof AdminStoreSetting>;

export const Default: ComponentStory<typeof AdminStoreSetting> = () => (
  <AdminStoreSetting />
);
