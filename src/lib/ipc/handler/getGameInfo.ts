import { ipcMain } from '@/common/typedIpc';
import { store } from '@/lib/store';

const getGameProperties = (): void => {
  ipcMain.handle('getGameInfo', async () => {
    return store.get('gameInfo');
  });
};

export default getGameProperties;
