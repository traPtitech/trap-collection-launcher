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
    resetProductKey: async () => {
      return await ipcRenderer.invoke('resetProductKey');
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
    openJavaDownloadPage: async () => {
      return await ipcRenderer.invoke('openJavaDownloadPage');
    },
    postLauncherLogin: async () => {
      return ipcRenderer.invoke('postLauncherLogin');
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
  },
  on: {
    progress: (listener) => {
      ipcRenderer.on('progress', listener);
    },
    onBrowserWindowFocus: (listener) => {
      ipcRenderer.on('onBrowserWindowFocus', listener);
    },
    onBrowserWindowBlur: (listener) => {
      ipcRenderer.on('onBrowserWindowBlur', listener);
    },
  },
};

contextBridge.exposeInMainWorld('TraPCollectionAPI', api);
