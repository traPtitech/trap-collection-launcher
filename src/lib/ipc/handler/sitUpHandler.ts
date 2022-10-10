import { ipcMain } from '@/common/typedIpc';
import { patchSeatEmpty } from '@/lib/axios';
import store from '@/lib/store';

export const sitUpHandler = (): void => {
  ipcMain.handle('sitUp', async () => {
    const seatId = store.get('seatId');
    // const seatVersionId = store.get('seatVersionId');
    if (!seatId) {
      throw '';
    }
    // if (!seatVersionId) {
    //   throw '';
    // }
    // await patchSeatEmpty(seatId, seatVersionId);
    await patchSeatEmpty(seatId);
    return;
  });
};
