import axios from 'axios';
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
        .catch((e) => {
          if (!e.response) {
            throw new Error('network error');
          }
          if (axios.isAxiosError(e) && e.response) {
            return false; //ネットワークエラー以外の場合は false を返す
          }
        });
      return res ?? false;
    }
    return false;
  });
};
