import { ipcMain } from '@/common/typedIpc';
import store from '@/lib/store';

export const getSeatIdHandler = (): void => {
  ipcMain.handle('getSeatId', async () => {
    return store.get('seatId');
  });
};
