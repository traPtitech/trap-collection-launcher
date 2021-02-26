/* eslint-disable */
export type sessions = {
  sessions?: string;
};

export type userID = {
  userID: string;
};

export type userName = {
  userName: string;
};

export type versionID = {
  versionID?: number;
};

export type operatingSystem = {
  operatingSystem: string;
};

export type accessToken = {
  accessToken: string;
};

export type launcherVersionID = {
  launcherVersionID: number;
};

export type gameID = {
  gameID: string;
};

export type gameVersionID = {
  gameVersionID: number;
};

export type questionID = {
  questionID: number;
};

export type responseID = {
  responseID: string;
};

export type productKeyID = {
  productKeyID: string;
};

export type seatVersionID = {
  seatVersionID: number;
};

export type seatID = {
  seatID: number;
};

export type User = {
  id?: string;
  name: string;
};

export type CheckItem = {
  id: string;
  md5: string;
  type: string;
  bodyUpdatedAt: string;
  imgUpdatedAt: string;
  movieUpdatedAt: string;
};

export type NewGame = {
  name: string;
  description: string;
};

export type Game = {
  id: string;
  name: string;
  createdAt: string;
  version: GameVersion;
};

export type GameInfo = {
  id: string;
  name: string;
  description: string;
  createdAt: string;
};

export type GameMeta = {
  id: string;
  name: string;
};

export type NewGameVersion = {
  name: string;
  description: string;
};

export type GameVersion = {
  id: number;
  name: string;
  description: string;
  createdAt: string;
};

export type NewGameFile = {
  type: string;
  file: Blob;
};

export type NewGameURL = {
  url: string;
};

export type GameFile = {
  id: number;
  type: string;
};

export type GameURL = {
  id: number;
  url: string;
};

export type Maintainers = {
  maintainers: string[];
};

export type Maintainer = {
  id: string;
  name: string;
  role: number;
};

export type NewVersion = {
  name: string;
  'anke-to'?: string;
};

export type Version = {
  id: number;
  name: string;
  'anke-to'?: string;
  createdAt: string;
};

export type VersionMeta = {
  id: number;
  name: string;
  'anke-to'?: string;
  createdAt: string;
};

export type VersionDetails = {
  id: number;
  name: string;
  'anke-to'?: string;
  games: GameMeta[];
  createdAt: string;
};

export type ProductKeyGen = {
  num: number;
  version: number;
};

export type ProductKey = {
  key: string;
};

export type ProductKeyDetail = {
  id?: string;
  key: string;
};

export type LauncherAuthToken = {
  accessToken: string;
  expiresIn: number;
  refreshToken: string;
};

export type SeatVersion = {
  id: number;
  createdAt: string;
};

export type Seat = {
  seatVersionId: number;
  seatId: number;
};

export type SeatDetail = {
  id: number;
  status: number;
  SeatingTime?: string;
};
