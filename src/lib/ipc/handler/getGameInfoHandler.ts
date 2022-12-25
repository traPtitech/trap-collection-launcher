import { ipcMain } from '@/common/typedIpc';
import { getEditionGames, getEditionInfo } from '@/lib/axios';
import store from '@/lib/store';
import { generateAbsolutePath } from '@/lib/utils/generatePaths';

export const getGameInfoHandler = (): void => {
  ipcMain.handle('getGameInfo', async () => {
    const gameInfos = store.get('gameInfo');
    const {
      data: { id: editionID },
    } = await getEditionInfo().then((x) => {
      return x;
    });
    const { data: editionGames } = await getEditionGames(editionID);
    return editionGames.flatMap((editionGame) => {
      const gameInfo = gameInfos.find((gameInfo) => {
        return gameInfo.version.id === editionGame.version.id;
      });
      return gameInfo
        ? [
            {
              id: gameInfo.id,
              name: gameInfo.name,
              poster: generateAbsolutePath(gameInfo.poster.path),
              video:
                gameInfo.video && generateAbsolutePath(gameInfo.video.path),
              description: gameInfo.description,
              versionName: gameInfo.version.name,
              type: gameInfo.info.type,
            },
          ]
        : [];
    });
  });
};

export default getGameInfoHandler;
