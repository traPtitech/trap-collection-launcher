/**
 * This file will automatically be loaded by webpack and run in the "renderer" context.
 * To learn more about the differences between the "main" and the "renderer" context in
 * Electron, visit:
 *
 * https://electronjs.org/docs/tutorial/application-architecture#main-and-renderer-processes
 *
 * By default, Node.js integration in this file is disabled. When enabling Node.js integration
 * in a renderer process, please be aware of potential security implications. You can read
 * more about security risks here:
 *
 * https://electronjs.org/docs/tutorial/security
 *
 * To enable Node.js integration in this file, open up `main.js` and enable the `nodeIntegration`
 * flag:
 *
 * ```
 *  // Create the browser window.
 *  mainWindow = new BrowserWindow({
 *    width: 800,
 *    height: 600,
 *    webPreferences: {
 *      nodeIntegration: true
 *    }
 *  });
 * ```
 */

import i18n from 'i18next';
import React from 'react';
import ReactDOM from 'react-dom';
import { initReactI18next } from 'react-i18next';
import App from '@/renderer/App';
import * as config from '@/renderer/config';
import en from '@/renderer/lang/en.json';
import ja from '@/renderer/lang/ja.json';

const main = (): void => {
  const conf =
    process.env.KOUDAISAI === 'true'
      ? config.koudaisaiConfig
      : config.generalConfig;

  i18n.use(initReactI18next).init({
    resources: {
      en: { translation: en },
      ja: { translation: ja },
    },
    lng: conf.lng,
    interpolation: { escapeValue: false },
  });

  ReactDOM.render(<App config={conf} />, document.getElementById('root'));
};

main();
