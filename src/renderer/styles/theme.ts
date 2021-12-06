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
        opposite: '#ffffff',
      },
      panel: {
        primary: '#f3f3f3',
      },
      button: {
        cancel: {
          border: '#444444',
          fill: '#ffffff',
          hover: '#f1f1f1',
        },
        information: {
          fill: '#005bac',
          hover: '#004D93',
        },
        warning: {
          fill: '#f26451',
          hover: '#CE5545',
        },
        transparent: {
          fill: 'rgba(0, 0, 0, 0)',
          hover: 'rgba(0, 0, 0, 0.2)',
        },
      },
    },
    transition: {
      normal: '0.08s',
      slider: '0.3s',
    },
  };
};
