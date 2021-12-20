import {
  WriteStream,
  createWriteStream,
  promises,
  existsSync,
  mkdirSync,
} from 'fs';
import path from 'path';
import decompress from 'decompress';
import { version } from '@/config';
import {
  getGameFile,
  getGameImage,
  getGameInfo,
  getGameUrl,
  getGameVideo,
  getVersion,
  getVersionsCheck,
} from '@/lib/axios';
import { store } from '@/lib/store';
import { md5sumFile } from '@/lib/utils/checksum';
import {
  generateAbsolutePath,
  generateLocalPath,
} from '@/lib/utils/generatePaths';

export const fetch = async (): Promise<void> => {
  const { data } = await getVersion('3c5ae2f1-28ae-43d3-b569-53788895a01c');
  const { data: versionsCheck } = await getVersionsCheck();

  await Promise.all([
    ...versionsCheck
      .filter(({ type }) => {
        return type !== 'url';
      })
      .map(async ({ id }) => {
        const res = await getGameFile(id);
        const { data: infoData } = await getGameInfo(id);

        // mkdirp
        await promises.mkdir(generateLocalPath('games', id), {
          recursive: true,
        });

        // stream
        // if (!(res instanceof WriteStream))
        //   throw new Error('getGameFile: data is not WriteStream');

        const { data } = res;

        const absolutePath = generateAbsolutePath(
          generateLocalPath('games', id, 'game.zip')
        );
        const absoluteDir = path.dirname(absolutePath);

        if (!existsSync(absoluteDir)) {
          mkdirSync(absoluteDir, { recursive: true });
        }

        await data.pipe(createWriteStream(absolutePath));

        // checksum
        const md5sum = await md5sumFile(
          generateAbsolutePath(generateLocalPath('games', id, 'game.zip'))
        );
        const versionCheck = versionsCheck.filter((v) => v.id === id);
        if (versionCheck.length === 1 && versionCheck[0].md5 !== md5sum) {
          throw new Error('the data does not match checksum');
        }

        // decompress
        decompress(
          generateLocalPath('games', id, 'game.zip'),
          generateLocalPath('games', id)
        );
      }),
    ...data.games.map(async ({ id }) => {
      const res = await getGameImage(id);
      // if (!(res instanceof WriteStream))
      //   throw new Error('getGameImage: data is not WriteStream');
      const absolutePath = generateAbsolutePath(
        generateLocalPath('artworks', id, 'poster.png')
      );
      const absoluteDir = path.dirname(absolutePath);

      if (!existsSync(absoluteDir)) {
        mkdirSync(absoluteDir, { recursive: true });
      }

      await res.data.pipe(createWriteStream(absolutePath));
    }),
    ...data.games.map(async ({ id }) => {
      try {
        const res = await getGameVideo(id);
        // if (!(res instanceof WriteStream))
        //   throw new Error('getGameVideo: data is not WriteStream');

        const absolutePath = generateAbsolutePath(
          generateLocalPath('artworks', id, 'video.mp4')
        );
        const absoluteDir = path.dirname(absolutePath);

        if (!existsSync(absoluteDir)) {
          mkdirSync(absoluteDir, { recursive: true });
        }

        await res.data.pipe(createWriteStream(absolutePath));
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
        .catch(() => generateLocalPath('games', id));
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
