import electron from 'electron';
import { ipcMain } from '@/common/typedIpc';

export const quitAppHandler = (): void => {
  ipcMain.handle('quitApp', async () => {
    electron.app.quit();
  });
};
