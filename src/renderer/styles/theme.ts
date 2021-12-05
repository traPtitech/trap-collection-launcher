// eslint-disable-next-line import/no-unresolved
import { Theme } from '../types/styled';

export const createTheme = ({ dark }: { dark: boolean }): Theme => {
  return {
    colors: {
      title: '#212121',
      text: '#444444',
    },
  };
};
