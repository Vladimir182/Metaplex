import { ComponentMeta, ComponentStory } from "@storybook/react";

import { Form } from "./Form";

export default {
  title: "Compound/Forms/SaleCreationForm",
  component: Form,
} as ComponentMeta<typeof Form>;

const Template: ComponentStory<typeof Form> = (args) => <Form {...args} />;

export const Default = Template.bind({});
Default.args = {};
