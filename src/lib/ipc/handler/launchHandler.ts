import childProcess from 'child_process';
import path from 'path';
import { BrowserWindow } from 'electron';
import { ipcMain } from '@/common/typedIpc';
import launchedGames from '@/lib/launchedGames';
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

    const cp = launch[platform](target);
    window.minimize();

    if (cp instanceof BrowserWindow) {
      launchedGames.add(cp);
      cp.on('close', () => {
        launchedGames.remove(cp);
        window.maximize();
      });
      return;
    }
    if (cp) {
      launchedGames.add(cp);
      cp.on('close', () => {
        launchedGames.remove(cp);
        window.maximize();
      });
    }
  });
};

export default launchHandler;

const getEntryPointDirname = (versionId: string, entryPoint: string) => {
  const abs = generateAbsolutePath(
    path.join('games', versionId, 'dist', entryPoint)
  );
  return path.dirname(abs);
};

const launchBrowserApp = (url: string) => {
  // Create the browser window.
  const gameWindow = new BrowserWindow({
    height: 720,
    width: 1280,
    minHeight: 720,
    minWidth: 1280,
    // fullscreen: true,
    webPreferences: {
      // webSecurity: process.env.NODE_ENV !== 'development', // developmentのときのみローカルファイルへのアクセスを許可する
      preload: process.env.MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
    },
    show: false,
  });

  // and load the index.html of the app.
  gameWindow.loadURL(url);
  gameWindow.once('ready-to-show', () => {
    gameWindow.show();
    gameWindow.maximize();
  });
  gameWindow.setMenu(null);
  return gameWindow;
};

const launch: Record<
  TraPCollection.Platform,
  (
    gameInfo: TraPCollection.GameInfo
  ) => childProcess.ChildProcess | BrowserWindow
> = {
  win32: (gameInfo) => {
    switch (gameInfo.info.type) {
      case 'url':
        return launchBrowserApp(gameInfo.info.url);
      case 'app': {
        return childProcess.exec(
          `powershell /c "& './${path.basename(gameInfo.info.entryPoint)}'"`,
          {
            cwd: getEntryPointDirname(
              gameInfo.version.id,
              gameInfo.info.entryPoint
            ),
          }
        );
      }
      case 'jar':
        return childProcess.spawn(
          `javaw`,
          ['-jar', path.basename(gameInfo.info.entryPoint)],
          {
            stdio: 'ignore',
            cwd: getEntryPointDirname(
              gameInfo.version.id,
              gameInfo.info.entryPoint
            ),
          }
        );
    }
  },
  darwin: (gameInfo) => {
    switch (gameInfo.info.type) {
      case 'url':
        return launchBrowserApp(gameInfo.info.url);
      case 'app':
        return childProcess.spawn('open', [
          '-W',
          generateAbsolutePath(
            path.join(
              'games',
              gameInfo.version.id,
              'dist',
              gameInfo.info.entryPoint
            )
          ),
        ]);
      case 'jar':
        return childProcess.spawn('open', [
          '-W',
          generateAbsolutePath(
            path.join(
              'games',
              gameInfo.version.id,
              'dist',
              gameInfo.info.entryPoint
            )
          ),
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
