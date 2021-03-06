import { BrowserWindow, ipcMain } from 'electron';
import launch from './handler/launch';

export default ({ window }: { window: BrowserWindow }): void => {
  ipcMain.removeHandler('launch');
  launch(window);
};
