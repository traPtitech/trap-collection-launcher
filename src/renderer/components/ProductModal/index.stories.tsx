import type { Meta, StoryObj } from '@storybook/react';
import { useEffect, useState } from 'react';
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

const meta: Meta<typeof TestComponent> = {
  title: 'ProductModal',
  component: TestComponent,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    isOpen: true,
    onCancel: () => {
      console.log('cancel');
    },
  },
};
