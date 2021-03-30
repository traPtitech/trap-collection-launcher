export * as lang from './lang';

export type Config = {
  lng: string;
  hasSettingPage: boolean;
};

export const generalConfig: Config = {
  lng: 'en',
  hasSettingPage: false,
};

export const koudaisaiConfig: Config = {
  lng: 'ja',
  hasSettingPage: true,
};
