import 'styled-components';

export interface Theme {
  fontSize: {
    exSmall: string;
    small: string;
    medium: string;
    large: string;
    gameTitle: string;
  };
  colors: {
    text: {
      primary: string;
      header: string;
      warn: string;
      placeholder: string;
      version: string;
      opposite: string;
    };
    panel: {
      primary: string;
    };
    button: {
      cancel: {
        border: string;
        fill: string;
        hover: string;
      };
      information: {
        fill: string;
        hover: string;
      };
      warning: {
        fill: string;
        hover: string;
      };
      transparent: {
        fill: string;
        hover: string;
      };
      play: {
        fill: string;
      };
      dot: {
        fill: string;
        hover: string;
      };
    };
    overlay: {
      selectedSlide: string;
      video: string;
    };
    background: {
      selector: string;
      menu: string;
      scrollbar: string;
    };
    shadow: {
      dot: string;
    };
  };
  duration: {
    normal: string;
    slider: string;
  };
}

declare module 'styled-components' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface DefaultTheme extends Theme {}
}
