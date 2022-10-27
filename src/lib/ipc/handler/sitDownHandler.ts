import { ipcMain } from '@/common/typedIpc';
import { patchSeatInUse } from '@/lib/axios';
import store from '@/lib/store';

export const sitDownHandler = (): void => {
  ipcMain.handle('sitDown', sitDown);
};

export const sitDown = async (): Promise<void> => {
  const seatId = store.get('seatId');
  if (!seatId) {
    throw 'seat id is not setted';
  }
  await patchSeatInUse(seatId);
  return;
};
