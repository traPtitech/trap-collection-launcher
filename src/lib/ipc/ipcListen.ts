import { BrowserWindow } from 'electron';
import { checkJavaHandler } from './handler/checkJavaHandler';
import { getGameInfoHandler } from './handler/getGameInfoHandler';
import { launchHandler } from './handler/launchHandler';
import { ipcMain } from '@/common/typedIpc';

export default ({ window }: { window: BrowserWindow }): void => {
  ipcMain.removeHandler('launch');
  ipcMain.removeHandler('getGameInfo');
  ipcMain.removeHandler('checkJava');
  launchHandler(window);
  getGameInfoHandler();
  checkJavaHandler();
};
