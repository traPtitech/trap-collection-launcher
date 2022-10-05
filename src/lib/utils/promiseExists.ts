import { promises } from 'fs';

export const promiseExists = (dir: string) => {
  return promises
    .access(dir)
    .then(() => {
      return true;
    })
    .catch(() => {
      return false;
    });
};
