import { ipcMain } from '@/common/typedIpc';
import { store } from '@/lib/store';

export const getProductKeyHandler = (): void => {
  ipcMain.handle('getProductKey', async () => {
    const launcherVersions = store.get('launcherVersions') ?? [];
    return launcherVersions[0]?.productKey;
  });
};
