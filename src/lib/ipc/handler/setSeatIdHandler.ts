import { ipcMain } from '@/common/typedIpc';
import store from '@/lib/store';

export const setSeatIdHandler = (): void => {
  ipcMain.handle('setSeatId', async (_, seatId) => {
    return store.set('seatId', seatId);
  });
};

export default setSeatIdHandler;
