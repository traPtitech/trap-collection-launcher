import { ipcMain } from '@/common/typedIpc';
import { store } from '@/lib/store';

export const getProductKeyHandler = (): void => {
  ipcMain.handle('getProductKey', async () => {
    const productKeys = store.get('productKey') ?? [];
    return productKeys[0]?.id;
  });
};
