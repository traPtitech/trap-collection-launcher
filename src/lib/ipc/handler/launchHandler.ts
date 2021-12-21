import childProcess from 'child_process';
import path from 'path';
import { BrowserWindow } from 'electron';
import { ipcMain } from '@/common/typedIpc';
import { store } from '@/lib/store';
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
    const url =
      target.type === 'url' ? target.url : generateAbsolutePath(target.url);
    console.log(url);
    const child = launch[platform][target.type](url);
    child.on('exit', () => {
      window.reload();
      window.restore();
      window.focus();
    });
  });
};

export default launchHandler;

const launch: Record<
  TraPCollection.Platform,
  Record<TraPCollection.GameType, (url: string) => childProcess.ChildProcess>
> = {
  win32: {
    app: (url) =>
      childProcess.spawn(path.basename(url), {
        stdio: 'ignore',
        cwd: path.dirname(url),
      }),
    jar: (url) =>
      childProcess.spawn(`javaw -jar ${path.basename(url)}`, {
        stdio: 'ignore',
        cwd: path.dirname(url),
      }),
    url: (url) => childProcess.spawn(`cmd`, ['/C', `start /wait ${url}`]),
  },
  darwin: {
    app: (url) => childProcess.spawn('open', ['-W', url]),
    jar: (url) => childProcess.spawn('open', ['-W', url]),
    url: (url) => childProcess.spawn('open', ['-W', url]),
  },
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
};
