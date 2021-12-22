import { ipcMain } from '@/common/typedIpc';
import { postSeats } from '@/lib/axios';
import { store } from '@/lib/store';

export const sitDownHandler = (): void => {
  ipcMain.handle('sitDown', sitDown);
};

export const sitDown = async (): Promise<void> => {
  const seatId = store.get('seatId');
  const seatVersionId = store.get('seatVersionId');
  if (!seatId) {
    throw '';
  }
  if (!seatVersionId) {
    throw '';
  }
  await postSeats(seatId, seatVersionId);
  return;
};
