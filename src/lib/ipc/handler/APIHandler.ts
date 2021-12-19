import { ipcMain } from '@/common/typedIpc';
import { postLauncherLogin } from '@/lib/axios';
import { store } from '@/lib/store';

export const postLauncherLoginHandler = (): void => {
  ipcMain.handle('postLauncherLogin', async () => {
    const productKey = store.get('productKey');
    if (productKey) {
      const { data } = await postLauncherLogin(productKey);
      if (data) {
        store.set('token', data.accessToken);
        return true;
      }
    }
    return false;
  });
};
