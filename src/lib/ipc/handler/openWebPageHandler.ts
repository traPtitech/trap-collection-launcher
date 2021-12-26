import childProcess from 'child_process';
import { BrowserWindow } from 'electron';
import { ipcMain } from '@/common/typedIpc';
import { questionnaireUrl, homePageUrl, javaDownloadPageUrl } from '@/config';

export const openQuestionnaireHandler = async (
  window: BrowserWindow | null
): Promise<void> => {
  if (!window) {
    return;
  }
  ipcMain.handle('openQuestionnaire', async () => {
    const childWindow = new BrowserWindow({ parent: window });
    childWindow.loadURL(questionnaireUrl);
  });
};

const openWebPage = async (url: string): Promise<void> => {
  const platform = process.platform;
  if (platform === 'win32') {
    childProcess.spawn(`cmd`, ['/C', `start /wait ${url}`]);
  }
  if (platform === 'darwin') {
    childProcess.spawn('open', ['-W', url]);
  }
  return;
};

export const openHomePageHandler = async (): Promise<void> => {
  ipcMain.handle('openHomePage', async () => openWebPage(homePageUrl));
};

export const openJavaDownloadPageHandler = async (): Promise<void> => {
  ipcMain.handle('openJavaDownloadPage', async () =>
    openWebPage(javaDownloadPageUrl)
  );
};
