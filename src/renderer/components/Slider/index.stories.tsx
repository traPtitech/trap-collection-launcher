import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';
import Slider from './index';

export default {
  title: 'Modal',
  component: Slider,
} as ComponentMeta<typeof Slider>;

const Template: ComponentStory<typeof Slider> = (args) => <Slider {...args} />;

export const Primary = Template.bind({});
Primary.args = {};
