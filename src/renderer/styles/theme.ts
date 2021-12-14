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
        play: {
          fill: '#e5e5e5',
        },
        dot: {
          fill: '#e2e2e2',
          hover: '#FFFFFF',
        },
      },
      overlay: {
        selectedSlide: 'rgba(0, 0, 0, 0.5)',
        video: 'rgba(255, 255, 255, 0.8)',
      },
      background: {
        selector: 'linear-gradient(0.25turn, rgba(255,255,255,0.8), #78D1FF)',
        menu: 'rgba(0, 0, 0, 0.5)',
      },
      shadow: {
        dot: 'rgba(0, 0, 0, 0.2)',
      },
    },
    duration: {
      normal: '0.08s',
      slider: '0.3s',
    },
  };
};
