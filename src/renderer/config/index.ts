export * as lang from './lang';

export type Config = {
  lng: string;
  hasSeatSetting: boolean;
  hasQuestionnaire: boolean;
};

export const generalConfig: Config = {
  lng: 'en',
  hasSeatSetting: false,
  hasQuestionnaire: false,
};

export const koudaisaiConfig: Config = {
  lng: 'ja',
  hasSeatSetting: true,
  hasQuestionnaire: true,
};
