declare namespace TraPCollection {
  // IPC通信用API
  type API = { invoke: FromRenderer; on: FromMainReceiver };
  type FromRenderer = {
    launch(gameId: string): Promise<void>;
    getGameInfo(): Promise<GameInfo[]>;
    checkJava(): Promise<boolean>;
    setProductKey(productKey: string): Promise<void>;
    setSeatId(seatId: number): Promise<void>;
    setSeatVersionId(seatVersionId: number): Promise<void>;
    sitDown(): Promise<void>;
    sitUp(): Promise<void>;
  };
  type FromMain = {
    progress(progress: Progress): void;
  };

  type FromMainReceiver = {
    [K in keyof FromMain]: (
      listener: (
        event: Electron.IpcRendererEvent,
        ...args: Parameters<FromMain[K]>
      ) => void
    ) => void;
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

  type Progress = {
    title: string;
    phase: 'fetch' | 'decompress' | 'verify' | 'genChecksum' | 'done';
    progressRate: number; // 0-100
  }[];

  type Platform = 'win32' | 'darwin';
}

declare interface Window {
  TraPCollectionAPI: TraPCollection.API;
}

declare namespace NodeJS {
  interface ProcessEnv {
    KOUDAISAI: 'true' | 'false';
  }
}
