import { BrowserWindow } from 'electron';
import { ipcMain } from '@/common/typedIpc';
import { launchHandler } from './handler/launchHandler';
import { getGameInfoHandler } from './handler/getGameInfoHandler';
import { checkJavaHandler } from './handler/checkJavaHandler';

export default ({ window }: { window: BrowserWindow }): void => {
  ipcMain.removeHandler('launch');
  ipcMain.removeHandler('getGameInfo');
  ipcMain.removeHandler('checkJava');
  launchHandler(window);
  getGameInfoHandler();
  checkJavaHandler();
};
