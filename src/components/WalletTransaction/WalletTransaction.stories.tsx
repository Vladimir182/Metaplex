import { ComponentStory, ComponentMeta } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { Button, HStack } from "@chakra-ui/react";
import { WalletTransaction } from ".";

export default {
  title: "Compound/WalletTransaction",
  component: WalletTransaction,
} as ComponentMeta<typeof WalletTransaction>;

const Template: ComponentStory<typeof WalletTransaction> = (args) => (
  <WalletTransaction {...args} />
);

export const Default = Template.bind({});
Default.args = {
  sol: 0.01,
  usd: 1.2,
};

export const WithButton = Template.bind({});
WithButton.args = {
  sol: 1.0,
  usd: 120,
  children: <Button onClick={action("clicked")}>Ok</Button>,
};

export const WithButtons = Template.bind({});
WithButtons.args = {
  sol: 1.0,
  usd: 120,
  children: (
    <HStack>
      <Button onClick={action("canceled")} flexGrow={1}>
        Cancel
      </Button>
      <Button variant="primary" onClick={action("clicked")} flexGrow={1}>
        Ok
      </Button>
    </HStack>
  ),
};
