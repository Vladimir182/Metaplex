import { ComponentMeta, ComponentStory } from "@storybook/react";

import { Pagination } from ".";

export default {
  title: "Simple/Pagination",
  component: Pagination,
} as ComponentMeta<typeof Pagination>;

const Template: ComponentStory<typeof Pagination> = (args) => (
  <Pagination {...args} />
);

export const Default = Template.bind({});
Default.args = {
  total: 100,
  itemsPerPage: 10,
  currentPage: 1,
  onChange: () => {},
};
