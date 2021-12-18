import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';
import TitlePage from './index';

export default {
  title: 'TitlePage',
  component: TitlePage,
} as ComponentMeta<typeof TitlePage>;

const Template: ComponentStory<typeof TitlePage> = () => <TitlePage />;

export const Primary = Template.bind({});
