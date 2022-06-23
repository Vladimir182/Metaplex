import { ComponentMeta, ComponentStory } from "@storybook/react";

import { NftCreationView } from "./NftCreationView";
export default {
  title: "Views/NftCreationView",
  component: NftCreationView,
} as ComponentMeta<typeof NftCreationView>;

const Template: ComponentStory<typeof NftCreationView> = (args) => (
  <NftCreationView {...args} />
);

export const Default = Template.bind({});
Default.parameters = { layout: "fullscreen" };
