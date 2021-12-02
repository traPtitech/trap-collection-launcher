import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';
import Modal from './index';

export default {
  title: 'Modal',
  component: Modal,
} as ComponentMeta<typeof Modal>;

const Template: ComponentStory<typeof Modal> = (args) => <Modal {...args} />;

export const Primary = Template.bind({});
Primary.args = {
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
};
