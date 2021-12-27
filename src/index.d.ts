declare namespace TraPCollection {
  // IPC通信用API
  type API = {
    invoke: FromRenderer;
    on: FromMainReceiver;
    removeListener: FromMainReceiver;
  };
  type FromRenderer = {
    launch(gameId: string): Promise<void>;
    openQuestionnaire(): Promise<void>;
    openHomePage(): Promise<void>;
    openJavaDownloadPage(): Promise<void>;
    getGameInfo(): Promise<GameInfo[]>;
    checkJava(): Promise<boolean>;
    getProductKey(): Promise<string | undefined>;
    setProductKey(productKey: string): Promise<void>;
    resetProductKey(): Promise<void>;
    getSeatId(): Promise<number | undefined>;
    setSeatId(seatId: number): Promise<void>;
    getSeatVersionId(): Promise<number | undefined>;
    setSeatVersionId(seatVersionId: number): Promise<void>;
    sitDown(): Promise<void>;
    sitUp(): Promise<void>;
    postLauncherLogin(): Promise<boolean>;
    fetchGame(): Promise<void>;
    quitApp(): Promise<void>;
    reloadWindow(): Promise<void>;
    progress(): Promise<TraPCollection.Progress>;
  };
  type FromMain = {
    onBrowserWindowFocus: () => void;
    onBrowserWindowBlur: () => void;
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
    version?: {
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
    bodyUpdatedAt: string;
    imgUpdatedAt: string;
    movieUpdatedAt?: string;
  };

  type Progress = {
    fileDownload: { complete: number; total: number };
    fileDecompress: { complete: number; total: number };
    posterDownload: { complete: number; total: number };
    videoDownload: { complete: number; total: number };
  };
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
