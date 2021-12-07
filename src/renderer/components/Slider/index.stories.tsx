import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';
import Slider from './index';

export default {
  title: 'Slider',
  component: Slider,
} as ComponentMeta<typeof Slider>;

const Template: ComponentStory<typeof Slider> = (args) => <Slider {...args} />;

const createGameInfo = (number: number, poster: string) => ({
  id: `${number}`,
  name: `Game ${number}`,
  createdAt: new Date().toISOString(),
  description: `Description of game ${number}`,
  poster,
  type: 'app' as const,
  url: 'https://www.google.com',
  version: {
    id: '1',
    name: 'Version 1',
    description: 'Description 1',
    createdAt: new Date().toISOString(),
  },
});

export const Primary = Template.bind({});
Primary.args = {
  selected: 0,
  gameInfos: [
    createGameInfo(0, 'https://via.placeholder.com/150?text=00'),
    createGameInfo(1, 'https://via.placeholder.com/150?text=01'),
    createGameInfo(2, 'https://via.placeholder.com/150?text=02'),
    createGameInfo(3, 'https://via.placeholder.com/150?text=03'),
    createGameInfo(4, 'https://via.placeholder.com/150?text=04'),
    createGameInfo(5, 'https://via.placeholder.com/150?text=05'),
    createGameInfo(6, 'https://via.placeholder.com/150?text=06'),
    createGameInfo(7, 'https://via.placeholder.com/150?text=07'),
    createGameInfo(8, 'https://via.placeholder.com/150?text=08'),
    createGameInfo(9, 'https://via.placeholder.com/150?text=09'),
    createGameInfo(10, 'https://via.placeholder.com/150?text=10'),
    createGameInfo(11, 'https://via.placeholder.com/150?text=11'),
    createGameInfo(12, 'https://via.placeholder.com/150?text=12'),
    createGameInfo(13, 'https://via.placeholder.com/150?text=13'),
    createGameInfo(14, 'https://via.placeholder.com/150?text=14'),
    createGameInfo(15, 'https://via.placeholder.com/150?text=15'),
  ],
  onClickGame: (i) => {
    console.log(i);
  },
};
