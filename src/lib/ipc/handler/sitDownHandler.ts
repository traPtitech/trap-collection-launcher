import { ipcMain } from '@/common/typedIpc';
import { postSeats } from '@/lib/axios';
import store from '@/lib/store';

export const sitDownHandler = (): void => {
  ipcMain.handle('sitDown', sitDown);
};

export const sitDown = async (): Promise<void> => {
  const seatId = store.get('seatId');
  const seatVersionId = store.get('seatVersionId');
  if (!seatId) {
    throw 'seat id is not setted';
  }
  if (!seatVersionId) {
    throw 'seat version id is not setted';
  }
  await postSeats(seatId, seatVersionId);
  return;
};
