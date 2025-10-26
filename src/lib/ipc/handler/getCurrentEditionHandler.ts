import { ipcMain } from '@/common/typedIpc';
import { getEditionInfo } from '@/lib/axios';
import store from '@/lib/store';

export const getCurrentEditionHandler = (): void => {
  ipcMain.handle('getCurrentEdition', async () => {
    const { data: editionInfo } = await getEditionInfo();
    const editions = store.get('launcherVersions') ?? [];

    return editions.find((edition) => edition.id === editionInfo.id) || null;
  });
};
