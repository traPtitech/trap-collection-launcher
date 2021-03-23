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
  checkJava: async () => {
    const checkJava = await ipcRenderer.invoke('checkJava');
    return checkJava;
  },
  onReceiveExample: async () => {
    return;
  },
};

contextBridge.exposeInMainWorld('TraPCollectionAPI', api);
