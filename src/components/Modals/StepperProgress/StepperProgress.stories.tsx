import { MdOutlineAccountBalanceWallet } from "react-icons/md";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { ENftProgress } from "sdk/createNft";
import { getArtworks } from "state/artworks/artworks.mock";
import { fontSizes } from "theme/typography";

import { StepperProgress } from ".";

export default {
  title: "Compound/Modals/ListingProgress",
  component: StepperProgress,
} as ComponentMeta<typeof StepperProgress>;

const Template: ComponentStory<typeof StepperProgress> = (args) => (
  <StepperProgress {...args} />
);

export const Default = Template.bind({});
Default.args = {
  artwork: getArtworks()[0],
  noteIcon: <MdOutlineAccountBalanceWallet size={fontSizes["2xl"]} />,
  noteText:
    "Accept the signature request in your wallet and wait for your listing to process",
  step: ENftProgress.minting,
};

export const NoSteps = Template.bind({});
NoSteps.args = {
  artwork: getArtworks()[0],
  noteIcon: <MdOutlineAccountBalanceWallet size={fontSizes["2xl"]} />,
  noteText:
    "Accept the signature request in your wallet and wait for your listing to process",
};
