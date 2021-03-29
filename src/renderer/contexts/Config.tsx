import React, { useContext } from 'react';
import * as config from '@/renderer/config';

/* eslint-disable @typescript-eslint/no-non-null-assertion */
const ConfigContext = React.createContext<config.Config>(undefined!);

export const ConfigProvider = ConfigContext.Provider;

export const useConfig = (): config.Config => {
  return useContext(ConfigContext);
};
