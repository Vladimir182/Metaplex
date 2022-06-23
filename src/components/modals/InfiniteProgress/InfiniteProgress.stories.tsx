import { BsWallet2 } from "react-icons/bs";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { fontSizes } from "theme/typography";

import { InfiniteProgress } from ".";

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
  title: "Your token is being put for sale",
  subtitle:
    "After you approve the transcation with your wallt, your NFT will be listed for sale.",
  noteIcon: <BsWallet2 size={fontSizes["2xl"]} color="whiteAlpha.700" />,
  noteText:
    'You may also have to approve the purchase in your wallet if you don\'t have "auto-approve" turned on.',
};
