import React from 'react'; // eslint-disable-line @typescript-eslint/no-unused-vars

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
  className?: string;
  style?: React.CSSProperties;
};
