import { BrowserWindow } from 'electron';
import { checkJavaHandler } from './handler/checkJavaHandler';
import { getGameInfoHandler } from './handler/getGameInfoHandler';
import { getProductKeyHandler } from './handler/getProductKeyHandler';
import { getSeatIdHandler } from './handler/getSeatIdHandler';
import { getSeatVersionHandler } from './handler/getSeatVersionHandler';
import { launchHandler } from './handler/launchHandler';
import { quitAppHandler } from './handler/quitAppHandler';
import { reloadWindowHandler } from './handler/reloadWindowHandler';
import { resetProductKeyHandler } from './handler/resetProductKetHandler';
import { setProductKeyHandler } from './handler/setProductKeyHandler';
import setSeatIdHandler from './handler/setSeatIdHandler';
import { setSeatVersionIdHandler } from './handler/setSeatVersionHandler';
import { sitDownHandler } from './handler/sitDownHandler';
import { sitUpHandler } from './handler/sitUpHandler';
import { ipcMain } from '@/common/typedIpc';
import {
  openHomePageHandler,
  openQuestionnaireHandler,
} from '@/lib/ipc/handler/openWebPage';

export default ({ window }: { window: BrowserWindow }): void => {
  ipcMain.removeHandler('launch');
  ipcMain.removeHandler('openQuestionnaire');
  ipcMain.removeHandler('openHomePage');
  ipcMain.removeHandler('getGameInfo');
  ipcMain.removeHandler('checkJava');
  ipcMain.removeHandler('getProductKey');
  ipcMain.removeHandler('setProductKey');
  ipcMain.removeHandler('resetProductKey');
  ipcMain.removeHandler('getSeatId');
  ipcMain.removeHandler('setSeatId');
  ipcMain.removeHandler('getSeatVersionId');
  ipcMain.removeHandler('setSeatVersionId');
  ipcMain.removeHandler('sitDown');
  ipcMain.removeHandler('sitUp');
  ipcMain.removeHandler('quitApp');
  ipcMain.removeHandler('reloadWindow');
  launchHandler(window);
  getGameInfoHandler();
  checkJavaHandler();
  getProductKeyHandler();
  setProductKeyHandler();
  resetProductKeyHandler();
  getSeatIdHandler();
  setSeatIdHandler();
  getSeatVersionHandler();
  setSeatVersionIdHandler();
  sitDownHandler();
  sitUpHandler();
  openQuestionnaireHandler(window);
  openHomePageHandler(window);
  quitAppHandler();
  reloadWindowHandler(window);
};
