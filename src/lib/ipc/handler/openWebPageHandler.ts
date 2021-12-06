import childProcess from 'child_process';
import { BrowserWindow } from 'electron';
import { ipcMain } from '@/common/typedIpc';
import { questionaireUrl, homePageUrl } from '@/config';

export const openQuestionnaireHandler = async (
  window: BrowserWindow | null
): Promise<void> => {
  if (!window) {
    return;
  }
  ipcMain.handle('openQuestionnaire', async () => {
    const childWindow = new BrowserWindow({ parent: window });
    childWindow.loadURL(questionaireUrl);
  });
};

export const openHomePageHandler = async (): Promise<void> => {
  ipcMain.handle('openHomePage', async () => {
    const platform = process.platform;
    if (platform === 'win32') {
      childProcess.spawn(`cmd`, ['/C', `start /wait ${homePageUrl}`]);
    }
    if (platform === 'darwin') {
      childProcess.spawn('open', ['-W', homePageUrl]);
    }
    return;
  });
};
