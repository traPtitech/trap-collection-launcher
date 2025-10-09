import type { Meta, StoryObj } from '@storybook/react';
import SideBar from './index';

const meta: Meta<typeof SideBar> = {
  title: 'SideBar',
  component: SideBar,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
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
  },
};
