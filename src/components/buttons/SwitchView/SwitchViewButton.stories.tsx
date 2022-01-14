import { ComponentMeta, ComponentStory } from "@storybook/react";
import { SwitchViewButton } from "./SwitchViewButton";
import { useState } from "react";

export default {
  title: "Simple/InterfaceButtons/SwitchViewButton",
  component: SwitchViewButton,
} as ComponentMeta<typeof SwitchViewButton>;

type View = React.ComponentProps<typeof SwitchViewButton>["currentView"];

const Template: ComponentStory<typeof SwitchViewButton> = () => {
  const [view, setView] = useState<View>("grid");

  const handleChangeView = () => {
    view === "grid" ? setView("list") : setView("grid");
  };

  return <SwitchViewButton currentView={view} onClick={handleChangeView} />;
};

export const Default = Template.bind({});
Default.args = {};
