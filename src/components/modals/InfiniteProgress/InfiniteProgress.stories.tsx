import { ComponentStory, ComponentMeta } from "@storybook/react";
import { InfiniteProgress } from ".";
import { MdOutlineAccountBalanceWallet } from "react-icons/md";
import { fontSizes } from "theme/typography";

export default {
  title: "Compound/Modals/InfiniteProgress",
  component: InfiniteProgress,
} as ComponentMeta<typeof InfiniteProgress>;

const Template: ComponentStory<typeof InfiniteProgress> = (args) => (
  <InfiniteProgress {...args} />
);

export const Default = Template.bind({});
Default.args = {
  isOpen: true,
  title: "Finding your NFT",
  subtitle: "NFTs are randomly distributed throughout the total supply.",
  noteIcon: (
    <MdOutlineAccountBalanceWallet
      size={fontSizes["2xl"]}
      color="whiteAlpha.700"
    />
  ),
  noteText:
    'You may also have to approve the purchase in your wallet if you don\'t have "auto-approve" turned on.',
};
