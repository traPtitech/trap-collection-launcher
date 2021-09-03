export * as lang from './lang';

export type Config = {
  lng: string;
  hasQuestionnaire: boolean;
};

export const generalConfig: Config = {
  lng: 'en',
  hasQuestionnaire: false,
};

export const koudaisaiConfig: Config = {
  lng: 'ja',
  hasQuestionnaire: true,
};
