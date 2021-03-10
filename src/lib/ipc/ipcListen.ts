import { BrowserWindow } from 'electron';
import { ipcMain } from '@/common/typedIpc';
import launch from './handler/launch';

export default ({ window }: { window: BrowserWindow }): void => {
  ipcMain.removeHandler('launch');
  launch(window);
};
