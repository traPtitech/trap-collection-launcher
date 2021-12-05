import 'styled-components';

export interface Theme {
  colors: {
    text: {
      primary: string;
      header: string;
      warn: string;
      placeholder: string;
      version: string;
      opposite: string;
    };
    overlay: string;
    panel: {
      primary: string;
    };
  };
}

declare module 'styled-components' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface DefaultTheme extends Theme {}
}
