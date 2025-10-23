import { ipcMain } from '@/common/typedIpc';
import { getEditionInfo, postLauncherLogin } from '@/lib/axios';
import store from '@/lib/store';

export const getEditionsHandler = (): void => {
  ipcMain.handle('getEditions', async () => {
    const launcherVersions = store.get('launcherVersions') ?? [];
    const launcherVersionsWithName = await Promise.all(
      launcherVersions.map(async (launcherVersion) => {
        await postLauncherLogin(launcherVersion.productKey)
          .then(({ data }) => {
            store.set('token', data.accessToken);
          })
          .catch((e) => {
            if (400 <= e.response?.status && e.response?.status < 500) {
              return;
            }
            throw new Error('network error');
          });
        const editionInfo = await getEditionInfo();
        return {
          id: launcherVersion.id,
          productKey: launcherVersion.productKey,
          name: editionInfo.data.name,
        };
      })
    );
    store.set('launcherVersions', launcherVersionsWithName);
    return launcherVersionsWithName;
  });
};
