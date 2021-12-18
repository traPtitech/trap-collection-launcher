import { ipcMain } from '@/common/typedIpc';
import { store } from '@/lib/store';

export const resetProductKeyHandler = (): void => {
  ipcMain.handle('resetProductKey', async () => {
    return store.delete('productKey');
  });
};
