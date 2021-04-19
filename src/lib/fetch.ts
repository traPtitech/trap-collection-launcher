import { store } from './store';
import { getVersions } from '@/lib/axios';

export const fetch = async (): Promise<void> => {
  const version = await getVersions(1);

  console.log(version.body.games);
};
