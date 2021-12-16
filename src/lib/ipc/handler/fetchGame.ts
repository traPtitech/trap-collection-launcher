import { ipcMain } from '@/common/typedIpc';
import { fetch } from '@/lib/fetch';

export const fetchGameHandler = (): void => {
  ipcMain.handle('fetchGame', async () => {
    return fetch();
  });
};

export default fetchGameHandler;
