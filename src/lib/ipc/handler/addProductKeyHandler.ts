import { ipcMain } from '@/common/typedIpc';
import { getEditionInfo, postLauncherLogin } from '@/lib/axios';
import store from '@/lib/store';

export const addProductKeyHandler = (): void => {
  ipcMain.handle('addProductKey', async (_, productKey) => {
    const isSuccess = await postLauncherLogin(productKey)
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
    if (!isSuccess) {
      return false;
    }
    const editionInfo = await getEditionInfo();
    const editions = store.get('launcherVersions') ?? [];
    store.set('launcherVersions', [
      ...editions,
      { productKey: productKey, name: editionInfo.data.name },
    ]);
    return isSuccess;
  });
};
