import { ComponentStory, ComponentMeta } from "@storybook/react";
import { ListingFailure } from ".";

export default {
  title: "Compound/Modals/NftSale/ListingFailure",
  component: ListingFailure,
} as ComponentMeta<typeof ListingFailure>;

const Template: ComponentStory<typeof ListingFailure> = (args) => (
  <ListingFailure {...args} />
);

export const Default = Template.bind({});
Default.args = {
  title: "Transaction error",
  bodyText: "Your transaction was no completed for <Reason>.",
};
