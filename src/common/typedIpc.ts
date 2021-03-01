import {
  ipcMain as originalIpcMain,
  ipcRenderer as originalIpcRenderer,
  IpcRendererEvent,
  IpcMainInvokeEvent,
  BrowserWindow,
} from 'electron';

type Commands = {
  /* example */
  foo(x: number, y: string): boolean;
};
type Events = {
  /* example */
  bar(x: number, y: string): void;
};

export const ipcRenderer = {
  invoke<K extends keyof Commands>(
    channel: K,
    ...args: Parameters<Commands[K]>
  ): Promise<ReturnType<Commands[K]>> {
    return originalIpcRenderer.invoke(channel, ...args);
  },

  on<K extends keyof Events>(
    channel: K,
    listener: (event: IpcRendererEvent, ...args: Parameters<Events[K]>) => void
  ): void {
    originalIpcRenderer.on(
      channel,
      (event: IpcRendererEvent, ...args: unknown[]) => {
        listener(event, ...(args as Parameters<Events[K]>));
      }
    );
  },
};

export const ipcMain = {
  handle<K extends keyof Commands>(
    channel: K,
    listener: (
      event: IpcMainInvokeEvent,
      ...args: Parameters<Commands[K]>
    ) => Promise<ReturnType<Commands[K]>>
  ): void {
    originalIpcMain.handle(
      channel,
      (event: IpcMainInvokeEvent, ...args: unknown[]) => {
        return listener(event, ...(args as Parameters<Commands[K]>));
      }
    );
  },

  send<K extends keyof Events>(
    window: BrowserWindow,
    channel: K,
    ...args: Parameters<Events[K]>
  ): void {
    window.webContents.send(channel, ...args);
  },
};
