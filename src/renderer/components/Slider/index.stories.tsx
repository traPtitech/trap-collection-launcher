import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';
import Slider from './index';

export default {
  title: 'Slider',
  component: Slider,
} as ComponentMeta<typeof Slider>;

const Template: ComponentStory<typeof Slider> = (args) => <Slider {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  selected: 0,
  gameInfos: [
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
  ],
};
