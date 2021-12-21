import { BrowserWindow } from 'electron';
import { ipcMain } from '@/common/typedIpc';

export const reloadWindowHandler = (window: BrowserWindow | null): void => {
  ipcMain.handle('reloadWindow', async () => {
    window?.reload();
  });
};
