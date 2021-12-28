import { createWriteStream, promises } from 'fs';
import path from 'path';
import promiseFilter from './utils/promiseFilter';
import {
  getGameFile,
  getGameImage,
  getGameInfo,
  getGameUrl,
  getGameVideo,
  getVersionsCheck,
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

export const fetch = async (): Promise<void> => {
  //v1では，gameInfosは常に1つのランチャーバージョンを指している
  const oldGameInfos = store.get('gameInfo');
  const searchOldGameInfo = (gameId: string) =>
    oldGameInfos.find(({ id }) => id === gameId);

  //versionsCheck
  const { data: versionsCheck } = await getVersionsCheck();

  const apiGameInfos = await Promise.all(
    versionsCheck.map(async ({ id }) => {
      const { data: gameInfo } = await getGameInfo(id);
      return gameInfo;
    })
  );

  //gameIdからそのゲームの最新のゲームバージョンを取得
  const searchGameVersionId = (gameId: string) =>
    apiGameInfos.find(({ id }) => id === gameId)?.version?.id;

  //アップデートが必要なgameIdの配列
  const needUpdateGameIds = await promiseFilter(
    versionsCheck,
    async (check) => {
      const { id: gameId } = check;

      const oldGameInfo = searchOldGameInfo(gameId);
      if (!oldGameInfo) return true; //新規ゲーム

      const gameVersionId = searchGameVersionId(gameId);
      if (!gameVersionId) return false;

      const gameDirectory = getAbsoluteGameDirectory(gameVersionId);

      const existExecutive = await promiseExists(gameDirectory.executive);
      const existPoster = await promiseExists(gameDirectory.poster);
      const existVideo = await promiseExists(gameDirectory.video);

      //Videoは必要ない場合がある
      const existFiles =
        existExecutive && existPoster && (existVideo || !check.movieUpdatedAt);

      return (
        !existFiles ||
        oldGameInfo.poster.updateAt !== check.imgUpdatedAt ||
        oldGameInfo.video?.updateAt !== check.movieUpdatedAt ||
        oldGameInfo.info.updateAt !== check.bodyUpdatedAt
      );
    }
  );

  const needUpdateNum = needUpdateGameIds.length;
  progressLog.reset(needUpdateNum, needUpdateNum, needUpdateNum);

  //ゲームのアップデート
  await promiseSome(needUpdateGameIds, async (check) => {
    const { id: gameId } = check;
    const gameVersionId = searchGameVersionId(gameId);
    if (!gameVersionId) return undefined;

    const gameDirectory = getAbsoluteGameDirectory(gameVersionId);
    await promises.mkdir(gameDirectory.base, { recursive: true });

    const updateExecutive = async (): Promise<void> => {
      const { data } = await getGameFile(gameId);
      await unzip(data, gameDirectory.executive, check.md5, () =>
        progressLog.add('fileDownload')
      ).catch(console.error);

      progressLog.add('fileDecompress');
    };

    const updatePoster = async (): Promise<void> => {
      const { data } = await getGameImage(gameId);

      const writeStream = createWriteStream(gameDirectory.poster);
      await data.pipe(writeStream);
      await new Promise<void>((resolve, reject) => {
        writeStream.on('finish', resolve);
        writeStream.on('error', reject);
      });

      progressLog.add('posterDownload');
    };

    const updateVideo = async (): Promise<void> => {
      if (!check.movieUpdatedAt) {
        progressLog.add('videoDownload');
        return; //videoがない場合
      }
      //303リダイレクトなので型が通らない
      const { data } = (await getGameVideo(gameId)) as { data: any };

      const writeStream = createWriteStream(gameDirectory.video);
      await data.pipe(writeStream);
      await new Promise<void>((resolve, reject) => {
        writeStream.on('finish', resolve);
        writeStream.on('error', reject);
      });

      progressLog.add('videoDownload');
    };

    await Promise.all([updateExecutive(), updatePoster(), updateVideo()]);
  });

  //gameInfoを更新
  const newGameInfos: TraPCollection.GameInfo[] = await promiseSome(
    versionsCheck,
    async (check) => {
      const apiGameInfo = apiGameInfos.find(({ id }) => id === check.id);
      if (!apiGameInfo) {
        return undefined;
      }

      if (!apiGameInfo.version) return undefined;

      const gameDirectory = getLocalGameDirectory(apiGameInfo.version.id);

      const info: TraPCollection.GameInfo['info'] = await (async () => {
        if (check.type === 'url') {
          const { data: url } = await getGameUrl(check.id);
          return { type: 'url', url, updateAt: check.bodyUpdatedAt };
        }

        // typeがurl以外で，かつentryPointが存在しない
        if (!check.entryPoint) {
          throw 'entryPoint is not found';
        }

        const entryPoint = path.join(
          gameDirectory.base,
          'dist',
          check.entryPoint
        );

        if (check.type === 'jar') {
          return {
            type: 'jar',
            entryPoint,
            updateAt: check.bodyUpdatedAt,
          };
        }

        return {
          type: 'app',
          entryPoint,
          updateAt: check.bodyUpdatedAt,
        };
      })();

      const video = check.movieUpdatedAt
        ? {
            updateAt: check.movieUpdatedAt,
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
          updateAt: check.imgUpdatedAt,
          path: gameDirectory.poster,
        },
        video,
        version: apiGameInfo.version,
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
