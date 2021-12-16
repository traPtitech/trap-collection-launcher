import { ipcMain } from '@/common/typedIpc';
import { postLauncherLogin } from '@/lib/axios';

export const postLauncherLoginHandler = (): void => {
  ipcMain.handle(
    'postLauncherLogin',
    async (event, productKey: string): Promise<boolean> => {
      return postLauncherLogin(productKey);
    }
  );
};
