import { ipcMain } from '@/common/typedIpc';
import { postLauncherLogin } from '@/lib/axios';
import store from '@/lib/store';

export const postLauncherLoginHandler = (): void => {
  ipcMain.handle('postLauncherLogin', async (_, productKey: string) => {
    const res = await postLauncherLogin(productKey)
      .then(({ data }) => {
        store.set('token', data.accessToken);
        return true;
      })
      .catch((e) => {
        if (400 <= e.response?.status && e.response?.status < 500) {
          return false;
        }
        throw new Error('network error');
      });
    return res ?? false;
  });
};
