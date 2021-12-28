import { ipcMain } from '@/common/typedIpc';
import store from '@/lib/store';

export const getSeatVersionHandler = (): void => {
  ipcMain.handle('getSeatVersionId', async () => {
    return store.get('seatVersionId');
  });
};
