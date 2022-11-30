import React from "react";
import "../../index.css";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Numpad } from "./Numpad";
// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Example/Numpad",
  component: Numpad,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  //   argTypes: {
  //     backgroundColor: { control: 'color' },
  //   },
} as ComponentMeta<typeof Numpad>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Numpad> = (args) => (
  <Numpad onClick={(number) => console.log(number)} />
); // {...args}

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  onClick: (number) => {
    console.log(number);
  },
};

// export const Secondary = Template.bind({});
// Secondary.args = {
//   label: "Numpad",
// };

// export const Large = Template.bind({});
// Large.args = {
//   size: "large",
//   label: "Numpad",
// };

// export const Small = Template.bind({});
// Small.args = {
//   size: "small",
//   label: "Numpad",
// };
