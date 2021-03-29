import { ipcMain } from '@/common/typedIpc';
import { store } from '@/lib/store';

export const setSeatVersionIdHandler = (): void => {
  ipcMain.handle('setSeatVersionId', async () => {
    return store.set('seatVersionId');
  });
};
