import { BrowserWindow } from 'electron';
import { ipcMain } from '@/common/typedIpc';
import { questionaireUrl, homePageUrl } from '@/config';

export const openQuestionnaireHandler = async (
  window: BrowserWindow
): Promise<void> => {
  ipcMain.handle('openQuestionnaire', async () => {
    const childWindow = new BrowserWindow({ parent: window });
    const platform = process.platform;
    if (platform !== 'win32' && platform !== 'darwin') {
      return;
    }
    childWindow.loadURL(questionaireUrl);
  });
};
