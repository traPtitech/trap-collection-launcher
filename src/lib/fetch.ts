import { createWriteStream, promises, existsSync, readdir } from 'fs';
import path from 'path';
import decompress from 'decompress';
import {
  getGameFile,
  getGameImage,
  getGameInfo,
  getGameUrl,
  getGameVideo,
  getVersionsCheck,
} from '@/lib/axios';
import { store } from '@/lib/store';
import { md5sumFile } from '@/lib/utils/checksum';
import {
  generateAbsolutePath,
  generateLocalPath,
} from '@/lib/utils/generatePaths';
import { promiseExists } from '@/lib/utils/promiseExists';

export const fetch = async (): Promise<void> => {
  const { data } = await getVersionsCheck();
  const gameInfos = store.get('gameInfo');

  await Promise.all([
    ...data
      .filter(({ type }) => {
        return type !== 'url';
      })
      .map(async ({ id, md5, bodyUpdatedAt }) => {
        const { data } = await getGameFile(id);

        const absolutePath = generateAbsolutePath(
          generateLocalPath('games', id, 'game.zip')
        );
        const absoluteDir = path.dirname(absolutePath);

        const existDir = await promiseExists(absoluteDir);
        if (!existDir) {
          await promises.mkdir(absoluteDir, { recursive: true });
        }

        const existPath = await promiseExists(absolutePath);

        // bodyUpdatedAtが異なるなら更新
        if (
          (gameInfos.find(({ id: tempId }) => id === tempId)?.bodyUpdatedAt ??
            '') !== bodyUpdatedAt ||
          !existPath
        ) {
          const stream = createWriteStream(absolutePath);
          data.pipe(stream);

          await new Promise<void>((resolve, reject) => {
            stream.on('finish', async () => {
              await decompress(absolutePath, absoluteDir + '/dist').catch(
                console.error
              );

              // checksum
              const md5sum = await md5sumFile(absolutePath).catch(
                () => undefined
              );
              md5sum === md5 ? resolve() : reject();
            });
            stream.on('error', reject);
          });
        }
      }),
    ...data.map(async ({ id, imgUpdatedAt }) => {
      const { data } = await getGameImage(id);

      const absolutePath = generateAbsolutePath(
        generateLocalPath('artworks', id, 'poster.png')
      );
      const absoluteDir = path.dirname(absolutePath);

      const existDir = await promiseExists(absoluteDir);
      if (!existDir) {
        await promises.mkdir(absoluteDir, { recursive: true });
      }

      const existPath = await promiseExists(absolutePath);

      if (
        (gameInfos.find(({ id: tempId }) => id === tempId)?.imgUpdatedAt ??
          '') !== imgUpdatedAt ||
        !existPath
      ) {
        const stream = createWriteStream(absolutePath);

        await data.pipe(stream);

        await new Promise<void>((resolve, reject) => {
          stream.on('finish', resolve);
          stream.on('error', reject);
        });
      }
    }),
    ...data.map(async ({ id, movieUpdatedAt }) => {
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

        const existPath = await promiseExists(absolutePath);

        // movieUpdatedAtが異なるなら更新
        if (
          (gameInfos.find(({ id: tempId }) => id === tempId)?.movieUpdatedAt ??
            '') !== movieUpdatedAt ||
          !existPath
        ) {
          const stream = createWriteStream(absolutePath);

          await data.pipe(stream);

          await new Promise<void>((resolve, reject) => {
            stream.on('finish', resolve);
            stream.on('error', reject);
          });
        }
      } catch {
        () => {
          return;
        };
      }
    }),
  ]).catch((reason) => {
    throw reason;
  });

  const newGameInfos: TraPCollection.GameInfo[] = await Promise.all(
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
            return generateLocalPath('games', id + '/dist', entryPoint) ?? '';
          });

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
          type:
            type !== 'app' && type !== 'jar' && type !== 'url' ? 'url' : type,
          url,
          poster,
          video,
          bodyUpdatedAt,
          imgUpdatedAt,
          movieUpdatedAt,
        };
      }
    )
  );

  store.set('gameInfo', newGameInfos);
};

const searchFiles = (dirpath: any): Promise<string | undefined> =>
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
