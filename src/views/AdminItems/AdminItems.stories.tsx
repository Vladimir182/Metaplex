import { ComponentMeta, ComponentStory } from "@storybook/react";
import { AdminItems } from "./AdminItems";

export default {
  title: "Views/AdminItems",
  component: AdminItems,
  parameters: { layout: "fullscreen" },
} as ComponentMeta<typeof AdminItems>;

const Template: ComponentStory<typeof AdminItems> = () => <AdminItems />;

export const Default = Template.bind({});
Default.args = {};
