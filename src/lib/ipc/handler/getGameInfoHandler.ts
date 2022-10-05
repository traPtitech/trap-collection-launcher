import { ipcMain } from '@/common/typedIpc';
import store from '@/lib/store';
import { generateAbsolutePath } from '@/lib/utils/generatePaths';

export const getGameInfoHandler = (): void => {
  ipcMain.handle('getGameInfo', async () => {
    const gameInfo = store.get('gameInfo');
    return gameInfo.map((v) => ({
      id: v.id,
      name: v.name,
      poster: generateAbsolutePath(v.poster.path),
      video: v.video && generateAbsolutePath(v.video.path),
      description: v.description,
      versionName: v.version.name,
      type: v.info.type,
    }));
  });
};

export default getGameInfoHandler;
