import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  RequiredIndicator,
} from "@chakra-ui/react";
import { ComponentMeta, ComponentStory } from "@storybook/react";

export default {
  title: "Simple/UI kit/FormControl",
  component: FormControl,
  subcomponents: {
    FormLabel,
    FormHelperText,
    FormErrorMessage,
    Input,
    RequiredIndicator,
  },
  argTypes: {
    isRequired: { type: "boolean" },
    isInvalid: { type: "boolean" },
    isDisabled: { type: "boolean" },
    isReadOnly: { type: "boolean" },
  },
} as ComponentMeta<typeof FormControl>;

export const Simple: ComponentStory<typeof FormControl> = (args) => (
  <FormControl {...args}>
    <FormLabel>Image URL</FormLabel>
    <Input placeholder="Image URL" />
  </FormControl>
);

export const WithHelper: ComponentStory<typeof FormControl> = (args) => (
  <FormControl {...args}>
    <FormLabel>Image URL</FormLabel>
    <FormHelperText>
      We recomend an image of at least 900x400.
      <br />
      You can upload a PNG, JPG, or an animated GIF under 10 MB
    </FormHelperText>
    <Input placeholder="Image URL" />
  </FormControl>
);

export const WithError: ComponentStory<typeof FormControl> = (args) => (
  <FormControl isInvalid={true} {...args}>
    <FormLabel>Image URL</FormLabel>
    <Input placeholder="Image URL" />
    <FormErrorMessage>Error message</FormErrorMessage>
  </FormControl>
);

export const CustomRequired: ComponentStory<typeof FormControl> = (args) => (
  <FormControl isRequired={true} {...args}>
    <FormLabel
      requiredIndicator={<RequiredIndicator>(required)</RequiredIndicator>}
    >
      Image URL
    </FormLabel>
    <FormHelperText>
      We recomend an image of at least 900x400.
      <br />
      You can upload a PNG, JPG, or an animated GIF under 10 MB
    </FormHelperText>
    <Input placeholder="Image URL" />
  </FormControl>
);
