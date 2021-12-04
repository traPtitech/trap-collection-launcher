import { WriteStream, createWriteStream, promises } from 'fs';
import decompress from 'decompress';
import { version } from '@/config';
import {
  getGameFile,
  getGameImage,
  getGameInfo,
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
  const { data } = await getVersion(0);
  const { data: versionsCheck } = await getVersionsCheck();

  Promise.all([
    ...data.games.map(async ({ id }) => {
      const { data } = await getGameFile(id);
      const { data: infoData } = await getGameInfo(id);

      // mkdirp
      await promises.mkdir(generateLocalPath('games', id), { recursive: true });

      // stream
      if (!(data instanceof WriteStream))
        throw new Error('data is not WriteStream');
      data.pipe(
        createWriteStream(
          generateAbsolutePath(generateLocalPath('games', id, 'game.zip'))
        )
      );

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
      const { data } = await getGameImage(id);
      if (!(data instanceof WriteStream))
        throw new Error('data is not WriteStream');
      data.pipe(
        createWriteStream(
          generateAbsolutePath(generateLocalPath('artworks', id, 'poster.png'))
        )
      );
    }),
    ...data.games.map(async ({ id }) => {
      const { data } = await getGameVideo(id);
      if (!(data instanceof WriteStream))
        throw new Error('data is not WriteStream');
      data.pipe(
        createWriteStream(
          generateAbsolutePath(generateLocalPath('artworks', id, 'video.mp4'))
        )
      );
    }),
  ]).catch((reason) => {
    console.error(reason);
  });
};
