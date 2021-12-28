import childProcess from 'child_process';
import path from 'path';
import { BrowserWindow } from 'electron';
import { ipcMain } from '@/common/typedIpc';
import store from '@/lib/store';
import { generateAbsolutePath } from '@/lib/utils/generatePaths';

export const launchHandler = async (
  window: BrowserWindow | null
): Promise<void> => {
  if (!window) {
    return;
  }
  ipcMain.handle('launch', async (_event, gameId) => {
    const platform = process.platform;
    if (platform !== 'win32' && platform !== 'darwin') {
      return;
    }
    const target = store
      .get('gameInfo')
      .find((gameInfo) => gameInfo.id === gameId);
    if (!target) {
      return;
    }

    launch[platform](target);
  });
};

export default launchHandler;

const launch: Record<
  TraPCollection.Platform,
  (gameInfo: TraPCollection.GameInfo) => childProcess.ChildProcess
> = {
  win32: (gameInfo) => {
    switch (gameInfo.info.type) {
      case 'url':
        return childProcess.spawn(`cmd`, [
          '/C',
          `start /wait ${gameInfo.info.url}`,
        ]);
      case 'app': {
        console.log(
          path.dirname(generateAbsolutePath(gameInfo.info.entryPoint))
        );
        return childProcess.spawn(path.basename(gameInfo.info.entryPoint), {
          stdio: 'ignore',
          cwd: path.dirname(generateAbsolutePath(gameInfo.info.entryPoint)),
        });
      }
      case 'jar':
        return childProcess.spawn(
          `javaw`,
          ['-jar', path.basename(gameInfo.info.entryPoint)],
          {
            stdio: 'ignore',
            cwd: path.dirname(generateAbsolutePath(gameInfo.info.entryPoint)),
          }
        );
    }
  },
  darwin: (gameInfo) => {
    switch (gameInfo.info.type) {
      case 'url':
        return childProcess.spawn('open', ['-W', gameInfo.info.url]);
      case 'app':
        return childProcess.spawn('open', [
          '-W',
          generateAbsolutePath(gameInfo.info.entryPoint),
        ]);
      case 'jar':
        return childProcess.spawn('open', [
          '-W',
          generateAbsolutePath(gameInfo.info.entryPoint),
        ]);
    }
  },
};

// linux: {
//   app: (url) =>
//     childProcess.spawn('./' + path.basename(url), {
//       stdio: 'ignore',
//       cwd: path.dirname(url),
//     }),
//   jar: (url) =>
//     childProcess.spawn('./' + path.basename(url), {
//       stdio: 'ignore',
//       cwd: path.dirname(url),
//     }),
//   url: (url) => childProcess.spawn('sensible-browser', [url]),
// },
// };
