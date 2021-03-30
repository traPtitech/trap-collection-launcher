import { BrowserWindow } from 'electron';
import { checkJavaHandler } from './handler/checkJavaHandler';
import { getGameInfoHandler } from './handler/getGameInfoHandler';
import { launchHandler } from './handler/launchHandler';
import { setProductKeyHandler } from './handler/setProductKeyHandler';
import setSeatIdHandler from './handler/setSeatIdHandler';
import { setSeatVersionIdHandler } from './handler/setSeatVersionHandler';
import { sitDownHandler } from './handler/sitDownHandler';
import { sitUpHandler } from './handler/sitUpHandler';
import { ipcMain } from '@/common/typedIpc';

export default ({ window }: { window: BrowserWindow }): void => {
  ipcMain.removeHandler('launch');
  ipcMain.removeHandler('getGameInfo');
  ipcMain.removeHandler('checkJava');
  ipcMain.removeHandler('setProductKey');
  ipcMain.removeHandler('setSeatId');
  ipcMain.removeHandler('setSeatVersionId');
  ipcMain.removeHandler('sitDown');
  ipcMain.removeHandler('sitUp');
  launchHandler(window);
  getGameInfoHandler();
  checkJavaHandler();
  setProductKeyHandler();
  setSeatIdHandler();
  setSeatVersionIdHandler();
  sitDownHandler();
  sitUpHandler;
};
