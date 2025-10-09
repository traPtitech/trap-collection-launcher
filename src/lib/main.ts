import { app, BrowserWindow, protocol } from 'electron';
import path from 'path';
declare const MAIN_WINDOW_VITE_DEV_SERVER_URL: string;
declare const MAIN_WINDOW_VITE_NAME: string;
import logger from 'electron-log';
import { updateElectronApp } from 'update-electron-app';
import { detectSeated } from './utils/detectSeated';
import { ipcMain } from '@/common/typedIpc';
import { isKoudaisai } from '@/config';
import ipcListener from '@/lib/ipc/ipcListener';

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
   
  app.quit();
}

app.whenReady().then(() => {
  // imgタグでローカルファイルを表示する
  /**
   * @see {@link https://github.com/electron/electron/issues/23757}
   */
  if (process.env.NODE_ENV === 'development') {
    protocol.registerFileProtocol('file', (request, callback) => {
      const pathname = decodeURIComponent(request.url.replace('file:///', ''));
      callback(pathname);
    });
  }
});

const createWindow = (): void => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    height: 720,
    width: 1280,
    minHeight: 720,
    minWidth: 1280,
    // fullscreen: true,
    webPreferences: {
      // webSecurity: process.env.NODE_ENV !== 'development', // developmentのときのみローカルファイルへのアクセスを許可する
      preload: path.join(__dirname, 'preload.cjs'),
    },
    show: false,
  });
  ipcListener.setWindow(mainWindow);

  // and load the index.html of the app.
  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
  } else {
    mainWindow.loadFile(
      `${__dirname}/../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`
    );
  }
  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
    mainWindow.maximize();
  });

  mainWindow.setMenu(null);

  mainWindow.on('focus', () => {
    ipcMain.send<'onBrowserWindowFocus'>(mainWindow, 'onBrowserWindowFocus');
  });
  mainWindow.on('blur', () => {
    ipcMain.send<'onBrowserWindowBlur'>(mainWindow, 'onBrowserWindowBlur');
  });

  if (process.env.NODE_ENV === 'production') {
    // mainWindow.setMenu(null);
  }
  if (process.env.NODE_ENV === 'development') {
    // Open the DevTools.
    mainWindow.webContents.openDevTools();
  }
  if (process.env.KOUDAISAI === 'true') {
    detectSeated();
  }
};

const gotTheLock = app.requestSingleInstanceLock();
if (!gotTheLock) {
  app.quit();
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', () => {
  ipcListener.init();
  createWindow();
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    ipcListener.init();
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
// const server = 'https://update.electronjs.org';
// const feed = `${server}/traPtitech/trap-collection-launcher/${
//   process.platform
// }-${process.arch}/${app.getVersion()}`;
// autoUpdater.setFeedURL({ url: feed });

// setInterval(() => {
//   autoUpdater.checkForUpdates();
// }, 30 * 60 * 1000);

if (!isKoudaisai) {
  updateElectronApp({
    repo: 'traPtitech/trap-collection-launcher',
    updateInterval: '1 hour',
    logger: logger,
  });
}
