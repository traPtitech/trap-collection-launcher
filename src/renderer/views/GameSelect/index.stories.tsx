import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';
import GameSelect from './index';

export default {
  title: 'GameSelect',
  component: GameSelect,
} as ComponentMeta<typeof GameSelect>;

const Template: ComponentStory<typeof GameSelect> = (args) => (
  <GameSelect {...args} />
);

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
  koudaisai: true,
};
