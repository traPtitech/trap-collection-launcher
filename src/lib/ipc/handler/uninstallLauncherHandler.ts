import fs from 'fs';
import { ipcMain } from '@/common/typedIpc';

export const uninstallLauncherHandler = async (): Promise<void> => {
  ipcMain.handle('uninstallLauncher', async () => {
    fs.rm(__dirname + '/../../src/lib/test', { recursive: true }, (err) => {
      console.log(err);
    });
  });
};
