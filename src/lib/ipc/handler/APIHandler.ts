import { ipcMain } from '@/common/typedIpc';
import { postLauncherLogin } from '@/lib/axios';
import store from '@/lib/store';

export const postLauncherLoginHandler = (): void => {
  ipcMain.handle('postLauncherLogin', async () => {
    const launcherVersions = store.get('launcherVersions') ?? [];
    const productKey = launcherVersions[0]?.productKey;
    if (productKey) {
      const res = await postLauncherLogin(productKey)
        .then(({ data }) => {
          store.set('token', data.accessToken);
          return true;
        })
        .catch((e) => {
          if (400 <= e.response?.status && e.response?.status < 500) {
            return false;
          }
          console.log(e.response?.status);
          throw new Error('network error');
        });
      return res ?? false;
    }
    return false;
  });
};
