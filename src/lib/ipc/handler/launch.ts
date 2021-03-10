import path from 'path';
import childProcess from 'child_process';
import { BrowserWindow } from 'electron';
import { ipcMain } from '@/common/typedIpc';

const launchListener = (window: BrowserWindow): void => {
  ipcMain.handle('launch', async (_event, game) => {
    const platform = process.platform;
    if (platform !== 'win32' && platform !== 'darwin') {
      return;
    }
    const child = launch[platform][game.type](game.url);
    child.on('exit', () => {
      window.reload();
      window.restore();
      window.focus();
    });
    window.minimize();
  });
};

export default launchListener;

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