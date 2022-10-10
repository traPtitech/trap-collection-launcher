import { createWriteStream, promises } from 'fs';
import path from 'path';
import {
  getGameFile,
  getGameImage,
  getGameInfo,
  getGameVideo,
  getEditionGames,
  getEditionInfo,
  getGameImages,
  getGameVideos,
  getGameFiles,
  getGameMeta,
} from '@/lib/axios';
import progressLog from '@/lib/progressLog';
import store from '@/lib/store';
import {
  generateAbsolutePath,
  generateLocalPath,
} from '@/lib/utils/generatePaths';
import { promiseExists } from '@/lib/utils/promiseExists';
import promiseSome from '@/lib/utils/promiseSome';
import unzip from '@/lib/utils/unzip';

/*
やる処理v1
- アップデートしなければならないリソースを特定する
- logを初期化
- リソースをダウンロード&展開する
  - logに残す
- gameInfoを更新
*/

//gameVersionIdからそのゲームのディレクトリへのパスを生成
const getLocalGameDirectory = (gameVersionId: string) => {
  const base = generateLocalPath('games', gameVersionId);
  return {
    base,
    executive: path.join(base, 'game.zip'),
    poster: path.join(base, 'poster.png'),
    video: path.join(base, 'video.mp4'),
  };
};

const getAbsoluteGameDirectory = (gameVersionId: string) => {
  const base = generateAbsolutePath(generateLocalPath('games', gameVersionId));
  return {
    base,
    executive: path.join(base, 'game.zip'),
    poster: path.join(base, 'poster.png'),
    video: path.join(base, 'video.mp4'),
  };
};

const getAbsoluteDownloadDirectory = (gameVersionId: string) => {
  const base = generateAbsolutePath(generateLocalPath('games', gameVersionId));
  return {
    base,
    executive: path.join(base, 'game.zip.traPCollection'),
    poster: path.join(base, 'poster.png.traPCollection'),
    video: path.join(base, 'video.mp4.traPCollection'),
  };
};

