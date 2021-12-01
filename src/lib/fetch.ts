import { WriteStream, createWriteStream, promises } from 'fs';
import decompress from 'decompress';
import { version } from '@/config';
import {
  getGameFile,
  getGameImage,
  getGameInfo,
  getGameVideo,
  getVersion,
} from '@/lib/axios';
import { store } from '@/lib/store';
import {
  generateAbsolutePath,
  generateLocalPath,
} from '@/lib/utils/generatePaths';

export const fetch = async (): Promise<void> => {
  const { data } = await getVersion(0);
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
