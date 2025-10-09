import type { Meta, StoryObj } from '@storybook/react';
import Slider from './index';

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

const meta: Meta<typeof Slider> = {
  title: 'Slider',
  component: Slider,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    selected: 0,
    gameInfos: [],
    onClickGame: (i: number) => {
      console.log(i);
    },
  },
};
