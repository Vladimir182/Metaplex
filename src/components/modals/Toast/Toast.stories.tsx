import { Button, useToast } from "@chakra-ui/react";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import { Toast } from ".";

export default {
  title: "Compound/Modals/Toast",
  component: Toast,
} as ComponentMeta<typeof Toast>;

const Template: ComponentStory<typeof Toast> = (args) => {
  const toast = useToast();

  return (
    <Button
      onClick={() =>
        toast({
          position: "top-right",
          render: ({ onClose }) => <Toast {...args} onClose={onClose} />,
        })
      }
    >
      Summon toast
    </Button>
  );
};

export const Default = Template.bind({});
Default.args = {
  title: "Transaction Rejected",
  text: "Your transaction was rejected due to insufficient funds.",
  children: <Button alignSelf="flex-end">View on Explorer</Button>,
};
