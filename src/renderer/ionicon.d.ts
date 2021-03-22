import React from 'react';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'ion-icon': IoniconProps;
    }
  }
}

declare type IoniconProps = {
  name: string;
  size?: 'small' | 'large';
  color?: string;
};
