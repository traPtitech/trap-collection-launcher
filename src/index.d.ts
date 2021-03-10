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
    id: string;
    name: string;
    createdAt: string;
    version: {
      id: string;
      name: string;
      description: string;
      createdAt: string;
    };
    description: string;
    poster: string;
    video?: string;
  };

  type Platform = 'win32' | 'darwin';
}
