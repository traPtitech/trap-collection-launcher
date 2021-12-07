import { ComponentStory, ComponentMeta } from '@storybook/react';
import React, { useEffect, useState } from 'react';
import ProductModal from './index';

const TestComponent = ({ ...props }) => {
  const [productModal, setProductModal] = useState(<></>);

  useEffect(() => {
    (async () => {
      // await window.TraPCollectionAPI.invoke.setProductKey(
      //   '00000-00000-00000-00000-00000'
      // );
    })();
    setProductModal(<ProductModal {...props} />);
  }, []);

  return productModal;
};

export default {
  title: 'ProductModal',
  component: TestComponent,
} as ComponentMeta<typeof TestComponent>;

const Template: ComponentStory<typeof TestComponent> = (args) => (
  <TestComponent {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  isOpen: true,
  onCancel: () => {
    console.log('cancel');
  },
};
