import { ipcMain } from '@/common/typedIpc';
import { store } from '@/lib/store';
import { generateAbsolutePath } from '@/lib/utils/generatePaths';

export const getGameInfoHandler = (): void => {
  ipcMain.handle('getGameInfo', async () => {
    const gameInfo = store.get('gameInfo');
    return gameInfo.map((v) => {
      const { poster, video, url } = v;
      if (v.type === 'url') {
        return {
          ...v,
          poster: generateAbsolutePath(poster),
          video: video ? generateAbsolutePath(video) : undefined,
        };
      }
      return {
        ...v,
        poster: generateAbsolutePath(poster),
        video: video ? generateAbsolutePath(video) : undefined,
        url: generateAbsolutePath(url),
      };
    });
  });
};

export default getGameInfoHandler;
