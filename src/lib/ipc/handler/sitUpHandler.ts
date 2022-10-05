import { ipcMain } from '@/common/typedIpc';
import { deleteSeats } from '@/lib/axios';
import store from '@/lib/store';

export const sitUpHandler = (): void => {
  ipcMain.handle('sitUp', sitUp);
};

export const sitUp = async () => {
  const seatId = store.get('seatId');
  const seatVersionId = store.get('seatVersionId');
  if (!seatId) {
    throw '';
  }
  if (!seatVersionId) {
    throw '';
  }
  await deleteSeats(seatId, seatVersionId);
  return;
};
