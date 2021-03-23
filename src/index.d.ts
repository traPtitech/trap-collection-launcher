declare namespace TraPCollection {
  // IPC通信用API
  type API = FromRenderer & FromMain;
  type FromRenderer = {
    launch(gameId: string): Promise<void>;
    getGameInfo(): Promise<GameInfo[]>;
  };
  type FromMain = {
    /* example */
    onReceiveExample(x: number, y: string): void;
  };

  type GameType = 'app' | 'jar' | 'url';
  /**
   * @example
   * `.exe`: { type: 'app', url: filepath }
   * `.jar`: { type: 'jar', url: filepath }
   * `.com`: { type: 'url', url: urlString }
   */

  type GameInfo = {
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
    type: GameType;
    /**
     * @example
     * "games/UUIDv4/*.exe"
     * "games/UUIDv4/*.jar"
     * "*.trap.games"
     */
    url: string;
    /**
     * @example
     * "artworks/UUIDv4.png"
     */
    poster: string;
    /**
     * @example
     * "artworks/UUIDv4.mp4"
     */
    video?: string;
  };

  type Platform = 'win32' | 'darwin';
}

declare interface Window {
  TraPCollectionAPI: TraPCollection.API;
}
