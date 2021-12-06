import { BrowserWindow } from 'electron';
import { postLauncherLoginHandler } from './handler/APIHandler';
import { checkJavaHandler } from './handler/checkJavaHandler';
import { getGameInfoHandler } from './handler/getGameInfoHandler';
import { getProductKeyHandler } from './handler/getProductKeyHandler';
import { getSeatIdHandler } from './handler/getSeatIdHandler';
import { getSeatVersionHandler } from './handler/getSeatVersionHandler';
import { launchHandler } from './handler/launchHandler';
import { setProductKeyHandler } from './handler/setProductKeyHandler';
import setSeatIdHandler from './handler/setSeatIdHandler';
import { setSeatVersionIdHandler } from './handler/setSeatVersionHandler';
import { sitDownHandler } from './handler/sitDownHandler';
import { sitUpHandler } from './handler/sitUpHandler';
import { ipcMain } from '@/common/typedIpc';
import {
  openHomePageHandler,
  openQuestionnaireHandler,
} from '@/lib/ipc/handler/openWebPageHandler';

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
    ipcMain.removeHandler('getProductKey');
    ipcMain.removeHandler('setProductKey');
    ipcMain.removeHandler('getSeatId');
    ipcMain.removeHandler('setSeatId');
    ipcMain.removeHandler('getSeatVersionId');
    ipcMain.removeHandler('setSeatVersionId');
    ipcMain.removeHandler('sitDown');
    ipcMain.removeHandler('sitUp');
    ipcMain.removeHandler('postLauncherLogin');
  }

  private addListeners() {
    launchHandler(this.window);
    openQuestionnaireHandler(this.window);
    openHomePageHandler();
    getGameInfoHandler();
    checkJavaHandler();
    getProductKeyHandler();
    setProductKeyHandler();
    getSeatIdHandler();
    setSeatIdHandler();
    getSeatVersionHandler();
    setSeatVersionIdHandler();
    sitDownHandler();
    sitUpHandler();
    postLauncherLoginHandler();
  }
}

const ipcListener = new IpcListener();
export default ipcListener;