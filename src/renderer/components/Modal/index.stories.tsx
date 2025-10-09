import type { Meta, StoryObj } from '@storybook/react';
import Modal from './index';

const meta: Meta<typeof Modal> = {
  title: 'Modal',
  component: Modal,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    title: 'Modal Title',
    children: 'Modal Content',
    isOpen: true,
    modalType: 'information',
    okButtonText: 'Ok',
    onOk: () => {
      console.log('OK');
    },
    onCancel: () => {
      console.log('Cancel');
    },
    noButton: false,
  },
};
