import { ipcRenderer } from '@/common/typedIpc';
import { contextBridge } from 'electron';

const api: TraPCollection.API = {
  launch: async (launchTarget) => {
    ipcRenderer.invoke('launch', launchTarget);
    return;
  },
  getGameInfo: async () => {
    const gameInfo = await ipcRenderer.invoke('getGameInfo');
    return gameInfo;
  },
  onReceiveExample: async () => {
    return;
  },
};

contextBridge.exposeInMainWorld('TraPCollectionAPI', api);
