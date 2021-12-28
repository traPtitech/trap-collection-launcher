import { ipcMain } from '@/common/typedIpc';
import { store } from '@/lib/store';

export const setProductKeyHandler = (): void => {
  ipcMain.handle('setProductKey', async (_, productKey) => {
    return store.set('launcherVersions', [{ id: productKey }]);
  });
};
