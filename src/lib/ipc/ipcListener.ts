import { BrowserWindow } from 'electron';
import { addProductKeyHandler } from './handler/addProductKeyHandler';
import { checkJavaHandler } from './handler/checkJavaHandler';
import { fetchGameHandler } from './handler/fetchGame';
import { getEditionsHandler } from './handler/getEditionsHandler';
import { getGameInfoHandler } from './handler/getGameInfoHandler';
import { getSeatIdHandler } from './handler/getSeatIdHandler';
import { launchHandler } from './handler/launchHandler';
import { postLauncherLoginHandler } from './handler/postLauncherLoginHandler';
import { progressHandler } from './handler/progressHandler';
import { quitAppHandler } from './handler/quitAppHandler';
import { reloadWindowHandler } from './handler/reloadWindowHandler';
import { resetProductKeyHandler } from './handler/resetProductKetHandler';
import setSeatIdHandler from './handler/setSeatIdHandler';
import { sitDownHandler } from './handler/sitDownHandler';
import { sitUpHandler } from './handler/sitUpHandler';
import { ipcMain } from '@/common/typedIpc';
import {
  openHomePageHandler,
  openJavaDownloadPageHandler,
  openQuestionnaireHandler,
} from '@/lib/ipc/handler/openWebPageHandler';
import { getCurrentEditionHandler } from './handler/getCurrentEditionHandler';

class IpcListener {
  window: BrowserWindow | null;

  constructor() {
    this.window = null;
  }

  public init() {
    this.removeListeners();
    this.addListeners();
  }

  public setWindow(window: BrowserWindow) {
    this.window = window;
    this.init();
  }

  private removeListeners() {
    ipcMain.removeHandler('launch');
    ipcMain.removeHandler('openQuestionnaire');
    ipcMain.removeHandler('openHomePage');
    ipcMain.removeHandler('getGameInfo');
    ipcMain.removeHandler('checkJava');
    ipcMain.removeHandler('getEditions');
    ipcMain.removeHandler('getCurrentEdition');
    ipcMain.removeHandler('addProductKey');
    ipcMain.removeHandler('resetProductKey');
    ipcMain.removeHandler('getSeatId');
    ipcMain.removeHandler('setSeatId');
    ipcMain.removeHandler('sitDown');
    ipcMain.removeHandler('sitUp');
    ipcMain.removeHandler('postLauncherLogin');
    ipcMain.removeHandler('fetchGame');
    ipcMain.removeHandler('quitApp');
    ipcMain.removeHandler('reloadWindow');
    ipcMain.removeHandler('openJavaDownloadPage');
    ipcMain.removeHandler('progress');
  }

  private addListeners() {
    launchHandler(this.window);
    openQuestionnaireHandler(this.window);
    openHomePageHandler();
    openJavaDownloadPageHandler();
    getGameInfoHandler();
    checkJavaHandler();
    getEditionsHandler();
    getCurrentEditionHandler();
    addProductKeyHandler();
    resetProductKeyHandler();
    getSeatIdHandler();
    setSeatIdHandler();
    sitDownHandler();
    sitUpHandler();
    postLauncherLoginHandler();
    fetchGameHandler();
    quitAppHandler();
    reloadWindowHandler(this.window);
    progressHandler();
  }
}

const ipcListener = new IpcListener();
export default ipcListener;
