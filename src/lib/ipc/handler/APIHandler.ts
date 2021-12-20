import { ipcMain } from '@/common/typedIpc';
import { postLauncherLogin } from '@/lib/axios';
import { store } from '@/lib/store';

export const postLauncherLoginHandler = (): void => {
  ipcMain.handle('postLauncherLogin', async () => {
    const productKey = store.get('productKey');
    if (productKey) {
      const res = await postLauncherLogin(productKey)
        .then(({ data }) => {
          store.set('token', data.accessToken);
          return true;
        })
        .catch(() => {
          return false;
        });
      return res ?? false;
    }
    return false;
  });
};
