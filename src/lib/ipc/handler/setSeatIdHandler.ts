import { ipcMain } from '@/common/typedIpc';
import { patchSeatEmpty, patchSeatInUse } from '@/lib/axios';
import store from '@/lib/store';

export const setSeatIdHandler = (): void => {
  ipcMain.handle('setSeatId', async (_, seatId) => {
    const prevSeatId = store.get('seatId');
    const seated = store.get('seated');

    prevSeatId && patchSeatEmpty(prevSeatId);
    seated ? patchSeatInUse(seatId) : patchSeatEmpty(seatId);

    return store.set('seatId', seatId);
  });
};

export default setSeatIdHandler;
