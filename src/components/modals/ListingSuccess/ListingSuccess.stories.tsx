import { ComponentMeta, ComponentStory } from "@storybook/react";

import { ListingSuccess } from ".";

export default {
  title: "Compound/Modals/NftSale/ListingSuccess",
  component: ListingSuccess,
} as ComponentMeta<typeof ListingSuccess>;

const Template: ComponentStory<typeof ListingSuccess> = (args) => (
  <ListingSuccess {...args} />
);

export const Default = Template.bind({});
Default.args = { img: "https://picsum.photos/id/1051/560/560" };
