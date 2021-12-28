import { createWriteStream, promises, existsSync } from 'fs';
import path from 'path';
import { CheckItem } from './typescript-axios';
import {
  getGameFile,
  getGameImage,
  getGameInfo,
  getGameUrl,
  getGameVideo,
  getLauncherMe,
  getVersionsCheck,
} from '@/lib/axios';
import progressLog from '@/lib/progressLog';
import { store } from '@/lib/store';
import {
  generateAbsolutePath,
  generateLocalPath,
} from '@/lib/utils/generatePaths';
import { promiseExists } from '@/lib/utils/promiseExists';
import unzip from '@/lib/utils/unzip';

export const fetch = async (): Promise<void> => {
  const { data } = await getVersionsCheck();
  const gameInfos = store.get('gameInfo');
  const {
    data: { id: versionId },
  } = await getLauncherMe();

  const needFetchFileGamesUndef = await Promise.all(
    data
      .filter(({ type }) => {
        return type !== 'url';
      })
      .map(async (data) => {
        const { id, bodyUpdatedAt } = data;
        const absolutePath = generateAbsolutePath(
          generateLocalPath(versionId, 'games', id, 'game.zip')
        );

        const existPath = await promiseExists(absolutePath);

        if (
          gameInfos.find(({ id: tempId }) => id === tempId)?.info?.updateAt !==
            bodyUpdatedAt ||
          !existPath
        ) {
          return data;
        }
        return undefined;
      })
  );
  const needFetchFileGames = needFetchFileGamesUndef.filter(
    (data) => data !== undefined
  ) as CheckItem[];
  const needFetchPosterGamesUndef = await Promise.all(
    data.map(async (data) => {
      const { id, imgUpdatedAt } = data;

      const absolutePath = generateAbsolutePath(
        generateLocalPath(versionId, 'artworks', id, 'poster.png')
      );

      const existPath = await promiseExists(absolutePath);

      if (
        gameInfos.find(({ id: tempId }) => id === tempId)?.poster?.updateAt !==
          imgUpdatedAt ||
        !existPath
      ) {
        return data;
      }
      return undefined;
    })
  );
  const needFetchPosterGames = needFetchPosterGamesUndef.filter(
    (data) => data !== undefined
  ) as CheckItem[];
  const needFetchVideoGamesUndef = await Promise.all(
    data.map(async (data) => {
      const { id, movieUpdatedAt } = data;

      const absolutePath = generateAbsolutePath(
        generateLocalPath(versionId, 'artworks', id, 'video.mp4')
      );

      const existPath = await promiseExists(absolutePath);

      if (
        (gameInfos.find(({ id: tempId }) => id === tempId)?.video?.updateAt !==
          movieUpdatedAt ||
          !existPath) &&
        movieUpdatedAt
      ) {
        return data;
      }
      return undefined;
    })
  );
  const needFetchVideoGames = needFetchVideoGamesUndef.filter(
    (data) => data !== undefined
  ) as CheckItem[];

  progressLog.reset(
    needFetchFileGames.length,
    needFetchPosterGames.length,
    needFetchVideoGames.length
  );

  await Promise.all([
    ...needFetchFileGames.map(async ({ id, md5 }) => {
      const absolutePath = generateAbsolutePath(
        generateLocalPath(versionId, 'games', id, 'game.zip')
      );
      const absoluteDir = path.dirname(absolutePath);

      const existDir = await promiseExists(absoluteDir);
      if (!existDir) {
        await promises.mkdir(absoluteDir, { recursive: true });
      }

      const { data } = await getGameFile(id);
      await unzip(data, absolutePath, md5, () =>
        progressLog.add('fileDownload')
      ).catch(console.error);

      progressLog.add('fileDecompress');
    }),
    ...needFetchPosterGames.map(async ({ id }) => {
      const absolutePath = generateAbsolutePath(
        generateLocalPath(versionId, 'artworks', id, 'poster.png')
      );
      const absoluteDir = path.dirname(absolutePath);

      const existDir = await promiseExists(absoluteDir);
      if (!existDir) {
        await promises.mkdir(absoluteDir, { recursive: true });
      }

      const { data } = await getGameImage(id);

      const stream = createWriteStream(absolutePath);

      await data.pipe(stream);

      await new Promise<void>((resolve, reject) => {
        stream.on('finish', resolve);
        stream.on('error', reject);
      });

      progressLog.add('posterDownload');
    }),
    ...needFetchVideoGames.map(async ({ id }) => {
      try {
        const absolutePath = generateAbsolutePath(
          generateLocalPath(versionId, 'artworks', id, 'video.mp4')
        );
        const absoluteDir = path.dirname(absolutePath);

        const existDir = await promiseExists(absoluteDir);
        if (!existDir) {
          await promises.mkdir(absoluteDir, { recursive: true });
        }

        const { data } = await getGameVideo(id);

        const stream = createWriteStream(absolutePath);

        await data.pipe(stream);

        await new Promise<void>((resolve, reject) => {
          stream.on('finish', resolve);
          stream.on('error', reject);
        });
      } catch (e) {
        // ignore
      }
      progressLog.add('videoDownload');
    }),
  ]).catch((reason) => {
    throw reason;
  });

  const newGameInfosUndef: (TraPCollection.GameInfo | undefined)[] =
    await Promise.all(
      data.map(
        async ({
          id,
          type,
          bodyUpdatedAt,
          imgUpdatedAt,
          movieUpdatedAt,
          entryPoint,
        }) => {
          const { data } = await getGameInfo(id);
          const { id: gameId, name, description, createdAt, version } = data;
          const url = await getGameUrl(id)
            .then(({ data: url }) => url)
            .catch(async () => {
              return (
                generateLocalPath(
                  versionId,
                  'games',
                  id + '/dist',
                  entryPoint
                ) ?? ''
              );
            });

          const absoluteVideoPath = generateAbsolutePath(
            generateLocalPath(versionId, 'artworks', id, 'video.mp4')
          );

          const posterPath = generateLocalPath(
            versionId,
            'artworks',
            id,
            'poster.png'
          );
          const videoPath = existsSync(absoluteVideoPath)
            ? generateLocalPath(versionId, 'artworks', id, 'video.mp4')
            : undefined;

          if (!version) {
            return undefined;
          }

          if (
            type !== 'url' &&
            type !== 'windows' &&
            type !== 'mac' &&
            type !== 'jar'
          ) {
            return undefined;
          }

          const infoType = type === 'windows' || type === 'mac' ? 'app' : type;

          return {
            id: gameId,
            name,
            createdAt,
            version,
            description: description ?? '',
            info:
              infoType === 'url'
                ? {
                    type: 'url',
                    updateAt: bodyUpdatedAt,
                    url,
                  }
                : {
                    type: infoType,
                    updateAt: bodyUpdatedAt,
                    entryPoint: url,
                  },
            poster: { path: posterPath, updateAt: imgUpdatedAt },
            video:
              videoPath && movieUpdatedAt
                ? { path: videoPath, updateAt: movieUpdatedAt }
                : undefined,
          };
        }
      )
    );

  const newGameInfos = newGameInfosUndef.filter((v) => v);

  store.set('gameInfo', newGameInfos);
};

/*
const searchFiles = (dirpath: string): Promise<string | undefined> =>
  new Promise((resolve, reject) => {
    readdir(dirpath, { withFileTypes: true }, async (err, dirents) => {
      if (err) {
        console.error(err);
        reject(err);
      }

      await Promise.all(
        dirents.map(async (dirent) => {
          const name = dirent.name;
          const fp = path.join(dirpath, name);
          if (
            (name.includes('.exe') || name.includes('.app')) &&
            !name.includes('UnityCrashHandler')
          ) {
            resolve(fp);
          }
          if (dirent.isDirectory()) {
            const gamefile = await searchFiles(fp);
            if (gamefile !== undefined) {
              resolve(gamefile);
            }
          }
        })
      );
    });
  });
*/
