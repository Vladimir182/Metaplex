import { ComponentStory, ComponentMeta } from "@storybook/react";

import { StoreCreateForm } from "./StoreCreateForm";

export default {
  title: "Compound/Forms/StoreCreate",
  component: StoreCreateForm,
  argTypes: {
    onSubmit: { action: "submitting" },
  },
} as ComponentMeta<typeof StoreCreateForm>;

const Template: ComponentStory<typeof StoreCreateForm> = (args) => (
  <StoreCreateForm {...args} />
);

export const Story = Template.bind({});
Story.args = {};
