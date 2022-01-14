import { ComponentMeta, ComponentStory } from "@storybook/react";

import { CongratulationsModal } from ".";

export default {
  title: "Views/StorePage/CongratulationsModal",
  component: CongratulationsModal,
  parameters: { layout: "fullscreen" },
} as ComponentMeta<typeof CongratulationsModal>;

const Template: ComponentStory<typeof CongratulationsModal> = (args) => (
  <CongratulationsModal {...args} />
);

export const Default = Template.bind({});
Default.args = { forceOpen: true };
