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
    getProductKey: async () => {
      return await ipcRenderer.invoke('getProductKey');
    },
    setProductKey: async (productKey) => {
      return await ipcRenderer.invoke('setProductKey', productKey);
    },
    getSeatId: async () => {
      return await ipcRenderer.invoke('getSeatId');
    },
    setSeatId: async (seatId) => {
      return await ipcRenderer.invoke('setSeatId', seatId);
    },
    getSeatVersionId: async () => {
      return await ipcRenderer.invoke('getSeatVersionId');
    },
    setSeatVersionId: async (seatVersionId) => {
      return await ipcRenderer.invoke('setSeatVersionId', seatVersionId);
    },
    sitDown: async () => {
      return await ipcRenderer.invoke('sitDown');
    },
    sitUp: async () => {
      return await ipcRenderer.invoke('sitUp');
    },
    openQuestionnaire: async () => {
      return await ipcRenderer.invoke('openQuestionnaire');
    },
    openHomePage: async () => {
      return await ipcRenderer.invoke('openHomePage');
    },
    postLauncherLogin: async (productKey) => {
      return await ipcRenderer.invoke('postLauncherLogin', productKey);
    },
  },
  on: {
    progress: (listener) => {
      ipcRenderer.on('progress', listener);
    },
  },
};

contextBridge.exposeInMainWorld('TraPCollectionAPI', api);
