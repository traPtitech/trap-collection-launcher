import { BrowserWindow } from 'electron';
import { ipcMain } from '@/common/typedIpc';
import { launchHandler } from './handler/launch';
import { getGameInfoHandler } from './handler/getGameInfo';

export default ({ window }: { window: BrowserWindow }): void => {
  ipcMain.removeHandler('launch');
  ipcMain.removeHandler('getGameInfo');
  launchHandler(window);
  getGameInfoHandler();
};
