import type { Meta, StoryObj } from '@storybook/react';
import TitlePage from './index';

const meta: Meta<typeof TitlePage> = {
  title: 'TitlePage',
  component: TitlePage,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  render: () => <TitlePage />,
};
