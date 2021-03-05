import { BrowserWindow } from 'electron';
import launch from './handler/launch';

export default ({ window }: { window: BrowserWindow }): void => {
  launch(window);
};
