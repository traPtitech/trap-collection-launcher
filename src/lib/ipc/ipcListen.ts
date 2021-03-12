import { BrowserWindow } from 'electron';
import { ipcMain } from '@/common/typedIpc';
import launch from './handler/launch';
import getGameInfo from './handler/getGameInfo';

export default ({ window }: { window: BrowserWindow }): void => {
  ipcMain.removeHandler('launch');
  ipcMain.removeHandler('getGameInfo');
  launch(window);
  getGameInfo();
};
