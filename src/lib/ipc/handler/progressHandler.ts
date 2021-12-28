import { ipcMain } from '@/common/typedIpc';
import progressLog from '@/lib/progressLog';

export const progressHandler = (): void => {
  ipcMain.handle('progress', async () => {
    return progressLog.get();
  });
};
