import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';
import SideBar from './index';

export default {
  title: 'SideBar',
  component: SideBar,
} as ComponentMeta<typeof SideBar>;

const Template: ComponentStory<typeof SideBar> = (args) => (
  <SideBar {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  isOpen: true,
  items: [
    {
      text: 'プロダクトキーのリセット',
      onClick: () => {
        console.log('プロダクトキーのリセット');
      },
    },
    {
      text: 'ゲーム本体データのリセット',
      onClick: () => {
        console.log('ゲーム本体データのリセット');
      },
    },
  ],
  onCancel: () => {
    console.log('cancel');
  },
  koudaisai: false,
};
