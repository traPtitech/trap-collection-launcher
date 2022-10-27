import { ipcMain } from '@/common/typedIpc';
import { patchSeatEmpty } from '@/lib/axios';
import store from '@/lib/store';

export const sitUpHandler = (): void => {
  ipcMain.handle('sitUp', sitUp);
};

export const sitUp = async () => {
  const seatId = store.get('seatId');
  if (!seatId) {
    throw 'seat id is not setted';
  }
  await patchSeatEmpty(seatId);
  return;
};
