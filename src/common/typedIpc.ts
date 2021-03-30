import {
  ipcMain as originalIpcMain,
  ipcRenderer as originalIpcRenderer,
  IpcRendererEvent,
  IpcMainInvokeEvent,
  BrowserWindow,
} from 'electron';

export const ipcRenderer = {
  invoke<K extends keyof TraPCollection.FromRenderer>(
    channel: K,
    ...args: Parameters<TraPCollection.FromRenderer[K]>
  ): Promise<ReturnType<TraPCollection.FromRenderer[K]>> {
    return originalIpcRenderer.invoke(channel, ...args);
  },

  on<K extends keyof TraPCollection.FromMain>(
    channel: K,
    listener: (
      event: IpcRendererEvent,
      ...args: Parameters<TraPCollection.FromMain[K]>
    ) => void
  ): void {
    originalIpcRenderer.on(
      channel,
      (event: IpcRendererEvent, ...args: unknown[]) => {
        listener(event, ...(args as Parameters<TraPCollection.FromMain[K]>));
      }
    );
  },
  removeListener<K extends keyof TraPCollection.FromMain>(
    channel: K,
    listener: (...args: unknown[]) => void
  ): void {
    originalIpcRenderer.removeListener(channel, listener);
  },
};

export const ipcMain = {
  handle<K extends keyof TraPCollection.FromRenderer>(
    channel: K,
    listener: (
      event: IpcMainInvokeEvent,
      ...args: Parameters<TraPCollection.FromRenderer[K]>
    ) => ReturnType<TraPCollection.FromRenderer[K]>
  ): void {
    originalIpcMain.handle(
      channel,
      (event: IpcMainInvokeEvent, ...args: unknown[]) => {
        return listener(
          event,
          ...(args as Parameters<TraPCollection.FromRenderer[K]>)
        );
      }
    );
  },

  removeHandler<K extends keyof TraPCollection.FromRenderer>(channel: K): void {
    originalIpcMain.removeHandler(channel);
  },

  send<K extends keyof TraPCollection.FromMain>(
    window: BrowserWindow,
    channel: K,
    ...args: Parameters<TraPCollection.FromMain[K]>
  ): void {
    window.webContents.send(channel, ...args);
  },
};
