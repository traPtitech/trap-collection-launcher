import {
  ipcMain as originalIpcMain,
  ipcRenderer as originalIpcRenderer,
  IpcRendererEvent,
  IpcMainInvokeEvent,
  BrowserWindow,
} from 'electron';

type FromRenderer = {
  launch(gameInfo: traPCollection.GameInfo): void;
};
type FromMain = {
  /* example */
  bar(x: number, y: string): void;
};

export const ipcRenderer = {
  invoke<K extends keyof FromRenderer>(
    channel: K,
    ...args: Parameters<FromRenderer[K]>
  ): Promise<ReturnType<FromRenderer[K]>> {
    return originalIpcRenderer.invoke(channel, ...args);
  },

  on<K extends keyof FromMain>(
    channel: K,
    listener: (
      event: IpcRendererEvent,
      ...args: Parameters<FromMain[K]>
    ) => void
  ): void {
    originalIpcRenderer.on(
      channel,
      (event: IpcRendererEvent, ...args: unknown[]) => {
        listener(event, ...(args as Parameters<FromMain[K]>));
      }
    );
  },
};

export const ipcMain = {
  handle<K extends keyof FromRenderer>(
    channel: K,
    listener: (
      event: IpcMainInvokeEvent,
      ...args: Parameters<FromRenderer[K]>
    ) => Promise<ReturnType<FromRenderer[K]>>
  ): void {
    originalIpcMain.handle(
      channel,
      (event: IpcMainInvokeEvent, ...args: unknown[]) => {
        return listener(event, ...(args as Parameters<FromRenderer[K]>));
      }
    );
  },

  send<K extends keyof FromMain>(
    window: BrowserWindow,
    channel: K,
    ...args: Parameters<FromMain[K]>
  ): void {
    window.webContents.send(channel, ...args);
  },
};
