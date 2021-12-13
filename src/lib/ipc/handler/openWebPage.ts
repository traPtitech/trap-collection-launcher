import childProcess from 'child_process';
import path from 'path';
import { BrowserWindow } from 'electron';
import { ipcMain } from '@/common/typedIpc';
import { questionnaireUrl, homePageUrl } from '@/config';
import { store } from '@/lib/store';

export const openQuestionnaireHandler = async (
  window: BrowserWindow
): Promise<void> => {
  ipcMain.handle('openQuestionnaire', async (_event) => {
    const platform = process.platform;
    if (platform !== 'win32' && platform !== 'darwin') {
      return;
    }
    window.loadURL(questionnaireUrl);
    window.minimize();
  });
};

export const openHomePageHandler = async (
  window: BrowserWindow
): Promise<void> => {
  ipcMain.handle('openHomePage', async (_event) => {
    const platform = process.platform;
    if (platform !== 'win32' && platform !== 'darwin') {
      return;
    }
    window.loadURL(homePageUrl);
    window.minimize();
  });
};

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
