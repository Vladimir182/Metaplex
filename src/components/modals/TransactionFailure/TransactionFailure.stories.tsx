import { ComponentStory, ComponentMeta } from "@storybook/react";
import { TransactionFailure } from ".";

export default {
  title: "Compound/Modals/NftSale/TransactionFailure",
  component: TransactionFailure,
} as ComponentMeta<typeof TransactionFailure>;

const Template: ComponentStory<typeof TransactionFailure> = (args) => (
  <TransactionFailure {...args} />
);

export const Default = Template.bind({});
Default.args = {
  title: "Transaction error",
  bodyText: "Your transaction was no completed for <Reason>.",
};
