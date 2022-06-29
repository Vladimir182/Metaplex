import { Button, HStack } from "@chakra-ui/react";
import { action } from "@storybook/addon-actions";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import { WalletTransaction } from ".";

export default {
  title: "Data Display/WalletTransaction",
  component: WalletTransaction,
} as ComponentMeta<typeof WalletTransaction>;

const Template: ComponentStory<typeof WalletTransaction> = (args) => (
  <WalletTransaction {...args} />
);

export const Default = Template.bind({});
Default.args = {
  sol: 0.01,
};

export const WithButton = Template.bind({});
WithButton.args = {
  sol: 1.0,
  children: <Button onClick={action("clicked")}>Ok</Button>,
};

export const WithButtons = Template.bind({});
WithButtons.args = {
  sol: 1.0,
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
