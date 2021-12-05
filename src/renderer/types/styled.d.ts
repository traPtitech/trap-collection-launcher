import 'styled-components';

export interface Theme {
  colors: {
    title: string;
    text: string;
  };
}

declare module 'styled-components' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface DefaultTheme extends Theme {}
}
