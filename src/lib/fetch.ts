import { store } from './store';
import { version } from '@/config';
import { getGameFile, getVersion } from '@/lib/axios';

export const fetch = async (): Promise<void> => {
  const { data } = await getVersion(0);
  Promise.all(
    data.games.map(({ id }) => {
      getGameFile(id).then((res) => {
        res.data.pipe;
      });
    })
  );
};
