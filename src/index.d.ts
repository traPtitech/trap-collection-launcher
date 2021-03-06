declare namespace TraPCollection {
  type GameType = 'app' | 'jar' | 'url';
  /**
   * @example
   * `.exe`: { type: 'app', url: filepath }
   * `.jar`: { type: 'jar', url: filepath }
   * `.com`: { type: 'url', url: urlString }
   */
  type GameInfo = { type: GameType; url: string };

  type Game = {
    name: string;
    description: string;
    poster: string;
    video: string;
  };

  type Platform = 'win32' | 'darwin';
}
