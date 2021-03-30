import { contextBridge } from 'electron';
import { ipcRenderer } from '@/common/typedIpc';

const api: TraPCollection.API = {
  invoke: {
    launch: async (launchTarget) => {
      return await ipcRenderer.invoke('launch', launchTarget);
    },
    getGameInfo: async () => {
      return await ipcRenderer.invoke('getGameInfo');
    },
    checkJava: async () => {
      return await ipcRenderer.invoke('checkJava');
    },
    setProductKey: async (productKey) => {
      return await ipcRenderer.invoke('setProductKey', productKey);
    },
    setSeatId: async (seatId) => {
      return await ipcRenderer.invoke('setSeatId', seatId);
    },
    setSeatVersionId: async (seatVersionId) => {
      return await ipcRenderer.invoke('setSeatVersionId', seatVersionId);
    },
  },
  on: {
    progress: (listener) => {
      ipcRenderer.on('progress', listener);
    },
  },
};

contextBridge.exposeInMainWorld('TraPCollectionAPI', api);
