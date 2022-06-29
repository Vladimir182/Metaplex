import { HStack, Text } from "@chakra-ui/layout";
import { Tag } from "@chakra-ui/tag";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import { Fraction } from "components/DataDisplay/Fraction";
import { Person } from "components/DataDisplay/Person";

import { TitledBlock } from ".";

export default {
  title: "Data Display/TitledBlock",
  component: TitledBlock,
} as ComponentMeta<typeof TitledBlock>;

const Template: ComponentStory<typeof TitledBlock> = (args) => (
  <TitledBlock {...args} />
);

export const TitledTextBlock = Template.bind({});
TitledTextBlock.args = {
  title: "Details",
  content: (
    <Text>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi id unde,
      exercitationem itaque porro laudantium enim doloremque, aut alias quod
      fuga quisquam omnis veniam quibusdam deleniti reiciendis, magnam earum
      facere.
    </Text>
  ),
};

export const TitledTags = Template.bind({});
TitledTags.args = {
  title: "View on",
  content: (
    <HStack>
      <Tag>Airweave</Tag>
      <Tag>Solana</Tag>
    </HStack>
  ),
};

export const TitledPerson = Template.bind({});
TitledPerson.args = {
  title: "Artists",
  content: <Person name="Dan Abramov" avatarUrl="https://bit.ly/dan-abramov" />,
};

export const TitledFraction = Template.bind({});
TitledFraction.args = {
  title: "Edition",
  content: <Fraction current={1} total={25} />,
};