export const fetch = async (): Promise<void> => {
  //v1では，gameInfosは常に1つのランチャーバージョンを指している
  const oldGameInfos = store.get('gameInfo');
  const searchOldGameInfo = (gameId: string) =>
    oldGameInfos.find(({ id }) => id === gameId);

  //versionsCheck
  const { data: editionInfo } = await getEditionInfo();
  const { data: editionGames } = await getEditionGames(editionInfo.id);

  const apiGameInfos = await Promise.all(
    editionGames.map(async ({ id }) => {
      const { data } = await getGameInfo(id);
      return data;
    })
  );

  //アップデートが必要なgameIdの配列
  const needUpdateGameIds = await Promise.all(
    editionGames.map(async (check) => {
      const { id: gameId } = check;

      const executives = (await getGameFiles(gameId)).data;
      const images = (await getGameImages(gameId)).data;
      const videos = (await getGameVideos(gameId)).data;

      const executiveCreatedAt = executives.length && executives[0].createdAt;
      const imageCreatedAt = images.length && images[0].createdAt;
      const videoCreatedAt = videos.length && videos[0].createdAt;

      const oldGameInfo = searchOldGameInfo(gameId);
      if (!oldGameInfo)
        return {
          check,
          executive: !!executiveCreatedAt && !check.version.url,
          poster: !!imageCreatedAt,
          video: !!videoCreatedAt,
        }; //新規ゲーム

      const gameVersionId = check.version.id;
      if (!gameVersionId)
        return {
          check,
          executive: false,
          poster: false,
          video: false,
        };

      const gameDirectory = getAbsoluteGameDirectory(gameVersionId);

      const existExecutive = await promiseExists(gameDirectory.executive);
      const existPoster = await promiseExists(gameDirectory.poster);
      const existVideo = await promiseExists(gameDirectory.video);

      return {
        check,
        executive:
          (!existExecutive ||
            oldGameInfo.info.updateAt !== executiveCreatedAt) &&
          !check.version.url &&
          !!executiveCreatedAt,
        video:
          (!existVideo || oldGameInfo.video?.updateAt !== videoCreatedAt) &&
          !!videoCreatedAt,
        poster:
          (!existPoster || oldGameInfo.poster?.updateAt !== imageCreatedAt) &&
          !!imageCreatedAt,
      };
    })
  );

  progressLog.reset(
    needUpdateGameIds.filter(({ executive }) => executive).length,
    needUpdateGameIds.filter(({ poster }) => poster).length,
    needUpdateGameIds.filter(({ video }) => video).length
  );

  //ゲームのアップデート
  await promiseSome(
    needUpdateGameIds,
    async ({ check, executive, video, poster }) => {
      const { id: gameId } = check;
      const gameVersionId = check.version.id;
      if (!gameVersionId) return undefined;

      const gameDirectory = getAbsoluteGameDirectory(gameVersionId);
      await promises.mkdir(gameDirectory.base, { recursive: true });

      const downloadDirectory = getAbsoluteDownloadDirectory(gameVersionId);

      const updateExecutive = async (): Promise<void> => {
        if (!executive) {
          return;
        }

        const { data: gameFiles } = await getGameFiles(gameId);
        if (!gameFiles.length) return;
        const { id: gameFileId, md5 } = gameFiles[0];
        const { data } = await getGameFile(gameId, gameFileId);
        await unzip(
          data,
          downloadDirectory.executive,
          gameDirectory.executive,
          md5,
          () => progressLog.add('fileDownload')
        ).catch(console.error);

        progressLog.add('fileDecompress');
      };

      const updatePoster = async (): Promise<void> => {
        if (!poster) {
          return;
        }

        const { data: gameImages } = await getGameImages(gameId);
        if (!gameImages.length) return;

        const { id: gameImageId } = gameImages[0];
        const { data } = await getGameImage(gameId, gameImageId);

        promises.unlink(gameDirectory.poster).catch(() => {
          return;
        });

        const writeStream = createWriteStream(downloadDirectory.poster);
        await data.pipe(writeStream);
        await new Promise<void>((resolve, reject) => {
          writeStream.on('close', () => {
            promises.rename(downloadDirectory.poster, gameDirectory.poster);
            resolve();
          });
          writeStream.on('error', reject);
        });

        progressLog.add('posterDownload');
      };

      const updateVideo = async (): Promise<void> => {
        if (!video) {
          return;
        }

        const { data: gameVideos } = await getGameVideos(gameId);
        if (!gameVideos.length) return;
        const { id: gameVideoId } = await gameVideos[0];
        //303リダイレクトなので型が通らない
        const { data } = (await getGameVideo(gameId, gameVideoId)) as {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          data: any;
        };

        promises.unlink(gameDirectory.video).catch(() => {
          return;
        });

        const writeStream = createWriteStream(downloadDirectory.video);
        await data.pipe(writeStream);
        await new Promise<void>((resolve, reject) => {
          writeStream.on('close', () => {
            promises.rename(downloadDirectory.video, gameDirectory.video);
            resolve();
          });
          writeStream.on('error', reject);
        });

        progressLog.add('videoDownload');
      };

      await Promise.all([updateExecutive(), updatePoster(), updateVideo()]);
    }
  );

  //gameInfoを更新
  const newGameInfos: TraPCollection.GameInfo[] = await promiseSome(
    editionGames,
    async (check) => {
      const apiGameInfo = apiGameInfos.find(({ id }) => id === check.id);
      if (!apiGameInfo) {
        return undefined;
      }

      const executives = (await getGameFiles(check.id)).data;
      const images = (await getGameImages(check.id)).data;
      const videos = (await getGameVideos(check.id)).data;

      const executiveCreatedAt = executives.length && executives[0].createdAt;
      const imageCreatedAt = images.length && images[0].createdAt;
      const videoCreatedAt = videos.length && videos[0].createdAt;

      const gameDirectory = getLocalGameDirectory(check.version.id);

      const info: TraPCollection.GameInfo['info'] = await (async () => {
        if (check.version.url) {
          return {
            type: 'url',
            url: check.version.url,
            updateAt: check.version.createdAt,
          };
        }

        const { data: gameMeta } = await getGameMeta(
          check.id,
          check.version.id
        );

        // typeがurl以外で，かつentryPointが存在しない
        if (!gameMeta.entryPoint) {
          throw 'entryPoint is not found';
        }

        const entryPoint = path.join(
          gameDirectory.base,
          'dist',
          gameMeta.entryPoint
        );

        if (gameMeta.type === 'jar') {
          return {
            type: 'jar',
            entryPoint,
            updateAt: String(executiveCreatedAt),
          };
        }

        return {
          type: 'app',
          entryPoint,
          updateAt: String(executiveCreatedAt),
        };
      })();

      const video = videoCreatedAt
        ? {
            updateAt: videoCreatedAt,
            path: gameDirectory.video,
          }
        : undefined;

      return {
        id: check.id,
        createdAt: apiGameInfo.createdAt,
        description: apiGameInfo.description ?? '',
        info,
        name: apiGameInfo.name,
        poster: {
          updateAt: String(imageCreatedAt),
          path: gameDirectory.poster,
        },
        video,
        version: check.version,
      };
    }
  );

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
