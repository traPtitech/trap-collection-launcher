// eslint-disable-next-line import/no-unresolved
import { Theme } from '../types/styled';

export const createTheme = ({ dark }: { dark: boolean }): Theme => {
  return {
    colors: {
      text: {
        primary: '#444444',
        header: '#212121',
        warn: '#ff1e1e',
        placeholder: '#c1c1c1',
        version: '#7a7a7a',
        opposite: '#000000',
      },
      overlay: 'rgba(0, 0, 0, 0.2)',
      panel: {
        primary: '#f3f3f3',
      },
    },
  };
};
