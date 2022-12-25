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
    getGameInfo(): Promise<RendererGameInfo[]>;
    checkJava(): Promise<boolean>;
    getEditions(): Promise<LauncherVersion[]>;
    addProductKey(productKey: string): Promise<boolean>;
    resetProductKey(): Promise<void>;
    getSeatId(): Promise<number | null>;
    setSeatId(seatId: number): Promise<void>;
    sitDown(): Promise<void>;
    sitUp(): Promise<void>;
    postLauncherLogin(productKey: string): Promise<boolean>;
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

  type GameInfo = {
    id: string;
    name: string;
    createdAt: string;
    version: {
      id: string; // unique
      name: string;
      description: string;
      createdAt: string;
    };
    description: string;
    /**
     * relative path
     * base url: '%AppData%/trap-collection/contents'
     * @example
     * 'games/146dfc4a-e656-4083-b973-4a7196ae4289/v1.0.0/video.mp4'
     */
    video?: {
      path: string;
      updateAt: string;
    };
    /**
     * relative path
     * base url: '%AppData%/trap-collection/contents'
     * @example
     * 'games/146dfc4a-e656-4083-b973-4a7196ae4289/v1.0.0/poster.png'
     */
    poster: {
      path: string;
      updateAt: string;
    };
    info:
      | {
          type: 'app' | 'jar';
          /**
           * relative path
           * base url: '%AppData%/trap-collection/contents/games/146dfc4a-e656-4083-b973-4a7196ae4289/v1.0.0/dist'
           * @example
           * path/to/binary
           */
          entryPoint: string;
          updateAt: string;
        }
      | {
          type: 'url';
          url: string;
          updateAt: string;
        };
  };

  type GameType = GameInfo['info']['type'];

  type GameInfos = GameInfo[];

  type LauncherVersion = {
    productKey: string;
    name?: string;
  };

  type LauncherVersions = LauncherVersion[];

  type RendererGameInfo = {
    id: string;
    name: string;
    description: string;
    versionName: string;
    /**
     * absolute path
     */
    poster: string;
    /**
     * absolute path
     */
    video?: string;
    type: GameType;
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
