import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Commission } from "./Commission";

export default {
  title: "Simple/Commission",
  component: Commission,
} as ComponentMeta<typeof Commission>;

const Template: ComponentStory<typeof Commission> = ({ isActive }) => (
  <Commission
    isActive={isActive}
    price={0.00726}
    dollarPrice={1.05}
    onClick={() => {}}
    onCancel={() => {}}
  />
);

export const Default = Template.bind({});
Default.args = {
  isActive: false,
};

export const Active = Template.bind({});
Active.args = {
  isActive: true,
};
