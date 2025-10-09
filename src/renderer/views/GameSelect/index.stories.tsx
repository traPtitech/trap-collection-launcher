import type { Meta, StoryObj } from '@storybook/react';
import GameSelect from './index';

const meta: Meta<typeof GameSelect> = {
  title: 'GameSelect',
  component: GameSelect,
};

export default meta;
type Story = StoryObj<typeof meta>;

// const createGameInfo = (number: number, poster: string) => ({
//   id: `${number}`,
//   name: `Game ${number}`,
//   createdAt: new Date().toISOString(),
//   description: `Description of game ${number}`,
//   poster,
//   type: 'app' as const,
//   url: 'https://www.google.com',
//   version: {
//     id: '1',
//     name: 'Version 1',
//     description: 'Description 1',
//     createdAt: new Date().toISOString(),
//   },
// });

export const Primary: Story = {
  args: {
    koudaisai: true,
  },
};
