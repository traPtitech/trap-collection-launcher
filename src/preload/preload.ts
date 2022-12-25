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
    getEditions: async () => {
      return await ipcRenderer.invoke('getEditions');
    },
    addProductKey: async (productKey) => {
      return await ipcRenderer.invoke('addProductKey', productKey);
    },
    resetProductKey: async () => {
      return await ipcRenderer.invoke('resetProductKey');
    },
    getSeatId: async () => {
      return await ipcRenderer.invoke('getSeatId');
    },
    setSeatId: async (seatId) => {
      return await ipcRenderer.invoke('setSeatId', seatId);
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
    openJavaDownloadPage: async () => {
      return await ipcRenderer.invoke('openJavaDownloadPage');
    },
    postLauncherLogin: async (productKey) => {
      return ipcRenderer.invoke('postLauncherLogin', productKey);
    },
    fetchGame: async () => {
      return await ipcRenderer.invoke('fetchGame');
    },
    quitApp: async () => {
      return await ipcRenderer.invoke('quitApp');
    },
    reloadWindow: async () => {
      return await ipcRenderer.invoke('reloadWindow');
    },
    progress: async () => {
      return await ipcRenderer.invoke('progress');
    },
  },
  on: {
    onBrowserWindowFocus: (listener) => {
      ipcRenderer.on('onBrowserWindowFocus', listener);
    },
    onBrowserWindowBlur: (listener) => {
      ipcRenderer.on('onBrowserWindowBlur', listener);
    },
  },
  removeListener: {
    onBrowserWindowFocus: (listener) => {
      ipcRenderer.removeListener('onBrowserWindowFocus', listener);
    },
    onBrowserWindowBlur: (listener) => {
      ipcRenderer.removeListener('onBrowserWindowBlur', listener);
    },
  },
};

contextBridge.exposeInMainWorld('TraPCollectionAPI', api);
