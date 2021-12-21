/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import axios from 'axios';
import { store } from './store';
import { baseUrl } from '@/config';
import {
  LauncherAuthApi,
  GameApi,
  VersionApi,
  SeatApi,
  Configuration,
} from '@/lib/typescript-axios/index';

const axiosInstance = axios.create();
axiosInstance.interceptors.request.use(
  async (config) => {
    const token = store.get('token');
    if (token) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      };
    }
    return config;
  },
  (err) => Promise.reject(err)
);

const axiosStreamInstance = axios.create({ responseType: 'stream' });
axiosStreamInstance.interceptors.request.use(
  async (config) => {
    const token = store.get('token');
    if (token) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      };
    }
    return config;
  },
  (err) => Promise.reject(err)
);

const config = new Configuration({ basePath: baseUrl });

const API = {
  LauncherAuthApi: new LauncherAuthApi(config, baseUrl, axiosInstance),
  GameApi: new GameApi(config, baseUrl, axiosInstance),
  GameStreamApi: new GameApi(config, baseUrl, axiosStreamInstance),
  VersionApi: new VersionApi(config, baseUrl, axiosInstance),
  SeatApi: new SeatApi(config, baseUrl, axiosInstance),
};

/**
 * accessTokenの取得
 * @param key string
 */
export const postLauncherLogin = async (key: string) =>
  API.LauncherAuthApi.postLauncherLogin({ key });

/**
 * ゲーム情報の取得
 * @param gameId string
 */
export const getGameInfo = async (gameId: string) =>
  API.GameApi.getGame(gameId);

/**
 * ゲーム画像の取得
 * @param gameId string
 */
export const getGameImage = async (gameId: string) =>
  API.GameStreamApi.getImage(gameId);

/**
 * ゲーム動画の取得
 * @param gameId string
 */
export const getGameVideo = async (gameId: string) =>
  API.GameStreamApi.getVideo(gameId);

/**
 * ゲームの最新バージョンのファイルの取得
 * @param gameId string
 */
export const getGameFile = async (gameId: string) =>
  API.GameStreamApi.getGameFile(gameId, process.platform);

/**
 * ゲームの最新バージョンのURLの取得
 * @param gameId string
 */
export const getGameUrl = async (gameId: string) =>
  API.GameApi.getGameURL(gameId);

/**
 * バージョンの詳細情報の取得
 * @param launcherVersionId number
 */
export const getVersion = async (launcherVersionId: string) =>
  API.VersionApi.getVersion(launcherVersionId);

/**
 * ブラウザゲーム以外のゲームのID、MD5、ゲームの種類、更新日の一覧
 */
export const getVersionsCheck = async () =>
  API.VersionApi.getCheckList(process.platform);

/**
 * 着席
 * @param seatId number
 * @param seatVersionId number
 */
export const postSeats = async (seatId: number, seatVersionId: number) =>
  API.SeatApi.postSeat({ seatId, seatVersionId });

/**
 * 離席
 * @param seatId number
 * @param seatVersionId number
 */
export const deleteSeats = async (seatId: number, seatVersionId: number) =>
  API.SeatApi.deleteSeat({ seatId, seatVersionId });

export const getLauncherMe = async () => API.LauncherAuthApi.getLauncherMe();
