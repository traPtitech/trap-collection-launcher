import { ipcMain } from '@/common/typedIpc';
import { checkJava } from '@/lib/utils/checkJava';

export const checkJavaHandler = (): void => {
  ipcMain.handle('checkJava', async () => {
    return await checkJava();
  });
};
