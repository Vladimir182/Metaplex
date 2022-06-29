import { MdOutlineAccountBalanceWallet } from "react-icons/md";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { fontSizes } from "theme/typography";

import { ModalFootnote } from "./ModalFootnote";

export default {
  title: "Modals/ModalFootnote",
  component: ModalFootnote,
} as ComponentMeta<typeof ModalFootnote>;

const Template: ComponentStory<typeof ModalFootnote> = (args) => (
  <ModalFootnote {...args} />
);

export const TextOnly = Template.bind({});
TextOnly.args = {
  text: 'You may also have to approve the purchase in your wallet if you don\'t have "auto-approve" turned on.',
};

export const TextWithIcon = Template.bind({});
TextWithIcon.args = {
  icon: (
    <MdOutlineAccountBalanceWallet
      size={fontSizes["2xl"]}
      color="whiteAlpha.700"
    />
  ),
  text: 'You may also have to approve the purchase in your wallet if you don\'t have "auto-approve" turned on.',
};
