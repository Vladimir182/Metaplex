import { ComponentMeta, ComponentStory } from "@storybook/react";
import { AdminListing } from "./AdminListing";

export default {
  title: "Views/AdminListing",
  component: AdminListing,
  parameters: { layout: "fullscreen" },
} as ComponentMeta<typeof AdminListing>;

const Template: ComponentStory<typeof AdminListing> = () => <AdminListing />;

export const Default = Template.bind({});
Default.args = {};
