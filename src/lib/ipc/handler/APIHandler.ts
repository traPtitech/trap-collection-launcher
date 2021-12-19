import { ipcMain } from '@/common/typedIpc';
import { postLauncherLogin } from '@/lib/axios';

export const postLauncherLoginHandler = (): void => {
  ipcMain.handle(
    'postLauncherLogin',
    async (event, productKey: string): Promise<boolean> => {
      return postLauncherLogin(productKey)
        .then((res) => {
          console.log('status', res.status, 'data', res.data);
          return res.status === 200;
        })
        .catch((err) => {
          console.error(err);
          return false;
        });
    }
  );
};
