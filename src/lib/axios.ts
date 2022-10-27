/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import axios from 'axios';
import store from './store';
import { baseUrl } from '@/config';
import {
  EditionApi,
  EditionAuthApi,
  GameApi,
  GameVersionApi,
  GameFileApi,
  GameImageApi,
  GameVideoApi,
  SeatApi,
  SeatStatus,
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
  EditionApi: new EditionApi(config, baseUrl, axiosInstance),
  EditionAuthApi: new EditionAuthApi(config, baseUrl, axiosInstance),
  GameApi: new GameApi(config, baseUrl, axiosInstance),
  GameVersionApi: new GameVersionApi(config, baseUrl, axiosInstance),
  GameFileStreamApi: new GameFileApi(config, baseUrl, axiosStreamInstance),
  GameImageStreamApi: new GameImageApi(config, baseUrl, axiosStreamInstance),
  GameVideoStreamApi: new GameVideoApi(config, baseUrl, axiosStreamInstance),
  GameFileApi: new GameFileApi(config, baseUrl, axiosInstance),
  GameImageApi: new GameImageApi(config, baseUrl, axiosInstance),
  GameVideoApi: new GameVideoApi(config, baseUrl, axiosInstance),
  SeatApi: new SeatApi(config, baseUrl, axiosInstance),
};

/**
 * accessTokenの取得
 * @param key string
 */
export const postLauncherLogin = async (key: string) =>
  API.EditionAuthApi.postEditionAuthorize({ key });

/**
 * ゲーム情報の取得
 * @param gameId string
 */
export const getGameInfo = async (gameId: string) =>
  API.GameApi.getGame(gameId);

/**
 * 指定したゲームファイルIDのゲームファイルの取得
 * @param gameId string
 * @param gameFileId string
 */
export const getGameMeta = async (gameId: string, gameFileId: string) =>
  API.GameFileApi.getGameFileMeta(gameId, gameFileId);

/**
 * ゲーム画像一覧の取得
 * @param gameId string
 */
export const getGameImages = async (gameId: string) =>
  API.GameImageApi.getGameImages(gameId);

/**
 * ゲーム画像の取得
 * @param gameId string
 */
export const getGameImage = async (gameId: string, gameImageId: string) =>
  API.GameImageStreamApi.getGameImage(gameId, gameImageId);

/**
 * ゲーム動画一覧の取得
 * @param gameId string
 */
export const getGameVideos = async (gameId: string) =>
  API.GameVideoApi.getGameVideos(gameId);

/**
 * ゲーム動画の取得
 * @param gameId string
 */
export const getGameVideo = async (gameId: string, gameVideoId: string) =>
  API.GameVideoStreamApi.getGameVideo(gameId, gameVideoId);

/**
 * ゲームのファイル一覧の取得
 * @param gameId string
 */
export const getGameFiles = async (gameId: string) =>
  API.GameFileApi.getGameFiles(gameId);

/**
 * ゲームのファイルの取得
 * @param gameId string
 */
export const getGameFile = async (gameId: string, gameFileId: string) =>
  API.GameFileStreamApi.getGameFile(gameId, gameFileId);

/**
 * ゲームのファイルのメタ情報の取得
 */
export const getGameFileMeta = async (gameId: string, gameFileId: string) =>
  API.GameFileApi.getGameFileMeta(gameId, gameFileId);

/**
 * 指定したゲームIDのゲームの最新バージョンの取得
 * @param gameId string
 */
export const getLatestGameVersion = async (gameId: string) =>
  API.GameVersionApi.getLatestGameVersion(gameId);

/**
 * アクセストークンをもとにエディションの情報を取得
 */
export const getEditionInfo = async () => API.EditionAuthApi.getEditionInfo();

/**
 * ブラウザゲーム以外のゲームのID、MD5、ゲームの種類、更新日の一覧
 */
export const getEditionGames = async (editionId: string) =>
  API.EditionApi.getEditionGames(editionId);

/**
 * 着席
 * @param seatId number
 * @param seatVersionId number
 */
export const patchSeatInUse = async (seatId: number) =>
  API.SeatApi.patchSeatStatus(seatId, { status: SeatStatus.InUse });

/**
 * 離席
 * @param seatId number
 * @param seatVersionId number
 */
export const patchSeatEmpty = async (seatId: number) =>
  API.SeatApi.patchSeatStatus(seatId, { status: SeatStatus.Empty });
