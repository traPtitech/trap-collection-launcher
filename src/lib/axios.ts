/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import axios from '@aspida/axios';
import api from '@api/$api';
import { baseUrl } from '@/config';

const client = api(
  axios(undefined, { baseURL: baseUrl, headers: { authorization: '' } })
);

/**
 * ゲーム情報の取得
 * @param gameId string
 */
export const getGameInfo = (gameId: string) =>
  client.games._gameID(gameId).info.get();

/**
 * ゲーム画像の取得
 * @param gameId string
 */
export const getGameImage = (gameId: string) =>
  client.games._gameID(gameId).image.get();

/**
 * ゲーム動画の取得
 * @param gameId string
 */
export const getGameVideo = (gameId: string) =>
  client.games._gameID(gameId).video.get();

/**
 * ゲームの最新バージョンのファイルの取得
 * @param gameId string
 */
export const getGameFile = (gameId: string) =>
  client.games.asset
    ._gameID(gameId)
    .file.get({ query: { operatingSystem: process.platform } });

/**
 * ゲームの最新バージョンのURLの取得
 * @param gameId string
 */
export const getGameUrl = (gameId: string) =>
  client.games.asset._gameID(gameId).url.get();

/**
 * バージョンの詳細情報の取得
 * @param launcherVersionId number
 */
export const getVersions = (launcherVersionId: number) =>
  client.versions._launcherVersionID(launcherVersionId).get();

/**
 * ブラウザゲーム以外のゲームのID、MD5、ゲームの種類、更新日の一覧
 */
export const getVersionsCheck = () =>
  client.versions.check.get({ query: { operatingSystem: process.platform } });

/**
 * 着席
 * @param seatId number
 * @param seatVersionId number
 */
export const postSeats = (seatId: number, seatVersionId: number) =>
  client.seats.post({ body: { seatId, seatVersionId } });

/**
 * 離席
 * @param seatId number
 * @param seatVersionId number
 */
export const deleteSeats = (seatId: number, seatVersionId: number) =>
  client.seats.delete({ body: { seatId, seatVersionId } });
