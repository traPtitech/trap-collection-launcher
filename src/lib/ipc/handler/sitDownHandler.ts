import { ipcMain } from '@/common/typedIpc';
import { patchSeatInUse } from '@/lib/axios';
import store from '@/lib/store';

export const sitDownHandler = (): void => {
  ipcMain.handle('sitDown', async () => {
    const seatId = store.get('seatId');
    // const seatVersionId = store.get('seatVersionId');
    if (!seatId) {
      throw '';
    }
    // if (!seatVersionId) {
    //   throw '';
    // }
    // await patchSeatInUse(seatId, seatVersionId);
    await patchSeatInUse(seatId);
    return;
  });
};
