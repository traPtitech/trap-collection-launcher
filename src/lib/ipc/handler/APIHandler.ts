import { ipcMain } from '@/common/typedIpc';
import { postLauncherLogin } from '@/lib/axios';
import { store } from '@/lib/store';

export const postLauncherLoginHandler = (): void => {
  ipcMain.handle('postLauncherLogin', async () => {
    const productKeys = store.get('productKey') ?? [];
    const productKey = productKeys[0]?.id;
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
