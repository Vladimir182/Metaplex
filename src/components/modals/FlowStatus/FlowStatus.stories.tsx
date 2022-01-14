import { ComponentMeta, ComponentStory } from "@storybook/react";
import {
  MdCheck,
  MdErrorOutline,
  MdOutlineAccountBalanceWallet,
} from "react-icons/md";

import { Button } from "@chakra-ui/react";
import { FlowStatus } from ".";
import { HaloedIcon } from "components/HaloedIcon";
import { fontSizes } from "theme/typography";

export default {
  title: "Compound/Modals/FlowStatus",
  component: FlowStatus,
} as ComponentMeta<typeof FlowStatus>;

const Template: ComponentStory<typeof FlowStatus> = (args) => (
  <FlowStatus {...args} />
);

export const Success = Template.bind({});
Success.args = {
  statusIcon: <HaloedIcon icon={MdCheck} />,
  title: "You bought Morning!",
  subtitle: "5 SOL was withdrawn from your wallet and your NFT was added.",
  noteIcon: (
    <MdOutlineAccountBalanceWallet
      size={fontSizes["2xl"]}
      color="whiteAlpha.700"
    />
  ),
  noteText:
    'You may also have to approve the purchase in your wallet if you don\'t have "auto-approve" turned on.',
};

export const Failure = Template.bind({});
Failure.args = {
  statusIcon: <HaloedIcon icon={MdErrorOutline} />,
  title: "Transaction error",
  subtitle: "Your transaction was no completed for <Reason>.",
  actions: (
    <Button variant="primary" size="lg">
      Dismiss
    </Button>
  ),
};
