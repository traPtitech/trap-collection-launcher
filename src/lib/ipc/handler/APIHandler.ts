import { ipcMain } from '@/common/typedIpc';
import { postLauncherLogin, getVersion, getVersionsCheck } from '@/lib/axios';
import { store } from '@/lib/store';

export const postLauncherLoginHandler = (): void => {
  ipcMain.handle('postLauncherLogin', async (event, productKey: string) => {
    await postLauncherLogin(productKey);
  });
};
