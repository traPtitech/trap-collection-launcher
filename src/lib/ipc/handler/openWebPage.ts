import { BrowserWindow } from 'electron';
import { ipcMain } from '@/common/typedIpc';
import { questionnaireUrl, homePageUrl } from '@/config';

export const openQuestionnaireHandler = async (
  window: BrowserWindow
): Promise<void> => {
  ipcMain.handle('openQuestionnaire', async (_event) => {
    const platform = process.platform;
    if (platform !== 'win32' && platform !== 'darwin') {
      return;
    }
    window.loadURL(questionnaireUrl);
    window.minimize();
  });
};

export const openHomePageHandler = async (
  window: BrowserWindow
): Promise<void> => {
  ipcMain.handle('openHomePage', async (_event) => {
    const platform = process.platform;
    if (platform !== 'win32' && platform !== 'darwin') {
      return;
    }
    window.loadURL(homePageUrl);
    window.minimize();
  });
};
