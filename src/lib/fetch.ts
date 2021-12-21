import { createWriteStream, promises, existsSync, readdir } from 'fs';
import path from 'path';
import decompress from 'decompress';
import {
  getGameFile,
  getGameImage,
  getGameInfo,
  getGameUrl,
  getGameVideo,
  getVersion,
  getVersionsCheck,
  getLauncherMe,
} from '@/lib/axios';
import { store } from '@/lib/store';
import { md5sumFile } from '@/lib/utils/checksum';
import {
  generateAbsolutePath,
  generateLocalPath,
} from '@/lib/utils/generatePaths';
import { promiseExists } from '@/lib/utils/promiseExists';

export const fetch = async (): Promise<void> => {
  const { data: version } = await getLauncherMe();
  const { data } = await getVersion(version.id);
  const { data: versionsCheck } = await getVersionsCheck();

  await Promise.all([
    ...versionsCheck
      .filter(({ type }) => {
        return type !== 'url';
      })
      .map(async ({ id, md5 }) => {
        const { data } = await getGameFile(id);

        const absolutePath = generateAbsolutePath(
          generateLocalPath('games', id, 'game.zip')
        );
        const absoluteDir = path.dirname(absolutePath);

        const existDir = await promiseExists(absoluteDir);
        if (!existDir) {
          await promises.mkdir(absoluteDir, { recursive: true });
        }

        // checksum
        const md5sum = await md5sumFile(absolutePath).catch(() => undefined);

        // checksum が異なるなら更新
        if (md5sum === undefined || md5 !== md5sum) {
          const stream = await createWriteStream(absolutePath);
          await data.pipe(stream);

          // decompress
          stream.on('finish', () => {
            decompress(absolutePath, absoluteDir + '/dist').catch(
              console.error
            );
          });
        }
      }),
    ...data.games.map(async ({ id }) => {
      const { data } = await getGameImage(id);

      const absolutePath = generateAbsolutePath(
        generateLocalPath('artworks', id, 'poster.png')
      );
      const absoluteDir = path.dirname(absolutePath);

      const existDir = await promiseExists(absoluteDir);
      if (!existDir) {
        await promises.mkdir(absoluteDir, { recursive: true });
      }

      await data.pipe(createWriteStream(absolutePath));
    }),
    ...data.games.map(async ({ id }) => {
      try {
        const { data } = await getGameVideo(id);

        const absolutePath = generateAbsolutePath(
          generateLocalPath('artworks', id, 'video.mp4')
        );
        const absoluteDir = path.dirname(absolutePath);

        const existDir = await promiseExists(absoluteDir);
        if (!existDir) {
          await promises.mkdir(absoluteDir, { recursive: true });
        }

        await data.pipe(createWriteStream(absolutePath));
      } catch {
        return;
      }
    }),
  ]).catch((reason) => {
    console.error(reason);
    return;
  });

  const gameInfos: TraPCollection.GameInfo[] = await Promise.all(
    data.games.map(async ({ id }) => {
      const { data } = await getGameInfo(id);
      const { id: gameId, name, description, createdAt, version } = data;
      const url = await getGameUrl(id)
        .then(({ data: url }) => url)
        .catch(async () => {
          const parentPath =
            generateAbsolutePath(generateLocalPath('games', id)) + '\\dist';
          const gamefile = await searchFiles(parentPath);
          if (gamefile === undefined) return '';
          return gamefile;
        });
      const tempType = versionsCheck.find(({ id: temp }) => temp === id)?.type;
      const type: TraPCollection.GameType =
        tempType !== 'app' && tempType !== 'jar' && tempType !== 'url'
          ? 'url'
          : tempType;

      const absoluteVideoPath = generateAbsolutePath(
        generateLocalPath('artworks', id, 'video.mp4')
      );

      const poster = generateLocalPath('artworks', id, 'poster.png');
      const video = existsSync(absoluteVideoPath)
        ? generateLocalPath('artworks', id, 'video.mp4')
        : undefined;

      return {
        id: gameId,
        name,
        createdAt,
        version,
        description: description ?? '',
        type,
        url,
        poster,
        video,
      };
    })
  );

  store.set('gameInfo', gameInfos);
};

const searchFiles = (dirpath: any): Promise<string | undefined> =>
  new Promise((resolve, reject) => {
    readdir(dirpath, { withFileTypes: true }, async (err, dirents) => {
      if (err) {
        console.error(err);
        reject(err);
      }

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
      });
    });
  });
