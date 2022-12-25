import { ipcMain } from '@/common/typedIpc';
import { fetch } from '@/lib/fetch';

export const fetchGameHandler = (): void => {
  ipcMain.handle('fetchGame', () => {
    return fetch();
  });
};

export default fetchGameHandler;
