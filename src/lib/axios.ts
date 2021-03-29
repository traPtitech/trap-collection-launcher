/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import aspida from '@aspida/axios';
import axios from 'axios';
import { store } from './store';
import { baseUrl } from '@/config';
import api from '@api/$api';

const axiosInstance = axios.create();
axiosInstance.interceptors.request.use(
  async (config) => {
    const productKey = store.get('productKey');
    if (productKey) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${await postLauncherLogin(productKey)}`,
      };
    }
    return config;
  },
  (err) => Promise.reject(err)
);

const aspidaClient = aspida(undefined, {
  baseURL: baseUrl,
});

const client = api(aspidaClient);

/**
 * accessTokenの取得
 * @param key string
 */
const postLauncherLogin = async (key: string) =>
  api(aspida(undefined, { baseURL: baseUrl })).launcher.login.post({
    body: { key },
  });

/**
 * ゲーム情報の取得
 * @param gameId string
 */
export const getGameInfo = async (gameId: string) =>
  client.games._gameID(gameId).info.get();

/**
 * ゲーム画像の取得
 * @param gameId string
 */
export const getGameImage = async (gameId: string) =>
  client.games._gameID(gameId).image.get();

/**
 * ゲーム動画の取得
 * @param gameId string
 */
export const getGameVideo = async (gameId: string) =>
  client.games._gameID(gameId).video.get();

/**
 * ゲームの最新バージョンのファイルの取得
 * @param gameId string
 */
export const getGameFile = async (gameId: string) =>
  client.games.asset
    ._gameID(gameId)
    .file.get({ query: { operatingSystem: process.platform } });

/**
 * ゲームの最新バージョンのURLの取得
 * @param gameId string
 */
export const getGameUrl = async (gameId: string) =>
  client.games.asset._gameID(gameId).url.get();

/**
 * バージョンの詳細情報の取得
 * @param launcherVersionId number
 */
export const getVersions = async (launcherVersionId: number) =>
  client.versions._launcherVersionID(launcherVersionId).get();

/**
 * ブラウザゲーム以外のゲームのID、MD5、ゲームの種類、更新日の一覧
 */
export const getVersionsCheck = async () =>
  client.versions.check.get({ query: { operatingSystem: process.platform } });

/**
 * 着席
 * @param seatId number
 * @param seatVersionId number
 */
export const postSeats = async (seatId: number, seatVersionId: number) =>
  client.seats.post({ body: { seatId, seatVersionId } });

/**
 * 離席
 * @param seatId number
 * @param seatVersionId number
 */
export const deleteSeats = async (seatId: number, seatVersionId: number) =>
  client.seats.delete({ body: { seatId, seatVersionId } });
