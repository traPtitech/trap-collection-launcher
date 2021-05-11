import { ipcMain } from '@/common/typedIpc';
import { store } from '@/lib/store';

export const getProductKeyHandler = (): void => {
  ipcMain.handle('getProductKey', async () => {
    return store.get('productKey');
  });
};
